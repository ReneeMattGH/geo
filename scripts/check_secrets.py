#!/usr/bin/env python3
"""Fail the build when a credential is committed.

Scans every file git tracks (plus the working tree when run with --all) for
provider key shapes and private key blocks. Placeholder values in the env
templates are allowed; anything that looks like a live token is not.

    make secrets          # or: python scripts/check_secrets.py
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# name → pattern matching the *value* an attacker could use
PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("AWS access key ID", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("GitHub token", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b")),
    ("OpenAI-style secret key", re.compile(r"\bsk-[A-Za-z0-9_-]{24,}\b")),
    ("Google API key", re.compile(r"\bAIza[0-9A-Za-z_-]{35}\b")),
    ("Slack token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{10,}\b")),
    ("Stripe key", re.compile(r"\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{16,}\b")),
    ("Private key block", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----")),
    ("JWT", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b")),
    ("OANDA v20 token", re.compile(r"\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}:[0-9a-f]{64}\b")),
]

# env-var / config assignments whose value must not look like a real secret.
# The variable name is captured so name-only entries can be whitelisted.
SECRET_ASSIGNMENT = re.compile(
    r"""(?ix)^\s*(?:export\s+)?
        (?P<name>[A-Z0-9_]*
         (?:API_KEY|SECRET|TOKEN|PASSWORD|PASSWD|ACCESS_KEY|PRIVATE_KEY|WEBHOOK_URL)
         [A-Z0-9_]*)
        \s*[=:]\s*["']?(?P<value>[^\s"'#]+)"""
)

# Values that are obviously not credentials: empty, template placeholders, env
# lookups, or short strings that cannot be a real key.
ALLOWED_VALUE = re.compile(
    r"""(?ix)
        ^$ | ^[<{] | ^x+$ | ^_+$ | ^your[_-] | ^chang(e|es)[_-]?me | ^placeholder
        | ^example | ^dummy | ^fake | ^redacted | ^todo | ^none | ^null
        | ^\$\{?[A-Z_][A-Z0-9_]* | ^%(?:s|q)s? | ^<.*>$
    """
)

# A value that is a reference to something else, not a literal: `settings.x`,
# `self.key`, `os.getenv("Y")`, `req.webhook_url`. Code, not a credential.
VALUE_IS_REFERENCE = re.compile(r"(?ix)^(?:[a-z_][a-z0-9_]*\.)+[a-z_] | .*\(.*\)")

# Keys that hold the NAME of an env var rather than its value: `api_key_env`.
NAME_ONLY_KEY = re.compile(r"(?i)(_env|_env_var|key_name|secret_name)$")


# Files that legitimately contain key-shaped strings (tests, this scanner).
SKIP_PATHS = ("scripts/check_secrets.py",)
LINE_MAX = 400


def tracked_files(scope_all: bool) -> list[Path]:
    if scope_all:
        result = subprocess.run(
            ["git", "ls-files", "--cached", "--others", "--exclude-standard"],
            cwd=ROOT, capture_output=True, text=True, check=True,
        )
    else:
        result = subprocess.run(
            ["git", "ls-files"], cwd=ROOT, capture_output=True, text=True, check=True
        )
    return [Path(p) for p in result.stdout.splitlines()]


def is_binary(path: Path) -> bool:
    try:
        with path.open("rb") as fh:
            return b"\x00" in fh.read(8000)
    except OSError:
        return True


def scan_file(path: Path) -> list[str]:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return []

    findings: list[str] = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        if len(line) > LINE_MAX:
            continue  # minified bundle: value checks are meaningless, skip noise
        for label, pattern in PATTERNS:
            if pattern.search(line):
                findings.append(f"{path}:{lineno}: {label}")
        match = SECRET_ASSIGNMENT.match(line)
        if match:
            name = match.group("name")
            value = match.group("value").strip().rstrip(",")
            if NAME_ONLY_KEY.search(name):
                continue
            if VALUE_IS_REFERENCE.search(value):
                continue
            if len(value) >= 12 and not ALLOWED_VALUE.match(value):
                findings.append(f"{path}:{lineno}: credential-looking value assigned")
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--all", action="store_true",
        help="also scan untracked-but-not-ignored files in the working tree",
    )
    args = parser.parse_args()

    findings: list[str] = []
    checked = 0
    for path in tracked_files(args.all):
        rel = path.as_posix()
        if rel in SKIP_PATHS or not path.is_file() or is_binary(path):
            continue
        checked += 1
        findings.extend(scan_file(path))

    if findings:
        print(f"Secret scan FAILED ({len(findings)} finding(s)):\n")
        for finding in findings:
            print(f"  {finding}")
        print(
            "\nRemove the value, rotate the credential at the provider, and "
            "move it into environment variables / the deploy platform's secret store."
        )
        return 1

    print(f"Secret scan passed ({checked} files checked).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
