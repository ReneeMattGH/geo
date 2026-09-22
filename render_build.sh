#!/bin/bash
# Render build script for GeoTrade backend

set -e

echo "Building GeoTrade backend for Render..."

# Install build dependencies
pip install --upgrade pip setuptools wheel

# Install dependencies with optimizations
pip install --prefer-binary --no-cache-dir -e "."

# Download spaCy model
python -m spacy download en_core_web_sm

echo "Build completed successfully!"
