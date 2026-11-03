import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    ExternalLink,
    KeyRound,
    Loader2,
    ShieldCheck,
    X,
} from 'lucide-react'
import type {
    ApiKeyInfo,
    ApiKeyInput,
    ProviderInfo,
    ValidationPayload,
} from '@/shared/api/settings'
import {
    useSaveApiKeyMutation,
    useValidateApiKeyMutation,
} from '@/shared/settings/useSettings'

interface ApiKeyModalProps {
    email: string
    providers: ProviderInfo[]
    editing: ApiKeyInfo | null
    onClose: () => void
    onSaved: (message: string) => void
}

function emptyValues(provider: ProviderInfo | undefined): Record<string, string> {
    const values: Record<string, string> = {}
    provider?.fields.forEach(field => {
        values[field.key] = field.key === 'plan' ? (field.options[0] ?? '') : ''
    })
    return values
}

function buildInput(
    providerId: string,
    provider: ProviderInfo,
    values: Record<string, string>,
): ApiKeyInput {
    const apiKey = (values.api_key ?? '').trim()
    const input: ApiKeyInput = {
        provider: providerId,
        api_key: apiKey,
    }
    if (provider.fields.some(f => f.key === 'api_secret')) {
        input.api_secret = (values.api_secret ?? '').trim()
    }
    const extra: Record<string, string> = {}
    provider.fields.forEach(field => {
        if (field.key !== 'api_key' && field.key !== 'api_secret') {
            const value = (values[field.key] ?? '').trim()
            if (value) extra[field.key] = value
        }
    })
    if (Object.keys(extra).length > 0) input.extra = extra
    return input
}

