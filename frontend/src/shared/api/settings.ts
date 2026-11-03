/**
 * Account settings and BYOK endpoints.
 *
 * The account is identified by the same email the portfolio uses, sent in
 * `X-User-Email`. API keys travel only in request bodies and are never written
 * to browser storage, URLs, or console output.
 */
import { API_BASE } from './client'

export interface SettingsPayload {
    email: string
    profile_name: string | null
    default_landing_page: string
    default_asset_class: string
    refresh_interval_seconds: number
    time_zone: string
    time_format: string
    data_source_preference: string
    created_at: string | null
    updated_at: string | null
    encryption_available: boolean
}

export interface SettingsUpdateInput {
    profile_name?: string | null
    default_landing_page?: string
    default_asset_class?: string
    refresh_interval_seconds?: number
    time_zone?: string
    time_format?: string
    data_source_preference?: string
}

export interface ProviderField {
    key: string
    label: string
    required: boolean
    secret: boolean
    placeholder: string
    help: string
    options: string[]
}

export interface ProviderInfo {
    id: string
    name: string
    description: string
    docs_url: string
    capabilities: string[]
    fields: ProviderField[]
}

export interface DefaultSource {
    name: string
    status: 'connected' | 'not_configured'
    detail: string
}

export interface ProvidersPayload {
    providers: ProviderInfo[]
    default_sources: DefaultSource[]
    encryption_available: boolean
}

export interface ApiKeyInfo {
    provider: string
    provider_name: string
    masked_key: string
    status: string
    capabilities: string[]
    is_preferred: boolean
    last_validated_at: string | null
    last_used_at: string | null
    created_at: string | null
    message: string | null
}

export interface ApiKeyListPayload {
    api_keys: ApiKeyInfo[]
    encryption_available: boolean
}

export interface ApiKeyInput {
    provider: string
    api_key: string
    api_secret?: string
    extra?: Record<string, string>
}

export interface ValidationPayload {
    provider: string
    valid: boolean
    status: string
    message: string
}

export interface ApiKeyMutationPayload {
    api_key: ApiKeyInfo
    message: string
}

export class SettingsApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = 'SettingsApiError'
        this.status = status
    }
}

function headers(email: string, json = false): Record<string, string> {
    const base: Record<string, string> = { 'X-User-Email': email }
    if (json) base['Content-Type'] = 'application/json'
    return base
}

async function request<T>(
    path: string,
    email: string,
    init: RequestInit = {},
): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: { ...headers(email, init.body !== undefined), ...(init.headers ?? {}) },
        signal: init.signal ?? AbortSignal.timeout(15000),
    })
    if (!res.ok) {
        let detail = `Request failed (${res.status}).`
        try {
            const body = await res.json()
            if (typeof body?.detail === 'string') detail = body.detail
            else if (Array.isArray(body?.detail) && body.detail[0]?.msg) detail = body.detail[0].msg
        } catch {
            // non-JSON error page — keep the generic message
        }
        throw new SettingsApiError(detail, res.status)
    }
    if (res.status === 204) return undefined as T
    return (await res.json()) as T
}

export const settingsApi = {
    getSettings: (email: string) =>
        request<SettingsPayload>('/settings', email),

    updateSettings: (email: string, patch: SettingsUpdateInput) =>
        request<SettingsPayload>('/settings', email, {
            method: 'PUT',
            body: JSON.stringify(patch),
        }),

    resetSettings: (email: string) =>
        request<SettingsPayload & { message: string }>('/settings/reset', email, {
            method: 'POST',
        }),

    getProviders: (email: string) =>
        request<ProvidersPayload>('/settings/providers', email),

    listApiKeys: (email: string) =>
        request<ApiKeyListPayload>('/settings/api-keys', email),

    validateApiKey: (email: string, input: ApiKeyInput) =>
        request<ValidationPayload>('/settings/api-keys/validate', email, {
            method: 'POST',
            body: JSON.stringify(input),
        }),

    saveApiKey: (email: string, input: ApiKeyInput, existing = false) =>
        request<ApiKeyMutationPayload>(
            existing
                ? `/settings/api-keys/${encodeURIComponent(input.provider)}`
                : '/settings/api-keys',
            email,
            {
                method: existing ? 'PUT' : 'POST',
                body: JSON.stringify(input),
            },
        ),

    removeApiKey: (email: string, provider: string) =>
        request<ApiKeyMutationPayload>(
            `/settings/api-keys/${encodeURIComponent(provider)}`,
            email,
            { method: 'DELETE' },
        ),

    testApiKey: (email: string, provider: string) =>
        request<ApiKeyMutationPayload>(
            `/settings/api-keys/${encodeURIComponent(provider)}/test`,
            email,
            { method: 'POST' },
        ),

    preferApiKey: (email: string, provider: string, preferred: boolean) =>
        request<ApiKeyMutationPayload>(
            `/settings/api-keys/${encodeURIComponent(provider)}/prefer`,
            email,
            { method: 'POST', body: JSON.stringify({ preferred }) },
        ),
}
