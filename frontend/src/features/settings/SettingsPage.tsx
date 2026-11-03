import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    ExternalLink,
    KeyRound,
    Loader2,
    Pencil,
    Plus,
    RefreshCw,
    RotateCcw,
    ShieldCheck,
    SlidersHorizontal,
    Trash2,
    User,
} from 'lucide-react'
import type { ApiKeyInfo, ProviderInfo } from '@/shared/api/settings'
import { getStoredEmail } from '@/shared/auth/useAuth'
import {
    ASSET_CLASS_OPTIONS,
    DEFAULT_PREFERENCES,
    LANDING_OPTIONS,
    REFRESH_OPTIONS,
    timeZoneOptions,
    zoneLabel,
    type DataSourcePreference,
    type Preferences,
    type TimeFormat,
} from '@/shared/settings/preferences'
import {
    toPreferences,
    useApiKeysQuery,
    usePreferApiKeyMutation,
    useProvidersQuery,
    useRemoveApiKeyMutation,
    useResetSettingsMutation,
    useSaveSettingsMutation,
    useSettingsQuery,
    useTestApiKeyMutation,
} from '@/shared/settings/useSettings'
import { ApiKeyModal } from './ApiKeyModal'

type Tab = 'account' | 'preferences' | 'data'

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
    { id: 'data', label: 'API & Data', icon: KeyRound },
]