export function ApiKeyModal({ email, providers, editing, onClose, onSaved }: ApiKeyModalProps) {
    const [providerId, setProviderId] = useState(editing?.provider ?? providers[0]?.id ?? '')
    const [values, setValues] = useState<Record<string, string>>(() =>
        emptyValues(providers.find(p => p.id === (editing?.provider ?? providers[0]?.id))))
    const [visible, setVisible] = useState<Record<string, boolean>>({})
    const [validation, setValidation] = useState<ValidationPayload | null>(null)
    const [saveError, setSaveError] = useState('')

    const provider = useMemo(
        () => providers.find(p => p.id === providerId),
        [providers, providerId],
    )

    const validateMutation = useValidateApiKeyMutation(email)
    const saveMutation = useSaveApiKeyMutation(email, Boolean(editing))
    const busy = validateMutation.isPending || saveMutation.isPending

    const close = useCallback(() => {
        setValues({})
        setValidation(null)
        setSaveError('')
        onClose()
    }, [onClose])

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !busy) close()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [busy, close])

    if (!provider) return null

    const setValue = (key: string, value: string) => {
        setValues(prev => ({ ...prev, [key]: value }))
        setValidation(null)
        setSaveError('')
    }

    const missingRequired = provider.fields.some(field => {
        if (!field.required) return false
        return (values[field.key] ?? '').trim().length === 0
    })
    const canSubmit = !missingRequired && !busy

    const input = () => buildInput(provider.id, provider, values)

    const handleValidate = async () => {
        if (!canSubmit) return
        setSaveError('')
        try {
            setValidation(await validateMutation.mutateAsync(input()))
        } catch (error) {
            setValidation(null)
            setSaveError(error instanceof Error ? error.message : 'Could not validate this key.')
        }
    }

    const handleSave = async () => {
        if (!canSubmit) return
        setSaveError('')
        try {
            const result = await saveMutation.mutateAsync(input())
            setValues({})
            onSaved(result.message)
        } catch (error) {
            setSaveError(error instanceof Error ? error.message : 'Could not save this key.')
        }
    }

    const renderField = (field: ProviderInfo['fields'][number]) => {
        const isSecret = field.secret
        const isVisible = Boolean(visible[field.key])

        if (field.options.length > 0) {
            return (
                <div key={field.key} className="space-y-1.5">
                    <label htmlFor={`field-${field.key}`} className="block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                        {field.label}{field.required && <span className="text-purple-400"> *</span>}
                    </label>
                    <select
                        id={`field-${field.key}`}
                        value={values[field.key] ?? ''}
                        onChange={event => setValue(field.key, event.target.value)}
                        disabled={busy}
                        className="w-full bg-[#03060f] border border-white/15 rounded-lg px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500/60 transition-colors disabled:opacity-50"
                    >
                        {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {field.help && <p className="text-[10px] text-gray-500 leading-relaxed">{field.help}</p>}
                </div>
            )
        }

        return (
            <div key={field.key} className="space-y-1.5">
                <label htmlFor={`field-${field.key}`} className="block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    {field.label}{field.required && <span className="text-purple-400"> *</span>}
                </label>
                <div className="relative">
                    <input
                        id={`field-${field.key}`}
                        type={isSecret && !isVisible ? 'password' : 'text'}
                        value={values[field.key] ?? ''}
                        onChange={event => setValue(field.key, event.target.value)}
                        placeholder={field.placeholder}
                        disabled={busy}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        autoFocus={field.key === 'api_key'}
                        className="w-full bg-[#03060f] border border-white/15 rounded-lg px-3 py-2.5 pr-11 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-colors disabled:opacity-50"
                    />
                    {isSecret && (
                        <button
                            type="button"
                            onClick={() => setVisible(prev => ({ ...prev, [field.key]: !isVisible }))}
                            disabled={busy}
                            aria-label={isVisible ? `Hide ${field.label}` : `Show ${field.label}`}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                        >
                            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}
                </div>
                {field.help && <p className="text-[10px] text-gray-500 leading-relaxed">{field.help}</p>}
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={event => {
                if (event.target === event.currentTarget && !busy) close()
            }}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="api-key-title"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-[#07091a] border border-white/15 rounded-2xl shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-400/30 flex items-center justify-center">
                            <KeyRound className="h-4 w-4 text-purple-300" />
                        </div>
                        <div>
                            <h2 id="api-key-title" className="text-sm font-bold tracking-widest uppercase text-white">
                                {editing ? 'Replace API key' : 'Add API key'}
                            </h2>
                            <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                                {editing ? `Stored key ${editing.masked_key} will be replaced` : 'Validated before it is stored'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={close}
                        disabled={busy}
                        aria-label="Close"
                        className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="px-5 py-4 space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="provider" className="block text-[10px] font-mono uppercase tracking-widest text-gray-500">
                            Provider
                        </label>
                        <select
                            id="provider"
                            value={providerId}
                            disabled={Boolean(editing) || busy}
                            onChange={event => {
                                const nextId = event.target.value
                                const next = providers.find(p => p.id === nextId)
                                setProviderId(nextId)
                                setValues(emptyValues(next))
                                setVisible({})
                                setValidation(null)
                                setSaveError('')
                            }}
                            className="w-full bg-[#03060f] border border-white/15 rounded-lg px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500/60 transition-colors disabled:opacity-60"
                        >
                            {providers.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.07] p-3 space-y-2">
                        <p className="text-[11px] text-gray-300 leading-relaxed">{provider.description}</p>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {provider.capabilities.map(capability => (
                                <span key={capability} className="text-[9px] font-mono uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
                                    {capability}
                                </span>
                            ))}
                            <a
                                href={provider.docs_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono text-purple-300 hover:text-purple-200 transition-colors"
                            >
                                Provider docs <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {provider.fields.map(renderField)}

                    {validation && (
                        <div
                            role="status"
                            className={`flex items-start gap-2 rounded-lg border p-3 text-[11px] leading-relaxed ${
                                validation.valid
                                    ? 'bg-green-500/10 border-green-500/30 text-green-300'
                                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                            }`}
                        >
                            {validation.valid
                                ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                                : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                            <span>{validation.message}</span>
                        </div>
                    )}

                    {saveError && (
                        <div role="alert" className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-[11px] text-red-300 leading-relaxed">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{saveError}</span>
                        </div>
                    )}

                    <p className="flex items-start gap-2 text-[10px] font-mono text-gray-500 leading-relaxed">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                        Saved with AES-256-GCM on the server. The full key is never returned to this browser.
                    </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 px-5 py-4 border-t border-white/10">
                    <button
                        type="button"
                        onClick={close}
                        disabled={busy}
                        className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-300 text-[11px] font-mono font-semibold uppercase tracking-wider hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <div className="flex flex-1 flex-col sm:flex-row sm:justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleValidate}
                            disabled={!canSubmit}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white text-[11px] font-mono font-semibold uppercase tracking-wider hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {validateMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            Validate
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!canSubmit}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-200 text-[11px] font-mono font-semibold uppercase tracking-wider hover:bg-purple-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {saveMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                            {editing ? 'Replace key' : 'Save key'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
