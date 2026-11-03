import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { settingsApi, type ApiKeyInput, type SettingsPayload, type SettingsUpdateInput } from '@/shared/api/settings'
import { getStoredEmail } from '@/shared/auth/useAuth'
import { useStore } from '@/shared/state/store'
import {
    clampRefresh,
    type AssetClassPreference,
    type DataSourcePreference,
    type LandingPage,
    type Preferences,
    type TimeFormat,
} from './preferences'

export function toPreferences(data: SettingsPayload): Preferences {
    return {
        profileName: data.profile_name,
        defaultLandingPage: data.default_landing_page as LandingPage,
        defaultAssetClass: data.default_asset_class as AssetClassPreference,
        refreshIntervalSeconds: clampRefresh(data.refresh_interval_seconds),
        timeZone: data.time_zone,
        timeFormat: data.time_format as TimeFormat,
        dataSourcePreference: data.data_source_preference as DataSourcePreference,
    }
}

export function useSettingsQuery(email: string | null) {
    return useQuery({
        queryKey: ['user-settings', email],
        queryFn: () => settingsApi.getSettings(email!),
        enabled: !!email,
        staleTime: 60000,
    })
}

/** Keep the local preference cache in step with the account copy. */
export function usePreferencesSync() {
    const email = getStoredEmail()
    const setPreferences = useStore(s => s.setPreferences)
    const { data } = useSettingsQuery(email)

    useEffect(() => {
        if (data) setPreferences(toPreferences(data))
    }, [data, setPreferences])
}

export function useProvidersQuery(email: string | null) {
    return useQuery({
        queryKey: ['user-providers', email],
        queryFn: () => settingsApi.getProviders(email!),
        enabled: !!email,
        staleTime: 60000,
    })
}

export function useApiKeysQuery(email: string | null) {
    return useQuery({
        queryKey: ['user-api-keys', email],
        queryFn: () => settingsApi.listApiKeys(email!),
        enabled: !!email,
        staleTime: 30000,
    })
}

function useInvalidateAccount(email: string | null) {
    const qc = useQueryClient()
    return () => {
        qc.invalidateQueries({ queryKey: ['user-settings', email] })
        qc.invalidateQueries({ queryKey: ['user-api-keys', email] })
        qc.invalidateQueries({ queryKey: ['user-providers', email] })
        // A newly saved (or removed) key changes where quotes come from.
        qc.invalidateQueries({ queryKey: ['live-prices'] })
        qc.invalidateQueries({ queryKey: ['markets'] })
        qc.invalidateQueries({ queryKey: ['all-markets'] })
    }
}

export function useSaveSettingsMutation(email: string | null) {
    const qc = useQueryClient()
    const setPreferences = useStore(s => s.setPreferences)
    return useMutation({
        mutationFn: (patch: SettingsUpdateInput) => settingsApi.updateSettings(email!, patch),
        onSuccess: (data) => {
            setPreferences(toPreferences(data))
            qc.setQueryData(['user-settings', email], data)
        },
    })
}

export function useResetSettingsMutation(email: string | null) {
    const qc = useQueryClient()
    const setPreferences = useStore(s => s.setPreferences)
    return useMutation({
        mutationFn: () => settingsApi.resetSettings(email!),
        onSuccess: (data) => {
            setPreferences(toPreferences(data))
            qc.setQueryData(['user-settings', email], data)
        },
    })
}

export function useSaveApiKeyMutation(email: string | null, existing: boolean) {
    const invalidate = useInvalidateAccount(email)
    return useMutation({
        mutationFn: (input: ApiKeyInput) => settingsApi.saveApiKey(email!, input, existing),
        onSuccess: invalidate,
    })
}

export function useValidateApiKeyMutation(email: string | null) {
    return useMutation({
        mutationFn: (input: ApiKeyInput) => settingsApi.validateApiKey(email!, input),
    })
}

export function useTestApiKeyMutation(email: string | null) {
    const invalidate = useInvalidateAccount(email)
    return useMutation({
        mutationFn: (provider: string) => settingsApi.testApiKey(email!, provider),
        onSuccess: invalidate,
    })
}

export function useRemoveApiKeyMutation(email: string | null) {
    const invalidate = useInvalidateAccount(email)
    return useMutation({
        mutationFn: (provider: string) => settingsApi.removeApiKey(email!, provider),
        onSuccess: invalidate,
    })
}

export function usePreferApiKeyMutation(email: string | null) {
    const invalidate = useInvalidateAccount(email)
    return useMutation({
        mutationFn: ({ provider, preferred }: { provider: string; preferred: boolean }) =>
            settingsApi.preferApiKey(email!, provider, preferred),
        onSuccess: invalidate,
    })
}