const STATUS_META: Record<string, { label: string; className: string }> = {
    connected: { label: 'Connected', className: 'bg-green-500/10 border-green-500/30 text-green-400' },
    not_configured: { label: 'Not configured', className: 'bg-white/5 border-white/15 text-gray-400' },
    invalid: { label: 'Invalid key', className: 'bg-red-500/10 border-red-500/30 text-red-400' },
    rate_limited: { label: 'Rate limited', className: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
    unavailable: { label: 'Unavailable', className: 'bg-gray-500/10 border-gray-500/30 text-gray-400' },
    requires_verification: { label: 'Requires verification', className: 'bg-blue-500/10 border-blue-500/30 text-blue-300' },
}

const SOURCE_OPTIONS: { value: DataSourcePreference; label: string; detail: string }[] = [
    {
        value: 'auto',
        label: 'Automatic',
        detail: 'Use your saved keys for the asset classes they cover, and GeoTrade defaults for the rest.',
    },
    {
        value: 'user',
        label: 'My API keys only',
        detail: 'Only route through keys you mark as preferred. Anything else falls back to GeoTrade.',
    },
    {
        value: 'geotrade',
        label: 'GeoTrade default',
        detail: 'Always use the operator-configured providers, even while keys are saved.',
    },
]

function StatusBadge({ status }: { status: string }) {
    const meta = STATUS_META[status] ?? {
        label: status.replace(/_/g, ' '),
        className: 'bg-white/5 border-white/15 text-gray-400',
    }
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider ${meta.className}`}>
            <span className="w-1 h-1 rounded-full bg-current" />
            {meta.label}
        </span>
    )
}

function SectionCard({
    title,
    description,
    children,
    action,
}: {
    title: string
    description?: string
    children: React.ReactNode
    action?: React.ReactNode
}) {
    return (
        <section className="rounded-xl border border-white/10 bg-[#07091a]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] overflow-hidden">
            <header className="flex flex-wrap items-start justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/10">
                <div>
                    <h2 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">{title}</h2>
                    {description && <p className="text-[11px] text-gray-400 leading-relaxed mt-1 max-w-2xl">{description}</p>}
                </div>
                {action}
            </header>
            <div className="p-4 sm:p-5">{children}</div>
        </section>
    )
}

function Field({ label, hint, htmlFor, children }: {
    label: string
    hint?: string
    htmlFor?: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={htmlFor} className="block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                {label}
            </label>
            {children}
            {hint && <p className="text-[10px] text-gray-500 leading-relaxed">{hint}</p>}
        </div>
    )
}

const inputClass = 'w-full bg-[#03060f] border border-white/15 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-colors disabled:opacity-50'

function formatStamp(value: string | null, timeZone: string): string {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'
    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone,
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)
    } catch {
        return date.toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
    }
}

function capabilityLabel(value: string): string {
    const labels: Record<string, string> = {
        stocks: 'Stocks', etfs: 'ETFs', forex: 'Forex', crypto: 'Crypto',
        bonds: 'Bonds', macro: 'Macro',
    }
    return labels[value] ?? value
}

function monogram(name: string): string {
    const initials = name.split(/\s+/).filter(Boolean).map(part => part[0]).join('')
    return (initials || name.slice(0, 2)).slice(0, 2).toUpperCase()
}

interface SettingsPageProps {
    onRequestRegister: () => void
}

export function SettingsPage({ onRequestRegister }: SettingsPageProps) {
    const email = getStoredEmail()
    const [tab, setTab] = useState<Tab>('account')
    const [notice, setNotice] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<ApiKeyInfo | null>(null)
    const [confirmRemove, setConfirmRemove] = useState<string | null>(null)
    const [resetArmed, setResetArmed] = useState(false)

    const settingsQuery = useSettingsQuery(email)
    const providersQuery = useProvidersQuery(email)
    const keysQuery = useApiKeysQuery(email)

    const saveSettings = useSaveSettingsMutation(email)
    const resetSettings = useResetSettingsMutation(email)
    const testKey = useTestApiKeyMutation(email)
    const removeKey = useRemoveApiKeyMutation(email)
    const preferKey = usePreferApiKeyMutation(email)

    const settings = settingsQuery.data
    const providers = providersQuery.data?.providers ?? []
    const encryptionAvailable = providersQuery.data?.encryption_available ?? settings?.encryption_available ?? true

    const serverPreferences = useMemo(
        () => (settings ? toPreferences(settings) : null),
        [settings],
    )

    const [profileName, setProfileName] = useState('')
    const [form, setForm] = useState<Preferences>(DEFAULT_PREFERENCES)
    const [syncedProfile, setSyncedProfile] = useState<string | null>(null)
    const [syncedPreferences, setSyncedPreferences] = useState<string | null>(null)
    const serverPreferencesSignature = useMemo(
        () => (serverPreferences ? JSON.stringify(serverPreferences) : null),
        [serverPreferences],
    )

    if (settings) {
        const serverProfile = settings.profile_name ?? ''
        if (serverProfile !== syncedProfile) {
            setSyncedProfile(serverProfile)
            setProfileName(serverProfile)
        }
        if (
            serverPreferences &&
            serverPreferencesSignature &&
            serverPreferencesSignature !== syncedPreferences
        ) {
            setSyncedPreferences(serverPreferencesSignature)
            setForm(serverPreferences)
        }
    }

    useEffect(() => {
        if (!notice) return
        const timer = setTimeout(() => setNotice(''), 6000)
        return () => clearTimeout(timer)
    }, [notice])

    const zones = useMemo(() => timeZoneOptions(form.timeZone), [form.timeZone])
    const preferencesDirty = serverPreferences
        ? JSON.stringify(form) !== JSON.stringify(serverPreferences)
        : false
    const profileDirty = (settings?.profile_name ?? '') !== profileName.trim()

    const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
        setForm(prev => ({ ...prev, [key]: value }))

    const handleSaveProfile = async () => {
        const name = profileName.trim()
        if (!name) return
        saveSettings.mutate({ profile_name: name }, {
            onSuccess: () => setNotice('Profile updated.'),
        })
    }

    const handleSavePreferences = () => {
        saveSettings.mutate({
            default_landing_page: form.defaultLandingPage,
            default_asset_class: form.defaultAssetClass,
            refresh_interval_seconds: form.refreshIntervalSeconds,
            time_zone: form.timeZone,
            time_format: form.timeFormat,
            data_source_preference: form.dataSourcePreference,
        }, {
            onSuccess: () => setNotice('Preferences saved. They apply immediately and persist across sessions.'),
        })
    }

    const handleReset = () => {
        resetSettings.mutate(undefined, {
            onSuccess: () => {
                setResetArmed(false)
                setNotice('Preferences restored to their defaults.')
            },
        })
    }

    const openAdd = () => {
        setEditing(null)
        setModalOpen(true)
    }

    const openEdit = (key: ApiKeyInfo) => {
        setEditing(key)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditing(null)
    }

    const handleRemove = (provider: string) => {
        removeKey.mutate(provider, {
            onSuccess: (data) => {
                setConfirmRemove(null)
                setNotice(data.message)
            },
        })
    }

    if (!email) {
        return (
            <div className="h-full overflow-y-auto">
                <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-4 py-20">
                    <div className="w-full rounded-2xl border border-white/10 bg-[#07091a]/80 p-6 sm:p-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10">
                            <KeyRound className="h-5 w-5 text-purple-300" />
                        </div>
                        <h1 className="text-lg font-bold tracking-widest text-white uppercase">Settings</h1>
                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-400 leading-relaxed">
                            Account settings and API keys are scoped to the email you registered with.
                            Register with the waitlist form to create your identity.
                        </p>
                        <button
                            type="button"
                            onClick={onRequestRegister}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/20 px-5 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-200 transition-colors hover:bg-purple-500/30"
                        >
                            Register email
                        </button>
                        <p className="mt-4 text-[10px] font-mono text-gray-500">
                            GeoTrade's default data providers keep working without an account.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (settingsQuery.isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading settings...
                </div>
            </div>
        )
    }

    if (settingsQuery.isError) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <div className="flex max-w-md flex-col items-center gap-4 text-center">
                    <AlertCircle className="h-10 w-10 text-red-400" />
                    <div>
                        <h2 className="text-sm font-bold text-white">Settings could not be loaded</h2>
                        <p className="mt-1 text-xs text-gray-400">
                            {settingsQuery.error instanceof Error ? settingsQuery.error.message : 'The settings service is unavailable.'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => settingsQuery.refetch()}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-mono text-white transition-colors hover:bg-white/20"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    const actionError =
        (saveSettings.isError && saveSettings.error instanceof Error ? saveSettings.error.message : '') ||
        (resetSettings.isError && resetSettings.error instanceof Error ? resetSettings.error.message : '') ||
        (preferKey.isError && preferKey.error instanceof Error ? preferKey.error.message : '') ||
        (removeKey.isError && removeKey.error instanceof Error ? removeKey.error.message : '')

    return (
        <div className="h-full overflow-y-auto">
            <div className="mx-auto w-full max-w-5xl px-3 pb-28 pt-20 sm:px-6 sm:pt-24">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-purple-400/80">Account Control</p>
                        <h1 className="mt-1 text-xl font-bold tracking-widest text-white uppercase">Settings</h1>
                        <p className="mt-1 text-[11px] font-mono text-gray-500">{email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-green-500/20 bg-green-500/8 px-2.5 py-1.5 text-[10px] font-mono text-green-400">
                            <CheckCircle2 className="h-3 w-3" />
                            Account active
                        </span>
                    </div>
                </div>

                <div className="mb-5 flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#03060f]/60 p-1">
                    {TABS.map(({ id, label, icon: Icon }) => {
                        const active = tab === id
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setTab(id)}
                                className={`flex min-h-[38px] flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[10px] font-mono font-semibold uppercase tracking-widest transition-all ${
                                    active
                                        ? 'border border-white/20 bg-white/8 text-white shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                                        : 'border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-200'
                                }`}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                {label}
                            </button>
                        )
                    })}
                </div>

                <div aria-live="polite">
                    <AnimatePresence>
                        {notice && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                className="mb-4 flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2.5 text-[11px] text-green-300"
                            >
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                <span>{notice}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {actionError && (
                    <div role="alert" className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-[11px] text-red-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{actionError}</span>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {tab === 'account' && (
                        <motion.div
                            key="account"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="space-y-4"
                        >
                            <SectionCard
                                title="Profile"
                                description="The display name is used across this account. Your email is the identity for settings, portfolios, and saved API keys."
                            >
                                <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/25 bg-purple-500/10 text-lg font-bold font-mono text-purple-200">
                                        {monogram(profileName || email)}
                                    </div>
                                    <div className="space-y-4">
                                        <Field label="Display name" htmlFor="profile-name" hint="1–100 characters. Saved to your account.">
                                            <input
                                                id="profile-name"
                                                type="text"
                                                value={profileName}
                                                onChange={event => setProfileName(event.target.value)}
                                                maxLength={100}
                                                placeholder="Add a display name"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleSaveProfile}
                                                disabled={!profileDirty || !profileName.trim() || saveSettings.isPending}
                                                className="inline-flex items-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/20 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-200 transition-colors hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                {saveSettings.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                                Save profile
                                            </button>
                                            {!profileDirty && settings?.profile_name && (
                                                <span className="text-[10px] font-mono text-gray-500">Saved</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SectionCard>

                            <SectionCard title="Account details">
                                <dl className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Email</dt>
                                        <dd className="mt-1 break-all font-mono text-sm text-white">{email}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Status</dt>
                                        <dd className="mt-1 flex items-center gap-2 font-mono text-sm text-green-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                                            Active — email identity
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Settings profile created</dt>
                                        <dd className="mt-1 font-mono text-sm text-gray-300">
                                            {settings?.created_at ? formatStamp(settings.created_at, form.timeZone) : 'Created with your first saved change'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Last settings update</dt>
                                        <dd className="mt-1 font-mono text-sm text-gray-300">
                                            {settings?.updated_at ? formatStamp(settings.updated_at, form.timeZone) : 'No changes yet'}
                                        </dd>
                                    </div>
                                </dl>
                                <p className="mt-4 border-t border-white/10 pt-3 text-[10px] font-mono leading-relaxed text-gray-500">
                                    GeoTrade's waitlist does not record a public account creation date, so only dates this
                                    settings service can verify are shown. There is no avatar upload service; the initials above
                                    are generated from your name.
                                </p>
                            </SectionCard>
                        </motion.div>
                    )}

                    {tab === 'preferences' && (
                        <motion.div
                            key="preferences"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="space-y-4"
                        >
                            <SectionCard
                                title="Display & defaults"
                                description="These values are stored on your account and applied by the existing interface."
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field label="Default landing page" htmlFor="landing-page" hint="Where GeoTrade opens next time.">
                                        <select
                                            id="landing-page"
                                            value={form.defaultLandingPage}
                                            onChange={event => update('defaultLandingPage', event.target.value as Preferences['defaultLandingPage'])}
                                            className={inputClass}
                                        >
                                            {LANDING_OPTIONS.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Default asset class" htmlFor="asset-class" hint="Pre-selects the filter on the Portfolio page.">
                                        <select
                                            id="asset-class"
                                            value={form.defaultAssetClass}
                                            onChange={event => update('defaultAssetClass', event.target.value as Preferences['defaultAssetClass'])}
                                            className={inputClass}
                                        >
                                            {ASSET_CLASS_OPTIONS.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Market data refresh" htmlFor="refresh" hint="Live quote polling interval. Provider caches and rate limits may cap updates.">
                                        <select
                                            id="refresh"
                                            value={form.refreshIntervalSeconds}
                                            onChange={event => update('refreshIntervalSeconds', Number(event.target.value))}
                                            className={inputClass}
                                        >
                                            {REFRESH_OPTIONS.map(seconds => (
                                                <option key={seconds} value={seconds}>
                                                    {seconds < 60 ? `${seconds} seconds` : `${seconds / 60} minute${seconds === 60 ? '' : 's'}`}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Time zone" htmlFor="time-zone" hint="Used by the header clock and timestamps on this page.">
                                        <select
                                            id="time-zone"
                                            value={form.timeZone}
                                            onChange={event => update('timeZone', event.target.value)}
                                            className={inputClass}
                                        >
                                            {zones.map(zone => (
                                                <option key={zone} value={zone}>{zoneLabel(zone)}</option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                <div className="mt-5 space-y-2">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Time format</p>
                                    <div className="inline-flex rounded-lg border border-white/10 bg-[#03060f] p-1">
                                        {(['24h', '12h'] as TimeFormat[]).map(value => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() => update('timeFormat', value)}
                                                aria-pressed={form.timeFormat === value}
                                                className={`rounded-md px-4 py-2 text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors ${
                                                    form.timeFormat === value
                                                        ? 'bg-white/10 text-white'
                                                        : 'text-gray-500 hover:text-gray-200'
                                                }`}
                                            >
                                                {value === '24h' ? '24-hour' : '12-hour'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Data source preference"
                                description="Controls how the backend chooses between GeoTrade's providers and the keys you save below."
                            >
                                <div className="grid gap-2">
                                    {SOURCE_OPTIONS.map(option => {
                                        const active = form.dataSourcePreference === option.value
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => update('dataSourcePreference', option.value)}
                                                aria-pressed={active}
                                                className={`rounded-lg border px-3.5 py-3 text-left transition-colors ${
                                                    active
                                                        ? 'border-purple-400/40 bg-purple-500/10'
                                                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
                                                }`}
                                            >
                                                <span className={`block text-[11px] font-mono font-semibold uppercase tracking-wider ${active ? 'text-purple-200' : 'text-gray-300'}`}>
                                                    {option.label}
                                                </span>
                                                <span className="mt-1 block text-[11px] leading-relaxed text-gray-500">
                                                    {option.detail}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Save changes"
                                description="Preferences persist to your account and update the running interface without a reload."
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSavePreferences}
                                        disabled={!preferencesDirty || saveSettings.isPending}
                                        className="inline-flex items-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/20 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-200 transition-colors hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {saveSettings.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                        Save preferences
                                    </button>

                                    {resetArmed ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                disabled={resetSettings.isPending}
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-40"
                                            >
                                                {resetSettings.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                                                Confirm reset
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setResetArmed(false)}
                                                className="rounded-lg border border-white/10 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:bg-white/5"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setResetArmed(true)}
                                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-300 transition-colors hover:bg-white/5"
                                        >
                                            <RotateCcw className="h-3.5 w-3.5" />
                                            Reset defaults
                                        </button>
                                    )}
                                    {!preferencesDirty && (
                                        <span className="text-[10px] font-mono text-gray-500">All changes saved</span>
                                    )}
                                </div>
                                <p className="mt-3 text-[10px] font-mono leading-relaxed text-gray-500">
                                    Reset restores preferences only. Your profile name and saved API keys are kept.
                                </p>
                            </SectionCard>

                            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Deliberately not offered</p>
                                <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
                                    Display currency, country/exchange, a light theme, and notifications are omitted because they
                                    would have no real effect: quotes are normalized to USD, sources are fixed per asset class,
                                    GeoTrade ships one dark theme, and notification delivery is not implemented. No control here is decorative.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {tab === 'data' && (
                        <motion.div
                            key="data"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18 }}
                            className="space-y-4"
                        >
                            <SectionCard
                                title="API & Data Sources"
                                description="GeoTrade provides market data through its default data providers. You can optionally connect your own API keys to access additional data, increase available provider limits where permitted, or personalize your data sources."
                            >
                                {!encryptionAvailable && (
                                    <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] text-amber-300 leading-relaxed">
                                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                                        <span>
                                            This server has no credential encryption key configured, so new keys cannot be
                                            stored. GeoTrade's default providers continue to serve all data.
                                        </span>
                                    </div>
                                )}

                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <h3 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-400">Your API keys</h3>
                                        <p className="mt-1 text-[10px] text-gray-500">
                                            Used only for your requests. Never shown in full after saving.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={openAdd}
                                        disabled={!encryptionAvailable || providers.length === 0}
                                        className="inline-flex items-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/20 px-3.5 py-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-200 transition-colors hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Add API key
                                    </button>
                                </div>

                                {keysQuery.isLoading ? (
                                    <div className="flex items-center gap-2 py-8 text-[11px] font-mono text-gray-500">
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Loading saved keys...
                                    </div>
                                ) : keysQuery.isError ? (
                                    <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[11px] text-red-300">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <span>{keysQuery.error instanceof Error ? keysQuery.error.message : 'Could not load your keys.'}</span>
                                    </div>
                                ) : (keysQuery.data?.api_keys.length ?? 0) === 0 ? (
                                    <div className="flex flex-col items-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 py-8 text-center">
                                        <KeyRound className="mb-2 h-6 w-6 text-gray-600" />
                                        <p className="text-[11px] font-mono text-gray-400">No API keys connected</p>
                                        <p className="mt-1 max-w-md text-[10px] leading-relaxed text-gray-500">
                                            GeoTrade's default providers keep working exactly as before. Add a key only if
                                            you want the asset classes it covers to use your own quota.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2.5">
                                        {keysQuery.data!.api_keys.map(key => {
                                            const testing = testKey.isPending && testKey.variables === key.provider
                                            const testResult = testKey.data?.api_key.provider === key.provider
                                                ? testKey.data.message
                                                : null
                                            const removing = removeKey.isPending && removeKey.variables === key.provider
                                            return (
                                                <div
                                                    key={key.provider}
                                                    className="rounded-lg border border-white/10 bg-[#03060f]/60 p-3.5 transition-colors hover:border-white/20"
                                                >
                                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                                        <div className="flex min-w-0 items-start gap-3">
                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[10px] font-mono font-bold text-gray-300">
                                                                {monogram(key.provider_name)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <p className="text-sm font-semibold text-white">{key.provider_name}</p>
                                                                    <StatusBadge status={key.status} />
                                                                    {key.is_preferred && (
                                                                        <span className="rounded border border-purple-400/30 bg-purple-500/10 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-purple-300">
                                                                            Preferred
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-gray-400">{key.masked_key}</p>
                                                                <div className="mt-2 flex flex-wrap gap-1">
                                                                    {key.capabilities.map(capability => (
                                                                        <span key={capability} className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-gray-500">
                                                                            {capabilityLabel(capability)}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => preferKey.mutate({ provider: key.provider, preferred: !key.is_preferred })}
                                                                disabled={preferKey.isPending}
                                                                aria-pressed={key.is_preferred}
                                                                className={`rounded-md border px-2.5 py-1.5 text-[9px] font-mono font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 ${
                                                                    key.is_preferred
                                                                        ? 'border-purple-400/40 bg-purple-500/15 text-purple-200 hover:bg-purple-500/25'
                                                                        : 'border-white/15 text-gray-400 hover:bg-white/5 hover:text-white'
                                                                }`}
                                                            >
                                                                {key.is_preferred ? 'Preferred' : 'Prefer'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => testKey.mutate(key.provider)}
                                                                disabled={testing}
                                                                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-gray-300 transition-colors hover:bg-white/5 disabled:opacity-40"
                                                            >
                                                                {testing ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                                                                Test
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => openEdit(key)}
                                                                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-gray-300 transition-colors hover:bg-white/5"
                                                            >
                                                                <Pencil className="h-3 w-3" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setConfirmRemove(key.provider)}
                                                                className="inline-flex items-center gap-1.5 rounded-md border border-red-500/25 px-2.5 py-1.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-red-300 transition-colors hover:bg-red-500/10"
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <dl className="mt-3 grid gap-2 border-t border-white/[0.07] pt-2.5 sm:grid-cols-3">
                                                        <div>
                                                            <dt className="text-[9px] font-mono uppercase tracking-wider text-gray-600">Last validated</dt>
                                                            <dd className="mt-0.5 font-mono text-[10px] text-gray-400">{formatStamp(key.last_validated_at, form.timeZone)}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="text-[9px] font-mono uppercase tracking-wider text-gray-600">Last successful request</dt>
                                                            <dd className="mt-0.5 font-mono text-[10px] text-gray-400">{formatStamp(key.last_used_at, form.timeZone)}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="text-[9px] font-mono uppercase tracking-wider text-gray-600">Added</dt>
                                                            <dd className="mt-0.5 font-mono text-[10px] text-gray-400">{formatStamp(key.created_at, form.timeZone)}</dd>
                                                        </div>
                                                    </dl>

                                                    {testResult && (
                                                        <p className="mt-2.5 flex items-start gap-1.5 text-[10px] font-mono leading-relaxed text-gray-400">
                                                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                                                            {testResult}
                                                        </p>
                                                    )}
                                                    {key.message && key.status !== 'connected' && (
                                                        <p className="mt-2 flex items-start gap-1.5 text-[10px] font-mono leading-relaxed text-amber-400/90">
                                                            <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                                                            {key.message}
                                                        </p>
                                                    )}

                                                    {confirmRemove === key.provider && (
                                                        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-red-500/25 bg-red-500/5 px-3 py-2">
                                                            <p className="text-[10px] font-mono text-red-300">
                                                                Remove the {key.provider_name} key? Requests will use GeoTrade defaults again.
                                                            </p>
                                                            <div className="ml-auto flex items-center gap-1.5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemove(key.provider)}
                                                                    disabled={removing}
                                                                    className="inline-flex items-center gap-1.5 rounded-md border border-red-500/40 bg-red-500/15 px-2.5 py-1.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-red-200 transition-colors hover:bg-red-500/25 disabled:opacity-40"
                                                                >
                                                                    {removing && <Loader2 className="h-3 w-3 animate-spin" />}
                                                                    Remove key
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setConfirmRemove(null)}
                                                                    className="rounded-md border border-white/10 px-2.5 py-1.5 text-[9px] font-mono font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:bg-white/5"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                <p className="mt-3 flex items-start gap-2 text-[10px] font-mono leading-relaxed text-gray-500">
                                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                    Keys are encrypted with AES-256-GCM before storage, scoped to your email, and decrypted
                                    only when a provider call is made. Only the last four characters are returned to this page.
                                </p>
                            </SectionCard>

                            <SectionCard
                                title="GeoTrade default sources"
                                description="Configured by the GeoTrade operator. These remain the fallback whenever your key is missing, invalid, rate-limited, or does not cover an asset."
                            >
                                {providersQuery.isLoading ? (
                                    <div className="flex items-center gap-2 py-6 text-[11px] font-mono text-gray-500">
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Checking provider status...
                                    </div>
                                ) : providersQuery.isError ? (
                                    <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[11px] text-red-300">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <span>{providersQuery.error instanceof Error ? providersQuery.error.message : 'Could not load provider status.'}</span>
                                    </div>
                                ) : (
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {providersQuery.data?.default_sources.map(source => (
                                            <div key={source.name} className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-[11px] font-semibold text-gray-200">{source.name}</p>
                                                    <StatusBadge status={source.status} />
                                                </div>
                                                <p className="mt-1 text-[10px] leading-relaxed text-gray-500">{source.detail}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                    <ExternalLink className="h-3 w-3" />
                                    These are server-side settings; they are not editable from this account.
                                </p>
                            </SectionCard>

                            <SectionCard
                                title="Supported providers"
                                description="Only providers the server implements are listed. Each key is validated against the provider's live API before it is stored."
                            >
                                {providersQuery.isLoading ? (
                                    <div className="flex items-center gap-2 py-6 text-[11px] font-mono text-gray-500">
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Loading providers...
                                    </div>
                                ) : (
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {providers.map((provider: ProviderInfo) => {
                                            const saved = keysQuery.data?.api_keys.some(k => k.provider === provider.id)
                                            return (
                                                <div key={provider.id} className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="text-[11px] font-semibold text-gray-200">{provider.name}</p>
                                                        <span className={`text-[9px] font-mono uppercase tracking-wider ${saved ? 'text-green-400' : 'text-gray-600'}`}>
                                                            {saved ? 'Connected' : 'Not configured'}
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-[10px] leading-relaxed text-gray-500">{provider.description}</p>
                                                    <div className="mt-1.5 flex flex-wrap gap-1">
                                                        {provider.capabilities.map(capability => (
                                                            <span key={capability} className="rounded border border-white/10 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-gray-500">
                                                                {capabilityLabel(capability)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </SectionCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {modalOpen && email && (
                    <ApiKeyModal
                        email={email}
                        providers={providers}
                        editing={editing}
                        onClose={closeModal}
                        onSaved={message => {
                            setModalOpen(false)
                            setEditing(null)
                            setNotice(message)
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
