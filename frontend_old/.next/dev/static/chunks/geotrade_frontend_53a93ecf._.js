(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/geotrade/frontend/components/geopulse/top-bar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/wifi.js [app-client] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Atom$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/atom.js [app-client] (ecmascript) <export default as Atom>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$orbit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Orbit$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/orbit.js [app-client] (ecmascript) <export default as Orbit>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function GTIScoreDisplay({ score, trend, delta }) {
    const getTrendIcon = ()=>{
        if (trend === "rising") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
            className: "h-3.5 w-3.5 text-[#ef4444]"
        }, void 0, false, {
            fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
            lineNumber: 28,
            columnNumber: 36
        }, this);
        if (trend === "falling") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
            className: "h-3.5 w-3.5 text-[#22c55e]"
        }, void 0, false, {
            fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
            lineNumber: 29,
            columnNumber: 37
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            className: "h-3.5 w-3.5 text-[#f59e0b]"
        }, void 0, false, {
            fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
            lineNumber: 30,
            columnNumber: 12
        }, this);
    };
    const getScoreColor = ()=>{
        if (score >= 80) return "text-[#ef4444]";
        if (score >= 60) return "text-[#f59e0b]";
        if (score >= 40) return "text-[#0ea5e9]";
        return "text-[#22c55e]";
    };
    const getSeverityLabel = ()=>{
        if (score >= 80) return "CRITICAL";
        if (score >= 60) return "ELEVATED";
        if (score >= 40) return "MODERATE";
        return "LOW";
    };
    const getSeverityColor = ()=>{
        if (score >= 80) return "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30";
        if (score >= 60) return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
        if (score >= 40) return "bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30";
        return "bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                className: "h-5 w-5 text-[#00e5ff]"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#00e5ff] animate-pulse-glow"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
                                children: "Global Tension Index"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-2xl font-mono font-bold tabular-nums ${getScoreColor()}`,
                                        children: score.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            getTrendIcon(),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-xs font-mono ${delta >= 0 ? "text-[#ef4444]" : "text-[#22c55e]"}`,
                                                children: [
                                                    delta >= 0 ? "+" : "",
                                                    delta.toFixed(1)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider ${getSeverityColor()}`,
                children: getSeverityLabel()
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = GTIScoreDisplay;
function LiveClock() {
    _s();
    const [timeStr, setTimeStr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("--:--:--");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveClock.useEffect": ()=>{
            function update() {
                const now = new Date();
                const h = String(now.getUTCHours()).padStart(2, "0");
                const m = String(now.getUTCMinutes()).padStart(2, "0");
                const s = String(now.getUTCSeconds()).padStart(2, "0");
                setTimeStr(`${h}:${m}:${s}`);
            }
            update();
            const id = setInterval(update, 1000);
            return ({
                "LiveClock.useEffect": ()=>clearInterval(id)
            })["LiveClock.useEffect"];
        }
    }["LiveClock.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1.5 text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                className: "h-3 w-3"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] font-mono tabular-nums",
                children: [
                    timeStr,
                    " UTC"
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(LiveClock, "3czy5JaK6VB5anrJKhCPClY8DA4=");
_c1 = LiveClock;
function TopBar({ gti, mode, onModeChange }) {
    const modes = [
        {
            id: "globe",
            label: "EARTH PULSE",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                className: "h-3.5 w-3.5"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 113,
                columnNumber: 48
            }, this)
        },
        {
            id: "quantum",
            label: "QUANTUM FIELD",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Atom$3e$__["Atom"], {
                className: "h-3.5 w-3.5"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 114,
                columnNumber: 52
            }, this)
        },
        {
            id: "attractor",
            label: "ATTRACTOR",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$orbit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Orbit$3e$__["Orbit"], {
                className: "h-3.5 w-3.5"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 115,
                columnNumber: 50
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "cyber-panel border-b border-[var(--panel-border)] px-4 py-2 flex items-center justify-between relative z-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 opacity-[0.015]",
                    style: {
                        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,0.03) 2px,rgba(0,229,255,0.03) 4px)"
                    }
                }, void 0, false, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center justify-center h-8 w-8 rounded",
                                style: {
                                    background: "rgba(0,229,255,0.1)",
                                    border: "1px solid rgba(0,229,255,0.2)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "h-4 w-4 text-[#00e5ff]"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold tracking-[0.2em] text-foreground glow-text font-mono",
                                        children: "GEOPULSE"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[8px] font-mono tracking-[0.15em] text-muted-foreground uppercase",
                                        children: "Tactical Intelligence"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-px bg-border"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GTIScoreDisplay, {
                        score: gti.score,
                        trend: gti.trend,
                        delta: gti.delta
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 bg-secondary/50 rounded-sm p-0.5 border border-border/50",
                children: modes.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onModeChange(m.id),
                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${mode === m.id ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]" : "text-muted-foreground hover:text-foreground border border-transparent"}`,
                        children: [
                            m.icon,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden lg:inline",
                                children: m.label
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this)
                        ]
                    }, m.id, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                                        className: "h-3 w-3 text-[#22c55e]"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-mono text-[#22c55e] uppercase",
                                        children: "Live"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                        className: "h-3 w-3 text-[#00e5ff] animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-mono text-muted-foreground",
                                        children: [
                                            gti.breakdown.length,
                                            " FEEDS"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 w-px bg-border"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveClock, {}, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 rounded-sm px-2 py-1",
                        style: {
                            background: "rgba(0,229,255,0.05)",
                            border: "1px solid rgba(0,229,255,0.2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                className: "h-3 w-3 text-[#00e5ff]"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono text-[#00e5ff] uppercase tracking-wider",
                                children: "AI Active"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/top-bar.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_c2 = TopBar;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "GTIScoreDisplay");
__turbopack_context__.k.register(_c1, "LiveClock");
__turbopack_context__.k.register(_c2, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/geotrade/frontend/components/geopulse/left-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeftPanel",
    ()=>LeftPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/sliders-vertical.js [app-client] (ecmascript) <export default as Sliders>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$earth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe2$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/earth.js [app-client] (ecmascript) <export default as Globe2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SectionHeader({ label, icon, collapsed, onToggle }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onToggle,
        className: "flex items-center justify-between w-full py-2 px-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    icon,
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "h-3 w-3"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 43,
                columnNumber: 20
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "h-3 w-3"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 43,
                columnNumber: 59
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = SectionHeader;
function FilterChip({ label, active, onClick, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `px-2 py-1 rounded-sm text-[9px] font-mono uppercase tracking-wider border transition-all duration-200 ${active ? `bg-[${color || "#00e5ff"}]/10 text-[${color || "#00e5ff"}] border-[${color || "#00e5ff"}]/30` : "bg-transparent text-muted-foreground border-border/50 hover:border-border"}`,
        style: active ? {
            backgroundColor: `${color || "#00e5ff"}15`,
            color: color || "#00e5ff",
            borderColor: `${color || "#00e5ff"}40`
        } : undefined,
        children: label
    }, void 0, false, {
        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c1 = FilterChip;
function ScenarioSlider({ label, value, onChange, icon, color, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            icon,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono text-foreground/80 uppercase tracking-wider",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-mono font-semibold tabular-nums",
                        style: {
                            color
                        },
                        children: [
                            value,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-1.5 rounded-full bg-secondary/80 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 left-0 rounded-full transition-all duration-300",
                        style: {
                            width: `${value}%`,
                            background: `linear-gradient(90deg, ${color}40, ${color})`,
                            boxShadow: `0 0 8px ${color}40`
                        }
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: 0,
                        max: 100,
                        value: value,
                        onChange: (e)=>onChange(Number(e.target.value)),
                        className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                        "aria-label": label
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[8px] font-mono text-muted-foreground/60 leading-relaxed",
                children: description
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_c2 = ScenarioSlider;
function RegionBreakdown({ regions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: regions.map((r)=>{
            const getColor = ()=>{
                if (r.score >= 80) return "#ef4444";
                if (r.score >= 60) return "#f59e0b";
                if (r.score >= 40) return "#0ea5e9";
                return "#22c55e";
            };
            const color = getColor();
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 text-[9px] font-mono text-muted-foreground truncate",
                        children: r.region
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 133,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-1 rounded-full bg-secondary/80 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full transition-all duration-500",
                            style: {
                                width: `${r.score}%`,
                                background: color,
                                boxShadow: `0 0 6px ${color}50`
                            }
                        }, void 0, false, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                            lineNumber: 135,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 134,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 w-16 justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono font-semibold tabular-nums",
                                style: {
                                    color
                                },
                                children: r.score.toFixed(0)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[8px] font-mono ${r.delta >= 0 ? "text-[#ef4444]" : "text-[#22c55e]"}`,
                                children: [
                                    r.delta >= 0 ? "+" : "",
                                    r.delta.toFixed(1)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 144,
                        columnNumber: 13
                    }, this)
                ]
            }, r.region, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 132,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_c3 = RegionBreakdown;
function LeftPanel({ scenario, onScenarioChange, selectedRegions, onRegionToggle, selectedAssetClasses, onAssetClassToggle }) {
    _s();
    const [filtersCollapsed, setFiltersCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scenarioCollapsed, setScenarioCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [regionCollapsed, setRegionCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const regions = [
        "North America",
        "Europe",
        "Asia Pacific",
        "Middle East",
        "Latin America",
        "Africa"
    ];
    const assetClasses = [
        "Equities",
        "Bonds",
        "Commodities",
        "Forex",
        "Crypto"
    ];
    const gtiBreakdown = [
        {
            region: "Middle East",
            score: 89.2,
            delta: 5.1
        },
        {
            region: "Asia Pacific",
            score: 78.6,
            delta: 3.2
        },
        {
            region: "Europe",
            score: 71.3,
            delta: 1.8
        },
        {
            region: "N. America",
            score: 62.4,
            delta: -0.5
        },
        {
            region: "Lat. America",
            score: 58.7,
            delta: 2.1
        },
        {
            region: "Africa",
            score: 55.1,
            delta: 1.4
        }
    ];
    const updateScenario = (key, value)=>{
        onScenarioChange({
            ...scenario,
            [key]: value
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-72 cyber-panel border-r border-[var(--panel-border)] flex flex-col overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00e5ff]/20"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00e5ff]/20"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto px-3 py-2 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                label: "Region Tensions",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$earth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe2$3e$__["Globe2"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                    lineNumber: 198,
                                    columnNumber: 19
                                }, void 0),
                                collapsed: regionCollapsed,
                                onToggle: ()=>setRegionCollapsed(!regionCollapsed)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            !regionCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RegionBreakdown, {
                                regions: gtiBreakdown
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 202,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px bg-border/50"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                label: "Asset Filters",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                    lineNumber: 211,
                                    columnNumber: 19
                                }, void 0),
                                collapsed: filtersCollapsed,
                                onToggle: ()=>setFiltersCollapsed(!filtersCollapsed)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            !filtersCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider",
                                                children: "Region"
                                            }, void 0, false, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1 mt-1",
                                                children: regions.map((region)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterChip, {
                                                        label: region.replace("North ", "N.").replace("Latin ", "L.").replace(" Pacific", ""),
                                                        active: selectedRegions.includes(region),
                                                        onClick: ()=>onRegionToggle(region)
                                                    }, region, false, {
                                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider",
                                                children: "Asset Class"
                                            }, void 0, false, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                lineNumber: 233,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1 mt-1",
                                                children: assetClasses.map((ac)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterChip, {
                                                        label: ac,
                                                        active: selectedAssetClasses.includes(ac),
                                                        onClick: ()=>onAssetClassToggle(ac),
                                                        color: "#0ea5e9"
                                                    }, ac, false, {
                                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                lineNumber: 236,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px bg-border/50"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                label: "Scenario Simulation",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__["Sliders"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                    lineNumber: 258,
                                    columnNumber: 19
                                }, void 0),
                                collapsed: scenarioCollapsed,
                                onToggle: ()=>setScenarioCollapsed(!scenarioCollapsed)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            !scenarioCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScenarioSlider, {
                                        label: "Oil Shock",
                                        value: scenario.oilPriceShock,
                                        onChange: (v)=>updateScenario("oilPriceShock", v),
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                            className: "h-3 w-3 text-[#f59e0b]"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                            lineNumber: 268,
                                            columnNumber: 23
                                        }, void 0),
                                        color: "#f59e0b",
                                        description: "Simulates crude price disruption scenario"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScenarioSlider, {
                                        label: "Rate Change",
                                        value: scenario.interestRateChange,
                                        onChange: (v)=>updateScenario("interestRateChange", v),
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                            className: "h-3 w-3 text-[#0ea5e9]"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                            lineNumber: 276,
                                            columnNumber: 23
                                        }, void 0),
                                        color: "#0ea5e9",
                                        description: "Central bank emergency rate adjustment"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScenarioSlider, {
                                        label: "Escalation",
                                        value: scenario.geopoliticalEscalation,
                                        onChange: (v)=>updateScenario("geopoliticalEscalation", v),
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
                                            className: "h-3 w-3 text-[#ef4444]"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                            lineNumber: 284,
                                            columnNumber: 23
                                        }, void 0),
                                        color: "#ef4444",
                                        description: "Military conflict escalation probability"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScenarioSlider, {
                                        label: "Supply Chain",
                                        value: scenario.supplyChainDisruption,
                                        onChange: (v)=>updateScenario("supplyChainDisruption", v),
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                            className: "h-3 w-3 text-[#f59e0b]"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                            lineNumber: 292,
                                            columnNumber: 23
                                        }, void 0),
                                        color: "#f59e0b",
                                        description: "Global logistics disruption index"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScenarioSlider, {
                                        label: "Cyber Threat",
                                        value: scenario.cyberThreatLevel,
                                        onChange: (v)=>updateScenario("cyberThreatLevel", v),
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                            className: "h-3 w-3 text-[#00e5ff]"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                            lineNumber: 300,
                                            columnNumber: 23
                                        }, void 0),
                                        color: "#00e5ff",
                                        description: "Infrastructure cyber attack probability"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full py-2 rounded-sm border border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[10px] font-mono uppercase tracking-wider text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this),
                                            "Run Simulation"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border-t border-[var(--panel-border)] bg-[var(--card)]/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Data Feeds: 6 Active"
                        }, void 0, false, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this),
                                "Connected"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/left-panel.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_s(LeftPanel, "517mFt4XsdIPh4FZyyQSLNNjNF0=");
_c4 = LeftPanel;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SectionHeader");
__turbopack_context__.k.register(_c1, "FilterChip");
__turbopack_context__.k.register(_c2, "ScenarioSlider");
__turbopack_context__.k.register(_c3, "RegionBreakdown");
__turbopack_context__.k.register(_c4, "LeftPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/geotrade/frontend/components/geopulse/center-visualization.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CenterVisualization",
    ()=>CenterVisualization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function drawGlobe(ctx, w, h, rotation, points, arcs, gtiScore, hoveredPoint, mousePos) {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.35;
    // Background grid
    ctx.strokeStyle = "rgba(0, 229, 255, 0.02)";
    ctx.lineWidth = 0.5;
    for(let i = 0; i < w; i += 40){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for(let j = 0; j < h; j += 40){
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
    }
    // Globe glow
    const glowGradient = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.4);
    glowGradient.addColorStop(0, `rgba(0, 229, 255, ${0.03 + gtiScore * 0.0002})`);
    glowGradient.addColorStop(1, "rgba(0, 229, 255, 0)");
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, w, h);
    // Globe sphere
    const sphereGradient = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
    sphereGradient.addColorStop(0, "rgba(30, 41, 59, 0.9)");
    sphereGradient.addColorStop(0.7, "rgba(15, 23, 42, 0.95)");
    sphereGradient.addColorStop(1, "rgba(0, 229, 255, 0.1)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGradient;
    ctx.fill();
    // Globe outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 + Math.sin(Date.now() / 2000) * 0.05})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Latitude lines
    for(let lat = -60; lat <= 60; lat += 30){
        const latRad = lat * Math.PI / 180;
        const r = radius * Math.cos(latRad);
        const yPos = cy + radius * Math.sin(latRad) * 0.8;
        ctx.beginPath();
        ctx.ellipse(cx, yPos, r, r * 0.15, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 229, 255, 0.05)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    // Longitude lines
    for(let lon = 0; lon < 180; lon += 30){
        const lonRad = (lon + rotation) * Math.PI / 180;
        ctx.beginPath();
        for(let lat = -90; lat <= 90; lat += 5){
            const latRad = lat * Math.PI / 180;
            const x = cx + radius * Math.cos(latRad) * Math.sin(lonRad) * 0.9;
            const y = cy - radius * Math.sin(latRad) * 0.8;
            if (lat === -90) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(0, 229, 255, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    // Arcs (trade routes / connections)
    arcs.forEach((arc)=>{
        const startPos = latLngToScreen(arc.startLat, arc.startLng, cx, cy, radius, rotation);
        const endPos = latLngToScreen(arc.endLat, arc.endLng, cx, cy, radius, rotation);
        if (!startPos.visible || !endPos.visible) return;
        const midX = (startPos.x + endPos.x) / 2;
        const midY = (startPos.y + endPos.y) / 2 - 40 * arc.intensity;
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.quadraticCurveTo(midX, midY, endPos.x, endPos.y);
        const arcAlpha = 0.2 + arc.intensity * 0.4 + Math.sin(Date.now() / 1000 + arc.intensity * 5) * 0.1;
        ctx.strokeStyle = arc.color.replace(")", `, ${arcAlpha})`).replace("rgb", "rgba").replace("#", "");
        // Convert hex to rgba for arc
        const hexToRgba = (hex, alpha)=>{
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        ctx.strokeStyle = hexToRgba(arc.color, arcAlpha);
        ctx.lineWidth = 1 + arc.intensity;
        ctx.stroke();
        // Animated dot on arc
        const t = Date.now() / (3000 / arc.intensity) % 1;
        const dotX = (1 - t) * (1 - t) * startPos.x + 2 * (1 - t) * t * midX + t * t * endPos.x;
        const dotY = (1 - t) * (1 - t) * startPos.y + 2 * (1 - t) * t * midY + t * t * endPos.y;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(arc.color, 0.9);
        ctx.fill();
        // Dot glow
        const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
        dotGlow.addColorStop(0, hexToRgba(arc.color, 0.3));
        dotGlow.addColorStop(1, hexToRgba(arc.color, 0));
        ctx.fillStyle = dotGlow;
        ctx.fillRect(dotX - 8, dotY - 8, 16, 16);
    });
    // Points (hotspots)
    points.forEach((point)=>{
        const pos = latLngToScreen(point.lat, point.lng, cx, cy, radius, rotation);
        if (!pos.visible) return;
        const isHovered = hoveredPoint?.label === point.label;
        const pulseScale = 1 + Math.sin(Date.now() / 500 + point.tensionScore) * 0.3;
        const pointSize = (3 + point.size * 4) * (isHovered ? 1.5 : 1) * pulseScale;
        // Outer glow
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pointSize * 3);
        const hexToRgba2 = (hex, alpha)=>{
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        glow.addColorStop(0, hexToRgba2(point.color, 0.3));
        glow.addColorStop(1, hexToRgba2(point.color, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(pos.x - pointSize * 3, pos.y - pointSize * 3, pointSize * 6, pointSize * 6);
        // Point
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba2(point.color, 0.8);
        ctx.fill();
        // Ring
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pointSize * 2, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba2(point.color, 0.2 * pulseScale);
        ctx.lineWidth = 0.5;
        ctx.stroke();
        // Label
        if (isHovered || point.tensionScore > 75) {
            ctx.font = "9px 'Geist Mono', monospace";
            ctx.fillStyle = hexToRgba2(point.color, isHovered ? 1 : 0.7);
            ctx.textAlign = "left";
            ctx.fillText(point.label, pos.x + pointSize + 4, pos.y - 4);
            ctx.font = "8px 'Geist Mono', monospace";
            ctx.fillStyle = hexToRgba2(point.color, isHovered ? 0.8 : 0.5);
            ctx.fillText(`GTI: ${point.tensionScore}`, pos.x + pointSize + 4, pos.y + 6);
        }
    });
    // HUD overlay elements
    drawHUD(ctx, w, h, gtiScore, rotation);
}
function drawHUD(ctx, w, h, gtiScore, rotation) {
    // Top-left coordinates
    ctx.font = "9px 'Geist Mono', monospace";
    ctx.fillStyle = "rgba(0, 229, 255, 0.3)";
    ctx.textAlign = "left";
    ctx.fillText(`ROT: ${rotation.toFixed(1)}deg`, 12, 20);
    ctx.fillText(`GTI: ${gtiScore.toFixed(1)}`, 12, 32);
    // Corner brackets
    const bracketSize = 20;
    const bracketColor = "rgba(0, 229, 255, 0.15)";
    ctx.strokeStyle = bracketColor;
    ctx.lineWidth = 1;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(4, bracketSize + 4);
    ctx.lineTo(4, 4);
    ctx.lineTo(bracketSize + 4, 4);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(w - bracketSize - 4, 4);
    ctx.lineTo(w - 4, 4);
    ctx.lineTo(w - 4, bracketSize + 4);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(4, h - bracketSize - 4);
    ctx.lineTo(4, h - 4);
    ctx.lineTo(bracketSize + 4, h - 4);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(w - bracketSize - 4, h - 4);
    ctx.lineTo(w - 4, h - 4);
    ctx.lineTo(w - 4, h - bracketSize - 4);
    ctx.stroke();
    // Bottom-right status
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(0, 229, 255, 0.25)";
    ctx.fillText("EARTH PULSE MODE", w - 12, h - 20);
    ctx.fillText(`RES: ${w}x${h}`, w - 12, h - 8);
}
function latLngToScreen(lat, lng, cx, cy, radius, rotation) {
    const latRad = lat * Math.PI / 180;
    const lngRad = (lng + rotation) * Math.PI / 180;
    const x = cx + radius * Math.cos(latRad) * Math.sin(lngRad) * 0.9;
    const y = cy - radius * Math.sin(latRad) * 0.8;
    const z = Math.cos(latRad) * Math.cos(lngRad);
    return {
        x,
        y,
        visible: z > -0.2
    };
}
// ─── Quantum Field Mode ──────────────────────────────────────────
function drawQuantumField(ctx, w, h, particles, gtiScore, time) {
    ctx.clearRect(0, 0, w, h);
    // Grid background
    ctx.strokeStyle = "rgba(0, 229, 255, 0.015)";
    ctx.lineWidth = 0.5;
    for(let i = 0; i < w; i += 40){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for(let j = 0; j < h; j += 40){
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
    }
    // Connection lines
    for(let i = 0; i < particles.length; i++){
        for(let j = i + 1; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && particles[i].clusterId === particles[j].clusterId) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.05 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    // Particles
    const velocityMultiplier = 0.5 + gtiScore / 100;
    particles.forEach((p, i)=>{
        // Update position with turbulence
        const turbulence = gtiScore / 200;
        p.x += p.vx * velocityMultiplier + (Math.random() - 0.5) * turbulence;
        p.y += p.vy * velocityMultiplier + (Math.random() - 0.5) * turbulence;
        // Boundary wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        const hexToRgba = (hex, alpha)=>{
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        glow.addColorStop(0, hexToRgba(p.color, 0.2));
        glow.addColorStop(1, hexToRgba(p.color, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
        // Core
        const pulse = 1 + Math.sin(time / 500 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, p.alpha);
        ctx.fill();
        // Label
        ctx.font = "8px 'Geist Mono', monospace";
        ctx.fillStyle = hexToRgba(p.color, 0.6);
        ctx.textAlign = "center";
        ctx.fillText(p.label, p.x, p.y - p.size * 2 - 4);
    });
    // HUD
    ctx.font = "9px 'Geist Mono', monospace";
    ctx.fillStyle = "rgba(0, 229, 255, 0.3)";
    ctx.textAlign = "left";
    ctx.fillText("QUANTUM FIELD MODE", 12, 20);
    ctx.fillText(`PARTICLES: ${particles.length}`, 12, 32);
    ctx.fillText(`VELOCITY: ${velocityMultiplier.toFixed(2)}x`, 12, 44);
    // Corner brackets
    const bracketSize = 20;
    ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(4, bracketSize + 4);
    ctx.lineTo(4, 4);
    ctx.lineTo(bracketSize + 4, 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w - bracketSize - 4, 4);
    ctx.lineTo(w - 4, 4);
    ctx.lineTo(w - 4, bracketSize + 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(4, h - bracketSize - 4);
    ctx.lineTo(4, h - 4);
    ctx.lineTo(bracketSize + 4, h - 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w - bracketSize - 4, h - 4);
    ctx.lineTo(w - 4, h - 4);
    ctx.lineTo(w - 4, h - bracketSize - 4);
    ctx.stroke();
}
// ─── Attractor Mode ──────────────────────────────────────────────
function drawAttractorMode(ctx, w, h, particles, gtiScore, time) {
    ctx.clearRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = "rgba(0, 229, 255, 0.015)";
    ctx.lineWidth = 0.5;
    for(let i = 0; i < w; i += 40){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for(let j = 0; j < h; j += 40){
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
    }
    // Attractors (safe-haven centers)
    const attractors = [
        {
            x: w * 0.3,
            y: h * 0.35,
            label: "GOLD",
            color: "#f59e0b",
            strength: gtiScore / 100
        },
        {
            x: w * 0.7,
            y: h * 0.35,
            label: "BONDS",
            color: "#0ea5e9",
            strength: gtiScore / 120
        },
        {
            x: w * 0.5,
            y: h * 0.7,
            label: "USD",
            color: "#22c55e",
            strength: gtiScore / 150
        }
    ];
    // Draw attractor fields
    attractors.forEach((a)=>{
        const fieldRadius = 60 + a.strength * 80;
        for(let r = fieldRadius; r > 10; r -= 15){
            ctx.beginPath();
            ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
            const hexToRgba = (hex, alpha)=>{
                const rr = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return `rgba(${rr}, ${g}, ${b}, ${alpha})`;
            };
            ctx.strokeStyle = hexToRgba(a.color, 0.03 + (1 - r / fieldRadius) * 0.05);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        // Center
        const pulse = 1 + Math.sin(time / 800) * 0.3;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 6 * pulse, 0, Math.PI * 2);
        const hexToRgba = (hex, alpha)=>{
            const rr = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${rr}, ${g}, ${b}, ${alpha})`;
        };
        ctx.fillStyle = hexToRgba(a.color, 0.6);
        ctx.fill();
        ctx.font = "10px 'Geist Mono', monospace";
        ctx.fillStyle = hexToRgba(a.color, 0.8);
        ctx.textAlign = "center";
        ctx.fillText(a.label, a.x, a.y - 14);
        ctx.font = "8px 'Geist Mono', monospace";
        ctx.fillStyle = hexToRgba(a.color, 0.5);
        ctx.fillText(`STR: ${(a.strength * 100).toFixed(0)}%`, a.x, a.y + 20);
    });
    // Particle dynamics with attractor forces
    particles.forEach((p, i)=>{
        attractors.forEach((a)=>{
            const dx = a.x - p.x;
            const dy = a.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 10) {
                const isSafeHaven = p.clusterId <= 1;
                const force = isSafeHaven ? a.strength * 0.3 / dist : -a.strength * 0.1 / dist;
                p.vx += dx / dist * force;
                p.vy += dy / dist * force;
            }
        });
        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        // Noise
        p.vx += (Math.random() - 0.5) * 0.2 * (gtiScore / 50);
        p.vy += (Math.random() - 0.5) * 0.2 * (gtiScore / 50);
        p.x += p.vx;
        p.y += p.vy;
        // Boundaries
        if (p.x < 20) {
            p.x = 20;
            p.vx *= -0.5;
        }
        if (p.x > w - 20) {
            p.x = w - 20;
            p.vx *= -0.5;
        }
        if (p.y < 20) {
            p.y = 20;
            p.vy *= -0.5;
        }
        if (p.y > h - 20) {
            p.y = h - 20;
            p.vy *= -0.5;
        }
        const hexToRgba2 = (hex, alpha)=>{
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        // Trail
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, hexToRgba2(p.color, 0.15));
        glow.addColorStop(1, hexToRgba2(p.color, 0));
        ctx.fillStyle = glow;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + Math.sin(time / 400 + i) * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba2(p.color, p.alpha);
        ctx.fill();
        // Label
        ctx.font = "7px 'Geist Mono', monospace";
        ctx.fillStyle = hexToRgba2(p.color, 0.5);
        ctx.textAlign = "center";
        ctx.fillText(p.label, p.x, p.y - p.size - 4);
    });
    // HUD
    ctx.font = "9px 'Geist Mono', monospace";
    ctx.fillStyle = "rgba(0, 229, 255, 0.3)";
    ctx.textAlign = "left";
    ctx.fillText("MARKET ATTRACTOR MODE", 12, 20);
    ctx.fillText(`ATTRACTORS: ${attractors.length}`, 12, 32);
    ctx.fillText(`STRESS: ${gtiScore.toFixed(1)}%`, 12, 44);
}
// ─── Init Particles ──────────────────────────────────────────────
function initParticles(w, h) {
    const assets = [
        {
            label: "XAU",
            color: "#f59e0b",
            cluster: 0
        },
        {
            label: "SPX",
            color: "#ef4444",
            cluster: 1
        },
        {
            label: "CL",
            color: "#f59e0b",
            cluster: 2
        },
        {
            label: "EUR",
            color: "#0ea5e9",
            cluster: 1
        },
        {
            label: "BTC",
            color: "#00e5ff",
            cluster: 2
        },
        {
            label: "TNX",
            color: "#22c55e",
            cluster: 0
        },
        {
            label: "NKY",
            color: "#ef4444",
            cluster: 1
        },
        {
            label: "NG",
            color: "#f59e0b",
            cluster: 2
        },
        {
            label: "DXY",
            color: "#22c55e",
            cluster: 0
        },
        {
            label: "VIX",
            color: "#ef4444",
            cluster: 2
        },
        {
            label: "GBP",
            color: "#0ea5e9",
            cluster: 1
        },
        {
            label: "SLV",
            color: "#f59e0b",
            cluster: 0
        },
        {
            label: "ETH",
            color: "#00e5ff",
            cluster: 2
        },
        {
            label: "DAX",
            color: "#ef4444",
            cluster: 1
        },
        {
            label: "SOY",
            color: "#22c55e",
            cluster: 2
        },
        {
            label: "CU",
            color: "#f59e0b",
            cluster: 2
        }
    ];
    return assets.map((a)=>({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: 3 + Math.random() * 3,
            color: a.color,
            alpha: 0.6 + Math.random() * 0.4,
            label: a.label,
            clusterId: a.cluster,
            stress: Math.random(),
            baseX: Math.random() * w,
            baseY: Math.random() * h
        }));
}
function CenterVisualization({ mode, points, arcs, gtiScore, onPointHover, onPointClick }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rotationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoveredPointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tooltip, setTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const resizeCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CenterVisualization.useCallback[resizeCanvas]": ()=>{
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(rect.width, rect.height);
            }
        }
    }["CenterVisualization.useCallback[resizeCanvas]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CenterVisualization.useEffect": ()=>{
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            return ({
                "CenterVisualization.useEffect": ()=>window.removeEventListener("resize", resizeCanvas)
            })["CenterVisualization.useEffect"];
        }
    }["CenterVisualization.useEffect"], [
        resizeCanvas
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CenterVisualization.useEffect": ()=>{
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const animate = {
                "CenterVisualization.useEffect.animate": ()=>{
                    const dpr = window.devicePixelRatio || 1;
                    const w = canvas.width / dpr;
                    const h = canvas.height / dpr;
                    if (mode === "globe") {
                        rotationRef.current += 0.15;
                        drawGlobe(ctx, w, h, rotationRef.current, points, arcs, gtiScore, hoveredPointRef.current, mouseRef.current);
                    } else if (mode === "quantum") {
                        drawQuantumField(ctx, w, h, particlesRef.current, gtiScore, Date.now());
                    } else {
                        drawAttractorMode(ctx, w, h, particlesRef.current, gtiScore, Date.now());
                    }
                    animFrameRef.current = requestAnimationFrame(animate);
                }
            }["CenterVisualization.useEffect.animate"];
            animate();
            return ({
                "CenterVisualization.useEffect": ()=>cancelAnimationFrame(animFrameRef.current)
            })["CenterVisualization.useEffect"];
        }
    }["CenterVisualization.useEffect"], [
        mode,
        points,
        arcs,
        gtiScore
    ]);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CenterVisualization.useCallback[handleMouseMove]": (e)=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mouseRef.current = {
                x,
                y
            };
            if (mode === "globe") {
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const radius = Math.min(rect.width, rect.height) * 0.35;
                let closestPoint = null;
                let closestDist = Infinity;
                points.forEach({
                    "CenterVisualization.useCallback[handleMouseMove]": (point)=>{
                        const pos = latLngToScreen(point.lat, point.lng, cx, cy, radius, rotationRef.current);
                        if (!pos.visible) return;
                        const dx = x - pos.x;
                        const dy = y - pos.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 20 && dist < closestDist) {
                            closestDist = dist;
                            closestPoint = point;
                        }
                    }
                }["CenterVisualization.useCallback[handleMouseMove]"]);
                hoveredPointRef.current = closestPoint;
                onPointHover(closestPoint);
                if (closestPoint) {
                    const pos = latLngToScreen(closestPoint.lat, closestPoint.lng, cx, cy, radius, rotationRef.current);
                    setTooltip({
                        x: pos.x + rect.left,
                        y: pos.y + rect.top,
                        point: closestPoint
                    });
                    canvas.style.cursor = "pointer";
                } else {
                    setTooltip(null);
                    canvas.style.cursor = "crosshair";
                }
            } else {
                canvas.style.cursor = "crosshair";
            }
        }
    }["CenterVisualization.useCallback[handleMouseMove]"], [
        mode,
        points,
        onPointHover
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CenterVisualization.useCallback[handleClick]": ()=>{
            if (hoveredPointRef.current) {
                onPointClick(hoveredPointRef.current);
            }
        }
    }["CenterVisualization.useCallback[handleClick]"], [
        onPointClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: `relative flex-1 overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`,
        style: {
            background: "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 70%)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 w-full h-full",
                onMouseMove: handleMouseMove,
                onClick: handleClick,
                onMouseLeave: ()=>{
                    mouseRef.current = null;
                    hoveredPointRef.current = null;
                    setTooltip(null);
                    onPointHover(null);
                }
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                lineNumber: 704,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.05)_2px,rgba(0,229,255,0.05)_4px)]"
                }, void 0, false, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                    lineNumber: 719,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                lineNumber: 718,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsFullscreen(!isFullscreen),
                className: "absolute top-3 right-3 z-10 p-1.5 rounded-sm bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": isFullscreen ? "Exit fullscreen" : "Enter fullscreen",
                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                    className: "h-3.5 w-3.5"
                }, void 0, false, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                    lineNumber: 728,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                    className: "h-3.5 w-3.5"
                }, void 0, false, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                    lineNumber: 728,
                    columnNumber: 65
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                lineNumber: 723,
                columnNumber: 7
            }, this),
            tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed z-50 pointer-events-none cyber-panel rounded-sm px-3 py-2 shadow-lg cyber-glow-border",
                style: {
                    left: tooltip.x + 16,
                    top: tooltip.y - 40
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-3 w-3",
                                style: {
                                    color: tooltip.point.color
                                }
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono font-semibold text-foreground",
                                children: tooltip.point.label
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                                lineNumber: 739,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                        lineNumber: 737,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 text-[9px] font-mono text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "GTI: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: tooltip.point.color
                                        },
                                        children: tooltip.point.tensionScore
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                                        lineNumber: 742,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                                lineNumber: 742,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: tooltip.point.region
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                                lineNumber: 743,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                        lineNumber: 741,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                lineNumber: 733,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-3 left-3 text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest",
                children: [
                    mode === "globe" && "Earth Pulse Active",
                    mode === "quantum" && "Quantum Field Active",
                    mode === "attractor" && "Market Attractor Active"
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
                lineNumber: 749,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/center-visualization.tsx",
        lineNumber: 699,
        columnNumber: 5
    }, this);
}
_s(CenterVisualization, "4ZCefHhzaElwe9NkU5a/pNDMap4=");
_c = CenterVisualization;
var _c;
__turbopack_context__.k.register(_c, "CenterVisualization");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/geotrade/frontend/components/geopulse/right-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RightPanel",
    ()=>RightPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/arrow-down-right.js [app-client] (ecmascript) <export default as ArrowDownRight>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SignalBadge({ signal, size = "sm" }) {
    const config = {
        BUY: {
            color: "#22c55e",
            bg: "rgba(34, 197, 94, 0.1)",
            border: "rgba(34, 197, 94, 0.3)"
        },
        SELL: {
            color: "#ef4444",
            bg: "rgba(239, 68, 68, 0.1)",
            border: "rgba(239, 68, 68, 0.3)"
        },
        HOLD: {
            color: "#f59e0b",
            bg: "rgba(245, 158, 11, 0.1)",
            border: "rgba(245, 158, 11, 0.3)"
        }
    };
    const c = config[signal];
    const sizeClass = size === "md" ? "px-2.5 py-1 text-[11px]" : "px-1.5 py-0.5 text-[9px]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center rounded-sm border font-mono font-bold uppercase tracking-wider ${sizeClass}`,
        style: {
            color: c.color,
            backgroundColor: c.bg,
            borderColor: c.border
        },
        children: signal
    }, void 0, false, {
        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = SignalBadge;
function ConfidenceBar({ confidence, uncertainty }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-[9px] font-mono",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: "Confidence"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-foreground tabular-nums",
                        children: [
                            confidence,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-1.5 rounded-full bg-secondary/80 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 left-0 rounded-full bg-[#00e5ff] transition-all duration-500",
                        style: {
                            width: `${confidence}%`,
                            boxShadow: "0 0 6px rgba(0, 229, 255, 0.3)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 rounded-full bg-[#f59e0b]/20",
                        style: {
                            left: `${Math.max(0, confidence - uncertainty)}%`,
                            width: `${uncertainty * 2}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-[8px] font-mono text-muted-foreground/60",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Uncertainty: ",
                            uncertainty,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: confidence >= 70 ? "text-[#22c55e]" : confidence >= 50 ? "text-[#f59e0b]" : "text-[#ef4444]",
                        children: confidence >= 70 ? "High Signal" : confidence >= 50 ? "Moderate" : "Low Signal"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c1 = ConfidenceBar;
function formatPrice(price) {
    if (price >= 1000) {
        const [intPart, decPart] = price.toFixed(2).split(".");
        const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formatted}.${decPart}`;
    }
    return price.toFixed(price >= 100 ? 2 : 4);
}
function AssetCard({ asset, isSelected, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full text-left p-2.5 rounded-sm border transition-all duration-200 ${isSelected ? "border-[#00e5ff]/30 bg-[#00e5ff]/5 shadow-[0_0_10px_rgba(0,229,255,0.05)]" : "border-border/30 bg-secondary/20 hover:border-border/60 hover:bg-secondary/30"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-mono font-semibold text-foreground",
                                children: asset.ticker
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignalBadge, {
                                signal: asset.signal
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-[10px] font-mono tabular-nums flex items-center gap-0.5 ${asset.change24h >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`,
                        children: [
                            asset.change24h >= 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 108,
                                columnNumber: 35
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__["ArrowDownRight"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 108,
                                columnNumber: 74
                            }, this),
                            asset.change24h >= 0 ? "+" : "",
                            asset.change24h.toFixed(2),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-mono text-muted-foreground",
                        children: asset.name
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-mono text-foreground/80 tabular-nums",
                        children: formatPrice(asset.price)
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 h-0.5 rounded-full bg-secondary/60 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-all",
                    style: {
                        width: `${asset.confidence}%`,
                        background: asset.signal === "BUY" ? "#22c55e" : asset.signal === "SELL" ? "#ef4444" : "#f59e0b",
                        opacity: 0.6
                    }
                }, void 0, false, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_c2 = AssetCard;
function AssetDetail({ asset }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 p-3 rounded-sm border border-[#00e5ff]/10 bg-[#00e5ff]/[0.02]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-mono font-bold text-foreground",
                                        children: asset.ticker
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignalBadge, {
                                        signal: asset.signal,
                                        size: "md"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono text-muted-foreground",
                                children: [
                                    asset.name,
                                    " / ",
                                    asset.assetClass
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-mono font-bold text-foreground tabular-nums",
                                children: formatPrice(asset.price)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[10px] font-mono tabular-nums ${asset.change24h >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`,
                                children: [
                                    asset.change24h >= 0 ? "+" : "",
                                    asset.change24h.toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfidenceBar, {
                confidence: asset.confidence,
                uncertainty: asset.uncertainty
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                className: "h-3 w-3 text-[#00e5ff]"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-mono text-[#00e5ff] uppercase tracking-wider",
                                children: "AI Analysis"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-mono text-muted-foreground leading-relaxed",
                        children: asset.explanation
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-3 w-3 text-[#f59e0b]"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-mono text-[#f59e0b] uppercase tracking-wider",
                                children: "Risk Factors"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-0.5",
                        children: asset.riskFactors.map((risk, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-1.5 text-[9px] font-mono text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#f59e0b]/50 mt-0.5",
                                        children: '>'
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: risk
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider",
                        children: "Correlated"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 mt-1",
                        children: asset.correlatedAssets.map((ticker)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-1.5 py-0.5 rounded-sm bg-secondary/50 border border-border/30 text-[8px] font-mono text-muted-foreground",
                                children: ticker
                            }, ticker, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c3 = AssetDetail;
function PortfolioStress({ portfolio }) {
    const totalStress = portfolio.reduce((sum, a)=>sum + a.stressImpact * (a.allocation / 100), 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-mono text-muted-foreground uppercase tracking-wider",
                        children: "Net Stress Impact"
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-mono font-bold tabular-nums ${totalStress >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`,
                        children: [
                            totalStress >= 0 ? "+" : "",
                            totalStress.toFixed(2),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: portfolio.map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-8 text-[9px] font-mono text-muted-foreground",
                                children: asset.ticker
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-1 rounded-full bg-secondary/60 overflow-hidden relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-y-0 left-0 rounded-full bg-[#0ea5e9]/30",
                                        style: {
                                            width: `${asset.allocation}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `absolute inset-y-0 rounded-full ${asset.stressImpact >= 0 ? "bg-[#22c55e]" : "bg-[#ef4444]"}`,
                                        style: {
                                            left: asset.stressImpact >= 0 ? `${asset.allocation}%` : `${asset.allocation + asset.stressImpact}%`,
                                            width: `${Math.abs(asset.stressImpact)}%`,
                                            opacity: 0.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 w-20 justify-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[8px] font-mono text-muted-foreground/60 tabular-nums",
                                        children: [
                                            asset.allocation,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[9px] font-mono font-semibold tabular-nums ${asset.stressImpact >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`,
                                        children: [
                                            asset.stressImpact >= 0 ? "+" : "",
                                            asset.stressImpact.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this)
                        ]
                    }, asset.ticker, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
_c4 = PortfolioStress;
function RightPanel({ signals, portfolio, selectedAsset, onSelectAsset }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("signals");
    const [signalsExpanded, setSignalsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-80 cyber-panel border-l border-[var(--panel-border)] flex flex-col overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00e5ff]/20"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00e5ff]/20"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex border-b border-[var(--panel-border)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("signals"),
                        className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all ${activeTab === "signals" ? "text-[#00e5ff] border-b border-[#00e5ff] bg-[#00e5ff]/5" : "text-muted-foreground hover:text-foreground"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            "Signals"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("portfolio"),
                        className: `flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-all ${activeTab === "portfolio" ? "text-[#00e5ff] border-b border-[#00e5ff] bg-[#00e5ff]/5" : "text-muted-foreground hover:text-foreground"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            "Portfolio"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto",
                children: activeTab === "signals" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 space-y-3",
                    children: [
                        selectedAsset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetDetail, {
                            asset: selectedAsset
                        }, void 0, false, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 285,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSignalsExpanded(!signalsExpanded),
                                    className: "flex items-center justify-between w-full py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 19
                                                }, this),
                                                "All Signals (",
                                                signals.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this),
                                        signalsExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 298,
                                            columnNumber: 36
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 298,
                                            columnNumber: 74
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                signalsExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5 mt-1",
                                    children: signals.map((signal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssetCard, {
                                            asset: signal,
                                            isSelected: selectedAsset?.id === signal.id,
                                            onClick: ()=>onSelectAsset(signal)
                                        }, signal.id, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 304,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                    lineNumber: 302,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                    lineNumber: 282,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            className: "h-3.5 w-3.5 text-[#00e5ff]"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-mono text-[#00e5ff] uppercase tracking-wider",
                                            children: "Stress Test Results"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 321,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-[9px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                            lineNumber: 326,
                                            columnNumber: 17
                                        }, this),
                                        "Export"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PortfolioStress, {
                            portfolio: portfolio
                        }, void 0, false, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 331,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 pt-2 border-t border-border/30",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider",
                                    children: "Position Detail"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this),
                                portfolio.map((asset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 rounded-sm border border-border/20 bg-secondary/10 hover:bg-secondary/20 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-mono font-semibold text-foreground",
                                                                children: asset.ticker
                                                            }, void 0, false, {
                                                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignalBadge, {
                                                                signal: asset.signal
                                                            }, void 0, false, {
                                                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[10px] font-mono font-semibold tabular-nums ${asset.stressImpact >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`,
                                                        children: [
                                                            asset.stressImpact >= 0 ? "+" : "",
                                                            asset.stressImpact.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                lineNumber: 343,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-[8px] font-mono text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: asset.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Alloc: ",
                                                            asset.allocation,
                                                            "% / Exp: ",
                                                            asset.exposure,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                                lineNumber: 353,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, asset.ticker, true, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 334,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                    lineNumber: 316,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border-t border-[var(--panel-border)] bg-[var(--card)]/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "AI Model: GPT-Quant v4.2"
                        }, void 0, false, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 367,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                                    lineNumber: 369,
                                    columnNumber: 13
                                }, this),
                                "Processing"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                            lineNumber: 368,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
                lineNumber: 365,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/right-panel.tsx",
        lineNumber: 251,
        columnNumber: 5
    }, this);
}
_s(RightPanel, "uX2cAR9B4Kl587EeZH9eUTtqbYI=");
_c5 = RightPanel;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "SignalBadge");
__turbopack_context__.k.register(_c1, "ConfidenceBar");
__turbopack_context__.k.register(_c2, "AssetCard");
__turbopack_context__.k.register(_c3, "AssetDetail");
__turbopack_context__.k.register(_c4, "PortfolioStress");
__turbopack_context__.k.register(_c5, "RightPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomTimeline",
    ()=>BottomTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOctagon$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/octagon-alert.js [app-client] (ecmascript) <export default as AlertOctagon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/lucide-react@0.564.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function SeverityIcon({ severity }) {
    switch(severity){
        case "critical":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOctagon$3e$__["AlertOctagon"], {
                className: "h-3 w-3 text-[#ef4444]"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 26,
                columnNumber: 14
            }, this);
        case "high":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                className: "h-3 w-3 text-[#f59e0b]"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 28,
                columnNumber: 14
            }, this);
        case "medium":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                className: "h-3 w-3 text-[#0ea5e9]"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 30,
                columnNumber: 14
            }, this);
        case "low":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                className: "h-3 w-3 text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 32,
                columnNumber: 14
            }, this);
    }
}
_c = SeverityIcon;
function getSeverityColor(severity) {
    switch(severity){
        case "critical":
            return "#ef4444";
        case "high":
            return "#f59e0b";
        case "medium":
            return "#0ea5e9";
        case "low":
            return "#64748b";
    }
}
function MiniSparkline({ data, width = 200, height = 32 }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MiniSparkline.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);
            if (data.length < 2) return;
            const values = data.map({
                "MiniSparkline.useEffect.values": (d)=>d.value
            }["MiniSparkline.useEffect.values"]);
            const min = Math.min(...values) - 2;
            const max = Math.max(...values) + 2;
            const range = max - min;
            // Draw area
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, "rgba(0, 229, 255, 0.1)");
            gradient.addColorStop(1, "rgba(0, 229, 255, 0)");
            ctx.beginPath();
            ctx.moveTo(0, height);
            data.forEach({
                "MiniSparkline.useEffect": (d, i)=>{
                    const x = i / (data.length - 1) * width;
                    const y = height - (d.value - min) / range * height;
                    if (i === 0) ctx.lineTo(x, y);
                    else ctx.lineTo(x, y);
                }
            }["MiniSparkline.useEffect"]);
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
            // Draw line
            ctx.beginPath();
            data.forEach({
                "MiniSparkline.useEffect": (d, i)=>{
                    const x = i / (data.length - 1) * width;
                    const y = height - (d.value - min) / range * height;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
            }["MiniSparkline.useEffect"]);
            ctx.strokeStyle = "#00e5ff";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // End dot
            const lastVal = values[values.length - 1];
            const lastX = width;
            const lastY = height - (lastVal - min) / range * height;
            ctx.beginPath();
            ctx.arc(lastX - 1, lastY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#00e5ff";
            ctx.fill();
            // Glow on end
            const glow = ctx.createRadialGradient(lastX - 1, lastY, 0, lastX - 1, lastY, 8);
            glow.addColorStop(0, "rgba(0, 229, 255, 0.3)");
            glow.addColorStop(1, "rgba(0, 229, 255, 0)");
            ctx.fillStyle = glow;
            ctx.fillRect(lastX - 9, lastY - 8, 16, 16);
        }
    }["MiniSparkline.useEffect"], [
        data,
        width,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef
    }, void 0, false, {
        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
        lineNumber: 124,
        columnNumber: 10
    }, this);
}
_s(MiniSparkline, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c1 = MiniSparkline;
function EventMarker({ event, onClick, isSelected }) {
    const color = getSeverityColor(event.severity);
    const time = new Date(event.timestamp);
    const hours = String(time.getUTCHours()).padStart(2, "0");
    const minutes = String(time.getUTCMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `relative flex-shrink-0 w-44 p-2 rounded-sm border transition-all duration-200 group ${isSelected ? "border-[var(--color)] bg-[var(--color-bg)]" : "border-border/30 bg-secondary/10 hover:border-border/60 hover:bg-secondary/20"}`,
        style: {
            "--color": color,
            "--color-bg": `${color}10`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 w-0.5 h-full rounded-l-sm",
                style: {
                    background: color,
                    opacity: isSelected ? 1 : 0.5
                }
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-1.5 pl-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SeverityIcon, {
                        severity: event.severity
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] font-mono text-foreground/90 line-clamp-1 text-left",
                                children: event.title
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[8px] font-mono text-muted-foreground tabular-nums",
                                        children: timeStr
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[7px] font-mono uppercase tracking-wider px-1 py-px rounded-sm border",
                                        style: {
                                            color,
                                            borderColor: `${color}30`,
                                            backgroundColor: `${color}10`
                                        },
                                        children: event.severity
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-mono font-bold tabular-nums",
                        style: {
                            color
                        },
                        children: event.impact
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_c2 = EventMarker;
function BottomTimeline({ events, gtiHistory, gti, onEventSelect }) {
    _s1();
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedEventId, setSelectedEventId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BottomTimeline.useCallback[scroll]": (direction)=>{
            if (!scrollRef.current) return;
            const scrollAmount = direction === "left" ? -300 : 300;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    }["BottomTimeline.useCallback[scroll]"], []);
    const handleEventClick = (event)=>{
        setSelectedEventId(event.id);
        onEventSelect(event);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "cyber-panel border-t border-[var(--panel-border)] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent"
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-stretch",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-56 flex-shrink-0 border-r border-[var(--panel-border)] px-3 py-2 flex flex-col justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-mono text-muted-foreground uppercase tracking-wider",
                                        children: "GTI 48h Trend"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-mono font-bold text-[#00e5ff] tabular-nums",
                                        children: gti.score.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniSparkline, {
                                data: gtiHistory,
                                width: 200,
                                height: 28
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mt-1 text-[7px] font-mono text-muted-foreground/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "48h ago"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Now"
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 border-r border-[var(--panel-border)] flex flex-col items-center justify-center px-2 gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsPlaying(!isPlaying),
                                className: "p-1.5 rounded-sm bg-secondary/50 border border-border/50 text-muted-foreground hover:text-[#00e5ff] transition-colors",
                                "aria-label": isPlaying ? "Pause replay" : "Play replay",
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                    lineNumber: 228,
                                    columnNumber: 26
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                    lineNumber: 228,
                                    columnNumber: 58
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scroll("left"),
                                        className: "p-1 rounded-sm bg-secondary/30 border border-border/30 text-muted-foreground hover:text-foreground transition-colors",
                                        "aria-label": "Scroll left",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>scroll("right"),
                                        className: "p-1 rounded-sm bg-secondary/30 border border-border/30 text-muted-foreground hover:text-foreground transition-colors",
                                        "aria-label": "Scroll right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$564$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-hidden relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--panel-bg)] to-transparent z-10 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--panel-bg)] to-transparent z-10 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollRef,
                                className: "flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide",
                                style: {
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none"
                                },
                                children: events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventMarker, {
                                        event: event,
                                        onClick: ()=>handleEventClick(event),
                                        isSelected: selectedEventId === event.id
                                    }, event.id, false, {
                                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 border-l border-[var(--panel-border)] px-3 flex flex-col items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-mono font-bold text-foreground tabular-nums",
                                children: events.length
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[7px] font-mono text-muted-foreground uppercase tracking-wider",
                                children: "Events"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[7px] font-mono text-[#ef4444] uppercase tracking-wider mt-0.5",
                                children: [
                                    events.filter((e)=>e.severity === "critical").length,
                                    " Critical"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx",
        lineNumber: 203,
        columnNumber: 5
    }, this);
}
_s1(BottomTimeline, "Uc7C5xWt0fQH1n6QHVvseglEPzI=");
_c3 = BottomTimeline;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SeverityIcon");
__turbopack_context__.k.register(_c1, "MiniSparkline");
__turbopack_context__.k.register(_c2, "EventMarker");
__turbopack_context__.k.register(_c3, "BottomTimeline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/geotrade/frontend/lib/geopulse-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─── Types ────────────────────────────────────────────────────────
__turbopack_context__.s([
    "assetSignals",
    ()=>assetSignals,
    "defaultScenarioParams",
    ()=>defaultScenarioParams,
    "globeArcs",
    ()=>globeArcs,
    "globePoints",
    ()=>globePoints,
    "gtiData",
    ()=>gtiData,
    "gtiHistory",
    ()=>gtiHistory,
    "portfolioAssets",
    ()=>portfolioAssets,
    "timelineEvents",
    ()=>timelineEvents
]);
const gtiData = {
    score: 73.4,
    trend: "rising",
    delta: 2.8,
    lastUpdate: "2026-03-02T21:30:00Z",
    breakdown: [
        {
            region: "Middle East",
            score: 89.2,
            delta: 5.1
        },
        {
            region: "Asia Pacific",
            score: 78.6,
            delta: 3.2
        },
        {
            region: "Europe",
            score: 71.3,
            delta: 1.8
        },
        {
            region: "North America",
            score: 62.4,
            delta: -0.5
        },
        {
            region: "Latin America",
            score: 58.7,
            delta: 2.1
        },
        {
            region: "Africa",
            score: 55.1,
            delta: 1.4
        }
    ]
};
const assetSignals = [
    {
        id: "1",
        name: "Gold",
        ticker: "XAU/USD",
        assetClass: "Commodities",
        region: "North America",
        signal: "BUY",
        confidence: 87,
        uncertainty: 8,
        price: 2341.50,
        change24h: 1.24,
        explanation: "Safe-haven demand surging amid escalating Middle East tensions. Central bank accumulation at 12-month high. Technical breakout above key resistance at $2,300.",
        riskFactors: [
            "Sudden de-escalation",
            "USD strength reversal",
            "Margin calls forcing liquidation"
        ],
        correlatedAssets: [
            "SLV",
            "GDX",
            "TLT"
        ]
    },
    {
        id: "2",
        name: "S&P 500",
        ticker: "SPX",
        assetClass: "Equities",
        region: "North America",
        signal: "SELL",
        confidence: 72,
        uncertainty: 18,
        price: 5124.30,
        change24h: -0.87,
        explanation: "Risk-off sentiment accelerating. VIX approaching 25 threshold. Sector rotation into defensives. Earnings guidance weakening across tech sector.",
        riskFactors: [
            "Fed intervention",
            "Ceasefire announcement",
            "Momentum reversal"
        ],
        correlatedAssets: [
            "QQQ",
            "IWM",
            "VIX"
        ]
    },
    {
        id: "3",
        name: "Crude Oil",
        ticker: "CL=F",
        assetClass: "Commodities",
        region: "Middle East",
        signal: "BUY",
        confidence: 81,
        uncertainty: 14,
        price: 87.42,
        change24h: 2.31,
        explanation: "Supply disruption fears from Strait of Hormuz tensions. OPEC+ maintaining cuts. Strategic petroleum reserves at multi-year lows globally.",
        riskFactors: [
            "Demand destruction",
            "SPR release",
            "Production surge"
        ],
        correlatedAssets: [
            "XLE",
            "BNO",
            "USO"
        ]
    },
    {
        id: "4",
        name: "EUR/USD",
        ticker: "EUR/USD",
        assetClass: "Forex",
        region: "Europe",
        signal: "HOLD",
        confidence: 54,
        uncertainty: 31,
        price: 1.0723,
        change24h: -0.12,
        explanation: "ECB-Fed policy divergence creating cross-currents. European energy vulnerability offset by improving trade balance. Range-bound until next catalyst.",
        riskFactors: [
            "ECB surprise cut",
            "Energy crisis escalation",
            "Political instability"
        ],
        correlatedAssets: [
            "DXY",
            "GBP/USD",
            "EUR/CHF"
        ]
    },
    {
        id: "5",
        name: "Bitcoin",
        ticker: "BTC/USD",
        assetClass: "Crypto",
        region: "North America",
        signal: "HOLD",
        confidence: 58,
        uncertainty: 28,
        price: 67842.00,
        change24h: -1.54,
        explanation: "Institutional flows slowing post-ETF euphoria. Macro uncertainty creating vol compression. Hash rate stable, on-chain metrics neutral.",
        riskFactors: [
            "Regulatory crackdown",
            "Exchange solvency event",
            "Whale distribution"
        ],
        correlatedAssets: [
            "ETH/USD",
            "SOL/USD",
            "MSTR"
        ]
    },
    {
        id: "6",
        name: "10Y Treasury",
        ticker: "TNX",
        assetClass: "Bonds",
        region: "North America",
        signal: "BUY",
        confidence: 76,
        uncertainty: 12,
        price: 4.31,
        change24h: -0.04,
        explanation: "Flight-to-quality driving yields lower. Market pricing in rate cuts. Duration risk decreasing as peak rates appear established.",
        riskFactors: [
            "Inflation surprise",
            "Fiscal deficit expansion",
            "Foreign selling"
        ],
        correlatedAssets: [
            "TLT",
            "IEF",
            "AGG"
        ]
    },
    {
        id: "7",
        name: "Nikkei 225",
        ticker: "NKY",
        assetClass: "Equities",
        region: "Asia Pacific",
        signal: "SELL",
        confidence: 68,
        uncertainty: 22,
        price: 38472.00,
        change24h: -1.92,
        explanation: "Yen carry trade unwinding risk elevated. China spillover concerns. BOJ normalization path creating uncertainty for export-heavy components.",
        riskFactors: [
            "BOJ reversal",
            "Yen weakening",
            "China stimulus"
        ],
        correlatedAssets: [
            "EWJ",
            "USD/JPY",
            "TOPIX"
        ]
    },
    {
        id: "8",
        name: "Natural Gas",
        ticker: "NG=F",
        assetClass: "Commodities",
        region: "Europe",
        signal: "BUY",
        confidence: 74,
        uncertainty: 16,
        price: 3.42,
        change24h: 3.87,
        explanation: "European storage drawdowns accelerating. LNG shipping constraints. Winter demand forecast above 5-year average.",
        riskFactors: [
            "Mild weather",
            "Renewable output surge",
            "Demand destruction"
        ],
        correlatedAssets: [
            "UNG",
            "BOIL",
            "XLE"
        ]
    }
];
const timelineEvents = [
    {
        id: "1",
        timestamp: "2026-03-02T08:00:00Z",
        title: "Strait of Hormuz Naval Buildup",
        severity: "critical",
        region: "Middle East",
        impact: 92,
        description: "Multiple carrier groups repositioning near strategic chokepoint"
    },
    {
        id: "2",
        timestamp: "2026-03-02T06:30:00Z",
        title: "ECB Emergency Rate Meeting Called",
        severity: "high",
        region: "Europe",
        impact: 78,
        description: "Unscheduled meeting amid sovereign spread widening"
    },
    {
        id: "3",
        timestamp: "2026-03-02T04:15:00Z",
        title: "Taiwan Strait Aerial Incursions",
        severity: "high",
        region: "Asia Pacific",
        impact: 85,
        description: "Record number of military aircraft detected in ADIZ"
    },
    {
        id: "4",
        timestamp: "2026-03-01T22:00:00Z",
        title: "US Fed Emergency Liquidity Facility",
        severity: "high",
        region: "North America",
        impact: 71,
        description: "New backstop facility for systemically important institutions"
    },
    {
        id: "5",
        timestamp: "2026-03-01T18:45:00Z",
        title: "OPEC+ Emergency Production Cut",
        severity: "medium",
        region: "Middle East",
        impact: 65,
        description: "Additional 500k bbl/day cut announced"
    },
    {
        id: "6",
        timestamp: "2026-03-01T14:20:00Z",
        title: "Rare Earth Export Restrictions",
        severity: "medium",
        region: "Asia Pacific",
        impact: 58,
        description: "New export controls on critical minerals for semiconductor manufacturing"
    },
    {
        id: "7",
        timestamp: "2026-03-01T10:00:00Z",
        title: "EU Energy Emergency Protocol",
        severity: "medium",
        region: "Europe",
        impact: 52,
        description: "Stage 2 energy emergency activated across member states"
    },
    {
        id: "8",
        timestamp: "2026-03-01T06:30:00Z",
        title: "Cyber Attack on SWIFT Network",
        severity: "critical",
        region: "North America",
        impact: 88,
        description: "Coordinated DDoS attack causing intermittent settlement delays"
    },
    {
        id: "9",
        timestamp: "2026-02-28T20:00:00Z",
        title: "Latin America Debt Crisis Contagion",
        severity: "low",
        region: "Latin America",
        impact: 42,
        description: "Credit default swaps widening across EM sovereign debt"
    },
    {
        id: "10",
        timestamp: "2026-02-28T15:00:00Z",
        title: "African Union Trade Pact Collapse",
        severity: "low",
        region: "Africa",
        impact: 35,
        description: "Key continental trade agreement ratification stalled"
    }
];
const defaultScenarioParams = {
    oilPriceShock: 0,
    interestRateChange: 0,
    geopoliticalEscalation: 50,
    supplyChainDisruption: 30,
    cyberThreatLevel: 40
};
const portfolioAssets = [
    {
        ticker: "SPY",
        name: "S&P 500 ETF",
        allocation: 30,
        exposure: 28.5,
        stressImpact: -12.4,
        signal: "SELL"
    },
    {
        ticker: "TLT",
        name: "20+ Year Treasury",
        allocation: 20,
        exposure: 19.8,
        stressImpact: 4.2,
        signal: "BUY"
    },
    {
        ticker: "GLD",
        name: "Gold ETF",
        allocation: 15,
        exposure: 16.2,
        stressImpact: 8.7,
        signal: "BUY"
    },
    {
        ticker: "EEM",
        name: "Emerging Markets",
        allocation: 10,
        exposure: 8.9,
        stressImpact: -18.3,
        signal: "SELL"
    },
    {
        ticker: "USO",
        name: "Oil Fund",
        allocation: 10,
        exposure: 11.4,
        stressImpact: 15.6,
        signal: "BUY"
    },
    {
        ticker: "BTC",
        name: "Bitcoin",
        allocation: 8,
        exposure: 9.1,
        stressImpact: -7.2,
        signal: "HOLD"
    },
    {
        ticker: "UUP",
        name: "US Dollar Index",
        allocation: 7,
        exposure: 6.1,
        stressImpact: 3.1,
        signal: "BUY"
    }
];
const globePoints = [
    {
        lat: 38.9072,
        lng: -77.0369,
        size: 0.8,
        color: "#f59e0b",
        label: "Washington D.C.",
        region: "North America",
        tensionScore: 62
    },
    {
        lat: 51.5074,
        lng: -0.1278,
        size: 0.7,
        color: "#f59e0b",
        label: "London",
        region: "Europe",
        tensionScore: 58
    },
    {
        lat: 48.8566,
        lng: 2.3522,
        size: 0.6,
        color: "#0ea5e9",
        label: "Paris",
        region: "Europe",
        tensionScore: 45
    },
    {
        lat: 52.5200,
        lng: 13.4050,
        size: 0.6,
        color: "#0ea5e9",
        label: "Berlin",
        region: "Europe",
        tensionScore: 42
    },
    {
        lat: 35.6762,
        lng: 139.6503,
        size: 0.9,
        color: "#ef4444",
        label: "Tokyo",
        region: "Asia Pacific",
        tensionScore: 78
    },
    {
        lat: 39.9042,
        lng: 116.4074,
        size: 1.0,
        color: "#ef4444",
        label: "Beijing",
        region: "Asia Pacific",
        tensionScore: 85
    },
    {
        lat: 25.2048,
        lng: 55.2708,
        size: 0.85,
        color: "#ef4444",
        label: "Dubai",
        region: "Middle East",
        tensionScore: 82
    },
    {
        lat: 24.7136,
        lng: 46.6753,
        size: 0.9,
        color: "#ef4444",
        label: "Riyadh",
        region: "Middle East",
        tensionScore: 89
    },
    {
        lat: 1.3521,
        lng: 103.8198,
        size: 0.5,
        color: "#22c55e",
        label: "Singapore",
        region: "Asia Pacific",
        tensionScore: 35
    },
    {
        lat: -23.5505,
        lng: -46.6333,
        size: 0.6,
        color: "#f59e0b",
        label: "Sao Paulo",
        region: "Latin America",
        tensionScore: 48
    },
    {
        lat: 19.4326,
        lng: -99.1332,
        size: 0.5,
        color: "#0ea5e9",
        label: "Mexico City",
        region: "Latin America",
        tensionScore: 38
    },
    {
        lat: 55.7558,
        lng: 37.6173,
        size: 0.95,
        color: "#ef4444",
        label: "Moscow",
        region: "Europe",
        tensionScore: 91
    },
    {
        lat: 28.6139,
        lng: 77.2090,
        size: 0.7,
        color: "#f59e0b",
        label: "New Delhi",
        region: "Asia Pacific",
        tensionScore: 55
    },
    {
        lat: -33.8688,
        lng: 151.2093,
        size: 0.4,
        color: "#22c55e",
        label: "Sydney",
        region: "Asia Pacific",
        tensionScore: 28
    },
    {
        lat: 25.0340,
        lng: 121.5645,
        size: 0.95,
        color: "#ef4444",
        label: "Taipei",
        region: "Asia Pacific",
        tensionScore: 88
    },
    {
        lat: 37.5665,
        lng: 126.9780,
        size: 0.7,
        color: "#f59e0b",
        label: "Seoul",
        region: "Asia Pacific",
        tensionScore: 65
    }
];
const globeArcs = [
    {
        startLat: 38.9072,
        startLng: -77.0369,
        endLat: 51.5074,
        endLng: -0.1278,
        color: "#00e5ff",
        label: "US-UK Intel",
        intensity: 0.8
    },
    {
        startLat: 39.9042,
        startLng: 116.4074,
        endLat: 25.0340,
        endLng: 121.5645,
        color: "#ef4444",
        label: "PRC-Taiwan",
        intensity: 1.0
    },
    {
        startLat: 24.7136,
        startLng: 46.6753,
        endLat: 55.7558,
        endLng: 37.6173,
        color: "#f59e0b",
        label: "OPEC Corridor",
        intensity: 0.7
    },
    {
        startLat: 35.6762,
        startLng: 139.6503,
        endLat: 38.9072,
        endLng: -77.0369,
        color: "#0ea5e9",
        label: "Pacific Trade",
        intensity: 0.6
    },
    {
        startLat: 51.5074,
        startLng: -0.1278,
        endLat: 25.2048,
        endLng: 55.2708,
        color: "#f59e0b",
        label: "Energy Route",
        intensity: 0.85
    },
    {
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: -33.8688,
        endLng: 151.2093,
        color: "#22c55e",
        label: "APAC Trade",
        intensity: 0.4
    },
    {
        startLat: 55.7558,
        startLng: 37.6173,
        endLat: 39.9042,
        endLng: 116.4074,
        color: "#ef4444",
        label: "Sino-Russia",
        intensity: 0.9
    },
    {
        startLat: 28.6139,
        startLng: 77.2090,
        endLat: 24.7136,
        endLng: 46.6753,
        color: "#f59e0b",
        label: "Energy Import",
        intensity: 0.65
    }
];
const gtiHistory = Array.from({
    length: 48
}, (_, i)=>{
    // Deterministic pseudo-random based on index
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const pseudoRandom = seed - Math.floor(seed);
    return {
        time: `${48 - i}h`,
        value: 55 + Math.sin(i / 4) * 10 + pseudoRandom * 8 + (i > 30 ? (i - 30) * 0.8 : 0)
    };
}).reverse();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/geotrade/frontend/components/geopulse/dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeopulseDashboard",
    ()=>GeopulseDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$top$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/components/geopulse/top-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$left$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/components/geopulse/left-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$center$2d$visualization$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/components/geopulse/center-visualization.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$right$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/components/geopulse/right-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$bottom$2d$timeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/components/geopulse/bottom-timeline.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/geotrade/frontend/lib/geopulse-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || "http://localhost:8000/api/v1";
const COUNTRY_COORDS = {
    // Middle East
    "ISR": {
        lat: 31.0461,
        lng: 34.8516,
        region: "Middle East"
    },
    "IRN": {
        lat: 32.4279,
        lng: 53.6880,
        region: "Middle East"
    },
    "SAU": {
        lat: 23.8859,
        lng: 45.0792,
        region: "Middle East"
    },
    "ARE": {
        lat: 24.4539,
        lng: 54.3773,
        region: "Middle East"
    },
    "EGY": {
        lat: 26.8206,
        lng: 30.8025,
        region: "Middle East"
    },
    "IRQ": {
        lat: 33.2232,
        lng: 43.6793,
        region: "Middle East"
    },
    "SYR": {
        lat: 34.8021,
        lng: 38.9968,
        region: "Middle East"
    },
    "YEM": {
        lat: 15.5527,
        lng: 48.5164,
        region: "Middle East"
    },
    "QAT": {
        lat: 25.3548,
        lng: 51.1839,
        region: "Middle East"
    },
    // Europe
    "GBR": {
        lat: 55.3781,
        lng: -3.4360,
        region: "Europe"
    },
    "FRA": {
        lat: 46.2276,
        lng: 2.2137,
        region: "Europe"
    },
    "DEU": {
        lat: 51.1657,
        lng: 10.4515,
        region: "Europe"
    },
    "ITA": {
        lat: 41.8719,
        lng: 12.5674,
        region: "Europe"
    },
    "ESP": {
        lat: 40.4637,
        lng: -3.7492,
        region: "Europe"
    },
    "UKR": {
        lat: 48.3794,
        lng: 31.1656,
        region: "Europe"
    },
    "RUS": {
        lat: 61.5240,
        lng: 105.3188,
        region: "Europe"
    },
    "POL": {
        lat: 51.9194,
        lng: 19.1451,
        region: "Europe"
    },
    // Asia Pacific
    "CHN": {
        lat: 35.8617,
        lng: 104.1954,
        region: "Asia Pacific"
    },
    "JPN": {
        lat: 36.2048,
        lng: 138.2529,
        region: "Asia Pacific"
    },
    "IND": {
        lat: 20.5937,
        lng: 78.9629,
        region: "Asia Pacific"
    },
    "AUS": {
        lat: -25.2744,
        lng: 133.7751,
        region: "Asia Pacific"
    },
    "KOR": {
        lat: 35.9078,
        lng: 127.7669,
        region: "Asia Pacific"
    },
    "TWN": {
        lat: 23.6978,
        lng: 120.9605,
        region: "Asia Pacific"
    },
    "VNM": {
        lat: 14.0583,
        lng: 108.2772,
        region: "Asia Pacific"
    },
    // Americas
    "USA": {
        lat: 37.0902,
        lng: -95.7129,
        region: "North America"
    },
    "CAN": {
        lat: 56.1304,
        lng: -106.3468,
        region: "North America"
    },
    "MEX": {
        lat: 23.6345,
        lng: -102.5528,
        region: "Latin America"
    },
    "BRA": {
        lat: -14.2350,
        lng: -51.9253,
        region: "Latin America"
    },
    "ARG": {
        lat: -38.4161,
        lng: -63.6167,
        region: "Latin America"
    },
    "CHL": {
        lat: -35.6751,
        lng: -71.5430,
        region: "Latin America"
    }
};
function GeopulseDashboard() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("globe");
    const [scenario, setScenario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultScenarioParams"]);
    const [selectedRegions, setSelectedRegions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAssetClasses, setSelectedAssetClasses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAsset, setSelectedAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, setHoveredPoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Real data states
    const [realGti, setRealGti] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gtiData"]);
    const [realSignals, setRealSignals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assetSignals"]);
    const [realEvents, setRealEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timelineEvents"]);
    const [realPoints, setRealPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globePoints"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeopulseDashboard.useEffect": ()=>{
            setMounted(true);
        // Fetch initial data
        // const fetchData = async () => {
        //   try {
        //     const [gtiRes, signalRes, eventRes, heatmapRes] = await Promise.all([
        //       fetch(`${API_BASE}/gti/current`),
        //       fetch(`${API_BASE}/signals/assets`),
        //       fetch(`${API_BASE}/events/timeline`),
        //       fetch(`${API_BASE}/risk/heatmap`)
        //     ]);
        //     if (gtiRes.ok) {
        //       const data = await gtiRes.json();
        //       setRealGti({
        //         score: data.gti_value,
        //         trend: data.gti_delta_1h >= 0 ? "rising" : "falling",
        //         delta: data.gti_delta_1h,
        //         lastUpdate: data.ts,
        //         breakdown: (data.top_drivers || []).map((d: any) => ({
        //           region: d.region || d.driver || "Global",
        //           score: data.gti_value * (1 + (d.contribution_weight || 0)),
        //           delta: (d.contribution_weight || 0) * 10
        //         }))
        //       });
        //     }
        //     if (signalRes.ok) {
        //       const data = await signalRes.json();
        //       const mapped = (data.signals || []).map((s: any, idx: number) => ({
        //         id: String(idx),
        //         name: s.symbol,
        //         ticker: s.symbol,
        //         assetClass: (s.sector || "Equities") as AssetClass,
        //         region: s.region as Region,
        //         signal: (s.recommendation?.toUpperCase() || "HOLD") as any,
        //         confidence: (s.confidence_score || 0) * 100,
        //         uncertainty: (s.uncertainty || 0) * 100,
        //         price: s.price || 0,
        //         change24h: (s.directional_bias || 0) * 100,
        //         explanation: s.reasoning || "No explanation available.",
        //         riskFactors: s.risk_factors || [],
        //         correlatedAssets: s.correlated_assets || []
        //       }));
        //       setRealSignals(mapped);
        //       if (mapped.length > 0) setSelectedAsset(mapped[0]);
        //     }
        //     if (eventRes.ok) {
        //       const data = await eventRes.json();
        //       setRealEvents((data.events || []).map((e: any) => ({
        //         id: String(e.id),
        //         timestamp: e.occurred_at || e.ts,
        //         title: e.title,
        //         severity: (e.severity_score > 0.8 ? "critical" : e.severity_score > 0.5 ? "high" : e.severity_score > 0.2 ? "medium" : "low") as any,
        //         region: e.region as any,
        //         impact: (e.magnitude || e.severity_score || 0) * 100,
        //         description: e.summary || e.title
        //       })));
        //     }
        //     if (heatmapRes.ok) {
        //       const data = await heatmapRes.json();
        //       setRealPoints((data.points || []).map((p: any) => {
        //         const coords = COUNTRY_COORDS[p.country_iso] || { lat: 0, lng: 0, region: "Europe" as Region };
        //         return {
        //           lat: coords.lat,
        //           lng: coords.lng,
        //           size: p.risk_score / 100,
        //           color: p.risk_score > 70 ? "#ef4444" : p.risk_score > 40 ? "#f59e0b" : "#22c55e",
        //           label: p.country_iso,
        //           region: coords.region,
        //           tensionScore: p.risk_score
        //         };
        //       }));
        //     }
        //   } catch (err) {
        //     console.error("Failed to fetch Geopulse data:", err);
        //   }
        // };
        // fetchData();
        // const interval = setInterval(fetchData, 30000); // 30s refresh
        // return () => clearInterval(interval);
        }
    }["GeopulseDashboard.useEffect"], []);
    const handleRegionToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeopulseDashboard.useCallback[handleRegionToggle]": (region)=>{
            setSelectedRegions({
                "GeopulseDashboard.useCallback[handleRegionToggle]": (prev)=>prev.includes(region) ? prev.filter({
                        "GeopulseDashboard.useCallback[handleRegionToggle]": (r)=>r !== region
                    }["GeopulseDashboard.useCallback[handleRegionToggle]"]) : [
                        ...prev,
                        region
                    ]
            }["GeopulseDashboard.useCallback[handleRegionToggle]"]);
        }
    }["GeopulseDashboard.useCallback[handleRegionToggle]"], []);
    const handleAssetClassToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeopulseDashboard.useCallback[handleAssetClassToggle]": (ac)=>{
            setSelectedAssetClasses({
                "GeopulseDashboard.useCallback[handleAssetClassToggle]": (prev)=>prev.includes(ac) ? prev.filter({
                        "GeopulseDashboard.useCallback[handleAssetClassToggle]": (a)=>a !== ac
                    }["GeopulseDashboard.useCallback[handleAssetClassToggle]"]) : [
                        ...prev,
                        ac
                    ]
            }["GeopulseDashboard.useCallback[handleAssetClassToggle]"]);
        }
    }["GeopulseDashboard.useCallback[handleAssetClassToggle]"], []);
    const handleSelectAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeopulseDashboard.useCallback[handleSelectAsset]": (asset)=>{
            setSelectedAsset(asset);
        }
    }["GeopulseDashboard.useCallback[handleSelectAsset]"], []);
    const handlePointHover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeopulseDashboard.useCallback[handlePointHover]": (point)=>{
            setHoveredPoint(point);
        }
    }["GeopulseDashboard.useCallback[handlePointHover]"], []);
    const handlePointClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeopulseDashboard.useCallback[handlePointClick]": (point)=>{
            const matchedAsset = realSignals.find({
                "GeopulseDashboard.useCallback[handlePointClick].matchedAsset": (a)=>a.region === point.region
            }["GeopulseDashboard.useCallback[handlePointClick].matchedAsset"]);
            if (matchedAsset) setSelectedAsset(matchedAsset);
        }
    }["GeopulseDashboard.useCallback[handlePointClick]"], [
        realSignals
    ]);
    const handleEventSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GeopulseDashboard.useCallback[handleEventSelect]": (event)=>{
            const matchedAsset = realSignals.find({
                "GeopulseDashboard.useCallback[handleEventSelect].matchedAsset": (a)=>a.region === event.region
            }["GeopulseDashboard.useCallback[handleEventSelect].matchedAsset"]);
            if (matchedAsset) setSelectedAsset(matchedAsset);
        }
    }["GeopulseDashboard.useCallback[handleEventSelect]"], [
        realSignals
    ]);
    const filteredSignals = realSignals.filter((signal)=>{
        if (selectedRegions.length > 0 && !selectedRegions.includes(signal.region)) return false;
        if (selectedAssetClasses.length > 0 && !selectedAssetClasses.includes(signal.assetClass)) return false;
        return true;
    });
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex items-center justify-center",
            style: {
                background: "#06080d"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center justify-center h-12 w-12 rounded-lg",
                        style: {
                            background: "rgba(0,229,255,0.1)",
                            border: "1px solid rgba(0,229,255,0.2)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-5 w-5 rounded-full animate-spin",
                            style: {
                                border: "2px solid rgba(0,229,255,0.3)",
                                borderTopColor: "#00e5ff"
                            }
                        }, void 0, false, {
                            fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-bold tracking-[0.2em] font-mono",
                                style: {
                                    color: "#e2e8f0"
                                },
                                children: "GEOPULSE"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono tracking-wider uppercase",
                                style: {
                                    color: "#64748b"
                                },
                                children: "Initializing Systems"
                            }, void 0, false, {
                                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                lineNumber: 209,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
            lineNumber: 208,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col bg-background grid-bg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 pointer-events-none z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff]/[0.03] to-transparent animate-scanline"
                }, void 0, false, {
                    fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$top$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopBar"], {
                gti: realGti,
                mode: mode,
                onModeChange: setMode
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$left$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeftPanel"], {
                        scenario: scenario,
                        onScenarioChange: setScenario,
                        selectedRegions: selectedRegions,
                        onRegionToggle: handleRegionToggle,
                        selectedAssetClasses: selectedAssetClasses,
                        onAssetClassToggle: handleAssetClassToggle
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$center$2d$visualization$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CenterVisualization"], {
                        mode: mode,
                        points: realPoints,
                        arcs: __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globeArcs"],
                        gtiScore: realGti.score,
                        onPointHover: handlePointHover,
                        onPointClick: handlePointClick
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$right$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RightPanel"], {
                        signals: filteredSignals,
                        portfolio: __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioAssets"],
                        selectedAsset: selectedAsset,
                        onSelectAsset: handleSelectAsset
                    }, void 0, false, {
                        fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$components$2f$geopulse$2f$bottom$2d$timeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BottomTimeline"], {
                events: realEvents,
                gtiHistory: __TURBOPACK__imported__module__$5b$project$5d2f$geotrade$2f$frontend$2f$lib$2f$geopulse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gtiHistory"],
                gti: realGti,
                onEventSelect: handleEventSelect
            }, void 0, false, {
                fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/geotrade/frontend/components/geopulse/dashboard.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_s(GeopulseDashboard, "35bqPZ7xby6TpUYr5lRWnE/4ocQ=");
_c = GeopulseDashboard;
var _c;
__turbopack_context__.k.register(_c, "GeopulseDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=geotrade_frontend_53a93ecf._.js.map