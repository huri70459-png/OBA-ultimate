(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Project Brain OS — Dark-Mode AI Workspace (single-page app)
// Port of workspace.html + brain_api.py UI surface, upgraded to Next.js 16 + Prisma.
// Tier-1 redesign: all chrome routes through Deep Intelligence semantic tokens.
// Enterprise phase: AuthGate wraps the workspace; the Bento Dashboard is the
// default landing tab (blueprint "Integrating into the Main Page").
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$DashboardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/DashboardView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$VaultView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/VaultView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$TimelineView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/TimelineView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$GraphView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/GraphView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ContextView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ContextView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$AuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/AuthGate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/dialogs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$SettingsDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/SettingsDialog.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
const TABS = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        id: "vault",
        label: "Vault & Markdown Editor",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        id: "timeline",
        label: "Universal Timeline",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"]
    },
    {
        id: "graph",
        label: "Decision & Knowledge Graph",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"]
    },
    {
        id: "context",
        label: "Context Injector",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"]
    }
];
const BrainWorkspacePage = ()=>{
    _s();
    const booted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[booted]": (s)=>s.booted
    }["BrainWorkspacePage.useWorkspace[booted]"]);
    const bootError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[bootError]": (s)=>s.bootError
    }["BrainWorkspacePage.useWorkspace[bootError]"]);
    const bootstrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[bootstrap]": (s)=>s.bootstrap
    }["BrainWorkspacePage.useWorkspace[bootstrap]"]);
    const openDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[openDialog]": (s)=>s.openDialog
    }["BrainWorkspacePage.useWorkspace[openDialog]"]);
    const tab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[tab]": (s)=>s.tab
    }["BrainWorkspacePage.useWorkspace[tab]"]);
    const setTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[setTab]": (s)=>s.setTab
    }["BrainWorkspacePage.useWorkspace[setTab]"]);
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "BrainWorkspacePage.useWorkspace[details]": (s)=>s.details
    }["BrainWorkspacePage.useWorkspace[details]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrainWorkspacePage.useEffect": ()=>{
            void bootstrap();
        }
    }["BrainWorkspacePage.useEffect"], [
        bootstrap
    ]);
    // Global hotkey: Alt+S opens Zero-Save Capture
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrainWorkspacePage.useEffect": ()=>{
            const onKey = {
                "BrainWorkspacePage.useEffect.onKey": (e)=>{
                    if (e.altKey && (e.key === "s" || e.key === "S")) {
                        e.preventDefault();
                        openDialog("captureOpen");
                    }
                }
            }["BrainWorkspacePage.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "BrainWorkspacePage.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["BrainWorkspacePage.useEffect"];
        }
    }["BrainWorkspacePage.useEffect"], [
        openDialog
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$AuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthGate"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "brain-workspace flex h-screen flex-col overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                            className: "flex min-w-0 flex-1 flex-col overflow-hidden bg-background/40",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-11 shrink-0 items-center justify-between border-b border-border/80 bg-background/50 px-2 md:px-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "brain-scroll flex items-center gap-1 overflow-x-auto",
                                            role: "tablist",
                                            "aria-label": "Workspace views",
                                            children: TABS.map((t)=>{
                                                const Icon = t.icon;
                                                const active = tab === t.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    role: "tab",
                                                    "aria-selected": active,
                                                    onClick: ()=>setTab(t.id),
                                                    className: `flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${active ? "border-primary/50 bg-primary/15 text-primary-300" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "hidden sm:inline",
                                                            children: t.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "sm:hidden",
                                                            children: t.label.split(" ")[0]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, t.id, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden shrink-0 text-[11px] text-muted-foreground/80 lg:block",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-foreground/90",
                                                    children: details?.project.name ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ·",
                                                " ",
                                                details?.items.length ?? 0,
                                                " items · ",
                                                details?.decisions.length ?? 0,
                                                " decisions ·",
                                                " ",
                                                details?.graphEdges.length ?? 0,
                                                " edges"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-h-0 flex-1",
                                    children: [
                                        !booted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "Booting Project Brain OS…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        booted && bootError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full items-center justify-center p-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-w-md rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-destructive",
                                                        children: "Boot failure"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-muted-foreground",
                                                        children: bootError
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>window.location.reload(),
                                                        className: "mt-3 rounded bg-muted px-3 py-1.5 text-xs text-foreground/90 hover:bg-accent",
                                                        children: "Retry"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/page.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        booted && !bootError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "h-full",
                                            initial: {
                                                opacity: 0,
                                                y: 8
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                duration: 0.22,
                                                ease: "easeOut"
                                            },
                                            children: [
                                                tab === "dashboard" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$DashboardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardView"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 43
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                tab === "vault" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$VaultView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VaultView"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 39
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                tab === "timeline" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$TimelineView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimelineView"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 42
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                tab === "graph" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$GraphView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphView"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 39
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                tab === "context" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ContextView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextView"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, tab, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaptureDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewProjectDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecisionDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelfTestDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$SettingsDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeedbackDialog"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BrainWorkspacePage, "uzt7vLQFoDPqS7kfaPGsBdJVO6A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"]
    ];
});
_c = BrainWorkspacePage;
const __TURBOPACK__default__export__ = BrainWorkspacePage;
var _c;
__turbopack_context__.k.register(_c, "BrainWorkspacePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/AuthGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthGate",
    ()=>AuthGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// AuthGate — route protection for the single-route workspace (blueprint "Route
// Protection", adapted: this deployment exposes ONE visible route, so instead of
// a /login page the gate renders a login/setup card IN PLACE of the workspace).
//
//   checking       → boot spinner
//   open           → workspace (bootstrap semantics: no accounts, regression
//                    suites + desktop agents keep working unchanged)
//   setup          → optional owner-account bootstrap card (skippable)
//   locked         → credential login card (enforced mode)
//   authenticated  → workspace
//
// The store listens for the api-client's "brain:auth-expired" event so a session
// dying mid-use swaps the workspace for the login card immediately.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-in.js [app-client] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/auth-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const AuthGate = ({ children })=>{
    _s();
    const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGate.useAuthStore[status]": (s)=>s.status
    }["AuthGate.useAuthStore[status]"]);
    const busy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGate.useAuthStore[busy]": (s)=>s.busy
    }["AuthGate.useAuthStore[busy]"]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGate.useAuthStore[error]": (s)=>s.error
    }["AuthGate.useAuthStore[error]"]);
    const setSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGate.useAuthStore[setSession]": (s)=>s.setSession
    }["AuthGate.useAuthStore[setSession]"]);
    const setup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGate.useAuthStore[setup]": (s)=>s.setup
    }["AuthGate.useAuthStore[setup]"]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGate.useAuthStore[login]": (s)=>s.login
    }["AuthGate.useAuthStore[login]"]);
    const [skipped, setSkipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        password: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGate.useEffect": ()=>{
            const check = {
                "AuthGate.useEffect.check": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/auth/session");
                        setSession(data);
                    } catch  {
                        // If the session endpoint itself is unreachable, stay open (pre-auth parity)
                        setSession({
                            mode: "open",
                            authenticated: false,
                            needs_setup: false,
                            user: null
                        });
                    }
                }
            }["AuthGate.useEffect.check"];
            void check();
            const onExpired = {
                "AuthGate.useEffect.onExpired": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].setState({
                        status: "locked",
                        user: null,
                        error: null
                    });
                }
            }["AuthGate.useEffect.onExpired"];
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_EXPIRED_EVENT"], onExpired);
            return ({
                "AuthGate.useEffect": ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_EXPIRED_EVENT"], onExpired)
            })["AuthGate.useEffect"];
        }
    }["AuthGate.useEffect"], [
        setSession
    ]);
    if (status === "open" || status === "authenticated" || status === "setup" && skipped) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/AuthGate.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    const submit = async (e)=>{
        e.preventDefault();
        const ok = status === "setup" ? await setup({
            name: form.name,
            email: form.email,
            password: form.password
        }) : await login({
            email: form.email,
            password: form.password
        });
        if (ok) window.location.reload(); // clean slate: re-boot the workspace authenticated
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brain-workspace flex min-h-screen items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md rounded-2xl border border-primary/25 bg-card/70 p-6 shadow-2xl shadow-primary/10 backdrop-blur",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-5 flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-xl shadow-lg shadow-primary/30",
                            children: "🧠"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "flex items-center gap-1.5 text-sm font-bold tracking-tight text-foreground",
                                    children: [
                                        "PROJECT BRAIN OS",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            className: "h-3.5 w-3.5 text-success",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted-foreground",
                                    children: status === "setup" ? "First-run protection" : "Authentication required"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-base font-bold text-foreground",
                    children: status === "setup" ? "Protect your Brain" : "Sign in to Project Brain OS"
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-xs leading-relaxed text-muted-foreground",
                    children: status === "setup" ? "Create the owner account to require sign-in. You can skip this and stay in trusted local mode." : "This workspace is protected — enter your credentials to continue."
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submit,
                    className: "mt-4 space-y-3",
                    children: [
                        status === "setup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-1 block text-[11px] font-medium text-muted-foreground",
                                    children: "Display name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: form.name,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                name: e.target.value
                                            })),
                                    autoComplete: "name",
                                    className: "w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-1 block text-[11px] font-medium text-muted-foreground",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    required: true,
                                    value: form.email,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                email: e.target.value
                                            })),
                                    autoComplete: "email",
                                    className: "w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-1 block text-[11px] font-medium text-muted-foreground",
                                    children: [
                                        "Password ",
                                        status === "setup" && "(min 8 chars)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    required: true,
                                    minLength: status === "setup" ? 8 : undefined,
                                    value: form.password,
                                    onChange: (e)=>setForm((f)=>({
                                                ...f,
                                                password: e.target.value
                                            })),
                                    autoComplete: status === "setup" ? "new-password" : "current-password",
                                    className: "w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[11px] text-destructive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: busy,
                            className: "flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400 disabled:opacity-50",
                            children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-3.5 w-3.5 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/AuthGate.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Working…"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/AuthGate.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/AuthGate.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    status === "setup" ? "Create owner account" : "Sign in"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/AuthGate.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/AuthGate.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                status === "setup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setSkipped(true),
                    className: "mt-3 w-full text-center text-[11px] text-muted-foreground transition-colors hover:text-foreground",
                    children: "Continue without protection"
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/AuthGate.tsx",
                    lineNumber: 165,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/AuthGate.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/AuthGate.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthGate, "OFgbbJGHyNd4+fTRLx8fwaPWjQ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AuthGate;
;
var _c;
__turbopack_context__.k.register(_c, "AuthGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/ContextView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextView",
    ()=>ContextView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// TAB 4 — 3-Tier Context Injector & Anti-Drift Prompt Structurer
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCopy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-copy.js [app-client] (ecmascript) <export default as ClipboardCopy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ContextView = ()=>{
    _s();
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "ContextView.useWorkspace[details]": (s)=>s.details
    }["ContextView.useWorkspace[details]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "ContextView.useWorkspace[selectedId]": (s)=>s.selectedId
    }["ContextView.useWorkspace[selectedId]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [goal, setGoal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [payload, setPayload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const synth = async ()=>{
        if (!selectedId) {
            toast({
                title: "Select a project first",
                variant: "destructive"
            });
            return;
        }
        setLoading(true);
        try {
            const params = new URLSearchParams({
                project_id: selectedId,
                q: query,
                goal
            });
            const res = await fetch(`/api/context?${params.toString()}`, {
                cache: "no-store"
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to build payload");
            setPayload(data);
            toast({
                title: "3-Tier Context synthesized",
                description: `${data.token_budget_status ?? "spec ready"} · backend: ${data.backend_used?.provider ?? "unknown"} · ready to paste into any LLM`
            });
        } catch (e) {
            toast({
                title: "Synthesis failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setLoading(false);
        }
    };
    const copy = async (text, what)=>{
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: `${what} copied`,
                description: "Paste it into Cursor, Claude, or any LLM."
            });
        } catch  {
            toast({
                title: "Clipboard unavailable",
                variant: "destructive"
            });
        }
    };
    const projectIdForApi = details?.project.id ?? selectedId ?? "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brain-scroll h-full select-text overflow-y-auto p-4 md:p-6",
        "aria-label": "Context injector",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-4xl space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "flex items-center gap-2 text-base font-bold text-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"], {
                                    className: "h-4 w-4 text-primary-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Context Injector & Prompt Structurer"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-0.5 text-xs text-muted-foreground",
                            children: "Rewrites any raw, unclear thought into a strict 5-Section Engineering Spec anchored to Rolling Memory (Tier 1) + Active Decisions (Tier 2) + Vault Evidence (Tier 3) — under a 2,500-token budget, with zero context drift."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/ContextView.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 rounded-xl border border-border bg-card/50 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "ctx-query",
                                            className: "mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Active query / bug keyword"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "ctx-query",
                                            type: "text",
                                            value: query,
                                            onChange: (e)=>setQuery(e.target.value),
                                            placeholder: "e.g. deployment error gateway",
                                            className: "w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "ctx-goal",
                                            className: "mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                            children: "Current task (optional — gets rewritten into an execution spec)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "ctx-goal",
                                            type: "text",
                                            value: goal,
                                            onChange: (e)=>setGoal(e.target.value),
                                            placeholder: "e.g. fix the Render deployment and add dotenv",
                                            className: "w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[10px] text-muted-foreground/80",
                                    children: [
                                        "Target: ",
                                        details?.project.name ?? "Inbox",
                                        " (",
                                        projectIdForApi || "no project",
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: synth,
                                    disabled: loading,
                                    className: "flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        loading ? "Synthesizing…" : "Synthesize 3-Tier Context + Rewrite Prompt"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/ContextView.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                payload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 md:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-success/25 bg-success/5 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold uppercase tracking-wider text-success",
                                                    children: "Tier 1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-muted-foreground/80",
                                                    children: "Rolling Memory"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs leading-relaxed text-foreground/95",
                                            children: payload.tier_1_rolling_memory
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-warning/25 bg-warning/5 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold uppercase tracking-wider text-warning",
                                                    children: "Tier 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-muted-foreground/80",
                                                    children: [
                                                        payload.tier_2_decision_graph.length,
                                                        " Decisions"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "brain-scroll max-h-40 space-y-1.5 overflow-y-auto",
                                            children: [
                                                payload.tier_2_decision_graph.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "No active decisions."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                payload.tier_2_decision_graph.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] leading-relaxed text-foreground/90",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-warning",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(d.title, 40)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/brain/ContextView.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " ",
                                                            "— ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(d.decision, 80)
                                                        ]
                                                    }, d.decidedAt + d.title, true, {
                                                        fileName: "[project]/src/components/brain/ContextView.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-primary/25 bg-primary/5 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold uppercase tracking-wider text-primary-300",
                                                    children: "Tier 3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-muted-foreground/80",
                                                    children: [
                                                        payload.tier_3_recent_and_relevant_evidence.length,
                                                        " Evidence"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "brain-scroll max-h-40 space-y-1.5 overflow-y-auto",
                                            children: payload.tier_3_recent_and_relevant_evidence.map((ev)=>{
                                                const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemTypeStyle"])(ev.type);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] leading-relaxed text-foreground/90",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `mr-1 rounded border px-1 text-[9px] uppercase ${style.badge}`,
                                                            children: ev.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(ev.title, 48)
                                                    ]
                                                }, ev.title + ev.captured_at, true, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 158,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-border bg-background/70",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-2 border-b border-border p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-foreground/90",
                                                    children: "Structured Execution Spec (anti-drift)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${(payload.token_budget_status ?? "").startsWith("OPTIMAL") ? "border-success/30 bg-success/10 text-success" : "border-warning/30 bg-warning/10 text-warning"}`,
                                                    children: payload.token_budget_status ?? `≈${Math.round((payload.structured_prompt_markdown?.length ?? 0) / 4)} tokens`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                payload.backend_used && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] text-primary-300",
                                                    children: [
                                                        "backend: ",
                                                        payload.backend_used.provider
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>copy(payload.structured_prompt_markdown ?? "", "Structured prompt"),
                                                    className: "flex items-center gap-1.5 rounded bg-primary px-2.5 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCopy$3e$__["ClipboardCopy"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Copy Prompt"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>copy(JSON.stringify(payload, null, 2), "JSON payload"),
                                                    className: "rounded border border-border bg-muted px-2.5 py-1 text-xs text-foreground/90 transition-colors hover:bg-accent",
                                                    children: "Copy JSON"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                (payload.refined_objective || (payload.known_fixes_referenced?.length ?? 0) > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5 border-b border-border bg-card/40 p-3",
                                    children: [
                                        payload.refined_objective && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "whitespace-pre-wrap text-[11px] leading-relaxed text-foreground/90",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-success",
                                                    children: "Clarified objective:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                payload.refined_objective
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 210,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        (payload.known_fixes_referenced?.length ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-warning",
                                                    children: "Known fixes referenced:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                payload.known_fixes_referenced.join(" · ")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 216,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "brain-scroll max-h-96 overflow-auto whitespace-pre-wrap p-4 font-mono text-[11px] leading-relaxed text-foreground/90",
                                    children: payload.structured_prompt_markdown
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-border bg-card/40 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
                                    children: "Evidence used (Tier 3)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: payload.tier_3_recent_and_relevant_evidence.map((ev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[11px] text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-foreground/90",
                                                    children: ev.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground/60",
                                                    children: [
                                                        "· ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(ev.captured_at)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 leading-relaxed",
                                                    children: ev.summary
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, ev.title + ev.captured_at, true, {
                                            fileName: "[project]/src/components/brain/ContextView.tsx",
                                            lineNumber: 235,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/ContextView.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/ContextView.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                !payload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground",
                    children: [
                        "Type a task above and hit ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-primary-300",
                            children: "Synthesize"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/ContextView.tsx",
                            lineNumber: 248,
                            columnNumber: 39
                        }, ("TURBOPACK compile-time value", void 0)),
                        " — your project's memory becomes a structured, constraint-carrying prompt."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/ContextView.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/ContextView.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/ContextView.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ContextView, "myJSFH3HVxMjWpSwADm+HCAW2m8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = ContextView;
var _c;
__turbopack_context__.k.register(_c, "ContextView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/DashboardView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardView",
    ()=>DashboardView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// DashboardView — Bento Grid landing tab (blueprint "Integrating into the Main
// Page with a Bento Grid Layout", wired to LIVE data):
//   row 1: Welcome + workspace stats (8 cols) | Quick Actions (4 cols)
//   row 2: Brain OS Graph (8 cols)            | Grounded Chat (4 cols)
//   row 3: Recent Activity (8 cols)           | Knowledge Health (4 cols)
// Server state via TanStack Query (GET /api/dashboard), client state via the
// workspace store — exactly the blueprint's Zustand + React Query split.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain-circuit.js [app-client] (ecmascript) <export default as BrainCircuit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2d$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseZap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database-zap.js [app-client] (ecmascript) <export default as DatabaseZap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/inbox.js [app-client] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-plus.js [app-client] (ecmascript) <export default as FolderPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feature$2d$flags$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/feature-flags-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/auth-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$graph$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/graph-viewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$chat$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/chat-widget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$GraphView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/GraphView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
const STATUS_TONE = {
    Healthy: "border-success/30 bg-success/10 text-success",
    Fair: "border-warning/30 bg-warning/10 text-warning",
    "Needs attention": "border-destructive/30 bg-destructive/10 text-destructive",
    "Not scored yet": "border-border bg-muted text-muted-foreground"
};
/**
 * Bento card reveal (Tier-1 "subtle animations", framer-motion).
 * Grid cell wrapper so col-span classes stay on the animated element;
 * MotionConfig reducedMotion="user" handles vestibular safety, and the
 * ui.bento_stagger feature flag is the ops-level kill switch (blueprint
 * "Feature Flags / Kill Switches") — flipping it in Settings re-renders
 * the dashboard statically on the next visit.
 */ const BentoReveal = ({ delay, className, disabled = false, children })=>{
    if (disabled) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/brain/DashboardView.tsx",
        lineNumber: 65,
        columnNumber: 24
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: className,
        initial: {
            opacity: 0,
            y: 14
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.35,
            delay,
            ease: "easeOut"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/brain/DashboardView.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = BentoReveal;
const DashboardView = ()=>{
    _s();
    const { t, fmtNumber } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const canEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "DashboardView.useAuthStore[canEdit]": (s)=>s.user?.role !== "viewer"
    }["DashboardView.useAuthStore[canEdit]"]);
    const staggerEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feature$2d$flags$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFlag"])("ui.bento_stagger");
    const openDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DashboardView.useWorkspace[openDialog]": (s)=>s.openDialog
    }["DashboardView.useWorkspace[openDialog]"]);
    const setTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DashboardView.useWorkspace[setTab]": (s)=>s.setTab
    }["DashboardView.useWorkspace[setTab]"]);
    const compressMemory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DashboardView.useWorkspace[compressMemory]": (s)=>s.compressMemory
    }["DashboardView.useWorkspace[compressMemory]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DashboardView.useWorkspace[selectedId]": (s)=>s.selectedId
    }["DashboardView.useWorkspace[selectedId]"]);
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DashboardView.useWorkspace[details]": (s)=>s.details
    }["DashboardView.useWorkspace[details]"]);
    const loadingDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DashboardView.useWorkspace[loadingDetails]": (s)=>s.loadingDetails
    }["DashboardView.useWorkspace[loadingDetails]"]);
    const dashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard"
        ],
        queryFn: {
            "DashboardView.useQuery[dashboard]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/dashboard")
        }["DashboardView.useQuery[dashboard]"],
        staleTime: 15_000
    });
    const graph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$GraphView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inferGraph"])(details?.graphEdges ?? []);
    const chatProjectId = selectedId && selectedId !== "inbox" ? selectedId : "";
    const compress = async ()=>{
        const report = await compressMemory();
        if (!report) {
            toast({
                title: t("dash.quick.compress"),
                description: "Compression failed",
                variant: "destructive"
            });
            return;
        }
        void dashboard.refetch();
        toast({
            title: "🧠 Memory compression complete",
            description: `${report.sessionsCreated} session rollup(s) · ${report.summariesUpdated.length} summaries synthesized`
        });
    };
    const stats = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
            key: "projects",
            value: dashboard.data?.projects ?? 0
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2d$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseZap$3e$__["DatabaseZap"],
            key: "captures",
            value: dashboard.data?.captures ?? 0
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"],
            key: "decisions",
            value: dashboard.data?.decisions ?? 0
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"],
            key: "edges",
            value: dashboard.data?.edges ?? 0
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"],
            key: "inbox",
            value: dashboard.data?.inbox ?? 0
        }
    ];
    const quickActions = [
        {
            label: t("dash.quick.capture"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
            onClick: ()=>openDialog("captureOpen"),
            tone: "border-primary/40 bg-primary/10 text-primary-300 hover:bg-primary/20",
            disabled: !canEdit
        },
        {
            label: t("dash.quick.decision"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"],
            onClick: ()=>openDialog("decisionOpen"),
            tone: "border-success/30 bg-success/10 text-success hover:bg-success/20",
            disabled: !canEdit
        },
        {
            label: t("dash.quick.project"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__["FolderPlus"],
            onClick: ()=>openDialog("newProjectOpen"),
            tone: "border-info/30 bg-info/10 text-info hover:bg-info/20",
            disabled: !canEdit
        },
        {
            label: t("dash.quick.compress"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2d$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseZap$3e$__["DatabaseZap"],
            onClick: ()=>void compress(),
            tone: "border-border bg-muted text-foreground/90 hover:bg-accent",
            disabled: !canEdit
        },
        {
            label: t("dash.quick.selftest"),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"],
            onClick: ()=>openDialog("selfTestOpen"),
            tone: "border-border bg-muted text-foreground/90 hover:bg-accent"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brain-scroll h-full select-text overflow-y-auto p-4 md:p-6",
        "aria-label": "Dashboard",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-4 md:grid-cols-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BentoReveal, {
                    delay: 0,
                    disabled: !staggerEnabled,
                    className: "md:col-span-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        variant: "primary",
                        interactive: true,
                        className: "h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2.5 text-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-lg shadow-lg shadow-primary/30",
                                                children: "🧠"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            t("dash.welcome.title")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: t("dash.welcome.desc")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "max-w-2xl text-xs leading-relaxed text-muted-foreground",
                                        children: t("dash.welcome.body")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
                                        children: stats.map(({ icon: Icon, key, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-border/80 bg-background/50 p-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-3.5 w-3.5 text-primary-300",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-lg font-bold leading-none text-foreground",
                                                        children: fmtNumber(value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-[10px] uppercase tracking-wide text-muted-foreground",
                                                        children: t(`dash.stat.${key}`)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, key, true, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 185,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTab("vault"),
                                        className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400",
                                        children: [
                                            t("dash.welcome.get_started"),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 200,
                                                columnNumber: 47
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BentoReveal, {
                    delay: 0.05,
                    disabled: !staggerEnabled,
                    className: "md:col-span-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "h-4 w-4 text-warning"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            t("dash.quick_actions")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: t("dash.quick_actions.desc")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-2",
                                children: quickActions.map(({ label, icon: Icon, onClick, tone, disabled })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClick,
                                        disabled: disabled,
                                        className: `flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${tone}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "h-3.5 w-3.5 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            label
                                        ]
                                    }, label, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BentoReveal, {
                    delay: 0.1,
                    disabled: !staggerEnabled,
                    className: "overflow-hidden md:col-span-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "h-full overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                                                className: "h-4 w-4 text-primary-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            t("dash.graph.title")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: [
                                            details?.project.name ?? "—",
                                            " · ",
                                            t("dash.graph.desc")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "pl-2 pr-2",
                                children: graph.nodes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground",
                                    children: "No graph edges yet — capture an error or log a decision to grow the graph."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$graph$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphViewer"], {
                                    nodes: graph.nodes,
                                    links: graph.links,
                                    height: 300,
                                    loading: loadingDetails,
                                    ariaLabel: "Dashboard knowledge graph"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BentoReveal, {
                    delay: 0.15,
                    disabled: !staggerEnabled,
                    className: "overflow-hidden md:col-span-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "h-full overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "h-4 w-4 text-primary-300"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            t("dash.chat.title")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: t("dash.chat.desc")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "pl-2 pr-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$chat$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatWidget"], {
                                    projectId: chatProjectId,
                                    className: "h-[300px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BentoReveal, {
                    delay: 0.2,
                    disabled: !staggerEnabled,
                    className: "md:col-span-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                className: "h-4 w-4 text-info"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 280,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            t("dash.activity.title")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: t("dash.activity.desc")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: (dashboard.data?.recent ?? []).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "rounded-lg border border-dashed border-border p-5 text-center text-xs text-muted-foreground",
                                    children: t("dash.activity.empty")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5",
                                    children: (dashboard.data?.recent ?? []).map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTab("timeline"),
                                                className: "flex w-full items-center gap-2.5 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors hover:border-border hover:bg-accent/40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded border border-border bg-muted px-1.5 py-0.5 text-[9px] uppercase text-muted-foreground",
                                                        children: entry.itemType
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-xs text-foreground/90",
                                                        children: entry.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    entry.projectName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[9px] text-primary-300 sm:inline",
                                                        children: entry.projectName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 text-[10px] text-muted-foreground/70",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(entry.capturedAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 293,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, entry.id, false, {
                                            fileName: "[project]/src/components/brain/DashboardView.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                    lineNumber: 276,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BentoReveal, {
                    delay: 0.25,
                    disabled: !staggerEnabled,
                    className: "md:col-span-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2d$circuit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BrainCircuit$3e$__["BrainCircuit"], {
                                                className: "h-4 w-4 text-success"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 325,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            t("dash.health.title"),
                                            dashboard.data?.avg_health !== null && dashboard.data?.avg_health !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success",
                                                children: fmtNumber(dashboard.data.avg_health)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                lineNumber: 327,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 324,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: "Memory Compression Daemon · per-project scores"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-2",
                                children: [
                                    (dashboard.data?.health ?? []).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border border-border/70 bg-background/40 p-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "truncate text-xs font-semibold text-foreground/90",
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-semibold ${STATUS_TONE[p.status] ?? STATUS_TONE["Not scored yet"]}`,
                                                            children: [
                                                                fmtNumber(p.score),
                                                                " · ",
                                                                p.status
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h-full rounded-full ${p.score >= 80 ? "bg-success" : p.score >= 55 ? "bg-warning" : "bg-destructive"}`,
                                                        style: {
                                                            width: `${Math.max(4, Math.min(100, p.score))}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/components/brain/DashboardView.tsx",
                                            lineNumber: 338,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    (dashboard.data?.health ?? []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "No projects scored yet."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/DashboardView.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/DashboardView.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/DashboardView.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/DashboardView.tsx",
            lineNumber: 166,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/DashboardView.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DashboardView, "cH7odWGI6k7nStT9akrVYDwjGcE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feature$2d$flags$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFlag"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c1 = DashboardView;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "BentoReveal");
__turbopack_context__.k.register(_c1, "DashboardView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/GraphView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphView",
    ()=>GraphView,
    "inferGraph",
    ()=>inferGraph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// TAB 3 — Decision Log inspector + Knowledge Graph
// Two graph layouts over the same normalized edge data:
//   Force   — interactive GraphViewer (drag / zoom / pan / inspect)
//   Columns — classic bipartite source→target view (restyled)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$graph$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/graph-viewer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const GRAPH_W = 820;
const NODE_H = 52;
const LABEL_MAX = 26;
const LAYOUT_MODES = [
    "force",
    "hierarchy",
    "radial",
    "columns"
];
function inferGraph(edges) {
    const kinds = new Map();
    const kindFor = (id, kind)=>{
        if (!kinds.has(id)) kinds.set(id, kind);
    };
    const links = edges.map((e)=>({
            id: e.id,
            source: e.sourceNode,
            target: e.targetNode,
            relation: e.relationType
        }));
    for (const e of edges){
        switch(e.relationType){
            case "FIXED_BY":
                kindFor(e.sourceNode, "error");
                kindFor(e.targetNode, "fix");
                break;
            case "DECIDED_ON":
                kindFor(e.sourceNode, "capture");
                kindFor(e.targetNode, "decision");
                break;
            case "MENTIONED_IN":
                kindFor(e.sourceNode, "file");
                kindFor(e.targetNode, "capture");
                break;
            default:
                kindFor(e.sourceNode, "concept");
                kindFor(e.targetNode, "concept");
        }
    }
    const nodes = [
        ...kinds.entries()
    ].map(([id, kind])=>({
            id,
            label: id,
            kind
        }));
    return {
        nodes,
        links
    };
}
/** Classic bipartite columns — restyled onto semantic tokens. */ const BipartiteSVG = ({ edges })=>{
    _s();
    const { sources, targets, nodePos, lines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BipartiteSVG.useMemo": ()=>{
            const sourceNodes = [];
            const targetNodes = [];
            const seen = new Set();
            for (const e of edges){
                if (!seen.has(e.sourceNode)) {
                    seen.add(e.sourceNode);
                    sourceNodes.push(e.sourceNode);
                }
                if (!seen.has(e.targetNode)) {
                    seen.add(e.targetNode);
                    targetNodes.push(e.targetNode);
                }
            }
            const leftX = 190;
            const rightX = GRAPH_W - 190;
            const rows = Math.max(sourceNodes.length, targetNodes.length, 1);
            const height = rows * NODE_H + 40;
            const pos = new Map();
            sourceNodes.forEach({
                "BipartiteSVG.useMemo": (n, i)=>{
                    pos.set(`L:${n}`, {
                        x: leftX,
                        y: 30 + i * NODE_H + NODE_H / 2
                    });
                }
            }["BipartiteSVG.useMemo"]);
            targetNodes.forEach({
                "BipartiteSVG.useMemo": (n, i)=>{
                    pos.set(`R:${n}`, {
                        x: rightX,
                        y: 30 + i * NODE_H + NODE_H / 2
                    });
                }
            }["BipartiteSVG.useMemo"]);
            const segs = edges.map({
                "BipartiteSVG.useMemo.segs": (e, i)=>({
                        id: i,
                        edge: e,
                        from: pos.get(`L:${e.sourceNode}`),
                        to: pos.get(`R:${e.targetNode}`)
                    })
            }["BipartiteSVG.useMemo.segs"]);
            return {
                sources: sourceNodes,
                targets: targetNodes,
                nodePos: pos,
                lines: segs.filter({
                    "BipartiteSVG.useMemo": (s)=>s.from && s.to
                }["BipartiteSVG.useMemo"]),
                height
            };
        }
    }["BipartiteSVG.useMemo"], [
        edges
    ]);
    const height = Math.max(sources.length, targets.length, 1) * NODE_H + 40;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "brain-scroll overflow-x-auto rounded-xl border border-border bg-card/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: `0 0 ${GRAPH_W} ${height}`,
            className: "h-auto w-full min-w-[680px]",
            role: "img",
            "aria-label": "Knowledge graph bipartite view",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                        id: "arrow",
                        viewBox: "0 0 10 10",
                        refX: "9",
                        refY: "5",
                        markerWidth: "6",
                        markerHeight: "6",
                        orient: "auto-start-reverse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M 0 0 L 10 5 L 0 10 z",
                            fill: "var(--graph-edge)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/GraphView.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/GraphView.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                lines.map(({ id, edge, from, to })=>{
                    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["relationStyle"])(edge.relationType);
                    const mx = (from.x + to.x) / 2;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`,
                        fill: "none",
                        stroke: style.stroke,
                        strokeWidth: 1.4,
                        strokeOpacity: 0.65,
                        markerEnd: "url(#arrow)"
                    }, id, false, {
                        fileName: "[project]/src/components/brain/GraphView.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                }),
                sources.map((n)=>{
                    const p = nodePos.get(`L:${n}`);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: p.x - 165,
                                y: p.y - 15,
                                width: 160,
                                height: 30,
                                rx: 8,
                                fill: "var(--graph-node-fill)",
                                stroke: "var(--graph-node-stroke)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: p.x - 85,
                                y: p.y + 4,
                                textAnchor: "middle",
                                fontSize: 11,
                                fill: "var(--graph-node-text)",
                                fontFamily: "var(--font-geist-mono), monospace",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(n, LABEL_MAX)
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, `L-${n}`, true, {
                        fileName: "[project]/src/components/brain/GraphView.tsx",
                        lineNumber: 163,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                }),
                targets.map((n)=>{
                    const p = nodePos.get(`R:${n}`);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: p.x + 5,
                                y: p.y - 15,
                                width: 160,
                                height: 30,
                                rx: 8,
                                fill: "var(--graph-node-fill)",
                                stroke: "var(--graph-node-stroke)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: p.x + 85,
                                y: p.y + 4,
                                textAnchor: "middle",
                                fontSize: 11,
                                fill: "var(--graph-node-text)",
                                fontFamily: "var(--font-geist-mono), monospace",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(n, LABEL_MAX)
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                lineNumber: 200,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, `R-${n}`, true, {
                        fileName: "[project]/src/components/brain/GraphView.tsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/GraphView.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/GraphView.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BipartiteSVG, "ALN0L+BxPkesPXqBuGnZn7ykpwA=");
_c = BipartiteSVG;
const GraphView = ()=>{
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "GraphView.useWorkspace[details]": (s)=>s.details
    }["GraphView.useWorkspace[details]"]);
    const openDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "GraphView.useWorkspace[openDialog]": (s)=>s.openDialog
    }["GraphView.useWorkspace[openDialog]"]);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("force");
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const decisions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphView.useMemo[decisions]": ()=>details?.decisions ?? []
    }["GraphView.useMemo[decisions]"], [
        details
    ]);
    const edges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphView.useMemo[edges]": ()=>details?.graphEdges ?? []
    }["GraphView.useMemo[edges]"], [
        details
    ]);
    const { nodes, links } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphView.useMemo": ()=>inferGraph(edges)
    }["GraphView.useMemo"], [
        edges
    ]);
    const inspectorEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphView.useMemo[inspectorEdges]": ()=>selectedNodeId ? edges.filter({
                "GraphView.useMemo[inspectorEdges]": (e)=>e.sourceNode === selectedNodeId || e.targetNode === selectedNodeId
            }["GraphView.useMemo[inspectorEdges]"]) : []
    }["GraphView.useMemo[inspectorEdges]"], [
        edges,
        selectedNodeId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brain-scroll h-full select-text overflow-y-auto p-4 md:p-6",
        "aria-label": "Decision and knowledge graph",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "flex items-center gap-2 text-base font-bold text-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                    className: "h-4 w-4 text-success"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Decision Log"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-xs text-muted-foreground",
                                            children: "Architectural decisions the AI must never revert. Auto-extracted from captures or logged manually."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>openDialog("decisionOpen"),
                                    className: "flex shrink-0 items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Log Decision"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 md:grid-cols-2",
                            children: [
                                decisions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground md:col-span-2",
                                    children: 'No decisions recorded for this project yet. Capture a note containing "Decision: … Reason: …" or log one manually.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                decisions.map((d)=>{
                                    const isOpen = expanded === d.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-expanded": isOpen,
                                        onClick: ()=>setExpanded(isOpen ? null : d.id),
                                        className: "w-full cursor-pointer rounded-xl border border-border bg-card/60 p-4 text-left transition-colors hover:border-primary/40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold text-foreground",
                                                        children: d.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 rounded border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] text-success",
                                                        children: d.outcome
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[11px] leading-relaxed text-foreground/90",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-success",
                                                        children: "Chosen:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(d.decision, isOpen ? 400 : 90)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1.5 text-[11px] leading-relaxed text-muted-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-foreground/80",
                                                                children: "Reasoning:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " ",
                                                            d.reasoning
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    d.alternatives.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 flex flex-wrap gap-1",
                                                        children: d.alternatives.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded border border-destructive/30 bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive line-through",
                                                                children: a
                                                            }, a, false, {
                                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                lineNumber: 293,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[10px] text-muted-foreground/70",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(d.decidedAt)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                lineNumber: 312,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, d.id, true, {
                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                        lineNumber: 275,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/GraphView.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "flex items-center gap-2 text-base font-bold text-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                                    className: "h-4 w-4 text-primary-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Knowledge Graph"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 323,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-0.5 text-xs text-muted-foreground",
                                            children: [
                                                'Auto-extracted "FIXED_BY / MENTIONED_IN / DECIDED_ON" edges — ',
                                                edges.length,
                                                ' ',
                                                "total."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap overflow-hidden rounded-lg border border-border",
                                            role: "tablist",
                                            "aria-label": "Graph layout",
                                            children: LAYOUT_MODES.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    role: "tab",
                                                    "aria-selected": layout === m,
                                                    onClick: ()=>setLayout(m),
                                                    className: `px-2.5 py-1 text-[11px] font-medium transition-colors ${layout === m ? "bg-primary/15 text-primary-300" : "text-muted-foreground hover:text-foreground"}`,
                                                    children: t(`graph.layout.${m}`)
                                                }, m, false, {
                                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 333,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        [
                                            "FIXED_BY",
                                            "DECIDED_ON",
                                            "MENTIONED_IN",
                                            "RELATED_TO"
                                        ].map((rel)=>{
                                            const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["relationStyle"])(rel);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] ${style.chip}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "h-1.5 w-1.5 rounded-full",
                                                        style: {
                                                            background: style.stroke
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    rel
                                                ]
                                            }, rel, true, {
                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        edges.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground",
                            children: "No graph edges yet. Capture an error (FIXED_BY), mention a file (MENTIONED_IN), or log a decision (DECIDED_ON) to grow the graph."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 370,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : layout === "columns" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BipartiteSVG, {
                            edges: edges
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 375,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$graph$2d$viewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphViewer"], {
                                    nodes: nodes,
                                    links: links,
                                    layout: layout,
                                    onLayoutChange: (next)=>setLayout(next),
                                    selectedId: selectedNodeId,
                                    onNodeClick: (n)=>setSelectedNodeId((cur)=>cur === n.id ? null : n.id),
                                    height: 480,
                                    ariaLabel: `Interactive ${layout} knowledge graph`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 378,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                selectedNodeId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-xs font-semibold text-primary-300",
                                                    children: selectedNodeId
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSelectedNodeId(null),
                                                    className: "text-[11px] text-muted-foreground transition-colors hover:text-foreground",
                                                    children: "Close inspector"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 390,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                inspectorEdges.map((e)=>{
                                                    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["relationStyle"])(e.relationType);
                                                    const other = e.sourceNode === selectedNodeId ? e.targetNode : e.sourceNode;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] leading-relaxed text-foreground/85",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded border px-1 py-0.5 text-[9px] uppercase ${style.chip}`,
                                                                children: e.relationType
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                                lineNumber: 407,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " ",
                                                            e.sourceNode === selectedNodeId ? "→ " : "← ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono",
                                                                children: other
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/brain/GraphView.tsx",
                                                                lineNumber: 411,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, e.id, true, {
                                                        fileName: "[project]/src/components/brain/GraphView.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                }),
                                                inspectorEdges.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-muted-foreground",
                                                    children: "Isolated node."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/GraphView.tsx",
                                            lineNumber: 401,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/GraphView.tsx",
                                    lineNumber: 389,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/GraphView.tsx",
                            lineNumber: 377,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/GraphView.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/GraphView.tsx",
            lineNumber: 244,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/GraphView.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(GraphView, "LgMeDmzqLkKzYctcHfMnxyvAmHc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"]
    ];
});
_c1 = GraphView;
var _c, _c1;
__turbopack_context__.k.register(_c, "BipartiteSVG");
__turbopack_context__.k.register(_c1, "GraphView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Top command bar — brand, universal search, Zero-Save Capture, Memory Compressor,
// Self-Test, language switcher (i18n), theme toggle (Tier-1 dual-mode), and the
// session user menu (auth).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2d$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseZap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database-zap.js [app-client] (ecmascript) <export default as DatabaseZap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript) <export default as Cpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquarePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square-plus.js [app-client] (ecmascript) <export default as MessageSquarePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/telemetry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/dictionaries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/auth-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
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
;
;
const Header = ()=>{
    _s();
    const openDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Header.useWorkspace[openDialog]": (s)=>s.openDialog
    }["Header.useWorkspace[openDialog]"]);
    const openSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Header.useWorkspace[openSearch]": (s)=>s.openSearch
    }["Header.useWorkspace[openSearch]"]);
    const compressMemory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Header.useWorkspace[compressMemory]": (s)=>s.compressMemory
    }["Header.useWorkspace[compressMemory]"]);
    const compressing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Header.useWorkspace[compressing]": (s)=>s.compressing
    }["Header.useWorkspace[compressing]"]);
    const llmBackend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Header.useWorkspace[llmBackend]": (s)=>s.llmBackend
    }["Header.useWorkspace[llmBackend]"]);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "Header.useAuthStore[user]": (s)=>s.user
    }["Header.useAuthStore[user]"]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "Header.useAuthStore[logout]": (s)=>s.logout
    }["Header.useAuthStore[logout]"]);
    const { t, locale, setLocale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { resolvedTheme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const roleLabel = user ? user.role === "owner" ? t("user.role.owner") : user.role === "editor" ? t("user.role.editor") : t("user.role.viewer") : null;
    const backendLabel = llmBackend ? llmBackend.provider === "deterministic-offline" ? "Offline Synthesizer" : llmBackend.provider === "ollama" ? `Ollama · ${llmBackend.model}` : llmBackend.model : "…";
    const submit = ()=>{
        if (query.trim()) openSearch(query.trim());
    };
    const compress = async ()=>{
        const report = await compressMemory();
        if (!report) {
            toast({
                title: "Compression failed",
                variant: "destructive"
            });
            return;
        }
        const gaps = Object.values(report.gapReport || {}).reduce((n, g)=>n + g.length, 0);
        toast({
            title: "🧠 Memory compression complete",
            description: `${report.sessionsCreated} session rollup(s) · ${report.summariesUpdated.length} summaries synthesized · ${gaps} gap(s) flagged · ${report.durationMs}ms`
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 backdrop-blur md:px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": true,
                            className: "text-base",
                            children: "🧠"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/Header.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate text-sm font-bold tracking-tight text-foreground",
                                        children: "PROJECT BRAIN OS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/Header.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden shrink-0 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-success sm:inline",
                                        children: "SQLite · Local-First"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/Header.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>openDialog("settingsOpen"),
                                        className: "hidden shrink-0 cursor-pointer rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary-300 transition-colors hover:bg-primary/20 lg:inline",
                                        title: `AI backend: ${llmBackend?.provider ?? "…"} (${llmBackend?.mode ?? "…"}) — click to configure a live LLM, dedup window, or agent token`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"], {
                                                className: "mr-1 inline h-3 w-3",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Header.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            backendLabel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Header.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hidden truncate text-[11px] text-muted-foreground lg:block",
                                children: "Everything you see, decide, and build — searchable, linked, and ready for AI execution."
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/Header.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-2 hidden max-w-xl flex-1 md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            onKeyDown: (e)=>e.key === "Enter" && submit(),
                            placeholder: "Search screenshots, terminal errors, decisions, or files...",
                            "aria-label": "Universal vault search",
                            className: "w-full rounded-lg border border-input bg-background/80 py-1.5 pl-9 pr-20 text-xs text-foreground placeholder-muted-foreground/60 focus:border-primary focus:outline-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/Header.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/Header.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: submit,
                            className: "absolute right-1.5 top-1 rounded bg-muted px-2.5 py-0.5 text-[11px] text-foreground/90 transition-colors hover:bg-accent",
                            children: "Search"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/Header.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/Header.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/brain/Header.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 items-center gap-2",
                children: [
                    !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].setState({
                                status: "setup",
                                error: null
                            }),
                        title: "Protect this workspace — create the owner account",
                        "aria-label": "Protect this workspace",
                        className: "flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-success/40 hover:text-success",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/Header.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            const next = resolvedTheme === "dark" ? "light" : "dark";
                            setTheme(next);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEvent"])("ui.theme_toggled", {
                                to: next
                            });
                        },
                        title: "Toggle light / dark mode",
                        "aria-label": "Toggle light / dark mode",
                        className: "flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                className: "hidden h-4 w-4 dark:block"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                className: "h-4 w-4 dark:hidden"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>openDialog("feedbackOpen"),
                        title: "Send feedback — bugs, ideas, anything",
                        "aria-label": "Send feedback",
                        className: "flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquarePlus$3e$__["MessageSquarePlus"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/Header.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex overflow-hidden rounded-lg border border-border",
                        role: "group",
                        "aria-label": "Language",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOCALES"].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setLocale(l),
                                "aria-pressed": locale === l,
                                className: `px-2 py-1.5 text-[10px] font-semibold transition-colors ${locale === l ? "bg-primary/15 text-primary-300" : "text-muted-foreground hover:text-foreground"}`,
                                children: l === "en" ? "EN" : "中文"
                            }, l, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>openDialog("captureOpen"),
                        className: "flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Zero-Save Capture"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sm:hidden",
                                children: "Capture"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                className: "hidden rounded bg-primary-600 px-1.5 py-0.5 text-[10px] lg:inline",
                                children: "Alt+S"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: compress,
                        disabled: compressing,
                        className: "flex items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20 disabled:opacity-50",
                        title: "Memory Compression Daemon: roll up work sessions, re-synthesize project summaries, flag knowledge gaps",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2d$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseZap$3e$__["DatabaseZap"], {
                                className: `h-3.5 w-3.5 ${compressing ? "animate-pulse" : ""}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden lg:inline",
                                children: compressing ? "Compressing…" : "Compress Memory"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "lg:hidden",
                                children: "Compress"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>openDialog("selfTestOpen"),
                        className: "hidden items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:bg-accent sm:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Self-Test"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 rounded-lg border border-border bg-muted py-1 pl-1.5 pr-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-[10px] font-bold text-white",
                                "aria-hidden": true,
                                children: user.name.charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden leading-tight lg:block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "max-w-[110px] truncate text-[10px] font-semibold text-foreground",
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/Header.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-muted-foreground",
                                        children: roleLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/Header.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    void logout().then(()=>window.location.reload());
                                },
                                title: t("user.sign_out"),
                                "aria-label": t("user.sign_out"),
                                className: "flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/Header.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Header.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Header.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/Header.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/Header.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "SaWNS4wlQX9UXMCRMVyNG1qI2Bw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/OpsPanels.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureFlagsSection",
    ()=>FeatureFlagsSection,
    "TelemetrySection",
    ()=>TelemetrySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// v2.4 Ops panels for the Settings dialog —
//
//   FeatureFlagsSection : self-hosted flag registry readback + owner-only
//                         overrides (blueprint "Feature Flags / Kill Switches")
//   TelemetrySection    : aggregated view of logs/metrics.jsonl (blueprint
//                         "Custom Metrics and Dashboards", self-hosted)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feature$2d$flags$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/feature-flags-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/auth-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const SectionCard = ({ icon, title, desc, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-border/80 bg-background/40 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    icon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-bold uppercase tracking-wider text-foreground/90",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 31,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 29,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-0.5 text-[10px] text-muted-foreground",
                children: desc
            }, void 0, false, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 33,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 space-y-1.5",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/OpsPanels.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = SectionCard;
const FeatureFlagsSection = ()=>{
    _s();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "FeatureFlagsSection.useAuthStore[user]": (s)=>s.user
    }["FeatureFlagsSection.useAuthStore[user]"]);
    // Open/bootstrap mode (user null) is writable like every other mutation.
    const canManage = !user || user.role === "owner";
    const flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feature$2d$flags$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFlags"])();
    const setFlag = async (id, patch)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPut"])(`/api/feature-flags`, {
                id,
                ...patch
            });
            await queryClient.invalidateQueries({
                queryKey: [
                    "feature-flags"
                ]
            });
            toast({
                title: patch.reset ? `Flag ${id} reset to default` : `Flag ${id} updated`
            });
        } catch (e) {
            toast({
                title: "Flag update failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCard, {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
            className: "h-3.5 w-3.5 text-info"
        }, void 0, false, {
            fileName: "[project]/src/components/brain/OpsPanels.tsx",
            lineNumber: 62,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0)),
        title: "Feature Flags",
        desc: "Self-hosted progressive rollouts and kill switches — effective immediately, no redeploy.",
        children: [
            (flags.data?.flags ?? []).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 rounded border border-border/60 bg-card/50 px-2.5 py-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "truncate font-mono text-[11px] font-semibold text-foreground/90",
                                    children: f.id
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "truncate text-[10px] text-muted-foreground",
                                    title: f.description,
                                    children: f.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[9px] text-muted-foreground/70",
                                    children: [
                                        f.surface,
                                        " · rollout ",
                                        f.rollout,
                                        "% · ",
                                        f.source
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/OpsPanels.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        canManage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex shrink-0 items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void setFlag(f.id, {
                                            enabled: !f.enabled
                                        }),
                                    "aria-label": `Toggle ${f.id}`,
                                    className: `rounded px-2 py-0.5 text-[10px] font-semibold transition-colors ${f.enabled ? "bg-success/15 text-success hover:bg-success/25" : "bg-muted text-muted-foreground hover:bg-accent"}`,
                                    children: f.enabled ? "ON" : "OFF"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                f.source === "stored" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void setFlag(f.id, {
                                            reset: true
                                        }),
                                    title: "Reset to default",
                                    "aria-label": `Reset ${f.id}`,
                                    className: "rounded p-1 text-muted-foreground hover:text-foreground",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                        lineNumber: 99,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/OpsPanels.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `shrink-0 text-[10px] font-semibold ${f.enabled ? "text-success" : "text-muted-foreground"}`,
                            children: f.enabled ? "ON" : "OFF"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/OpsPanels.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, f.id, true, {
                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            flags.isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-muted-foreground",
                children: "Loading flags…"
            }, void 0, false, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 110,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/OpsPanels.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(FeatureFlagsSection, "Mms/ngcSRevoFnYXxd5IYjxzKfg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$feature$2d$flags$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFlags"]
    ];
});
_c1 = FeatureFlagsSection;
const TelemetrySection = ({ open })=>{
    _s1();
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "metrics-summary"
        ],
        queryFn: {
            "TelemetrySection.useQuery[summary]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/metrics")
        }["TelemetrySection.useQuery[summary]"],
        enabled: open,
        staleTime: 5_000
    });
    const data = summary.data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionCard, {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
            className: "h-3.5 w-3.5 text-primary-300"
        }, void 0, false, {
            fileName: "[project]/src/components/brain/OpsPanels.tsx",
            lineNumber: 135,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0)),
        title: "Ops & Telemetry",
        desc: "Self-hosted APM: Core Web Vitals, product events, and slow API routes from logs/metrics.jsonl.",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-foreground/90",
                        children: data ? `${data.total} samples` : "…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] text-primary-300",
                        children: [
                            "vitals ",
                            data?.by_type?.web_vital ?? 0
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-info/25 bg-info/10 px-2 py-0.5 text-[10px] text-info",
                        children: [
                            "events ",
                            data?.by_type?.event ?? 0
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-warning/25 bg-warning/10 px-2 py-0.5 text-[10px] text-warning",
                        children: [
                            "api timings ",
                            data?.by_type?.api_timing ?? 0
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            (data?.web_vitals ?? []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70",
                        children: "Core Web Vitals"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    data?.web_vitals.slice(0, 5).map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2 text-[10px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono font-semibold text-foreground/90",
                                    children: v.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "avg ",
                                        v.avg,
                                        "ms · max ",
                                        v.max,
                                        "ms",
                                        v.poor > 0 ? ` · ${v.poor} poor` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, v.name, true, {
                            fileName: "[project]/src/components/brain/OpsPanels.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            (data?.events ?? []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70",
                        children: "Top events"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    data?.events.slice(0, 5).map((ev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2 text-[10px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate font-mono text-foreground/90",
                                    children: ev.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "shrink-0 text-muted-foreground",
                                    children: [
                                        "×",
                                        ev.count
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, ev.name, true, {
                            fileName: "[project]/src/components/brain/OpsPanels.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            (data?.api_timings ?? []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70",
                        children: "Slowest routes"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/OpsPanels.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    data?.api_timings.slice(0, 4).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2 text-[10px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate font-mono text-foreground/90",
                                    children: r.route
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "shrink-0 text-muted-foreground",
                                    children: [
                                        "p95 ",
                                        r.p95Ms,
                                        "ms",
                                        r.errors > 0 ? ` · ${r.errors} err` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/OpsPanels.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, r.route, true, {
                            fileName: "[project]/src/components/brain/OpsPanels.tsx",
                            lineNumber: 181,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            data && data.total === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-muted-foreground",
                children: "No samples yet — browse the workspace and they will appear here."
            }, void 0, false, {
                fileName: "[project]/src/components/brain/OpsPanels.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/OpsPanels.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(TelemetrySection, "jxafAuZhMpoGZLa7lVQCpBkcLwE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c2 = TelemetrySection;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SectionCard");
__turbopack_context__.k.register(_c1, "FeatureFlagsSection");
__turbopack_context__.k.register(_c2, "TelemetrySection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/SettingsDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsDialog",
    ()=>SettingsDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// AI Backend & Runtime Settings dialog (v2.2)
// - Wire a live LLM backend (Ollama / OpenAI / Anthropic / Gemini) at runtime — no
//   redeploy: grounded Q&A upgrades from evidence excerpts to real synthesis the
//   moment a backend answers.
// - Tune the duplicate-folding window (DEDUP_WINDOW_HOURS semantics, 1-8760h).
// - Configure the desktop-agent ingest token + copy a ready-to-run agent command.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key-round.js [app-client] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$OpsPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/OpsPanels.tsx [app-client] (ecmascript)");
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
const PROVIDER_OPTIONS = [
    {
        value: "auto",
        label: "Auto-detect (Ollama → keys → Offline)"
    },
    {
        value: "ollama",
        label: "Ollama (local)"
    },
    {
        value: "openai",
        label: "OpenAI"
    },
    {
        value: "anthropic",
        label: "Anthropic"
    },
    {
        value: "gemini",
        label: "Gemini"
    },
    {
        value: "deterministic-offline",
        label: "Deterministic Offline (no network)"
    }
];
const inputCls = "w-full rounded border border-input bg-background/70 px-2.5 py-1.5 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none";
const Field = ({ label, hint, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1 flex items-baseline justify-between text-[11px] font-medium text-foreground/85",
                children: [
                    label,
                    hint ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 font-normal text-muted-foreground",
                        children: hint
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                        lineNumber: 70,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                lineNumber: 68,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
        lineNumber: 67,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Field;
const SectionTitle = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "mt-1 flex items-center gap-1.5 border-b border-border/80 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = SectionTitle;
const SettingsDialog = ()=>{
    _s();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SettingsDialog.useWorkspace[open]": (s)=>s.settingsOpen
    }["SettingsDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SettingsDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["SettingsDialog.useWorkspace[close]"]);
    const llmBackend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SettingsDialog.useWorkspace[llmBackend]": (s)=>s.llmBackend
    }["SettingsDialog.useWorkspace[llmBackend]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cfg, setCfg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [effective, setEffective] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // form state (keys start blank = "leave unchanged")
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("auto");
    const [ollamaUrl, setOllamaUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [ollamaModel, setOllamaModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [openaiKey, setOpenaiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [anthropicKey, setAnthropicKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [geminiKey, setGeminiKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [openaiBase, setOpenaiBase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [anthropicBase, setAnthropicBase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [geminiBase, setGeminiBase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [timeoutSec, setTimeoutSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dedupHours, setDedupHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(36);
    const [agentToken, setAgentToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showToken, setShowToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agentTokenVisible, setAgentTokenVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // generated token shown once
    const [probe, setProbe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettingsDialog.useCallback[load]": async ()=>{
            setLoading(true);
            try {
                const res = await fetch("/api/llm-backend", {
                    cache: "no-store"
                });
                const data = await res.json();
                setEffective(data.effective_backend);
                setCfg(data.config);
                setProvider(data.config.provider);
                setOllamaUrl(data.config.ollama_url);
                setOllamaModel(data.config.ollama_model);
                setOpenaiBase(data.config.openai_base_url);
                setAnthropicBase(data.config.anthropic_base_url);
                setGeminiBase(data.config.gemini_base_url);
                setTimeoutSec(data.config.llm_timeout_seconds);
                setDedupHours(data.config.dedup_window_hours);
            } catch  {
                toast({
                    title: "Failed to load runtime settings",
                    variant: "destructive"
                });
            } finally{
                setLoading(false);
            }
        }
    }["SettingsDialog.useCallback[load]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsDialog.useEffect": ()=>{
            if (open) {
                setProbe(null);
                setAgentTokenVisible("");
                void load();
            }
        }
    }["SettingsDialog.useEffect"], [
        open,
        load
    ]);
    const save = async ()=>{
        setSaving(true);
        setProbe(null);
        try {
            const body = {
                provider,
                ollama_url: ollamaUrl,
                ollama_model: ollamaModel,
                openai_base_url: openaiBase,
                anthropic_base_url: anthropicBase,
                gemini_base_url: geminiBase,
                dedup_window_hours: dedupHours,
                probe: true
            };
            if (timeoutSec.trim() !== String(cfg?.llm_timeout_seconds ?? "")) body.llm_timeout_seconds = timeoutSec.trim();
            if (openaiKey.trim()) body.openai_api_key = openaiKey.trim();
            if (anthropicKey.trim()) body.anthropic_api_key = anthropicKey.trim();
            if (geminiKey.trim()) body.gemini_api_key = geminiKey.trim();
            if (agentToken === "__clear__") body.agent_ingest_token = "__clear__";
            else if (agentToken.trim()) body.agent_ingest_token = agentToken.trim();
            const res = await fetch("/api/llm-backend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Save failed");
            setEffective(data.effective_backend);
            setProbe(data.probe ?? null);
            if (data.generated_token) {
                setAgentTokenVisible(data.generated_token);
                setAgentToken(""); // stored — clear the edit field
            }
            if (agentToken === "__clear__") {
                setAgentToken("");
                setAgentTokenVisible("");
            }
            toast({
                title: "Runtime settings saved",
                description: data.probe ? `${data.probe.ok ? "Probe OK" : "Probe failed"} — backend: ${data.effective_backend.provider}` : `Backend: ${data.effective_backend.provider}`,
                variant: data.probe && !data.probe.ok ? "destructive" : "default"
            });
            await load();
        } catch (e) {
            toast({
                title: "Save failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setSaving(false);
        }
    };
    const backendLabel = (b)=>b ? `${b.provider === "deterministic-offline" ? "Offline Synthesizer" : b.provider} · ${b.model}` : "…";
    const agentCommand = ()=>{
        const origin = ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable";
        const url = `${origin}/api/agent/capture`;
        const tok = agentTokenVisible || (cfg?.agent_ingest_token.configured ? "<configured-token>" : "");
        return tok ? `BRAIN_API_URL=${url} BRAIN_INGEST_TOKEN=${tok} python desktop_agent.py --watch` : `BRAIN_API_URL=${url} python desktop_agent.py --watch`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("settingsOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center gap-2 text-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                    className: "h-4 w-4 text-primary-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " AI Backend & Runtime Settings"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Live config — no restart needed. Paste an API key to upgrade grounded answers from evidence excerpts to real LLM synthesis."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "brain-scroll max-h-[60vh] pr-2",
                    children: loading && !cfg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "py-8 text-center text-xs text-muted-foreground",
                        children: "Loading configuration…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                        lineNumber: 231,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-muted-foreground",
                                        children: "Effective backend:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 236,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary-300",
                                        children: backendLabel(effective ?? llmBackend)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 237,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    probe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `ml-auto flex items-center gap-1 text-[11px] ${probe.ok ? "text-success" : "text-destructive"}`,
                                        children: [
                                            probe.ok ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 245,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 247,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Probe ",
                                            probe.ok ? "OK" : "failed",
                                            " · ",
                                            probe.latency_ms,
                                            "ms"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 241,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            probe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded border border-border bg-background/60 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-muted-foreground",
                                children: probe.detail
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 254,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        children: "LLM Provider"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: provider,
                                        onChange: (e)=>setProvider(e.target.value),
                                        "aria-label": "LLM provider",
                                        className: inputCls,
                                        children: PROVIDER_OPTIONS.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: o.value,
                                                children: o.label
                                            }, o.value, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 269,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Ollama URL",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: ollamaUrl,
                                                    onChange: (e)=>setOllamaUrl(e.target.value),
                                                    className: inputCls
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 275,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Ollama model",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: ollamaModel,
                                                    onChange: (e)=>setOllamaModel(e.target.value),
                                                    className: inputCls
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 274,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 260,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        children: "Cloud API Keys (leave blank to keep current)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 286,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "OpenAI key",
                                        hint: cfg?.openai_api_key.configured ? `configured: ${cfg.openai_api_key.masked}` : "not set",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            value: openaiKey,
                                            onChange: (e)=>setOpenaiKey(e.target.value),
                                            placeholder: cfg?.openai_api_key.configured ? "•••••••• (unchanged)" : "sk-…",
                                            className: inputCls
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                            lineNumber: 291,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 287,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Anthropic key",
                                        hint: cfg?.anthropic_api_key.configured ? `configured: ${cfg.anthropic_api_key.masked}` : "not set",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            value: anthropicKey,
                                            onChange: (e)=>setAnthropicKey(e.target.value),
                                            placeholder: cfg?.anthropic_api_key.configured ? "•••••••• (unchanged)" : "sk-ant-…",
                                            className: inputCls
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 299,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Gemini key",
                                        hint: cfg?.gemini_api_key.configured ? `configured: ${cfg.gemini_api_key.masked}` : "not set",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            value: geminiKey,
                                            onChange: (e)=>setGeminiKey(e.target.value),
                                            placeholder: cfg?.gemini_api_key.configured ? "•••••••• (unchanged)" : "AIza…",
                                            className: inputCls
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                            lineNumber: 309,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                        className: "rounded border border-border/80 bg-background/40 px-2.5 py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                className: "cursor-pointer text-[11px] text-muted-foreground",
                                                children: "Advanced: API base URLs & timeout"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 318,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "OpenAI base URL",
                                                        hint: "OpenAI-compatible gateways welcome",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: openaiBase,
                                                            onChange: (e)=>setOpenaiBase(e.target.value),
                                                            className: inputCls
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Anthropic base URL",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: anthropicBase,
                                                            onChange: (e)=>setAnthropicBase(e.target.value),
                                                            className: inputCls
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Gemini base URL",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: geminiBase,
                                                            onChange: (e)=>setGeminiBase(e.target.value),
                                                            className: inputCls
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                        label: "Timeout (seconds)",
                                                        hint: "3-120 · default: 8 local / 25 cloud",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: timeoutSec,
                                                            onChange: (e)=>setTimeoutSec(e.target.value),
                                                            placeholder: "auto",
                                                            className: inputCls
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 285,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        children: "Duplicate Folding & Desktop Agent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Dedup window (hours)",
                                                hint: "1-8760 · default 36",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: 1,
                                                    max: 8760,
                                                    value: dedupHours,
                                                    onChange: (e)=>setDedupHours(Math.max(1, Math.min(8760, Number(e.target.value) || 36))),
                                                    className: inputCls
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 340,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Agent ingest token",
                                                hint: cfg?.agent_ingest_token.configured ? `configured: ${cfg.agent_ingest_token.masked}` : "trusted mode",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: showToken ? "text" : "password",
                                                            value: agentToken,
                                                            onChange: (e)=>setAgentToken(e.target.value),
                                                            placeholder: "leave blank = unchanged",
                                                            className: inputCls
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setShowToken((v)=>!v),
                                                            className: "rounded border border-border bg-muted px-2 text-[10px] text-foreground/90 hover:bg-accent",
                                                            "aria-label": "Toggle token visibility",
                                                            children: showToken ? "Hide" : "Show"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 350,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setAgentToken("__generate__"),
                                                className: "rounded border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] text-primary-300 hover:bg-primary/20",
                                                children: "Generate token"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 374,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setAgentToken("__clear__"),
                                                className: "rounded border border-border bg-muted px-2.5 py-1 text-[11px] text-foreground/90 hover:bg-accent",
                                                children: "Clear token (trusted mode)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 381,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    agentTokenVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "rounded border border-success/30 bg-success/10 px-2.5 py-1.5 font-mono text-[10px] break-all text-success",
                                        children: [
                                            "New token (copy now — stored masked): ",
                                            agentTokenVisible
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 390,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded border border-border/80 bg-background/40 px-2.5 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-1 text-[11px] text-muted-foreground",
                                                children: "Desktop agent ingest (clipboard watcher / hotkey snips → this workspace):"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 395,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "block break-all font-mono text-[10px] text-foreground/90",
                                                children: agentCommand()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 398,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void navigator.clipboard.writeText(agentCommand()),
                                                className: "mt-1.5 flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] text-foreground/90 hover:bg-accent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Copy command"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                                lineNumber: 399,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                        lineNumber: 394,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 337,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$OpsPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeatureFlagsSection"], {}, void 0, false, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 410,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$OpsPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TelemetrySection"], {
                                open: open
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 411,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                        lineNumber: 233,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: save,
                        disabled: saving || loading,
                        className: "flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: `h-3.5 w-3.5 ${saving ? "animate-spin" : ""}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                                lineNumber: 422,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            saving ? "Saving & probing…" : "Save & Test Connection"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                        lineNumber: 417,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/SettingsDialog.tsx",
                    lineNumber: 416,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/SettingsDialog.tsx",
            lineNumber: 218,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/SettingsDialog.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SettingsDialog, "XNFaRVANYSIY6jg3Leu4bXnBDiM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c2 = SettingsDialog;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Field");
__turbopack_context__.k.register(_c1, "SectionTitle");
__turbopack_context__.k.register(_c2, "SettingsDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Left rail — Project Spaces, Knowledge Health, bridge status
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/inbox.js [app-client] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const Sidebar = ()=>{
    _s();
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Sidebar.useWorkspace[projects]": (s)=>s.projects
    }["Sidebar.useWorkspace[projects]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Sidebar.useWorkspace[selectedId]": (s)=>s.selectedId
    }["Sidebar.useWorkspace[selectedId]"]);
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Sidebar.useWorkspace[details]": (s)=>s.details
    }["Sidebar.useWorkspace[details]"]);
    const selectProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Sidebar.useWorkspace[selectProject]": (s)=>s.selectProject
    }["Sidebar.useWorkspace[selectProject]"]);
    const openDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "Sidebar.useWorkspace[openDialog]": (s)=>s.openDialog
    }["Sidebar.useWorkspace[openDialog]"]);
    const health = details?.healthScore ?? 0;
    const healthColor = health >= 80 ? "bg-success" : health >= 60 ? "bg-warning" : "bg-destructive";
    const healthText = health >= 80 ? "text-success" : health >= 60 ? "text-warning" : "text-destructive";
    const gaps = details?.healthGaps ?? [];
    const severityStyle = {
        high: "text-destructive border-destructive/30 bg-destructive/10",
        medium: "text-warning border-warning/30 bg-warning/10",
        low: "text-muted-foreground border-border bg-muted/40"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "hidden w-60 shrink-0 overflow-hidden border-r border-border bg-sidebar/60 p-3 md:flex md:flex-col md:justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brain-scroll min-h-0 space-y-4 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center justify-between px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                                        children: "Project Spaces"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>openDialog("newProjectOpen"),
                                        className: "text-xs text-primary-300 transition-colors hover:text-primary-200",
                                        "aria-label": "Create new project space",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "inline h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 41,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " New"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                role: "list",
                                children: [
                                    projects.map((p)=>{
                                        const active = selectedId === p.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            role: "listitem",
                                            onClick: ()=>selectProject(p.id),
                                            className: `w-full rounded-lg border px-3 py-2 text-left transition-all ${active ? "border-primary/60 bg-primary/15 text-foreground" : "border-transparent text-foreground/80 hover:bg-accent/50 hover:text-foreground"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `h-1.5 w-1.5 shrink-0 rounded-full ${active ? "bg-primary-400" : "bg-muted-foreground/50"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                            lineNumber: 60,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate text-xs font-medium",
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                            lineNumber: 65,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 pl-3.5 font-mono text-[10px] text-muted-foreground/80 truncate",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(p.rootPath || p.slug, 30)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/components/brain/Sidebar.tsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        role: "listitem",
                                        onClick: ()=>selectProject("inbox"),
                                        className: `w-full rounded-lg border px-3 py-2 text-left transition-all ${selectedId === "inbox" ? "border-primary/60 bg-primary/15 text-foreground" : "border-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground/90"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"], {
                                                        className: "h-3.5 w-3.5 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-medium",
                                                        children: "Inbox"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 84,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 pl-5 text-[10px] text-muted-foreground/80",
                                                children: "Unrouted captures"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 rounded-xl border border-border bg-card/70 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Knowledge Health"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-xs font-bold ${healthText}`,
                                        children: [
                                            health,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full rounded-full transition-all duration-500 ${healthColor}`,
                                    style: {
                                        width: `${health}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/Sidebar.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "truncate font-mono text-[10px] text-muted-foreground/80",
                                children: details?.project.rootPath || details?.project.slug || "select a project"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-1 pt-1 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded bg-muted/60 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-bold text-foreground/95",
                                                children: details?.items.length ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 110,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[9px] uppercase tracking-wide text-muted-foreground/80",
                                                children: "Items"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded bg-muted/60 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-bold text-foreground/95",
                                                children: details?.decisions.length ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[9px] uppercase tracking-wide text-muted-foreground/80",
                                                children: "Decisions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded bg-muted/60 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-bold text-foreground/95",
                                                children: details?.graphEdges.length ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[9px] uppercase tracking-wide text-muted-foreground/80",
                                                children: "Edges"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 119,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            gaps.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1 pt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] uppercase tracking-wider text-muted-foreground/80",
                                                children: "Knowledge Gaps"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] text-muted-foreground/60",
                                                children: "daemon-flagged"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    gaps.slice(0, 3).map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            title: g.detail,
                                            className: `rounded border px-2 py-1 text-[10px] leading-tight ${severityStyle[g.severity] ?? severityStyle.low}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: g.gap
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, g.gap, false, {
                                            fileName: "[project]/src/components/brain/Sidebar.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    gaps.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-muted-foreground",
                                        children: [
                                            "+",
                                            gaps.length - 3,
                                            " more…"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/Sidebar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-1 rounded-lg border border-border/80 bg-card/50 p-2.5 text-[11px] text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "MCP Bridge"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-success",
                                children: "5 tools ready"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Hotkey Agent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-primary-300",
                                children: "Alt + S"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/Sidebar.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/Sidebar.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/Sidebar.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/Sidebar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Sidebar, "36AbwhonfUpl7P4kkVfUsfcq57U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/TimelineView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimelineView",
    ()=>TimelineView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// TAB 2 — Universal Chronological Timeline across all projects
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const TimelineView = ()=>{
    _s();
    const [entries, setEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TimelineView.useCallback[load]": async (datePrefix)=>{
            setLoading(true);
            try {
                const url = datePrefix ? `/api/timeline?date=${encodeURIComponent(datePrefix)}&limit=60` : "/api/timeline?limit=60";
                const res = await fetch(url, {
                    cache: "no-store"
                });
                const data = await res.json();
                setEntries(data.timeline ?? []);
            } catch  {
                setEntries([]);
            } finally{
                setLoading(false);
            }
        }
    }["TimelineView.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimelineView.useEffect": ()=>{
            void load();
        }
    }["TimelineView.useEffect"], [
        load
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "brain-scroll h-full select-text overflow-y-auto p-4 md:p-6",
        "aria-label": "Universal timeline",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-4xl space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-bold text-foreground",
                                    children: "Universal Chronological Timeline"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/TimelineView.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 text-xs text-muted-foreground",
                                    children: "Humans remember by time, not folders. Every screenshot, error, and note across all projects — newest first."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/TimelineView.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/TimelineView.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: date,
                                    onChange: (e)=>{
                                        setDate(e.target.value);
                                        void load(e.target.value || undefined);
                                    },
                                    "aria-label": "Filter timeline by date",
                                    className: "rounded-lg border border-input bg-background/70 px-3 py-1.5 text-xs text-foreground [color-scheme:dark] focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/TimelineView.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setDate("");
                                        void load();
                                    },
                                    className: "flex items-center gap-1 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs text-foreground/90 transition-colors hover:bg-accent",
                                    "aria-label": "Refresh timeline",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/TimelineView.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Reset"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/TimelineView.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/TimelineView.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/TimelineView.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative space-y-3 border-l border-border pl-5 pt-2",
                    children: [
                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-muted-foreground",
                            children: "Loading timeline…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/TimelineView.tsx",
                            lineNumber: 74,
                            columnNumber: 23
                        }, ("TURBOPACK compile-time value", void 0)),
                        !loading && entries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-muted-foreground",
                            children: [
                                "No captures",
                                date ? ` on ${date}` : " yet",
                                ". Anything you capture lands here instantly."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/TimelineView.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        entries.map((e)=>{
                            const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemTypeStyle"])(e.itemType);
                            const Icon = style.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `absolute -left-[26px] top-3 h-2.5 w-2.5 rounded-full ring-4 ring-background ${style.dot}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-border bg-card/50 p-3.5 transition-colors hover:border-primary/40 hover:bg-card/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-3.5 w-3.5 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold text-foreground",
                                                        children: e.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${style.badge}`,
                                                        children: style.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    e.projectName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary-300",
                                                        children: e.projectName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto text-[10px] text-muted-foreground/70",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(e.capturedAt),
                                                            " · ",
                                                            e.sourceApp || "unknown source"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            e.structuredSummary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1.5 text-[11px] leading-relaxed text-muted-foreground",
                                                children: e.structuredSummary
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/TimelineView.tsx",
                                                lineNumber: 107,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/TimelineView.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, e.id, true, {
                                fileName: "[project]/src/components/brain/TimelineView.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/TimelineView.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/TimelineView.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/TimelineView.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TimelineView, "Vq+acFXWK3XS24Zq0rYhH6gbzHw=");
_c = TimelineView;
var _c;
__turbopack_context__.k.register(_c, "TimelineView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/VaultView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VaultView",
    ()=>VaultView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// TAB 1 — Vault & Markdown Editor with live Snip→Action detection
// v2.1: inbox triage/resolution controls, duplicate-folding ×N badges, and the
// grounded Ask / Synthesize panel (now the ChatWidget conversational surface).
// Captured content is rendered as escaped React text (never
// dangerouslySetInnerHTML) so pasted markup can't create XSS risk.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$analyzer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/analyzer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$model$2d$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/model-routing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$chat$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/chat-widget.tsx [app-client] (ecmascript)");
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
;
const ITEM_TYPES = [
    {
        value: "note",
        label: "📝 Markdown Note"
    },
    {
        value: "screenshot",
        label: "📸 Screenshot / OCR"
    },
    {
        value: "terminal",
        label: "💻 Terminal Log"
    },
    {
        value: "clip",
        label: "📋 Web Clip"
    },
    {
        value: "session",
        label: "🧩 Work Session"
    }
];
const VaultView = ()=>{
    _s();
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "VaultView.useWorkspace[details]": (s)=>s.details
    }["VaultView.useWorkspace[details]"]);
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "VaultView.useWorkspace[projects]": (s)=>s.projects
    }["VaultView.useWorkspace[projects]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "VaultView.useWorkspace[selectedId]": (s)=>s.selectedId
    }["VaultView.useWorkspace[selectedId]"]);
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "VaultView.useWorkspace[loading]": (s)=>s.loadingDetails
    }["VaultView.useWorkspace[loading]"]);
    const refreshAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "VaultView.useWorkspace[refreshAll]": (s)=>s.refreshAll
    }["VaultView.useWorkspace[refreshAll]"]);
    const setTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "VaultView.useWorkspace[setTab]": (s)=>s.setTab
    }["VaultView.useWorkspace[setTab]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [itemType, setItemType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("note");
    const [windowTitle, setWindowTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // v2.5 two-way editing — when set, Save PATCHes this item in-place
    // (with its content_hash as the optimistic-concurrency token) instead of
    // creating a new capture.
    const [editingItem, setEditingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [verifyingId, setVerifyingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // v2.1 inbox triage state
    const [triageTarget, setTriageTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [triagingId, setTriagingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolveId, setResolveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolveNote, setResolveNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Live local intelligence preview — route is a pure sync function; analysis is
    // async (v2 optional LLM enrichment), so it lands in state via useEffect.
    const [live, setLive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VaultView.useEffect": ()=>{
            if (!body.trim()) {
                setLive(null);
                return;
            }
            const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$model$2d$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeAiModel"])({
                itemType,
                rawContent: body,
                hasImage: itemType === "screenshot"
            });
            let cancelled = false;
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$analyzer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeCapture"])({
                rawContent: body,
                windowTitle: windowTitle || title,
                routedModel: route.targetModel
            }).then({
                "VaultView.useEffect": (analysis)=>{
                    if (!cancelled) setLive({
                        route,
                        analysis
                    });
                }
            }["VaultView.useEffect"]);
            return ({
                "VaultView.useEffect": ()=>{
                    cancelled = true;
                }
            })["VaultView.useEffect"];
        }
    }["VaultView.useEffect"], [
        body,
        itemType,
        windowTitle,
        title
    ]);
    const startEdit = (item)=>{
        setEditingItem(item);
        setTitle(item.title);
        setBody(item.rawContent);
        setItemType(item.itemType === "session" ? "note" : item.itemType);
        setWindowTitle("");
    };
    const cancelEdit = ()=>{
        setEditingItem(null);
        setTitle("");
        setBody("");
    };
    const save = async ()=>{
        if (!body.trim()) {
            toast({
                title: "Nothing to capture",
                description: "Write or paste content first.",
                variant: "destructive"
            });
            return;
        }
        setSaving(true);
        try {
            // v2.5: editing an existing note PATCHes it in place (two-way sync);
            // otherwise the classic zero-save capture flow runs.
            if (editingItem) {
                const res = await fetch(`/api/items/${editingItem.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        raw_content: body,
                        title: title || editingItem.title,
                        ...typeof editingItem.metadata.content_hash === "string" ? {
                            expected_hash: editingItem.metadata.content_hash
                        } : {}
                    })
                });
                const data = await res.json();
                if (res.status === 409) {
                    toast({
                        title: "Conflict — note changed elsewhere",
                        description: "This note was edited on disk or in another tab. Reload it and re-apply your edit.",
                        variant: "destructive"
                    });
                    return;
                }
                if (!res.ok) throw new Error(data.error || "Update failed");
                toast({
                    title: "Note updated in place",
                    description: data.vault_sync_status === "synced" ? "Vault markdown re-synced to disk." : "SQLite updated."
                });
                cancelEdit();
                await refreshAll();
                return;
            }
            const res = await fetch("/api/capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    raw_content: body,
                    item_type: itemType,
                    window_title: windowTitle || title || "Workspace Editor",
                    source_app: "Workspace UI"
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Capture failed");
            if (data.status === "duplicate_merged") {
                // v2.1: the capture folded into an existing item — say so instead of "captured"
                toast({
                    title: "Duplicate folded — no new item",
                    description: data.toastNotification
                });
            } else {
                toast({
                    title: "Captured — Zero-Save",
                    description: data.toastNotification
                });
            }
            setBody("");
            setTitle("");
            setWindowTitle("");
            await refreshAll();
        } catch (e) {
            toast({
                title: "Capture failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setSaving(false);
        }
    };
    // v2.5: closed-loop fix verification — mark a suggested fix
    // attempted/verified/failed without leaving the vault.
    const verifyFix = async (item, fixStatus)=>{
        setVerifyingId(item.id);
        try {
            const res = await fetch(`/api/items/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fix_status: fixStatus
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Verification failed");
            toast({
                title: fixStatus === "verified" ? "Fix verified — loop closed" : `Fix marked ${fixStatus}`,
                description: fixStatus === "verified" ? "VERIFIED_BY edge added to the knowledge graph." : "Health scores will reflect the new status."
            });
            await refreshAll();
        } catch (e) {
            toast({
                title: "Verification failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setVerifyingId(null);
        }
    };
    const copyFix = async (fix)=>{
        try {
            await navigator.clipboard.writeText(fix);
            toast({
                title: "Fix copied to clipboard",
                description: fix
            });
        } catch  {
            toast({
                title: "Clipboard unavailable",
                description: fix,
                variant: "destructive"
            });
        }
    };
    // ----------------------------------
    // v2.1 inbox triage & resolution
    // ----------------------------------
    const isInbox = selectedId === "inbox" || details?.project.id === "inbox";
    const triage = async (item)=>{
        const target = triageTarget[item.id];
        if (!target) {
            toast({
                title: "Pick a project first",
                description: "Choose the project space this capture belongs to.",
                variant: "destructive"
            });
            return;
        }
        setTriagingId(item.id);
        try {
            const res = await fetch("/api/triage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_id: item.id,
                    project_id: target
                })
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || "Triage failed");
            toast({
                title: `Triaged into ${data.project_name}`,
                description: data.file_moved ? `Vault file moved to ${data.file_path}` : "Item re-pointed in the vault index."
            });
            await refreshAll();
        } catch (e) {
            toast({
                title: "Triage failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setTriagingId(null);
        }
    };
    const resolve = async (item)=>{
        try {
            const res = await fetch("/api/resolve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_id: item.id,
                    resolution: resolveNote
                })
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || "Resolve failed");
            toast({
                title: "Marked resolved",
                description: resolveNote.trim() ? resolveNote : "Resolved without a note."
            });
            setResolveId(null);
            setResolveNote("");
            await refreshAll();
        } catch (e) {
            toast({
                title: "Resolve failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex h-full overflow-hidden",
        "aria-label": "Vault and Markdown editor",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden w-72 shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar/40 lg:flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-border/70 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-foreground/90",
                                children: "Captured Project Memory"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground",
                                children: details?.items.length ?? 0
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brain-scroll min-h-0 flex-1 divide-y divide-border/50 overflow-y-auto",
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-xs text-muted-foreground",
                                children: "Loading vault…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 256,
                                columnNumber: 23
                            }, ("TURBOPACK compile-time value", void 0)),
                            !loading && details && details.items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-xs text-muted-foreground",
                                children: "No captures yet. Paste an error or note on the right — routing is automatic."
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            details?.items.map((item)=>{
                                const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemTypeStyle"])(item.itemType);
                                const Icon = style.icon;
                                const status = typeof item.metadata.triage_status === "string" ? item.metadata.triage_status : "open";
                                const fixStatus = typeof item.metadata.fix_status === "string" ? item.metadata.fix_status : "";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group px-3 py-2.5 transition-colors hover:bg-accent/40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    className: "h-3.5 w-3.5 shrink-0 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "min-w-0 flex-1 truncate text-xs font-medium text-foreground/95",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OccurrenceBadge"], {
                                                    metadata: item.metadata
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                item.vaultSyncStatus === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    title: "Vault .md write in flight — reconciled against disk at next boot",
                                                    className: "shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground",
                                                    children: "Sync pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                item.vaultSyncStatus === "failed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    title: item.vaultSyncError || "Vault .md could not be written",
                                                    className: "shrink-0 rounded border border-destructive/40 bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold text-destructive",
                                                    children: "Sync failed"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>startEdit(item),
                                                    "aria-label": `Edit ${item.title} in the editor`,
                                                    title: "Edit in the editor (PATCH in place)",
                                                    className: "shrink-0 rounded p-0.5 text-muted-foreground/70 opacity-0 transition-opacity hover:bg-accent hover:text-foreground focus:opacity-100 group-hover:opacity-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "shrink-0 text-[10px] text-muted-foreground/70",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(item.capturedAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 line-clamp-2 pl-5 text-[11px] leading-relaxed text-muted-foreground",
                                            children: item.structuredSummary || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(item.rawContent, 120)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                            lineNumber: 305,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        typeof item.metadata.fix === "string" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-5 mt-1.5 flex flex-wrap items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center gap-1 rounded border border-warning/30 bg-warning/10 px-1.5 py-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "h-3 w-3 text-warning"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                            className: "text-[10px] text-warning",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(item.metadata.fix, 30)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                fixStatus === "verified" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-1 rounded border border-success/40 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Verified"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        fixStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `rounded border px-1.5 py-0.5 text-[10px] font-semibold ${fixStatus === "failed" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-muted text-muted-foreground"}`,
                                                            children: fixStatus
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>verifyFix(item, "verified"),
                                                            disabled: verifyingId === item.id,
                                                            className: "rounded border border-success/40 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success transition-colors hover:bg-success/20 disabled:opacity-50",
                                                            children: "Verify"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>verifyFix(item, "failed"),
                                                            disabled: verifyingId === item.id,
                                                            className: "rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50",
                                                            children: "Fail"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                            lineNumber: 309,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isInbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-5 mt-2 space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: triageTarget[item.id] ?? "",
                                                            onChange: (e)=>setTriageTarget((m)=>({
                                                                        ...m,
                                                                        [item.id]: e.target.value
                                                                    })),
                                                            "aria-label": `Triage target for ${item.title}`,
                                                            className: "min-w-0 flex-1 rounded border border-input bg-muted px-1.5 py-1 text-[10px] text-foreground focus:outline-none",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Triage to…"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: p.id,
                                                                        children: p.name
                                                                    }, p.id, false, {
                                                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>triage(item),
                                                            disabled: triagingId === item.id,
                                                            className: "rounded bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                                                            children: triagingId === item.id ? "…" : "Triage"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setResolveId(resolveId === item.id ? null : item.id),
                                                            className: `rounded border px-2 py-1 text-[10px] font-semibold transition-colors ${status === "resolved" ? "border-success/40 bg-success/10 text-success" : "border-border bg-muted text-muted-foreground hover:text-foreground"}`,
                                                            children: status === "resolved" ? "Resolved ✓" : "Resolve"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                resolveId === item.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: resolveNote,
                                                            onChange: (e)=>setResolveNote(e.target.value),
                                                            placeholder: "Resolution note (optional)",
                                                            "aria-label": "Resolution note",
                                                            className: "min-w-0 flex-1 rounded border border-input bg-background/70 px-2 py-1 text-[10px] text-foreground placeholder-muted-foreground/50 focus:border-success focus:outline-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>resolve(item),
                                                            className: "rounded bg-success px-2 py-1 text-[10px] font-semibold text-success-foreground transition-colors hover:bg-success/80",
                                                            children: "Confirm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                                            lineNumber: 392,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/VaultView.tsx",
                                            lineNumber: 352,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/components/brain/VaultView.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/VaultView.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brain-scroll flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-4 select-text md:p-5",
                children: [
                    editingItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 truncate text-xs text-foreground/90",
                                children: [
                                    "Editing “",
                                    editingItem.title,
                                    "” — saving patches this note in place (two-way sync, conflict-checked)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: cancelEdit,
                                "aria-label": "Cancel editing",
                                className: "flex shrink-0 items-center gap-1 rounded border border-border bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground transition-colors hover:text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Cancel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 416,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 412,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: title,
                                onChange: (e)=>setTitle(e.target.value),
                                placeholder: "Note or capture title (optional — auto-extracted if empty)",
                                "aria-label": "Capture title",
                                className: "w-full border-b border-transparent bg-transparent pb-1 text-lg font-bold text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none sm:w-2/3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex shrink-0 items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: itemType,
                                        onChange: (e)=>setItemType(e.target.value),
                                        "aria-label": "Item type",
                                        className: "rounded border border-input bg-muted px-2.5 py-1.5 text-xs text-foreground focus:outline-none",
                                        children: ITEM_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: t.value,
                                                children: t.label
                                            }, t.value, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 442,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: save,
                                        disabled: saving,
                                        className: `flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${editingItem ? "bg-primary text-primary-foreground hover:bg-primary-400" : "bg-success text-success-foreground hover:bg-success/80"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 456,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            saving ? "Saving…" : editingItem ? "Save Changes (In-Place)" : "Save to Vault (Zero-Tag)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 447,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: windowTitle,
                        onChange: (e)=>setWindowTitle(e.target.value),
                        placeholder: "Window / file context (e.g. 'gateway.mjs - VS Code') — boosts auto-routing accuracy",
                        "aria-label": "Window title context",
                        className: "rounded-lg border border-border bg-background/60 px-3 py-2 text-xs text-foreground/90 placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    live?.analysis.actionMetadata.fix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[10px] font-bold uppercase text-warning",
                                        children: [
                                            "Snip → Action Detected ",
                                            live.analysis.actionMetadata.rootCause ? `· ${live.analysis.actionMetadata.rootCause}` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "font-mono text-xs text-warning",
                                        children: live.analysis.actionMetadata.fix
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>copyFix(live.analysis.actionMetadata.fix),
                                className: "flex items-center gap-1 rounded bg-warning/20 px-2.5 py-1 text-xs text-warning transition-colors hover:bg-warning/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 484,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Copy Fix"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        rows: 14,
                        value: body,
                        onChange: (e)=>setBody(e.target.value),
                        placeholder: "Paste terminal error, write an architectural decision ('Decision: ... Reason: ... Alternatives: ...'), or type notes...\n\nAuto-detection: missing modules → install fix · Decision blocks → decision graph · file mentions → knowledge graph",
                        "aria-label": "Capture content",
                        className: "min-h-[240px] w-full flex-1 resize-none rounded-xl border border-border bg-background/70 p-4 font-mono text-xs leading-relaxed text-foreground/95 placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 489,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono",
                                children: [
                                    "Vault Path: ",
                                    details ? `ProjectBrainVault/Projects/${details.project.slug}/…` : "Inbox",
                                    " · auto-routed on save"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            live && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-muted-foreground/90",
                                children: [
                                    "Model Route: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary-300",
                                        children: live.route.targetModel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 507,
                                        columnNumber: 28
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ·",
                                    " ",
                                    live.route.reason
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 500,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    live && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-border bg-card/50 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
                                children: "Extracted Intelligence Preview"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 516,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5 text-xs text-foreground/90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: "Title:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 521,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-foreground",
                                                children: live.analysis.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 522,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: "Summary:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 525,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            live.analysis.summary
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    live.analysis.decision && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-success",
                                                children: "Decision detected:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 529,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            live.analysis.decision.reasoning,
                                            live.analysis.decision.alternatives.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: [
                                                    " ",
                                                    "· alternatives: ",
                                                    live.analysis.decision.alternatives.join(", ")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 532,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 528,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    live.analysis.graphEdges.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: "Graph edges:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 541,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[11px] text-primary-300",
                                                children: live.analysis.graphEdges.map((e)=>`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(e.source, 24)} -[${e.relation}]-> ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(e.target, 24)}`).join("  ·  ")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                                lineNumber: 542,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/VaultView.tsx",
                                        lineNumber: 540,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/VaultView.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 515,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$chat$2d$widget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatWidget"], {
                        projectId: isInbox ? "" : details?.project.id ?? "",
                        className: "h-[460px] min-h-[320px] shrink-0"
                    }, isInbox ? "inbox" : details?.project.id ?? "inbox", false, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 554,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setTab("timeline"),
                            className: "text-[11px] text-primary-300 transition-colors hover:text-primary-200",
                            children: "View everything in the Universal Timeline →"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/VaultView.tsx",
                            lineNumber: 561,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/VaultView.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/VaultView.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/VaultView.tsx",
        lineNumber: 246,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(VaultView, "7e8C9AiO+x1ur+lv9RzsaFsRzK4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = VaultView;
var _c;
__turbopack_context__.k.register(_c, "VaultView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/chat-widget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatWidget",
    ()=>ChatWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ChatWidget — conversational grounded Q&A over Project Brain OS memory.
//
// Blueprint alignment ("Real-time Chat Integration" + "Core Feature Enablement"):
//   - streaming: answers arrive over NDJSON from /api/ask/stream — progress
//     stages (searching → reading sources → synthesizing) render live, and
//     token-level deltas stream in for Ollama/OpenAI backends;
//   - persistence: every thread is stored per project (GET/DELETE /api/chat)
//     via TanStack Query, so conversations survive reloads;
//   - markdown: assistant answers render through react-markdown (safe by
//     default — raw HTML is never evaluated, keeping the XSS contract);
//   - honesty contract (v2.1 parity): no live LLM => evidence excerpts only,
//     explicitly badged. Never a fabricated answer.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$query$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/query-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/realtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/telemetry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
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
;
;
;
const SUGGESTIONS = [
    "How did we fix the last deployment error?",
    "Which decisions must the AI respect here?",
    "Summarize this project's recent work"
];
let chatSeq = 0;
const nextId = ()=>`live-${Date.now()}-${chatSeq++}`;
const recordToMessage = (r)=>({
        id: r.id,
        role: r.role,
        content: r.content,
        ts: r.created_at,
        mode: r.mode === "synthesize" ? "synthesize" : "ask",
        llmUsed: r.llm_used,
        grounded: r.grounded,
        sources: r.sources
    });
/** Safe markdown styling — raw HTML is never evaluated by react-markdown. */ const markdownComponents = {
    p: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "whitespace-pre-wrap text-xs leading-relaxed",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 77,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    ul: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "ml-4 list-disc space-y-0.5 text-xs leading-relaxed",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 80,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    ol: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "ml-4 list-decimal space-y-0.5 text-xs leading-relaxed",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 83,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    li: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "pl-0.5",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 85,
            columnNumber: 57
        }, ("TURBOPACK compile-time value", void 0)),
    code: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
            className: "rounded bg-muted px-1 py-0.5 font-mono text-[10px]",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 87,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    pre: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
            className: "brain-scroll overflow-x-auto rounded-lg border border-border bg-muted/50 p-2 text-[10px] leading-relaxed",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 90,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    a: ({ href, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            target: "_blank",
            rel: "noreferrer noopener",
            className: "text-primary-300 underline underline-offset-2",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 95,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0)),
    strong: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            className: "font-semibold text-foreground",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/brain/chat-widget.tsx",
            lineNumber: 105,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
};
const ChatWidget = ({ projectId, className = "" })=>{
    _s();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const threadKey = projectId || "inbox";
    // ---- persisted history (TanStack Query = server state, blueprint §5) ----
    const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "chat-history",
            threadKey
        ],
        queryFn: {
            "ChatWidget.useQuery[history]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])(`/api/chat?project_id=${encodeURIComponent(projectId)}`)
        }["ChatWidget.useQuery[history]"],
        staleTime: 60_000
    });
    const [live, setLive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ---- realtime layer (socket.io): presence / typing / live peer notes ----
    // Ephemeral by design: the persisted thread stays in the TanStack cache
    // above; peer notes live in their own buffer and never masquerade as
    // server-persisted history. The service is optional — when it is down
    // the widget simply renders without live affordances.
    const [liveConnected, setLiveConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [peersOnline, setPeersOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peerTyping, setPeerTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [peerNotes, setPeerNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const rtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingActiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const typingTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": ()=>{
            const handle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectRealtime"])(`chat:${threadKey}`, {
                onPresence: {
                    "ChatWidget.useEffect.handle": (peers)=>{
                        setPeersOnline(peers);
                        // A peer that left cannot still be typing — prune stale names.
                        setPeerTyping({
                            "ChatWidget.useEffect.handle": (names)=>names.filter({
                                    "ChatWidget.useEffect.handle": (n)=>peers.some({
                                            "ChatWidget.useEffect.handle": (p)=>p.name === n
                                        }["ChatWidget.useEffect.handle"])
                                }["ChatWidget.useEffect.handle"])
                        }["ChatWidget.useEffect.handle"]);
                    }
                }["ChatWidget.useEffect.handle"],
                onTyping: {
                    "ChatWidget.useEffect.handle": ({ user, typing })=>setPeerTyping({
                            "ChatWidget.useEffect.handle": (names)=>typing ? names.includes(user.name) ? names : [
                                    ...names,
                                    user.name
                                ] : names.filter({
                                    "ChatWidget.useEffect.handle": (n)=>n !== user.name
                                }["ChatWidget.useEffect.handle"])
                        }["ChatWidget.useEffect.handle"])
                }["ChatWidget.useEffect.handle"],
                onNote: {
                    "ChatWidget.useEffect.handle": (note)=>// Idempotent merge — same guard pattern as the stream "saved" flush:
                        // StrictMode may re-run updaters, so id/clientId collisions no-op.
                        setPeerNotes({
                            "ChatWidget.useEffect.handle": (notes)=>notes.some({
                                    "ChatWidget.useEffect.handle": (n)=>n.id === note.id || Boolean(note.clientId) && n.clientId === note.clientId
                                }["ChatWidget.useEffect.handle"]) ? notes : [
                                    ...notes,
                                    note
                                ]
                        }["ChatWidget.useEffect.handle"])
                }["ChatWidget.useEffect.handle"],
                onStatus: setLiveConnected
            });
            rtRef.current = handle;
            return ({
                "ChatWidget.useEffect": ()=>{
                    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
                    if (typingActiveRef.current) {
                        typingActiveRef.current = false;
                        handle.emitTyping(false);
                    }
                    rtRef.current = null;
                    handle.close();
                }
            })["ChatWidget.useEffect"];
        }
    }["ChatWidget.useEffect"], [
        threadKey
    ]);
    // Thread switched (project changed): drop any in-flight local exchange
    // and the ephemeral realtime buffers for the previous thread.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": ()=>{
            setLive([]);
            setStage(null);
            setBusy(false);
            setPeerNotes([]);
            setPeerTyping([]);
            setPeersOnline([]);
        }
    }["ChatWidget.useEffect"], [
        threadKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": ()=>{
            endRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }
    }["ChatWidget.useEffect"], [
        live,
        stage,
        history.data,
        peerNotes,
        peerTyping
    ]);
    const messages = [
        ...(history.data?.messages ?? []).map(recordToMessage),
        ...peerNotes.map((n)=>({
                id: n.id,
                role: "user",
                content: n.content,
                ts: n.ts,
                peerAuthor: n.author
            })),
        ...live
    ];
    /** Relay "is typing" to peers (no-op when the realtime service is down). */ const emitTypingChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWidget.useCallback[emitTypingChange]": (typing)=>{
            if (typing === typingActiveRef.current) return;
            typingActiveRef.current = typing;
            rtRef.current?.emitTyping(typing);
        }
    }["ChatWidget.useCallback[emitTypingChange]"], []);
    /** Input handler — broadcasts typing start, auto-stops after 1.4s idle. */ const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWidget.useCallback[handleInputChange]": (value)=>{
            setInput(value);
            if (!rtRef.current) return;
            if (value && !typingActiveRef.current) emitTypingChange(true);
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            if (value.trim()) {
                typingTimerRef.current = setTimeout({
                    "ChatWidget.useCallback[handleInputChange]": ()=>{
                        typingActiveRef.current = false;
                        rtRef.current?.emitTyping(false);
                    }
                }["ChatWidget.useCallback[handleInputChange]"], 1400);
            } else {
                emitTypingChange(false);
            }
        }
    }["ChatWidget.useCallback[handleInputChange]"], [
        emitTypingChange
    ]);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWidget.useCallback[run]": async (mode, rawQuery)=>{
            const query = (rawQuery ?? input).trim();
            if (!query || busy) return;
            setBusy(true);
            setInput("");
            setStage("searching vault evidence…");
            const userLiveId = nextId();
            setLive({
                "ChatWidget.useCallback[run]": (l)=>[
                        ...l,
                        {
                            id: userLiveId,
                            role: "user",
                            content: query,
                            ts: new Date().toISOString()
                        }
                    ]
            }["ChatWidget.useCallback[run]"]);
            // Live layer: stop the typing signal and broadcast the question as an
            // ephemeral note so connected peers see it instantly (the persisted
            // copy still lands through the stream's "saved" flush below).
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            typingActiveRef.current = false;
            rtRef.current?.emitTyping(false);
            rtRef.current?.sendNote({
                clientId: userLiveId,
                content: query,
                kind: "question"
            });
            let assistantId = null;
            const ensureAssistant = {
                "ChatWidget.useCallback[run].ensureAssistant": ()=>{
                    if (assistantId === null) {
                        assistantId = nextId();
                        setLive({
                            "ChatWidget.useCallback[run].ensureAssistant": (l)=>[
                                    ...l,
                                    {
                                        id: assistantId,
                                        role: "assistant",
                                        content: "",
                                        ts: new Date().toISOString(),
                                        mode,
                                        pending: true
                                    }
                                ]
                        }["ChatWidget.useCallback[run].ensureAssistant"]);
                    }
                    return assistantId;
                }
            }["ChatWidget.useCallback[run].ensureAssistant"];
            const patchAssistant = {
                "ChatWidget.useCallback[run].patchAssistant": (patch)=>{
                    const id = ensureAssistant();
                    setLive({
                        "ChatWidget.useCallback[run].patchAssistant": (l)=>l.map({
                                "ChatWidget.useCallback[run].patchAssistant": (m)=>m.id === id ? {
                                        ...m,
                                        ...patch
                                    } : m
                            }["ChatWidget.useCallback[run].patchAssistant"])
                    }["ChatWidget.useCallback[run].patchAssistant"]);
                }
            }["ChatWidget.useCallback[run].patchAssistant"];
            try {
                const res = await fetch("/api/ask/stream", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "same-origin",
                    body: JSON.stringify({
                        query,
                        project_id: projectId,
                        mode
                    })
                });
                if (!res.ok || !res.body) {
                    const errBody = await res.json().catch({
                        "ChatWidget.useCallback[run]": ()=>null
                    }["ChatWidget.useCallback[run]"]);
                    throw new Error(errBody?.error ?? `Grounded stream -> ${res.status}`);
                }
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buf = "";
                let sources = [];
                let partial = "";
                let doneInfo = {
                    llm_used: false,
                    grounded: false
                };
                for(;;){
                    const { done, value } = await reader.read();
                    if (done) break;
                    buf += decoder.decode(value, {
                        stream: true
                    });
                    const lines = buf.split("\n");
                    buf = lines.pop() ?? "";
                    for (const line of lines){
                        if (!line.trim()) continue;
                        let ev;
                        try {
                            ev = JSON.parse(line);
                        } catch  {
                            continue; // partial line — next chunk completes it
                        }
                        if (ev.type === "status") {
                            setStage(ev.detail ?? ev.stage);
                        } else if (ev.type === "sources") {
                            sources = ev.sources;
                            setStage(`reading ${ev.sources.length} source(s)…`);
                        } else if (ev.type === "delta") {
                            partial += ev.text;
                            setStage(null);
                            patchAssistant({
                                content: partial
                            });
                        } else if (ev.type === "done") {
                            setStage(null);
                            doneInfo = {
                                llm_used: ev.llm_used,
                                grounded: ev.grounded
                            };
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEvent"])("chat_answer", {
                                mode,
                                llm_used: ev.llm_used,
                                grounded: ev.grounded
                            });
                            patchAssistant({
                                content: ev.answer,
                                pending: false,
                                llmUsed: ev.llm_used,
                                grounded: ev.grounded,
                                sources
                            });
                        } else if (ev.type === "saved") {
                            // Server persisted both sides — flush them into the query cache so
                            // the history stays authoritative, then drop the live buffer.
                            // Idempotence guard: React StrictMode may double-invoke updater
                            // functions, so a flush that already landed is a no-op.
                            const now = new Date().toISOString();
                            const flushedSources = sources;
                            const flushedContent = partial;
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$query$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryClient"].setQueryData([
                                "chat-history",
                                threadKey
                            ], {
                                "ChatWidget.useCallback[run]": (old)=>{
                                    const existing = old?.messages ?? [];
                                    if (existing.some({
                                        "ChatWidget.useCallback[run]": (m)=>m.id === ev.message_id
                                    }["ChatWidget.useCallback[run]"])) return {
                                        messages: existing
                                    };
                                    return {
                                        messages: [
                                            ...existing,
                                            {
                                                id: ev.user_message_id,
                                                project_id: projectId || null,
                                                role: "user",
                                                content: query,
                                                mode,
                                                llm_used: false,
                                                grounded: false,
                                                sources: [],
                                                created_at: now
                                            },
                                            {
                                                id: ev.message_id,
                                                project_id: projectId || null,
                                                role: "assistant",
                                                content: flushedContent,
                                                mode,
                                                llm_used: doneInfo.llm_used,
                                                grounded: doneInfo.grounded,
                                                sources: flushedSources,
                                                created_at: now
                                            }
                                        ]
                                    };
                                }
                            }["ChatWidget.useCallback[run]"]);
                            setLive([]);
                        } else if (ev.type === "error") {
                            throw new Error(ev.error);
                        }
                    }
                }
            } catch (e) {
                setStage(null);
                setLive({
                    "ChatWidget.useCallback[run]": (l)=>[
                            ...l.map({
                                "ChatWidget.useCallback[run]": (m)=>m.pending ? {
                                        ...m,
                                        pending: false
                                    } : m
                            }["ChatWidget.useCallback[run]"]),
                            {
                                id: nextId(),
                                role: "assistant",
                                content: e instanceof Error ? e.message : "The query failed — try again.",
                                ts: new Date().toISOString(),
                                failed: true
                            }
                        ]
                }["ChatWidget.useCallback[run]"]);
                void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$query$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryClient"].invalidateQueries({
                    queryKey: [
                        "chat-history",
                        threadKey
                    ]
                });
                toast({
                    title: "Grounded query failed",
                    variant: "destructive"
                });
            } finally{
                setBusy(false);
            }
        }
    }["ChatWidget.useCallback[run]"], [
        busy,
        input,
        projectId,
        threadKey,
        toast
    ]);
    const clearThread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWidget.useCallback[clearThread]": async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiDelete"])(`/api/chat?project_id=${encodeURIComponent(projectId)}`);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$query$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryClient"].setQueryData([
                    "chat-history",
                    threadKey
                ], {
                    messages: []
                });
                setLive([]);
            } catch  {
                toast({
                    title: "Could not clear the thread",
                    variant: "destructive"
                });
            }
        }
    }["ChatWidget.useCallback[clearThread]"], [
        projectId,
        threadKey,
        toast
    ]);
    const badgeFor = (msg)=>{
        if (msg.failed) return {
            label: "Query failed",
            cls: "border-destructive/30 bg-destructive/10 text-destructive"
        };
        if (msg.llmUsed) {
            return msg.mode === "synthesize" ? {
                label: "LLM wiki synthesis",
                cls: "border-success/30 bg-success/10 text-success"
            } : {
                label: "LLM-grounded answer",
                cls: "border-success/30 bg-success/10 text-success"
            };
        }
        return {
            label: "Offline · evidence excerpts only",
            cls: "border-warning/30 bg-warning/10 text-warning"
        };
    };
    const hasThread = messages.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col overflow-hidden rounded-xl border border-primary/25 bg-card/40 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 items-center justify-between border-b border-border bg-card/60 px-3.5 py-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "h-3.5 w-3.5 text-primary-300"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-bold uppercase tracking-wider text-primary-300",
                                children: "Grounded Chat"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 412,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden text-[10px] text-muted-foreground sm:inline",
                                children: "answers cite vault evidence only"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-1.5",
                        children: [
                            liveConnected && peersOnline.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-1.5 py-0.5 text-[9px] font-medium text-success",
                                title: peersOnline.map((p)=>p.name).join(", "),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "h-2.5 w-2.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    peersOnline.length,
                                    " live"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            hasThread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>void clearThread(),
                                className: "flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground",
                                "aria-label": "Clear conversation",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Clear"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 430,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/chat-widget.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brain-scroll min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5",
                children: [
                    messages.length === 0 && !busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full flex-col items-center justify-center gap-3 px-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary/15",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-4 w-4 text-primary-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 445,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-xs text-xs leading-relaxed text-muted-foreground",
                                children: "Ask this project's brain — every answer is grounded in your captured evidence and cites its sources."
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 448,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap justify-center gap-1.5",
                                children: SUGGESTIONS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>void run("ask", s),
                                        className: "rounded-full border border-border bg-card/70 px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary-300",
                                        children: s
                                    }, s, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 454,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 444,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    messages.map((msg)=>{
                        const badge = badgeFor(msg);
                        return msg.role === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-end gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 ${msg.peerAuthor ? "border border-dashed border-primary/40 bg-primary/10" : "bg-primary/20"}`,
                                    children: [
                                        msg.peerAuthor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary-300",
                                            children: [
                                                msg.peerAuthor.name,
                                                " · live"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                                            lineNumber: 478,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "whitespace-pre-wrap text-xs leading-relaxed text-foreground",
                                            children: msg.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                                            lineNumber: 482,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-right text-[9px] text-muted-foreground/70",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(msg.ts)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                                            lineNumber: 485,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                    lineNumber: 470,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "h-3 w-3 text-secondary-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 490,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                    lineNumber: 489,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, msg.id, true, {
                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                            lineNumber: 469,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-3 w-3 text-primary-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 496,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                    lineNumber: 495,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 max-w-[88%] space-y-1.5",
                                    children: [
                                        !msg.pending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${badge.cls}`,
                                            children: badge.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                                            lineNumber: 500,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `whitespace-pre-wrap rounded-2xl rounded-bl-sm border px-3 py-2 text-xs leading-relaxed ${msg.failed ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-border bg-card/80 text-foreground/95"}`,
                                            children: msg.failed ? msg.content : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                                components: markdownComponents,
                                                children: msg.content
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                lineNumber: 516,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                                            lineNumber: 506,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        msg.sources && msg.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70",
                                                    children: [
                                                        msg.sources.length,
                                                        " source(s)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                msg.sources.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border border-border bg-card/50 px-2.5 py-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-semibold text-foreground/90",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-primary-300",
                                                                        children: [
                                                                            "[",
                                                                            i + 1,
                                                                            "]"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                                        lineNumber: 530,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " ",
                                                                    s.title,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1.5 font-normal text-muted-foreground/60",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(s.captured_at)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                                        lineNumber: 531,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground",
                                                                children: s.excerpt
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                                            lineNumber: 520,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                    lineNumber: 498,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, msg.id, true, {
                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                            lineNumber: 494,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0));
                    }),
                    busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-3 w-3 animate-pulse text-primary-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/chat-widget.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 549,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-card/70 px-3 py-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "typing-dot h-1.5 w-1.5 rounded-full bg-primary-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 553,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "typing-dot h-1.5 w-1.5 rounded-full bg-primary-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 554,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "typing-dot h-1.5 w-1.5 rounded-full bg-primary-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 555,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1.5 text-[10px] text-muted-foreground",
                                        children: stage ?? "synthesizing…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                                        lineNumber: 556,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 552,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 548,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: endRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/chat-widget.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            peerTyping.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 items-center gap-1.5 px-3.5 pb-1 text-[10px] text-muted-foreground",
                role: "status",
                "aria-live": "polite",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "typing-dot h-1.5 w-1.5 rounded-full bg-primary-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 572,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "typing-dot h-1.5 w-1.5 rounded-full bg-primary-400",
                        style: {
                            animationDelay: "0.15s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 573,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "typing-dot h-1.5 w-1.5 rounded-full bg-primary-400",
                        style: {
                            animationDelay: "0.3s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 574,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            peerTyping.join(", "),
                            " ",
                            peerTyping.length > 1 ? "are" : "is",
                            " typing…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 575,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/chat-widget.tsx",
                lineNumber: 567,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 items-center gap-1.5 border-t border-border bg-card/60 p-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: input,
                        onChange: (e)=>handleInputChange(e.target.value),
                        onKeyDown: (e)=>e.key === "Enter" && void run("ask"),
                        placeholder: "Ask this project's brain…",
                        "aria-label": "Grounded question",
                        disabled: busy,
                        className: "min-w-0 flex-1 rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:border-primary focus:outline-none disabled:opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 583,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>void run("ask"),
                        disabled: busy || !input.trim(),
                        "aria-label": "Ask",
                        title: "Ask (evidence-grounded answer)",
                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/chat-widget.tsx",
                            lineNumber: 600,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>void run("synthesize"),
                        disabled: busy || !input.trim(),
                        "aria-label": "Synthesize wiki page",
                        title: "Synthesize (whole-topic wiki synthesis)",
                        className: "flex h-8 shrink-0 items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-2.5 text-[11px] font-medium text-primary-300 transition-colors hover:bg-primary/20 disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 609,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden md:inline",
                                children: "Synthesize"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/chat-widget.tsx",
                                lineNumber: 610,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/chat-widget.tsx",
                        lineNumber: 602,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/chat-widget.tsx",
                lineNumber: 582,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/chat-widget.tsx",
        lineNumber: 407,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ChatWidget, "4j+jYEdI2sfIz/O9iQI2mRRUy2w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = ChatWidget;
var _c;
__turbopack_context__.k.register(_c, "ChatWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/dialogs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CaptureDialog",
    ()=>CaptureDialog,
    "DecisionDialog",
    ()=>DecisionDialog,
    "FeedbackDialog",
    ()=>FeedbackDialog,
    "NewProjectDialog",
    ()=>NewProjectDialog,
    "SearchDialog",
    ()=>SearchDialog,
    "SelfTestDialog",
    ()=>SelfTestDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Dialogs — Zero-Save Capture, New Project, Log Decision, Search Results, Self-Test
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/telemetry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const FIELD_CLS = "w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none";
const CaptureDialog = ()=>{
    _s();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "CaptureDialog.useWorkspace[open]": (s)=>s.captureOpen
    }["CaptureDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "CaptureDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["CaptureDialog.useWorkspace[close]"]);
    const refreshAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "CaptureDialog.useWorkspace[refreshAll]": (s)=>s.refreshAll
    }["CaptureDialog.useWorkspace[refreshAll]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("terminal");
    const [windowTitle, setWindowTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async ()=>{
        if (!content.trim()) return;
        setBusy(true);
        try {
            const res = await fetch("/api/capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    raw_content: content,
                    item_type: type,
                    window_title: windowTitle || "Quick Capture",
                    source_app: "Workspace UI"
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            if (data.status === "duplicate_merged") {
                // v2.1: exact duplicate folding — the repeat capture merged into the existing item
                toast({
                    title: "Duplicate folded — no new item",
                    description: data.toastNotification
                });
            } else {
                toast({
                    title: "Captured — Zero-Save",
                    description: data.toastNotification
                });
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEvent"])("capture_saved", {
                status: data.status,
                item_type: type
            });
            setContent("");
            setWindowTitle("");
            close("captureOpen");
            await refreshAll();
        } catch (e) {
            toast({
                title: "Capture failed",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("captureOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "⚡ Zero-Save Capture"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Paste anything. Project routing, model selection, fix extraction, and graph linking are automatic."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 8,
                    value: content,
                    onChange: (e)=>setContent(e.target.value),
                    placeholder: "Paste a stack trace, terminal error, decision note, or any knowledge…",
                    className: "w-full resize-none rounded-lg border border-border bg-background/80 p-3 font-mono text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none",
                    "aria-label": "Capture content"
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: type,
                            onChange: (e)=>setType(e.target.value),
                            "aria-label": "Item type",
                            className: "rounded border border-input bg-muted px-2 py-1.5 text-xs text-foreground focus:outline-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "note",
                                    children: "📝 Note"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "screenshot",
                                    children: "📸 Screenshot"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "terminal",
                                    children: "💻 Terminal"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "clip",
                                    children: "📋 Web Clip"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: windowTitle,
                            onChange: (e)=>setWindowTitle(e.target.value),
                            placeholder: "Window title (optional)",
                            className: "rounded border border-input bg-background/70 px-2.5 py-1.5 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none",
                            "aria-label": "Window title"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: submit,
                        disabled: busy || !content.trim(),
                        className: "w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                        children: busy ? "Capturing…" : "Capture (Zero-Save)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/dialogs.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/dialogs.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CaptureDialog, "rWSPSTZSJR8rsOWTAzT9LJFtrWA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = CaptureDialog;
const NewProjectDialog = ()=>{
    _s1();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "NewProjectDialog.useWorkspace[open]": (s)=>s.newProjectOpen
    }["NewProjectDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "NewProjectDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["NewProjectDialog.useWorkspace[close]"]);
    const refreshAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "NewProjectDialog.useWorkspace[refreshAll]": (s)=>s.refreshAll
    }["NewProjectDialog.useWorkspace[refreshAll]"]);
    const selectProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "NewProjectDialog.useWorkspace[selectProject]": (s)=>s.selectProject
    }["NewProjectDialog.useWorkspace[selectProject]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [rootPath, setRootPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [keywords, setKeywords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [gitRemotes, setGitRemotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async ()=>{
        if (!name.trim()) return;
        setBusy(true);
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    root_path: rootPath,
                    keywords: keywords.split(",").map((k)=>k.trim()).filter(Boolean),
                    git_remotes: gitRemotes.split(",").map((k)=>k.trim()).filter(Boolean),
                    rolling_summary: summary
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            toast({
                title: "Project space created",
                description: `${data.name} is ready to receive captures.`
            });
            setName("");
            setRootPath("");
            setKeywords("");
            setGitRemotes("");
            setSummary("");
            close("newProjectOpen");
            await refreshAll();
            if (data.id) selectProject(data.id);
        } catch (e) {
            toast({
                title: "Could not create project",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("newProjectOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "＋ New Project Space"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Register fingerprints (root path, keywords, git remotes) so captures auto-route here."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Project name *",
                            value: name,
                            onChange: (e)=>setName(e.target.value),
                            "aria-label": "Project name"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Root path (e.g. C:/dev/my-app)",
                            value: rootPath,
                            onChange: (e)=>setRootPath(e.target.value),
                            "aria-label": "Root path"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Keywords, comma separated (e.g. gateway.mjs, render)",
                            value: keywords,
                            onChange: (e)=>setKeywords(e.target.value),
                            "aria-label": "Keywords"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Git remotes, comma separated (e.g. github.com/you/repo)",
                            value: gitRemotes,
                            onChange: (e)=>setGitRemotes(e.target.value),
                            "aria-label": "Git remotes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: `${FIELD_CLS} resize-none`,
                            rows: 3,
                            placeholder: "Rolling summary — compressed project memory injected as Tier 1 context",
                            value: summary,
                            onChange: (e)=>setSummary(e.target.value),
                            "aria-label": "Rolling summary"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: submit,
                        disabled: busy || !name.trim(),
                        className: "w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                        children: busy ? "Creating…" : "Create Project Space"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/dialogs.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 188,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/dialogs.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(NewProjectDialog, "a6dAF692EW8ngG3m19N5dCaAZ4Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c1 = NewProjectDialog;
const DecisionDialog = ()=>{
    _s2();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DecisionDialog.useWorkspace[open]": (s)=>s.decisionOpen
    }["DecisionDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DecisionDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["DecisionDialog.useWorkspace[close]"]);
    const selectedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DecisionDialog.useWorkspace[selectedId]": (s)=>s.selectedId
    }["DecisionDialog.useWorkspace[selectedId]"]);
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DecisionDialog.useWorkspace[details]": (s)=>s.details
    }["DecisionDialog.useWorkspace[details]"]);
    const refreshAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "DecisionDialog.useWorkspace[refreshAll]": (s)=>s.refreshAll
    }["DecisionDialog.useWorkspace[refreshAll]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [decision, setDecision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [reasoning, setReasoning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [alternatives, setAlternatives] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async ()=>{
        if (!title.trim() || !decision.trim() || !reasoning.trim() || !selectedId) return;
        setBusy(true);
        try {
            const res = await fetch("/api/decisions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    project_id: selectedId,
                    title,
                    decision,
                    reasoning,
                    alternatives: alternatives.split(",").map((a)=>a.trim()).filter(Boolean)
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            toast({
                title: "Decision logged",
                description: "Future AI sessions must respect it (Tier 2)."
            });
            setTitle("");
            setDecision("");
            setReasoning("");
            setAlternatives("");
            close("decisionOpen");
            await refreshAll();
        } catch (e) {
            toast({
                title: "Could not log decision",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("decisionOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "⚖️ Log Architectural Decision"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: [
                                "Project: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-primary-300",
                                    children: details?.project.name ?? "—"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 274,
                                    columnNumber: 22
                                }, ("TURBOPACK compile-time value", void 0)),
                                " · recorded into Tier 2 of every future context payload."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Decision title *",
                            value: title,
                            onChange: (e)=>setTitle(e.target.value),
                            "aria-label": "Decision title"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Chosen approach *",
                            value: decision,
                            onChange: (e)=>setDecision(e.target.value),
                            "aria-label": "Chosen approach"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: `${FIELD_CLS} resize-none`,
                            rows: 3,
                            placeholder: "Reasoning *",
                            value: reasoning,
                            onChange: (e)=>setReasoning(e.target.value),
                            "aria-label": "Reasoning"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: FIELD_CLS,
                            placeholder: "Alternatives rejected, comma separated",
                            value: alternatives,
                            onChange: (e)=>setAlternatives(e.target.value),
                            "aria-label": "Alternatives"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: submit,
                        disabled: busy || !title.trim() || !decision.trim() || !reasoning.trim(),
                        className: "w-full rounded-lg bg-success px-4 py-2 text-xs font-semibold text-success-foreground transition-colors hover:bg-success/80 disabled:opacity-50",
                        children: busy ? "Logging…" : "Log Decision"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/dialogs.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 270,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/dialogs.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(DecisionDialog, "u3OGCBltCEuE+OqKwAV/xApId6o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c2 = DecisionDialog;
const SearchDialog = ()=>{
    _s3();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SearchDialog.useWorkspace[open]": (s)=>s.searchOpen
    }["SearchDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SearchDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["SearchDialog.useWorkspace[close]"]);
    const seed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SearchDialog.useWorkspace[seed]": (s)=>s.searchSeed
    }["SearchDialog.useWorkspace[seed]"]);
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SearchDialog.useWorkspace[details]": (s)=>s.details
    }["SearchDialog.useWorkspace[details]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(seed);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [solutions, setSolutions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("vault");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ran, setRan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchDialog.useCallback[run]": async (q, m = "vault")=>{
            if (!q.trim()) return;
            setLoading(true);
            setRan(true);
            try {
                if (m === "cross") {
                    // v2: search OTHER projects for a fix that already solved this bug
                    const params = new URLSearchParams({
                        q
                    });
                    if (details?.project.id) params.set("exclude_project_id", details.project.id);
                    const res = await fetch(`/api/cross-project?${params.toString()}`, {
                        cache: "no-store"
                    });
                    const data = await res.json();
                    setSolutions(data.solutions ?? []);
                    setResults([]);
                } else {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
                        cache: "no-store"
                    });
                    const data = await res.json();
                    setResults(data.results ?? []);
                    setSolutions([]);
                }
            } catch  {
                setResults([]);
                setSolutions([]);
                toast({
                    title: "Search failed",
                    variant: "destructive"
                });
            } finally{
                setLoading(false);
            }
        }
    }["SearchDialog.useCallback[run]"], [
        toast,
        details
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchDialog.useEffect": ()=>{
            if (open && seed) {
                setQuery(seed);
                void run(seed, mode);
            }
            if (!open) {
                setRan(false);
                setResults([]);
                setSolutions([]);
            }
        }
    }["SearchDialog.useEffect"], [
        open,
        seed,
        mode,
        run
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("searchOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center gap-2 text-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "h-4 w-4 text-primary-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 363,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Universal Vault Search"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: [
                                "Full-text + semantic search across every capture — or switch to",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-success",
                                    children: " Cross-Project"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " to find fixes already solved in your other projects."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 361,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5",
                    role: "tablist",
                    "aria-label": "Search mode",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            role: "tab",
                            "aria-selected": mode === "vault",
                            onClick: ()=>{
                                setMode("vault");
                                if (ran && query.trim()) void run(query, "vault");
                            },
                            className: `rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${mode === "vault" ? "border-primary/50 bg-primary/15 text-primary-300" : "border-border text-muted-foreground hover:text-foreground"}`,
                            children: "This vault"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 373,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            role: "tab",
                            "aria-selected": mode === "cross",
                            onClick: ()=>{
                                setMode("cross");
                                if (ran && query.trim()) void run(query, "cross");
                            },
                            className: `rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${mode === "cross" ? "border-success/50 bg-success/15 text-success" : "border-border text-muted-foreground hover:text-foreground"}`,
                            title: "Cross-Project Learning: find the fix that already worked in another project",
                            children: "Cross-Project Fixes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 372,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: query,
                            onChange: (e)=>setQuery(e.target.value),
                            onKeyDown: (e)=>e.key === "Enter" && run(query, mode),
                            placeholder: "Search the entire brain…",
                            className: "flex-1 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none",
                            "aria-label": "Search query",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 407,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>run(query, mode),
                            className: "rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-400",
                            children: "Search"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 417,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 406,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "max-h-[50vh] pr-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-xs text-muted-foreground",
                                children: "Searching…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/dialogs.tsx",
                                lineNumber: 427,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            !loading && ran && mode === "vault" && results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-xs text-muted-foreground",
                                children: "No matches in the vault."
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/dialogs.tsx",
                                lineNumber: 429,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            !loading && ran && mode === "cross" && solutions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-xs text-muted-foreground",
                                children: "No reusable fixes found in your other projects — you are breaking new ground here."
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/dialogs.tsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            mode === "cross" && solutions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-success/25 bg-success/5 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success",
                                                    children: s.source_project
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-foreground",
                                                    children: s.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto text-[10px] text-muted-foreground/70",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(s.captured_at)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/dialogs.tsx",
                                            lineNumber: 439,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        s.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
                                            children: s.summary
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/dialogs.tsx",
                                            lineNumber: 446,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        s.suggested_fix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 font-mono text-[11px] text-success",
                                            children: [
                                                "Reusable fix: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded bg-background/80 px-1.5 py-0.5",
                                                    children: s.suggested_fix
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/dialogs.tsx",
                                            lineNumber: 448,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, s.item_id, true, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 438,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))),
                            mode === "vault" && results.map((r)=>{
                                const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemTypeStyle"])(r.itemType);
                                const Icon = style.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-border bg-card/50 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    className: "h-3.5 w-3.5 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold text-foreground",
                                                    children: r.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded border px-1.5 py-0.5 text-[10px] uppercase ${style.badge}`,
                                                    children: style.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto text-[10px] text-muted-foreground/70",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shortTime"])(r.capturedAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/brain/dialogs.tsx",
                                            lineNumber: 460,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        r.structuredSummary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
                                            children: r.structuredSummary
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/dialogs.tsx",
                                            lineNumber: 469,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        r.filePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 font-mono text-[10px] text-muted-foreground/60",
                                            children: r.filePath
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/dialogs.tsx",
                                            lineNumber: 472,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 459,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/dialogs.tsx",
                        lineNumber: 426,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 425,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 360,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/dialogs.tsx",
        lineNumber: 359,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s3(SearchDialog, "7bhxrTs0tE6g2aZ1YLsv8bPqXyc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c3 = SearchDialog;
const SelfTestDialog = ()=>{
    _s4();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SelfTestDialog.useWorkspace[open]": (s)=>s.selfTestOpen
    }["SelfTestDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SelfTestDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["SelfTestDialog.useWorkspace[close]"]);
    const refreshAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "SelfTestDialog.useWorkspace[refreshAll]": (s)=>s.refreshAll
    }["SelfTestDialog.useWorkspace[refreshAll]"]);
    const [checks, setChecks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ok, setOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const runTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SelfTestDialog.useCallback[runTest]": async ()=>{
            setRunning(true);
            setChecks(null);
            try {
                const res = await fetch("/api/self-test", {
                    cache: "no-store"
                });
                const data = await res.json();
                setChecks(data.checks ?? []);
                setOk(Boolean(data.ok));
                void refreshAll();
            } catch  {
                setChecks([
                    {
                        name: "Network",
                        status: "FAIL",
                        detail: "Could not reach /api/self-test"
                    }
                ]);
                setOk(false);
            } finally{
                setRunning(false);
            }
        }
    }["SelfTestDialog.useCallback[runTest]"], [
        refreshAll
    ]);
    // Re-run the harness every time the dialog opens (runTest is stable via useCallback)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfTestDialog.useEffect": ()=>{
            if (open) void runTest();
        }
    }["SelfTestDialog.useEffect"], [
        open,
        runTest
    ]);
    const iconFor = (status)=>status === "PASS" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-success"
        }, void 0, false, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 520,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)) : status === "WARN" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            className: "h-4 w-4 text-warning"
        }, void 0, false, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 522,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "h-4 w-4 text-destructive"
        }, void 0, false, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 524,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("selfTestOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "🩺 Guided Scenario & Chaos Test"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 531,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Runs 10 real-world scenarios against the live engine: vault init, zero-save capture, ambiguous multi-project chaos, two-way disk sync, memory compression & session replay, anti-drift prompt budget, cross-project reuse, MCP resilience, v2.1 exact duplicate folding, and v2.1 inbox triage + grounded ask — with plain-English fix pointers if anything ever breaks."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 530,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "p-4 text-center text-xs text-muted-foreground",
                            children: "Running diagnostics…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 542,
                            columnNumber: 23
                        }, ("TURBOPACK compile-time value", void 0)),
                        checks?.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2.5 rounded-lg border border-border bg-card/50 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-0.5",
                                        children: iconFor(c.status)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/dialogs.tsx",
                                        lineNumber: 545,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-semibold text-foreground",
                                                children: c.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/dialogs.tsx",
                                                lineNumber: 547,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 break-words text-[11px] text-muted-foreground",
                                                children: c.detail
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/brain/dialogs.tsx",
                                                lineNumber: 548,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/brain/dialogs.tsx",
                                        lineNumber: 546,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, c.name, true, {
                                fileName: "[project]/src/components/brain/dialogs.tsx",
                                lineNumber: 544,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))),
                        checks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `pt-1 text-center text-xs font-semibold ${ok ? "text-success" : "text-warning"}`,
                            children: ok ? `🎉 ALL ${checks.length}/${checks.length} SCENARIOS PASSED! Your Project Brain OS is 100% verified.` : "Some scenarios need attention — check the fix hints above."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 553,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 541,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: runTest,
                        disabled: running,
                        className: "w-full rounded-lg border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground/90 transition-colors hover:bg-accent disabled:opacity-50",
                        children: running ? "Running…" : "Run Again"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/dialogs.tsx",
                        lineNumber: 562,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 561,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 529,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/dialogs.tsx",
        lineNumber: 528,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s4(SelfTestDialog, "httVRWkSAe3nse4RT4LYfUDk148=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"]
    ];
});
_c4 = SelfTestDialog;
const FeedbackDialog = ()=>{
    _s5();
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "FeedbackDialog.useWorkspace[open]": (s)=>s.feedbackOpen
    }["FeedbackDialog.useWorkspace[open]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])({
        "FeedbackDialog.useWorkspace[close]": (s)=>s.closeDialog
    }["FeedbackDialog.useWorkspace[close]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("general");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async ()=>{
        if (message.trim().length < 4) {
            toast({
                title: "Tell us a bit more",
                description: "At least 4 characters, please.",
                variant: "destructive"
            });
            return;
        }
        setBusy(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    category,
                    path: window.location.pathname
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error ?? `Feedback -> ${res.status}`);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$telemetry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEvent"])("feedback_submitted", {
                category
            });
            toast({
                title: "Feedback received",
                description: "Thank you — it's on the operator's review feed."
            });
            setMessage("");
            close("feedbackOpen");
        } catch (e) {
            toast({
                title: "Could not send feedback",
                description: e instanceof Error ? e.message : "Unknown error",
                variant: "destructive"
            });
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (o)=>!o && close("feedbackOpen"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "border-border bg-card text-foreground sm:max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "Send Feedback"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 623,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Report a bug, suggest a feature, or just say what works. Goes straight to the operator's review feed — no external service involved."
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 624,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 622,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1.5",
                            role: "group",
                            "aria-label": "Feedback category",
                            children: [
                                "bug",
                                "feature",
                                "general"
                            ].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCategory(c),
                                    "aria-pressed": category === c,
                                    className: `rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${category === c ? c === "bug" ? "border-destructive/40 bg-destructive/10 text-destructive" : c === "feature" ? "border-success/40 bg-success/10 text-success" : "border-primary/40 bg-primary/10 text-primary-300" : "border-border text-muted-foreground hover:text-foreground"}`,
                                    children: c
                                }, c, false, {
                                    fileName: "[project]/src/components/brain/dialogs.tsx",
                                    lineNumber: 633,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 631,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            rows: 5,
                            value: message,
                            onChange: (e)=>setMessage(e.target.value),
                            placeholder: "What happened, or what would make Brain OS better?",
                            "aria-label": "Feedback message",
                            className: "w-full resize-none rounded-lg border border-border bg-background/80 p-3 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/dialogs.tsx",
                            lineNumber: 651,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 630,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>void submit(),
                        disabled: busy || message.trim().length < 4,
                        className: "w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50",
                        children: busy ? "Sending…" : "Send Feedback"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/dialogs.tsx",
                        lineNumber: 662,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/dialogs.tsx",
                    lineNumber: 661,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/brain/dialogs.tsx",
            lineNumber: 621,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/brain/dialogs.tsx",
        lineNumber: 620,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s5(FeedbackDialog, "5IOxMTgxj4oy5aMshYvj492o3vs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$workspace$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c5 = FeedbackDialog;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "CaptureDialog");
__turbopack_context__.k.register(_c1, "NewProjectDialog");
__turbopack_context__.k.register(_c2, "DecisionDialog");
__turbopack_context__.k.register(_c3, "SearchDialog");
__turbopack_context__.k.register(_c4, "SelfTestDialog");
__turbopack_context__.k.register(_c5, "FeedbackDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/graph-viewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphViewer",
    ()=>GraphViewer,
    "computeLayoutTargets",
    ()=>computeLayoutTargets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// GraphViewer — data-agnostic, interactive knowledge-graph visualization.
//
// Design-system blueprint ("Deep Intelligence"):
//   - dark minimalist canvas, nodes sized by importance, brand violet for
//     active/central nodes, muted neutrals for peripheral elements;
//   - thin subtle edges that become prominent on hover or selection;
//   - zoom/pan controls, node search handled by the parent, legend by parent.
//
// Engineering blueprint:
//   - data-agnostic: normalized { nodes, links } props, no domain knowledge;
//   - highly configurable: visuals + behavior via props and CSS variables;
//   - performance: O(n²) repulsion is fine at vault scale (≤ few hundred
//     nodes); the simulation runs outside React and publishes position
//     snapshots for a ref-free render path;
//   - extensible: node kinds carry ring colors; pass any kind you like.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize.js [app-client] (ecmascript) <export default as Maximize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/index.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const MIN_ALPHA = 0.008;
const ALPHA_DECAY = 0.984;
const DAMPING = 0.86;
const REPULSION = 2400;
const LINK_REST = 150;
const LINK_STRENGTH = 0.055;
const GRAVITY = 0.014;
const MIN_GAP = 64;
const LABEL_MAX = 24;
const KIND_COLOR = {
    error: "var(--destructive)",
    fix: "var(--rel-fixed-by)",
    decision: "var(--rel-decided-on)",
    file: "var(--info)",
    capture: "var(--rel-related-to)",
    concept: "var(--graph-node-stroke)"
};
const RELATIONS = [
    "FIXED_BY",
    "DECIDED_ON",
    "MENTIONED_IN",
    "RELATED_TO"
];
const clamp = (v, lo, hi)=>Math.min(hi, Math.max(lo, v));
function computeLayoutTargets(nodes, links, layout) {
    if (layout === "force" || nodes.length === 0) return null;
    const ids = nodes.map((n)=>n.id);
    const outAdj = new Map();
    const inDeg = new Map();
    for (const id of ids){
        outAdj.set(id, []);
        inDeg.set(id, 0);
    }
    for (const l of links){
        if (!outAdj.has(l.source) || !outAdj.has(l.target) || l.source === l.target) continue;
        outAdj.get(l.source).push(l.target);
        inDeg.set(l.target, (inDeg.get(l.target) ?? 0) + 1);
    }
    const targets = new Map();
    if (layout === "hierarchy") {
        let roots = ids.filter((id)=>(inDeg.get(id) ?? 0) === 0);
        if (roots.length === 0) {
            // Cyclic graph: seed from the most connected node.
            roots = [
                ids.reduce((a, b)=>outAdj.get(a).length >= outAdj.get(b).length ? a : b)
            ];
        }
        const layerOf = new Map();
        const queue = roots.map((id)=>{
            layerOf.set(id, 0);
            return id;
        });
        for(let qi = 0; qi < queue.length; qi++){
            const cur = queue[qi];
            const layer = layerOf.get(cur) ?? 0;
            for (const next of outAdj.get(cur) ?? []){
                if (!layerOf.has(next)) {
                    layerOf.set(next, layer + 1);
                    queue.push(next);
                }
            }
        }
        const maxLayer = Math.max(0, ...[
            ...layerOf.values()
        ]);
        const buckets = Array.from({
            length: maxLayer + 1
        }, ()=>[]);
        for (const id of ids)buckets[layerOf.get(id) ?? maxLayer].push(id);
        buckets.forEach((bucket, layer)=>{
            bucket.forEach((id, i)=>{
                targets.set(id, {
                    x: (i - (bucket.length - 1) / 2) * 120,
                    y: layer * 110
                });
            });
        });
        return targets;
    }
    // radial — BFS rings around the most connected node
    const totalDeg = (id)=>(outAdj.get(id)?.length ?? 0) + (inDeg.get(id) ?? 0);
    const center = ids.reduce((a, b)=>totalDeg(a) >= totalDeg(b) ? a : b);
    const ringOf = new Map([
        [
            center,
            0
        ]
    ]);
    const queue = [
        center
    ];
    while(queue.length > 0){
        const cur = queue.shift();
        const ring = ringOf.get(cur);
        for (const next of outAdj.get(cur) ?? []){
            if (!ringOf.has(next)) {
                ringOf.set(next, ring + 1);
                queue.push(next);
            }
        }
        for (const id of inDeg.keys()){
            // also walk incoming edges so directed-only backlinks land on a ring
            if (id === cur || ringOf.has(id)) continue;
            if ((outAdj.get(id) ?? []).includes(cur)) {
                ringOf.set(id, ring + 1);
                queue.push(id);
            }
        }
    }
    const maxRing = Math.max(0, ...[
        ...ringOf.values()
    ]);
    const rings = Array.from({
        length: maxRing + 1
    }, ()=>[]);
    for (const id of ids)rings[ringOf.get(id) ?? maxRing].push(id);
    rings.forEach((ring, d)=>{
        const radius = d === 0 ? 0 : 90 + d * 95;
        ring.forEach((id, i)=>{
            if (d === 0) {
                targets.set(id, {
                    x: 0,
                    y: 0
                });
                return;
            }
            const angle = i / ring.length * Math.PI * 2 + d * 0.55;
            targets.set(id, {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            });
        });
    });
    return targets;
}
/**
 * One animation frame of the layout: pairwise repulsion (+soft collision), link
 * springs, then EITHER guided-target pull (hierarchy/radial) or gravity toward
 * the origin (force), followed by damped integration. Reads node data fresh from
 * propsRef every frame so data edits apply mid-animation.
 */ function runSimulation(ctx) {
    const { nodes, links } = ctx.propsRef.current;
    const sims = ctx.sims;
    const list = [];
    for (const n of nodes){
        const s = sims.get(n.id);
        if (s) list.push({
            id: n.id,
            s
        });
    }
    // node repulsion (pairwise)
    for(let i = 0; i < list.length; i++){
        const a = list[i].s;
        for(let j = i + 1; j < list.length; j++){
            const b = list[j].s;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy + 0.01;
            const d = Math.sqrt(d2);
            let f = REPULSION / d2;
            if (d < MIN_GAP) f += (MIN_GAP - d) * 0.06; // soft collision
            const fx = dx / d * f;
            const fy = dy / d * f;
            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
        }
    }
    // link springs
    for (const l of links){
        const a = sims.get(l.source);
        const b = sims.get(l.target);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - LINK_REST) * LINK_STRENGTH;
        const fx = dx / d * f;
        const fy = dy / d * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
    }
    // gravity or guided-target pull + integrate
    const targets = ctx.targets.current;
    for (const { id, s } of list){
        const target = targets?.get(id);
        if (target) {
            s.vx += (target.x - s.x) * 0.055;
            s.vy += (target.y - s.y) * 0.055;
        } else {
            s.vx += -s.x * GRAVITY;
            s.vy += -s.y * GRAVITY;
        }
        if (s.fx !== null && s.fy !== null) {
            s.x = s.fx;
            s.y = s.fy;
            s.vx = 0;
            s.vy = 0;
        } else {
            s.vx *= DAMPING;
            s.vy *= DAMPING;
            s.x += s.vx;
            s.y += s.vy;
        }
    }
    // Publish a fresh render snapshot (keeps the React render path ref-free)
    const snapshot = {};
    for (const { id, s } of list){
        snapshot[id] = {
            x: s.x,
            y: s.y
        };
    }
    ctx.setPositions(snapshot);
    ctx.alphaRef.current *= ALPHA_DECAY;
    ctx.rafRef.current = ctx.alphaRef.current > MIN_ALPHA ? requestAnimationFrame(()=>runSimulation(ctx)) : null;
}
const GraphViewer = ({ nodes, links, onNodeClick, selectedId = null, height = 460, className = "", ariaLabel = "Interactive knowledge graph", loading = false, layout: controlledLayout, onLayoutChange })=>{
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ---- layout mode (force | hierarchy | radial) ----
    // Uncontrolled by default; the `layout` prop switches the internal <select>
    // off and lets the parent own the control surface (GraphView tablist).
    const [internalLayout, setInternalLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("force");
    const layout = controlledLayout ?? internalLayout;
    const setLayout = (next)=>{
        if (controlledLayout === undefined) setInternalLayout(next);
        onLayoutChange?.(next);
    };
    const targetsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ---- simulation state (refs: mutated by the rAF loop; painted via state) ----
    const simRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const alphaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        nodes,
        links
    });
    // Sync latest graph data outside of render (react-hooks/refs-compliant)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphViewer.useEffect": ()=>{
            propsRef.current = {
                nodes,
                links
            };
        }
    }["GraphViewer.useEffect"], [
        nodes,
        links
    ]);
    // Render-side mirror of the live simulation — the loop publishes a fresh
    // snapshot each frame, keeping the render path ref-free (react-hooks/refs).
    const [positions, setPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [transform, setTransform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 460,
        y: 230,
        k: 1
    });
    const [hoverId, setHoverId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const panRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ---- degree + radius (memoized) ----
    const degree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphViewer.useMemo[degree]": ()=>{
            const d = new Map();
            for (const l of links){
                d.set(l.source, (d.get(l.source) ?? 0) + 1);
                d.set(l.target, (d.get(l.target) ?? 0) + 1);
            }
            return d;
        }
    }["GraphViewer.useMemo[degree]"], [
        links
    ]);
    const radiusOf = (id)=>{
        const deg = degree.get(id) ?? 0;
        return 9 + Math.min(9, deg * 1.7);
    };
    // ---- adjacency for hover highlighting ----
    const neighbors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphViewer.useMemo[neighbors]": ()=>{
            const m = new Map();
            const add = {
                "GraphViewer.useMemo[neighbors].add": (a, b)=>{
                    if (!m.has(a)) m.set(a, new Set());
                    m.get(a).add(b);
                }
            }["GraphViewer.useMemo[neighbors].add"];
            for (const l of links){
                add(l.source, l.target);
                add(l.target, l.source);
            }
            return m;
        }
    }["GraphViewer.useMemo[neighbors]"], [
        links
    ]);
    // ---- deterministic initial layout (golden-angle spiral; pure render-safe) ----
    const ensureSims = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphViewer.useCallback[ensureSims]": ()=>{
            const sims = simRef.current;
            propsRef.current.nodes.forEach({
                "GraphViewer.useCallback[ensureSims]": (n, i)=>{
                    if (sims.has(n.id)) return;
                    const angle = i * 2.399963; // golden angle
                    const r = 60 + Math.sqrt(i + 1) * 46;
                    sims.set(n.id, {
                        x: Math.cos(angle) * r,
                        y: Math.sin(angle) * r,
                        vx: 0,
                        vy: 0,
                        fx: null,
                        fy: null
                    });
                }
            }["GraphViewer.useCallback[ensureSims]"]);
            for (const id of [
                ...sims.keys()
            ]){
                if (!propsRef.current.nodes.some({
                    "GraphViewer.useCallback[ensureSims]": (n)=>n.id === id
                }["GraphViewer.useCallback[ensureSims]"])) sims.delete(id);
            }
        }
    }["GraphViewer.useCallback[ensureSims]"], []);
    // ---- force tick (module-scope loop; self-recursion lives outside React) ----
    const tick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphViewer.useCallback[tick]": ()=>{
            runSimulation({
                propsRef,
                sims: simRef.current,
                alphaRef,
                rafRef,
                setPositions,
                targets: targetsRef
            });
        }
    }["GraphViewer.useCallback[tick]"], [
        setPositions
    ]);
    const reheat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphViewer.useCallback[reheat]": (alpha)=>{
            alphaRef.current = Math.max(alphaRef.current, alpha);
            if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
        }
    }["GraphViewer.useCallback[reheat]"], [
        tick
    ]);
    // (re)initialize on data or layout change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphViewer.useEffect": ()=>{
            targetsRef.current = computeLayoutTargets(nodes, links, layout);
            ensureSims();
            reheat(1);
        }
    }["GraphViewer.useEffect"], [
        nodes,
        links,
        layout,
        ensureSims,
        reheat
    ]);
    // Stop the loop on unmount. rafRef MUST be reset to null: React StrictMode
    // runs effect -> cleanup -> effect in dev, and a stale non-null id would make
    // reheat() believe a frame is still pending, permanently killing the layout.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphViewer.useEffect": ()=>{
            return ({
                "GraphViewer.useEffect": ()=>{
                    if (rafRef.current !== null) {
                        cancelAnimationFrame(rafRef.current);
                        rafRef.current = null;
                    }
                }
            })["GraphViewer.useEffect"];
        }
    }["GraphViewer.useEffect"], []);
    // ---- zoom (non-passive wheel listener for preventDefault) ----
    const zoomAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphViewer.useCallback[zoomAt]": (clientX, clientY, factor)=>{
            const el = svgRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const px = clientX - rect.left;
            const py = clientY - rect.top;
            setTransform({
                "GraphViewer.useCallback[zoomAt]": (tr)=>{
                    const k = clamp(tr.k * factor, 0.2, 3.2);
                    return {
                        k,
                        x: px - (px - tr.x) / tr.k * k,
                        y: py - (py - tr.y) / tr.k * k
                    };
                }
            }["GraphViewer.useCallback[zoomAt]"]);
        }
    }["GraphViewer.useCallback[zoomAt]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphViewer.useEffect": ()=>{
            const el = svgRef.current;
            if (!el) return;
            const onWheel = {
                "GraphViewer.useEffect.onWheel": (e)=>{
                    e.preventDefault();
                    zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0016));
                }
            }["GraphViewer.useEffect.onWheel"];
            el.addEventListener("wheel", onWheel, {
                passive: false
            });
            return ({
                "GraphViewer.useEffect": ()=>el.removeEventListener("wheel", onWheel)
            })["GraphViewer.useEffect"];
        }
    }["GraphViewer.useEffect"], [
        zoomAt
    ]);
    const fitView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphViewer.useCallback[fitView]": ()=>{
            const el = svgRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const sims = [
                ...simRef.current.values()
            ];
            if (sims.length === 0 || rect.width === 0) return;
            const minX = Math.min(...sims.map({
                "GraphViewer.useCallback[fitView].minX": (s)=>s.x
            }["GraphViewer.useCallback[fitView].minX"]));
            const maxX = Math.max(...sims.map({
                "GraphViewer.useCallback[fitView].maxX": (s)=>s.x
            }["GraphViewer.useCallback[fitView].maxX"]));
            const minY = Math.min(...sims.map({
                "GraphViewer.useCallback[fitView].minY": (s)=>s.y
            }["GraphViewer.useCallback[fitView].minY"]));
            const maxY = Math.max(...sims.map({
                "GraphViewer.useCallback[fitView].maxY": (s)=>s.y
            }["GraphViewer.useCallback[fitView].maxY"]));
            const bw = Math.max(maxX - minX, 80);
            const bh = Math.max(maxY - minY, 80);
            const k = clamp(Math.min(rect.width / bw, rect.height / bh) * 0.82, 0.25, 1.8);
            setTransform({
                k,
                x: rect.width / 2 - (minX + maxX) / 2 * k,
                y: rect.height / 2 - (minY + maxY) / 2 * k
            });
        }
    }["GraphViewer.useCallback[fitView]"], []);
    const zoomBy = (factor)=>{
        const el = svgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
    };
    /** Blueprint "Zoom & Pan Controls": slider maps 20..320 percent onto zoom k. */ const onSliderZoom = (values)=>{
        const el = svgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const desired = clamp(values[0] / 100, 0.2, 3.2);
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, desired / transform.k);
    };
    // ---- pointer interactions ----
    const toGraph = (clientX, clientY)=>{
        const el = svgRef.current;
        const rect = el.getBoundingClientRect();
        return {
            gx: (clientX - rect.left - transform.x) / transform.k,
            gy: (clientY - rect.top - transform.y) / transform.k
        };
    };
    const capturePointer = (e, el)=>{
        try {
            el.setPointerCapture(e.pointerId);
        } catch  {
        // Synthetic pointers (tests, some touch stacks) have no active pointer id —
        // capture is an optimization here, not a requirement.
        }
    };
    const onPointerDownNode = (e, id)=>{
        e.stopPropagation();
        capturePointer(e, e.currentTarget);
        const { gx, gy } = toGraph(e.clientX, e.clientY);
        const s = simRef.current.get(id);
        if (!s) return;
        dragRef.current = {
            id,
            dx: gx - s.x,
            dy: gy - s.y,
            moved: false
        };
        s.fx = gx - dragRef.current.dx;
        s.fy = gy - dragRef.current.dy;
        reheat(0.45);
    };
    const onPointerDownBg = (e)=>{
        capturePointer(e, e.currentTarget);
        panRef.current = {
            px: e.clientX,
            py: e.clientY,
            tx: transform.x,
            ty: transform.y,
            moved: false
        };
    };
    const onPointerMove = (e)=>{
        if (dragRef.current) {
            const { gx, gy } = toGraph(e.clientX, e.clientY);
            const s = simRef.current.get(dragRef.current.id);
            if (s) {
                s.fx = gx - dragRef.current.dx;
                s.fy = gy - dragRef.current.dy;
                dragRef.current.moved = true;
                reheat(0.4);
            }
            return;
        }
        if (panRef.current) {
            const dx = e.clientX - panRef.current.px;
            const dy = e.clientY - panRef.current.py;
            if (Math.abs(dx) + Math.abs(dy) > 3) panRef.current.moved = true;
            setTransform((tr)=>({
                    ...tr,
                    x: panRef.current.tx + dx,
                    y: panRef.current.ty + dy
                }));
        }
    };
    const onPointerUp = ()=>{
        if (dragRef.current) {
            const { id, moved } = dragRef.current;
            const s = simRef.current.get(id);
            if (s) {
                s.fx = null;
                s.fy = null;
            }
            if (!moved && onNodeClick) {
                const node = propsRef.current.nodes.find((n)=>n.id === id);
                if (node) onNodeClick(node);
            }
            dragRef.current = null;
        }
        panRef.current = null;
    };
    // ---- rendering ----
    const isDimmed = (id)=>hoverId !== null && id !== hoverId && !(neighbors.get(hoverId)?.has(id) ?? false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden rounded-xl border border-border bg-[var(--graph-canvas)] ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ref: svgRef,
                role: "application",
                "aria-label": ariaLabel,
                style: {
                    height,
                    touchAction: "none"
                },
                className: "w-full cursor-grab active:cursor-grabbing",
                onPointerDown: onPointerDownBg,
                onPointerMove: onPointerMove,
                onPointerUp: onPointerUp,
                onPointerLeave: onPointerUp,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                id: "graph-grid",
                                width: "26",
                                height: "26",
                                patternUnits: "userSpaceOnUse",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "1",
                                    cy: "1",
                                    r: "1",
                                    fill: "var(--graph-grid)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            RELATIONS.map((rel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                    id: `gv-arrow-${rel}`,
                                    viewBox: "0 0 10 10",
                                    refX: "9",
                                    refY: "5",
                                    markerWidth: "6",
                                    markerHeight: "6",
                                    orient: "auto-start-reverse",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M 0 0 L 10 5 L 0 10 z",
                                        fill: relationColor(rel)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                        lineNumber: 594,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, rel, false, {
                                    fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                    lineNumber: 584,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                id: "gv-arrow-default",
                                viewBox: "0 0 10 10",
                                refX: "9",
                                refY: "5",
                                markerWidth: "6",
                                markerHeight: "6",
                                orient: "auto-start-reverse",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M 0 0 L 10 5 L 0 10 z",
                                    fill: "var(--graph-edge)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                    lineNumber: 598,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                lineNumber: 597,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 579,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        fill: "url(#graph-grid)",
                        opacity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 601,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: `translate(${transform.x},${transform.y}) scale(${transform.k})`,
                        children: [
                            links.map((l, i)=>{
                                const a = positions[l.source];
                                const b = positions[l.target];
                                if (!a || !b) return null;
                                const dx = b.x - a.x;
                                const dy = b.y - a.y;
                                const len = Math.hypot(dx, dy) || 1;
                                const ox = -dy / len * len * 0.1;
                                const oy = dx / len * len * 0.1;
                                const cx = (a.x + b.x) / 2 + ox;
                                const cy = (a.y + b.y) / 2 + oy;
                                // pull the end back so the arrowhead meets the node ring
                                const ex = cx - b.x;
                                const ey = cy - b.y;
                                const el = Math.hypot(ex, ey) || 1;
                                const r2 = radiusOf(l.target);
                                const endX = b.x + ex / el * (r2 + 5);
                                const endY = b.y + ey / el * (r2 + 5);
                                const rel = l.relation ?? "";
                                const highlighted = hoverId !== null && (l.source === hoverId || l.target === hoverId);
                                const relatedToSelection = selectedId !== null && (l.source === selectedId || l.target === selectedId);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${endX} ${endY}`,
                                    fill: "none",
                                    stroke: rel && RELATIONS.includes(rel) ? relationColor(rel) : "var(--graph-edge)",
                                    strokeWidth: highlighted || relatedToSelection ? 2 : 1.2,
                                    strokeOpacity: highlighted || relatedToSelection ? 0.95 : 0.45,
                                    markerEnd: rel && RELATIONS.includes(rel) ? `url(#gv-arrow-${rel})` : "url(#gv-arrow-default)"
                                }, l.id ?? `${l.source}->${l.target}-${i}`, false, {
                                    fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                    lineNumber: 628,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0));
                            }),
                            nodes.map((n)=>{
                                const p = positions[n.id];
                                if (!p) return null;
                                const r = radiusOf(n.id);
                                const kindColor = KIND_COLOR[n.kind ?? "concept"] ?? KIND_COLOR.concept;
                                const dim = isDimmed(n.id);
                                const selected = selectedId === n.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    opacity: dim ? 0.22 : 1,
                                    onPointerDown: (e)=>onPointerDownNode(e, n.id),
                                    onPointerEnter: ()=>!dragRef.current && !panRef.current && setHoverId(n.id),
                                    onPointerLeave: ()=>setHoverId((h)=>h === n.id ? null : h),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    className: "outline-none",
                                    tabIndex: 0,
                                    role: "button",
                                    "aria-label": `Node ${n.label || n.id}${n.kind ? ` — ${n.kind}` : ""}`,
                                    "aria-pressed": selected,
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            onNodeClick?.(n);
                                        }
                                    },
                                    onFocus: ()=>setHoverId(n.id),
                                    onBlur: ()=>setHoverId((h)=>h === n.id ? null : h),
                                    children: [
                                        selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: p.x,
                                            cy: p.y,
                                            r: r + 5,
                                            fill: "none",
                                            stroke: "var(--primary)",
                                            strokeWidth: 1.4,
                                            strokeOpacity: 0.9
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                            lineNumber: 671,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: p.x,
                                            cy: p.y,
                                            r: r,
                                            fill: "var(--graph-node-fill)",
                                            stroke: kindColor,
                                            strokeWidth: selected || hoverId === n.id ? 2.4 : 1.6
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: p.x,
                                            cy: p.y,
                                            r: r - 3.5,
                                            fill: kindColor,
                                            fillOpacity: 0.18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                            lineNumber: 681,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            x: p.x,
                                            y: p.y + r + 12,
                                            textAnchor: "middle",
                                            fontSize: 10,
                                            fontFamily: "var(--font-geist-mono), monospace",
                                            fill: "var(--graph-node-text)",
                                            opacity: 0.92,
                                            style: {
                                                pointerEvents: "none",
                                                userSelect: "none"
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brain$2f$ui$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(n.label || n.id, LABEL_MAX)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                            lineNumber: 682,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, n.id, true, {
                                    fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                    lineNumber: 649,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 603,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                lineNumber: 568,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-2.5 top-2.5 flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                        label: "Zoom in",
                        onClick: ()=>zoomBy(1.25),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                            lineNumber: 703,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 702,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                        label: "Zoom out",
                        onClick: ()=>zoomBy(0.8),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                            lineNumber: 706,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 705,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                        label: "Fit view",
                        onClick: fitView,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__["Maximize"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                            lineNumber: 709,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 708,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                        label: "Re-run layout",
                        onClick: ()=>reheat(1),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                            lineNumber: 712,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                lineNumber: 701,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-2 right-2.5 flex items-center gap-2 rounded-lg border border-border bg-card/90 px-2 py-1.5 backdrop-blur",
                children: [
                    controlledLayout === undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: layout,
                        onChange: (e)=>setLayout(e.target.value),
                        "aria-label": "Graph layout algorithm",
                        className: "cursor-pointer rounded border border-border bg-background/70 px-1.5 py-0.5 text-[10px] text-foreground focus:outline-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "force",
                                children: t("graph.layout.force")
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                lineNumber: 725,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "hierarchy",
                                children: t("graph.layout.hierarchy")
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                lineNumber: 726,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "radial",
                                children: t("graph.layout.radial")
                            }, void 0, false, {
                                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>zoomBy(0.8),
                        "aria-label": "Zoom out",
                        className: "text-muted-foreground transition-colors hover:text-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                            lineNumber: 736,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 730,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                        value: [
                            Math.round(transform.k * 100)
                        ],
                        min: 20,
                        max: 320,
                        step: 5,
                        onValueChange: onSliderZoom,
                        "aria-label": "Zoom level",
                        className: "w-20"
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 738,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>zoomBy(1.25),
                        "aria-label": "Zoom in",
                        className: "text-muted-foreground transition-colors hover:text-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/brain/graph-viewer.tsx",
                            lineNumber: 753,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 747,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-8 text-right text-[10px] tabular-nums text-muted-foreground",
                        children: [
                            Math.round(transform.k * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/brain/graph-viewer.tsx",
                        lineNumber: 755,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                lineNumber: 717,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-10 flex items-center justify-center bg-card/80 backdrop-blur-sm",
                role: "status",
                "aria-label": "Loading graph",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-7 w-7 animate-spin text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/components/brain/graph-viewer.tsx",
                    lineNumber: 766,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                lineNumber: 761,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute bottom-2 left-3 text-[10px] text-muted-foreground/70",
                children: "drag nodes · scroll to zoom · drag canvas to pan · click a node to inspect"
            }, void 0, false, {
                fileName: "[project]/src/components/brain/graph-viewer.tsx",
                lineNumber: 770,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/graph-viewer.tsx",
        lineNumber: 567,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GraphViewer, "Ad4YBauF3ELQKoXwoJ32RNNH+1M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = GraphViewer;
const ControlButton = ({ label, onClick, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        title: label,
        "aria-label": label,
        className: "flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/90 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/brain/graph-viewer.tsx",
        lineNumber: 786,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = ControlButton;
function relationColor(rel) {
    const map = {
        FIXED_BY: "var(--rel-fixed-by)",
        DECIDED_ON: "var(--rel-decided-on)",
        MENTIONED_IN: "var(--rel-mentioned-in)",
        RELATED_TO: "var(--rel-related-to)"
    };
    return map[rel] ?? "var(--graph-edge)";
}
var _c, _c1;
__turbopack_context__.k.register(_c, "GraphViewer");
__turbopack_context__.k.register(_c1, "ControlButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/ui-shared.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ITEM_TYPE_STYLE",
    ()=>ITEM_TYPE_STYLE,
    "OccurrenceBadge",
    ()=>OccurrenceBadge,
    "RELATION_STYLE",
    ()=>RELATION_STYLE,
    "itemTypeStyle",
    ()=>itemTypeStyle,
    "occurrenceOf",
    ()=>occurrenceOf,
    "relationStyle",
    ()=>relationStyle,
    "shortTime",
    ()=>shortTime,
    "timeAgo",
    ()=>timeAgo,
    "truncate",
    ()=>truncate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Shared UI atoms for the Brain workspace.
// Every style routes through the Deep Intelligence semantic tokens
// (globals.css) — raw palette values never appear in components.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard.js [app-client] (ecmascript) <export default as Clipboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
"use client";
;
;
const ITEM_TYPE_STYLE = {
    note: {
        label: "Note",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        badge: "bg-primary/10 text-primary-300 border-primary/30",
        dot: "bg-primary-400"
    },
    screenshot: {
        label: "Screenshot / OCR",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
        badge: "bg-info/10 text-info border-info/30",
        dot: "bg-info"
    },
    terminal: {
        label: "Terminal Log",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"],
        badge: "bg-destructive/10 text-destructive border-destructive/30",
        dot: "bg-destructive"
    },
    clip: {
        label: "Web Clip",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__["Clipboard"],
        badge: "bg-warning/10 text-warning border-warning/30",
        dot: "bg-warning"
    },
    session: {
        label: "Work Session (Compressed)",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
        badge: "bg-success/10 text-success border-success/30",
        dot: "bg-success"
    }
};
function itemTypeStyle(type) {
    return ITEM_TYPE_STYLE[type] ?? ITEM_TYPE_STYLE.note;
}
function occurrenceOf(metadata) {
    return Math.max(1, Number(metadata?.occurrence_count ?? 1));
}
const OccurrenceBadge = ({ metadata })=>{
    const n = occurrenceOf(metadata);
    if (n <= 1) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        title: `Exact duplicate folding: this capture was observed ${n} times (last: ${typeof metadata?.last_seen_at === "string" ? metadata.last_seen_at.slice(0, 16).replace("T", " ") : "—"})`,
        className: "shrink-0 rounded border border-info/30 bg-info/10 px-1.5 py-0.5 text-[10px] font-bold text-info",
        children: [
            "×",
            n
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brain/ui-shared.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = OccurrenceBadge;
const RELATION_STYLE = {
    FIXED_BY: {
        stroke: "var(--rel-fixed-by)",
        chip: "text-warning border-warning/30 bg-warning/10"
    },
    DECIDED_ON: {
        stroke: "var(--rel-decided-on)",
        chip: "text-success border-success/30 bg-success/10"
    },
    MENTIONED_IN: {
        stroke: "var(--rel-mentioned-in)",
        chip: "text-muted-foreground border-border bg-muted/40"
    },
    RELATED_TO: {
        stroke: "var(--rel-related-to)",
        chip: "text-primary-300 border-primary/30 bg-primary/10"
    }
};
function relationStyle(rel) {
    return RELATION_STYLE[rel] ?? RELATION_STYLE.RELATED_TO;
}
function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString();
}
function shortTime(iso) {
    return new Date(iso).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
function truncate(text, max) {
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
var _c;
__turbopack_context__.k.register(_c, "OccurrenceBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brain/workspace-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkspace",
    ()=>useWorkspace
]);
// Workspace state — zustand store for Project Brain OS UI.
// Client-side/UI state lives here; SERVER state flows through TanStack Query
// (blueprint "Centralized State Management") — queries are invalidated via the
// module-level queryClient after store mutations.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$query$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/query-client.ts [app-client] (ecmascript)");
"use client";
;
;
;
/** Monotonic id for loadDetails requests — only the latest may touch state. */ let latestDetailsRequestId = 0;
const useWorkspace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        booted: false,
        bootError: null,
        projects: [],
        selectedId: null,
        details: null,
        loadingDetails: false,
        compressing: false,
        tab: "dashboard",
        searchSeed: "",
        llmBackend: null,
        captureOpen: false,
        newProjectOpen: false,
        decisionOpen: false,
        searchOpen: false,
        selfTestOpen: false,
        settingsOpen: false,
        feedbackOpen: false,
        bootstrap: async ()=>{
            try {
                // GET /health triggers first-boot seeding (3 projects + demo captures)
                // and reports the detected AI backend (Ollama / Cloud / Offline Synthesizer)
                const health = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/health");
                set({
                    llmBackend: health.llm_backend ?? null
                });
                await get().loadProjects();
                const first = get().projects[0];
                if (first) {
                    set({
                        selectedId: first.id
                    });
                    await get().loadDetails(first.id);
                }
                set({
                    booted: true
                });
            } catch (e) {
                set({
                    booted: true,
                    bootError: e instanceof Error ? e.message : "Boot failed"
                });
            }
        },
        loadProjects: async ()=>{
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/projects");
                set({
                    projects: data.projects
                });
            } catch  {
                set({
                    projects: []
                });
            }
        },
        selectProject: (id)=>{
            set({
                selectedId: id
            });
            void get().loadDetails(id);
        },
        loadDetails: async (id)=>{
            const target = id ?? get().selectedId;
            if (!target) return;
            // v2.5: request-id guard — when the user switches projects rapidly, a slow
            // response for an OLD project must never overwrite the details of the
            // currently selected one (out-of-order fetch race).
            const requestId = ++latestDetailsRequestId;
            set({
                loadingDetails: true
            });
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])(`/api/projects/${target}`);
                if (requestId !== latestDetailsRequestId || get().selectedId !== target) return; // stale
                set({
                    details: data,
                    loadingDetails: false
                });
            } catch  {
                if (requestId !== latestDetailsRequestId) return; // a newer request owns the state
                set({
                    details: null,
                    loadingDetails: false
                });
            }
        },
        refreshAll: async ()=>{
            await get().loadProjects();
            await get().loadDetails();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$query$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invalidate"])([
                "dashboard"
            ]); // bento counters reflect the mutation immediately
        },
        compressMemory: async ()=>{
            if (get().compressing) return null;
            set({
                compressing: true
            });
            try {
                const report = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/api/daemon");
                await get().refreshAll();
                return report;
            } catch  {
                return null;
            } finally{
                set({
                    compressing: false
                });
            }
        },
        setTab: (tab)=>set({
                tab
            }),
        openDialog: (d)=>set({
                [d]: true
            }),
        closeDialog: (d)=>set({
                [d]: false
            }),
        openSearch: (seed = "")=>set({
                searchSeed: seed,
                searchOpen: true
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
// Blueprint ("Customizing shadcn/ui Components: The Card Example"): variant-driven
// semantic styling on top of the Deep Intelligence tokens, with an optional
// interactive hover lift for Bento Grid tiles.
const cardVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground border-border",
            primary: "border-primary/40 bg-primary/10 text-foreground",
            secondary: "bg-secondary text-secondary-foreground border-secondary",
            ghost: "bg-transparent text-foreground border-transparent shadow-none"
        },
        interactive: {
            true: "transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/40",
            false: ""
        }
    },
    defaultVariants: {
        variant: "default",
        interactive: false
    }
});
const Card = ({ className, variant, interactive, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(cardVariants({
            variant,
            interactive
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Card;
const CardHeader = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = CardHeader;
const CardTitle = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = CardTitle;
const CardDescription = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = CardDescription;
const CardAction = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = CardAction;
const CardContent = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c5 = CardContent;
const CardFooter = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Dialog = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Dialog;
const DialogTrigger = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = DialogTrigger;
const DialogPortal = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = DialogPortal;
const DialogClose = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = DialogClose;
const DialogOverlay = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = DialogOverlay;
const DialogContent = ({ className, children, showCloseButton = true, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c5 = DialogContent;
const DialogHeader = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c6 = DialogHeader;
const DialogFooter = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c7 = DialogFooter;
const DialogTitle = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c8 = DialogTitle;
const DialogDescription = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
const ScrollArea = ({ className, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "scroll-area",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                "data-slot": "scroll-area-viewport",
                className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ScrollArea;
const ScrollBar = ({ className, orientation = "vertical", ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slider/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const Slider = ({ className, defaultValue, value, min = 0, max = 100, ...props })=>{
    _s();
    const _values = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Slider.useMemo[_values]": ()=>Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
                min,
                max
            ]
    }["Slider.useMemo[_values]"], [
        value,
        defaultValue,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "slider",
        defaultValue: defaultValue,
        value: value,
        min: min,
        max: max,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Track"], {
                "data-slot": "slider-track",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"], {
                    "data-slot": "slider-range",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/slider.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/slider.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            Array.from({
                length: _values.length
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "slider-thumb",
                    className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                }, index, false, {
                    fileName: "[project]/src/components/ui/slider.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/slider.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Slider, "g0y/PG/feYg861SE8jxuAUMRVc0=");
_c = Slider;
;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_EXPIRED_EVENT",
    ()=>AUTH_EXPIRED_EVENT,
    "BrainApiError",
    ()=>BrainApiError,
    "apiDelete",
    ()=>apiDelete,
    "apiFetch",
    ()=>apiFetch,
    "apiGet",
    ()=>apiGet,
    "apiPatch",
    ()=>apiPatch,
    "apiPost",
    ()=>apiPost,
    "apiPut",
    ()=>apiPut
]);
"use client";
class BrainApiError extends Error {
    status;
    constructor(status, message){
        super(message);
        this.name = "BrainApiError";
        this.status = status;
    }
}
const AUTH_EXPIRED_EVENT = "brain:auth-expired";
let refreshInFlight = null;
async function tryRefresh() {
    if (!refreshInFlight) {
        refreshInFlight = fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "same-origin"
        }).then((res)=>res.ok).catch(()=>false).finally(()=>{
            // Clear on next microtask so concurrent 401s share one refresh call.
            setTimeout(()=>{
                refreshInFlight = null;
            }, 0);
        });
    }
    return refreshInFlight;
}
/** Fire-and-forget api_timing sample (slow or failing calls only). */ function reportTiming(url, method, ms, status) {
    if (url.startsWith("/api/metrics")) return; // never recurse
    try {
        void fetch("/api/metrics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "api_timing",
                route: `${method} ${url}`,
                ms,
                status
            }),
            keepalive: true
        }).catch(()=>{});
    } catch  {
    // Telemetry must never throw.
    }
}
async function apiFetch(url, options = {}) {
    const { method = "GET", body, _retried = false } = options;
    const startedAt = typeof performance !== "undefined" ? performance.now() : 0;
    const res = await fetch(url, {
        method,
        credentials: "same-origin",
        headers: body !== undefined ? {
            "Content-Type": "application/json"
        } : undefined,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        cache: "no-store"
    });
    if (res.status === 401 && _retried === false && !url.startsWith("/api/auth/")) {
        const refreshed = await tryRefresh();
        if (refreshed) {
            return apiFetch(url, {
                ...options,
                _retried: true
            });
        }
        // Refresh failed: the session is genuinely over — surface it to the gate.
        if ("TURBOPACK compile-time truthy", 1) {
            window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
        }
    }
    const text = await res.text();
    let data = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch  {
    // Non-JSON body — fall through to the status check below.
    }
    if (!res.ok) {
        let message = `${url} -> ${res.status}`;
        if (data && typeof data === "object" && "error" in data) {
            const errText = String(data.error);
            if (errText) message = errText;
        }
        if (startedAt) reportTiming(url, method, performance.now() - startedAt, res.status);
        throw new BrainApiError(res.status, message);
    }
    if (startedAt) {
        const ms = performance.now() - startedAt;
        if (ms > 400) reportTiming(url, method, ms, res.status); // slow-call observability
    }
    return data;
}
const apiGet = (url)=>apiFetch(url);
const apiPost = (url, body)=>apiFetch(url, {
        method: "POST",
        body
    });
const apiPut = (url, body)=>apiFetch(url, {
        method: "PUT",
        body
    });
const apiPatch = (url, body)=>apiFetch(url, {
        method: "PATCH",
        body
    });
const apiDelete = (url)=>apiFetch(url, {
        method: "DELETE"
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/brain/analyzer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeCapture",
    ()=>analyzeCapture,
    "formatHudToast",
    ()=>formatHudToast
]);
// Project Brain OS — Built-in Deterministic Intelligence Analyzer (v2)
// Port of llm_bridge.py::analyze_capture_callback (upgraded Snip -> Action analyzer):
//   - Node  "Cannot find module 'x'"        -> pnpm add x
//   - Python "ModuleNotFoundError: x"       -> pip install x
//   - Locked port "EADDRINUSE ...:3000"     -> npx kill-port 3000        (v2 NEW)
//   - Runtime exceptions (SyntaxError, TypeError, ReferenceError, KeyError, ValueError) (v2 NEW)
//   - File & component mentions -> MENTIONED_IN Knowledge Graph edges
//   - Architectural decision extraction (Decision:/why we chose/we decided to/switched from)
//   - Optional live LLM 1-sentence summary enrichment when a backend is reachable (v2 NEW)
// Works fully offline with zero API keys via the deterministic fallback path.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$llm$2d$bridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/llm-bridge.ts [app-client] (ecmascript)");
;
async function analyzeCapture(input) {
    const { rawContent, windowTitle = "", visualHint = "", routedModel } = input;
    const lines = rawContent.split("\n").map((l)=>l.trim()).filter((l)=>l.length > 0);
    const firstLine = lines[0] ? lines[0].replace(/^#+\s*/, "") : windowTitle || "Quick Capture";
    let title = firstLine.slice(0, 65);
    const actionMetadata = {};
    const graphEdges = [];
    let decisionData = null;
    // A. Snip -> Action: extract missing dependencies / terminal errors + fix commands
    const nodeMod = rawContent.match(/Cannot find module ['"]([^'"]+)['"]/);
    const pyMod = rawContent.match(/ModuleNotFoundError: No module named ['"]([^'"]+)['"]/);
    const portErr = rawContent.match(/EADDRINUSE.*?:(\d+)/);
    const syntaxErr = rawContent.match(/(SyntaxError|TypeError|ReferenceError|KeyError|ValueError):\s*([^\n]+)/);
    if (nodeMod) {
        const pkg = nodeMod[1];
        const fixCmd = `pnpm add ${pkg}`;
        title = `Error: Missing Node dependency '${pkg}'`;
        actionMetadata.error = "ModuleNotFound";
        actionMetadata.rootCause = `Missing npm/pnpm package '${pkg}'`;
        actionMetadata.fix = fixCmd;
        graphEdges.push({
            source: title,
            target: fixCmd,
            relation: "FIXED_BY"
        });
    } else if (pyMod) {
        const pkg = pyMod[1];
        const fixCmd = `pip install ${pkg}`;
        title = `Error: Missing Python module '${pkg}'`;
        actionMetadata.error = "ModuleNotFoundError";
        actionMetadata.rootCause = `Missing Python package '${pkg}'`;
        actionMetadata.fix = fixCmd;
        graphEdges.push({
            source: title,
            target: fixCmd,
            relation: "FIXED_BY"
        });
    } else if (portErr) {
        const port = portErr[1];
        const fixCmd = `npx kill-port ${port}`;
        title = `Error: Port ${port} already in use (EADDRINUSE)`;
        actionMetadata.error = "EADDRINUSE";
        actionMetadata.rootCause = `Port ${port} locked by another process`;
        actionMetadata.fix = fixCmd;
        graphEdges.push({
            source: title,
            target: fixCmd,
            relation: "FIXED_BY"
        });
    } else if (syntaxErr) {
        const errType = syntaxErr[1];
        const errMsg = syntaxErr[2].trim();
        title = `${errType}: ${errMsg.slice(0, 45)}`;
        actionMetadata.error = errType;
        actionMetadata.rootCause = errMsg;
        actionMetadata.fix = `Inspect stack trace for ${errType}`;
    }
    // B. Extract File & Component Graph Nodes
    const fileMentions = (rawContent + " " + windowTitle).match(/\b([a-zA-Z0-9_-]+\.(?:py|ts|tsx|js|mjs|json|md|sql|html))\b/g);
    if (fileMentions) {
        for (const fm of new Set(fileMentions)){
            graphEdges.push({
                source: fm,
                target: title,
                relation: "MENTIONED_IN"
            });
        }
    }
    // C. Extract Architectural Decisions (Decision + Alternatives + Reasoning)
    const lower = rawContent.toLowerCase();
    if (lower.includes("decision:") || lower.includes("why we chose") || lower.includes("we decided to") || lower.includes("switched from")) {
        const reasonMatch = rawContent.match(/(?:reason|reasoning|because|why)[:\s]+([^\n.]+)/i);
        const altMatch = rawContent.match(/(?:alternatives|instead of|over|rejected)[:\s]+([^\n.]+)/i);
        decisionData = {
            title,
            chosen: firstLine,
            reasoning: reasonMatch ? reasonMatch[1].trim() : "Captured from architectural rationale note",
            alternatives: altMatch ? altMatch[1].split(",").map((a)=>a.trim()).filter(Boolean) : []
        };
    }
    // D. Optional live LLM summary upgrade (only when Ollama/Cloud backend is reachable)
    // v2.2: short 6s cap — capture-path UX must never wait on a slow cloud provider.
    let llmSummary = "";
    if (rawContent.length > 120) {
        llmSummary = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$llm$2d$bridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["llmBridge"].completeText("Summarize this developer capture in 1 concise sentence (< 25 words) focusing on technical facts.", rawContent.slice(0, 1500), 80, {
            timeoutMs: 6_000
        });
    }
    let summary;
    if (llmSummary) {
        summary = `[${routedModel}] ${llmSummary}`;
    } else if (actionMetadata.fix) {
        summary = `[${routedModel}] Diagnosed ${actionMetadata.error} -> Suggested Fix: \`${actionMetadata.fix}\``;
    } else {
        summary = `[${routedModel}] ` + lines.slice(0, 2).join(" ").slice(0, 180);
    }
    return {
        title,
        summary,
        visualDescription: visualHint || (windowTitle ? `Visual capture from '${windowTitle}'` : ""),
        actionMetadata,
        decision: decisionData,
        graphEdges
    };
}
function formatHudToast(input) {
    const { projectMatch, modelRoute, actionMetadata } = input;
    const fixStr = actionMetadata.fix ? ` | Suggested Fix: \`${actionMetadata.fix}\`` : "";
    return `✅ Zero-Save -> [${projectMatch.projectName}] (${Math.round(projectMatch.confidence * 100)}% match) ` + `| Model: ${modelRoute.targetModel}${fixStr}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/brain/llm-bridge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HybridLLMBridge",
    ()=>HybridLLMBridge,
    "PROVIDERS",
    ()=>PROVIDERS,
    "TOKEN_BUDGET",
    ()=>TOKEN_BUDGET,
    "invalidateLlmRuntimeConfig",
    ()=>invalidateLlmRuntimeConfig,
    "llmBridge",
    ()=>llmBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Project Brain OS — Hybrid Local/Cloud LLM Router & Anti-Drift Prompt Pre-Structurer
// Port of llm_bridge.py (Option 1 upgrade), extended to v2.2.
//
// Zero external dependencies: uses global fetch (Node 18+) and never throws — every
// failure degrades to the built-in Deterministic Offline Synthesizer so the app never
// blocks on API keys.
//
//  1. detectActiveBackend()  — provider override (runtime setting) or the auto chain:
//     Ollama (http://127.0.0.1:11434) -> OPENAI_API_KEY -> ANTHROPIC_API_KEY ->
//     GEMINI_API_KEY -> deterministic-offline.
//  2. completeText()         — LIVE completions for all four providers: Ollama,
//     OpenAI (chat/completions), Anthropic (v1/messages), Gemini (generateContent).
//     Returns "" on any failure so callers fall back to deterministic synthesis
//     seamlessly (never fabricates).
//  3. rewriteRawPrompt()     — rewrites a raw, unclear thought into a strict 5-section
//     engineering spec anchored to Tier-1 Rolling Memory, Tier-2 Decision Graph, and
//     Tier-3 Vault Evidence, with a ~2,500 token budget estimator.
//  4. probeBackend()         — real connectivity test per provider (used by the
//     Runtime Settings dialog to "wire a live backend" with immediate feedback).
//
// v2.2 runtime configuration: values come from the DB Setting store first, then env
// vars, then defaults — so a user can paste an OpenAI key in the UI and grounded
// answers upgrade from excerpts to synthesis without a restart. Base URLs are also
// overridable (OpenAI-compatible gateways, Azure-style proxies, LM Studio bridges).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/settings.ts [app-client] (ecmascript)");
;
const TOKEN_BUDGET = 2500;
const PROVIDERS = [
    "auto",
    "ollama",
    "openai",
    "anthropic",
    "gemini",
    "deterministic-offline"
];
const DEFAULT_OPENAI_BASE = "https://api.openai.com/v1";
const DEFAULT_ANTHROPIC_BASE = "https://api.anthropic.com";
const DEFAULT_GEMINI_BASE = "https://generativelanguage.googleapis.com";
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
function normalizeBase(url) {
    return url.replace(/\/+$/, "");
}
class HybridLLMBridge {
    // backendMemo keeps backend detection stable for 30s — but ONLY while the runtime
    // config is unchanged (see runtimeConfig(): a config change drops this memo so a
    // freshly saved key/provider takes effect on the very next call, in any route).
    backendMemo = null;
    lastConfigJson = null;
    /** v2.2: merge env vars with the runtime settings store (DB settings win).
   *  Read FRESH on every call (the Setting table is tiny) — memoizing this created
   *  cross-bundle staleness where a just-saved key was invisible to other routes. */ async runtimeConfig() {
        const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readSettings"])();
        const pick = (key, envVal, fallback = "")=>(s[key] || envVal || fallback).trim();
        const rawTimeout = pick("llm_timeout_seconds", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.LLM_TIMEOUT_SECONDS || "");
        const timeoutNum = rawTimeout ? Number(rawTimeout) : NaN;
        const config = {
            providerOverride: s.llm_provider || "auto",
            ollamaUrl: normalizeBase(pick("ollama_url", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OLLAMA_URL || "", DEFAULT_OLLAMA_URL)),
            ollamaModel: pick("ollama_model", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OLLAMA_MODEL || "", "llama3.2"),
            openaiKey: pick("openai_api_key", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OPENAI_API_KEY || ""),
            anthropicKey: pick("anthropic_api_key", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.ANTHROPIC_API_KEY || ""),
            geminiKey: pick("gemini_api_key", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GEMINI_API_KEY || ""),
            openaiBase: normalizeBase(pick("openai_base_url", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OPENAI_BASE_URL || "", DEFAULT_OPENAI_BASE)),
            anthropicBase: normalizeBase(pick("anthropic_base_url", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.ANTHROPIC_BASE_URL || "", DEFAULT_ANTHROPIC_BASE)),
            geminiBase: normalizeBase(pick("gemini_base_url", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GEMINI_BASE_URL || "", DEFAULT_GEMINI_BASE)),
            timeoutSeconds: Number.isFinite(timeoutNum) && timeoutNum >= 3 && timeoutNum <= 120 ? timeoutNum : null
        };
        // Config changed (settings write from this or another route bundle) -> the
        // previously detected backend is no longer trustworthy; force re-detection.
        const configJson = JSON.stringify(config);
        if (this.lastConfigJson !== null && this.lastConfigJson !== configJson) {
            this.backendMemo = null;
        }
        this.lastConfigJson = configJson;
        return config;
    }
    /** v2.2: drop memoized config + backend so new settings take effect immediately. */ invalidateRuntimeConfig() {
        this.lastConfigJson = null;
        this.backendMemo = null;
    }
    timeoutMsFor(cfg, provider, overrideMs) {
        if (overrideMs) return overrideMs;
        if (cfg.timeoutSeconds) return cfg.timeoutSeconds * 1000;
        // Ollama answers fast locally; cloud synthesis of ~700 tokens needs more headroom.
        return provider === "ollama" ? 8_000 : 25_000;
    }
    // =========================================================================
    // 1. BACKEND DETECTION (never throws)
    // =========================================================================
    async detectActiveBackend() {
        const now = Date.now();
        // Resolve config FIRST: it clears backendMemo when the config changed, so a
        // freshly saved provider/key is honored on this very call.
        const cfg = await this.runtimeConfig();
        if (this.backendMemo && this.backendMemo.expiresAt > now) return this.backendMemo.backend;
        let backend;
        if (cfg.providerOverride === "deterministic-offline") {
            backend = {
                provider: "deterministic-offline",
                model: "rule-synthesizer-v2",
                mode: "offline_fallback"
            };
        } else if (cfg.providerOverride === "openai") {
            backend = {
                provider: "openai",
                model: "gpt-4o-mini",
                mode: "cloud_llm"
            };
        } else if (cfg.providerOverride === "anthropic") {
            backend = {
                provider: "anthropic",
                model: "claude-3-5-sonnet-latest",
                mode: "cloud_llm"
            };
        } else if (cfg.providerOverride === "gemini") {
            backend = {
                provider: "gemini",
                model: "gemini-2.5-flash",
                mode: "cloud_llm"
            };
        } else if (cfg.providerOverride === "ollama") {
            // Forced local: report ollama regardless of liveness (probe surfaces health);
            // completeText degrades to "" -> offline synthesis when unreachable.
            backend = {
                provider: "ollama",
                model: cfg.ollamaModel,
                mode: "local_llm"
            };
        } else if (cfg.providerOverride === "auto" && !this.preferLocalOllamaDisabled && await this.isOllamaAlive(cfg)) {
            backend = {
                provider: "ollama",
                model: cfg.ollamaModel,
                mode: "local_llm"
            };
        } else if (cfg.openaiKey) {
            backend = {
                provider: "openai",
                model: "gpt-4o-mini",
                mode: "cloud_llm"
            };
        } else if (cfg.anthropicKey) {
            backend = {
                provider: "anthropic",
                model: "claude-3-5-sonnet-latest",
                mode: "cloud_llm"
            };
        } else if (cfg.geminiKey) {
            backend = {
                provider: "gemini",
                model: "gemini-2.5-flash",
                mode: "cloud_llm"
            };
        } else {
            backend = {
                provider: "deterministic-offline",
                model: "rule-synthesizer-v2",
                mode: "offline_fallback"
            };
        }
        this.backendMemo = {
            backend,
            expiresAt: now + 30_000
        }; // 30s probe memo
        return backend;
    }
    // Kept for backward compatibility with tests/config that toggle the auto chain.
    get preferLocalOllamaDisabled() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BRAIN_DISABLE_OLLAMA_PROBE === "1";
    }
    async isOllamaAlive(cfg) {
        try {
            const url = cfg ? cfg.ollamaUrl : normalizeBase(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OLLAMA_URL || DEFAULT_OLLAMA_URL);
            const res = await fetch(`${url}/api/tags`, {
                method: "GET",
                signal: AbortSignal.timeout(1500)
            });
            return res.status === 200;
        } catch  {
            return false;
        }
    }
    // =========================================================================
    // 2. LIVE COMPLETION (graceful "" fallback, like llm_bridge.complete_text)
    // =========================================================================
    async completeText(systemPrompt, userPrompt, maxTokens = 600, opts) {
        const backend = await this.detectActiveBackend();
        const cfg = await this.runtimeConfig();
        const timeoutMs = this.timeoutMsFor(cfg, backend.provider, opts?.timeoutMs);
        try {
            if (backend.provider === "ollama") {
                const res = await fetch(`${cfg.ollamaUrl}/api/generate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: cfg.ollamaModel,
                        prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
                        stream: false
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.response ?? "").trim();
            }
            if (backend.provider === "openai") {
                const res = await fetch(`${cfg.openaiBase}/chat/completions`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cfg.openaiKey}`
                    },
                    body: JSON.stringify({
                        model: backend.model,
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            {
                                role: "user",
                                content: userPrompt
                            }
                        ],
                        max_tokens: maxTokens,
                        temperature: 0.2
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.choices?.[0]?.message?.content ?? "").trim();
            }
            if (backend.provider === "anthropic") {
                // v2.2: Anthropic Messages API parity (previously detected-but-unwired).
                const res = await fetch(`${cfg.anthropicBase}/v1/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": cfg.anthropicKey,
                        "anthropic-version": "2023-06-01"
                    },
                    body: JSON.stringify({
                        model: backend.model,
                        max_tokens: maxTokens,
                        system: systemPrompt,
                        messages: [
                            {
                                role: "user",
                                content: userPrompt
                            }
                        ]
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.content ?? []).filter((b)=>b.type === "text").map((b)=>b.text ?? "").join("").trim();
            }
            if (backend.provider === "gemini") {
                // v2.2: Gemini generateContent parity (previously detected-but-unwired).
                const url = `${cfg.geminiBase}/v1beta/models/${encodeURIComponent(backend.model)}:generateContent` + `?key=${encodeURIComponent(cfg.geminiKey)}`;
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [
                                {
                                    text: systemPrompt
                                }
                            ]
                        },
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    {
                                        text: userPrompt
                                    }
                                ]
                            }
                        ],
                        generationConfig: {
                            temperature: 0.2,
                            maxOutputTokens: maxTokens
                        }
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.candidates?.[0]?.content?.parts ?? []).map((p)=>p.text ?? "").join("").trim();
            }
        } catch  {
            // Fall through cleanly to offline synthesis
            return "";
        }
        // deterministic-offline (or unknown) -> callers synthesize deterministically.
        return "";
    }
    /**
   * v2.3 real-time chat: streaming completion (blueprint "Real-time Chat").
   * TRUE token deltas for Ollama (`stream: true` NDJSON) and OpenAI (SSE);
   * Anthropic/Gemini/offline fall back to buffered completeText() and emit the
   * answer as a single delta. Returns the full text ("" = no live backend, so
   * callers keep the honest offline contract).
   */ async completeTextStream(systemPrompt, userPrompt, maxTokens, onDelta, opts) {
        const backend = await this.detectActiveBackend();
        const cfg = await this.runtimeConfig();
        const timeoutMs = this.timeoutMsFor(cfg, backend.provider, opts?.timeoutMs);
        const readLines = async (body, handle)=>{
            const reader = body.getReader();
            const decoder = new TextDecoder();
            let buf = "";
            for(;;){
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, {
                    stream: true
                });
                const lines = buf.split("\n");
                buf = lines.pop() ?? "";
                for (const line of lines)handle(line);
            }
            if (buf.trim()) handle(buf);
        };
        try {
            if (backend.provider === "ollama") {
                const res = await fetch(`${cfg.ollamaUrl}/api/generate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: cfg.ollamaModel,
                        prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
                        stream: true
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok || !res.body) return "";
                let full = "";
                await readLines(res.body, (line)=>{
                    if (!line.trim()) return;
                    try {
                        const json = JSON.parse(line);
                        if (json.response) {
                            full += json.response;
                            onDelta(json.response);
                        }
                    } catch  {
                    // partial NDJSON line — skipped safely
                    }
                });
                return full.trim();
            }
            if (backend.provider === "openai") {
                const res = await fetch(`${cfg.openaiBase}/chat/completions`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cfg.openaiKey}`
                    },
                    body: JSON.stringify({
                        model: backend.model,
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            {
                                role: "user",
                                content: userPrompt
                            }
                        ],
                        max_tokens: maxTokens,
                        temperature: 0.2,
                        stream: true
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok || !res.body) return "";
                let full = "";
                await readLines(res.body, (line)=>{
                    const trimmed = line.trim();
                    if (!trimmed.startsWith("data:")) return;
                    const payload = trimmed.slice(5).trim();
                    if (payload === "[DONE]") return;
                    try {
                        const json = JSON.parse(payload);
                        const piece = json.choices?.[0]?.delta?.content ?? "";
                        if (piece) {
                            full += piece;
                            onDelta(piece);
                        }
                    } catch  {
                    // keep-alive comment or partial SSE — skipped safely
                    }
                });
                return full.trim();
            }
        } catch  {
            return "";
        }
        // anthropic / gemini / deterministic-offline: buffered answer, single delta
        const buffered = await this.completeText(systemPrompt, userPrompt, maxTokens, opts);
        if (buffered) onDelta(buffered);
        return buffered;
    }
    // =========================================================================
    // 3. v2.2 BACKEND PROBE (real connectivity test for the Settings dialog)
    // =========================================================================
    async probeBackend(backend) {
        const target = backend ?? await this.detectActiveBackend();
        const cfg = await this.runtimeConfig();
        const started = Date.now();
        const finish = (ok, detail)=>({
                provider: target.provider,
                ok,
                detail,
                latency_ms: Date.now() - started
            });
        try {
            if (target.provider === "deterministic-offline") {
                return finish(true, "Deterministic offline synthesizer is always available (no network).");
            }
            if (target.provider === "ollama") {
                const res = await fetch(`${cfg.ollamaUrl}/api/tags`, {
                    signal: AbortSignal.timeout(4_000)
                });
                if (!res.ok) return finish(false, `Ollama responded HTTP ${res.status}`);
                const body = await res.json();
                const models = (body.models ?? []).map((m)=>m.name ?? "").filter(Boolean);
                return finish(true, models.length ? `Ollama alive — models: ${models.slice(0, 5).join(", ")}` : "Ollama alive — no models pulled yet");
            }
            if (target.provider === "openai") {
                if (!cfg.openaiKey) return finish(false, "No OpenAI API key configured");
                const res = await fetch(`${cfg.openaiBase}/models`, {
                    headers: {
                        Authorization: `Bearer ${cfg.openaiKey}`
                    },
                    signal: AbortSignal.timeout(10_000)
                });
                if (!res.ok) return finish(false, `OpenAI HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
                const body = await res.json();
                const ids = (body.data ?? []).map((m)=>m.id ?? "").filter(Boolean);
                return finish(true, `Key valid — ${ids.length} models visible (e.g. ${ids.slice(0, 3).join(", ")})`);
            }
            if (target.provider === "anthropic") {
                if (!cfg.anthropicKey) return finish(false, "No Anthropic API key configured");
                const res = await fetch(`${cfg.anthropicBase}/v1/models`, {
                    headers: {
                        "x-api-key": cfg.anthropicKey,
                        "anthropic-version": "2023-06-01"
                    },
                    signal: AbortSignal.timeout(10_000)
                });
                if (!res.ok) return finish(false, `Anthropic HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
                const body = await res.json();
                const ids = (body.data ?? []).map((m)=>m.id ?? "").filter(Boolean);
                return finish(true, `Key valid — models: ${ids.slice(0, 4).join(", ") || "listed"}`);
            }
            if (target.provider === "gemini") {
                if (!cfg.geminiKey) return finish(false, "No Gemini API key configured");
                const res = await fetch(`${cfg.geminiBase}/v1beta/models?key=${encodeURIComponent(cfg.geminiKey)}`, {
                    signal: AbortSignal.timeout(10_000)
                });
                if (!res.ok) return finish(false, `Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
                const body = await res.json();
                const names = (body.models ?? []).map((m)=>m.name ?? "").filter(Boolean);
                return finish(true, `Key valid — ${names.length} models visible (e.g. ${names.slice(0, 3).join(", ")})`);
            }
            return finish(false, `Unknown provider: ${target.provider}`);
        } catch (e) {
            return finish(false, e instanceof Error ? e.message : "probe failed");
        }
    }
    // =========================================================================
    // 4. RAW UNCLEAR PROMPT -> STRUCTURED ANTI-DRIFT SPEC (rewrite_raw_prompt)
    // =========================================================================
    async rewriteRawPrompt(rawUserPrompt, contextPayload) {
        const project_name = contextPayload.project_name || "Active Project";
        const rollingMemory = contextPayload.tier_1_rolling_memory || "No summary yet.";
        const decisions = contextPayload.tier_2_decision_graph ?? [];
        const evidence = contextPayload.tier_3_recent_and_relevant_evidence ?? [];
        // Tier-2 actionable constraints (anti-drift guardrails)
        const decisionBullets = [];
        for (const d of decisions.slice(0, 5)){
            decisionBullets.push(`- **MUST RESPECT [${d.title.slice(0, 50)}]**: ${d.decision.slice(0, 70)} (Rationale: ${d.reasoning.slice(0, 50)})`);
        }
        if (decisionBullets.length === 0) {
            decisionBullets.push("- Keep implementation dependency-light and modular.");
        }
        // Tier-3 grounded evidence + past fixes
        const evidenceBullets = [];
        const knownFixes = [];
        for (const ev of evidence.slice(0, 4)){
            evidenceBullets.push(`- \`[${(ev.type || "note").toUpperCase()}]\` **${ev.title.slice(0, 60)}**: ${(ev.summary || "").slice(0, 140)}`);
        }
        if (evidenceBullets.length === 0) {
            evidenceBullets.push("- No prior conflicting captures found in vault.");
        }
        // Known fixes come from the evidence summaries produced by the analyzer ("Suggested Fix: `cmd`")
        for (const ev of evidence.slice(0, 4)){
            const m = ev.summary?.match(/`([^`]+)`/);
            if (m && /fix|install|kill-port|add /i.test(m[1])) knownFixes.push(`\`${m[1]}\` (for ${ev.title})`);
        }
        // Optional live LLM polish of the raw goal (short timeout: capture-path UX)
        let refinedObjective = await this.completeText("Rewrite the user's raw software request into 2-3 crystal-clear technical bullet points. " + "Do not invent libraries that violate the project context.", `Project: ${project_name}\nContext: ${rollingMemory}\nRaw Request: ${rawUserPrompt}`, 160, {
            timeoutMs: 6_000
        });
        if (!refinedObjective) {
            // Deterministic structuring of the raw prompt
            const sentences = rawUserPrompt.split(/[.;\n]+/).map((s)=>s.trim()).filter((s)=>s.length > 0);
            if (sentences.length === 0) {
                sentences.push("Implement the requested feature cleanly while preserving existing project architecture.");
            }
            refinedObjective = sentences.map((s, i)=>`${i + 1}. ${s}`).join("\n");
        }
        const structuredMarkdown = `# 🎯 STRUCTURED AI EXECUTION SPEC — [${project_name}]\n\n` + `## 1. Clarified Engineering Objective\n` + `*(Rewritten from raw input: "${rawUserPrompt.trim()}")*\n` + `${refinedObjective}\n\n` + `## 2. TIER 1: Compressed Project State\n` + `${rollingMemory}\n\n` + `## 3. TIER 2: Non-Negotiable Architectural Constraints (DO NOT VIOLATE — Anti-Drift Guardrails)\n` + decisionBullets.join("\n") + `\n\n## 4. TIER 3: Grounded Vault Evidence & Past Fixes\n` + evidenceBullets.join("\n") + `\n\n## 5. Strict Output & Verification Contract\n` + `- **No Context Drift:** Do NOT introduce new frameworks or databases that contradict Section 3.\n` + `- **Token Efficiency:** Output only the modified/new files with complete, runnable code (no placeholders).\n` + `- **Self-Verification Step:** Conclude with a 1-command terminal verification test so I know immediately how to test it.\n`;
        // Estimate token count (~4 chars per token)
        const estimatedTokens = Math.max(1, Math.floor(structuredMarkdown.length / 4));
        return {
            project_name,
            raw_prompt: rawUserPrompt,
            refined_objective: refinedObjective,
            known_fixes_referenced: knownFixes,
            estimated_tokens: estimatedTokens,
            token_budget_status: estimatedTokens < TOKEN_BUDGET ? "OPTIMAL (< 2,500 tokens)" : "WARNING (over 2,500 tokens)",
            backend_used: await this.detectActiveBackend(),
            structured_prompt_markdown: structuredMarkdown
        };
    }
}
const llmBridge = new HybridLLMBridge();
function invalidateLlmRuntimeConfig() {
    llmBridge.invalidateRuntimeConfig();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/brain/model-routing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Pure AI-model routing logic (no DB imports) — safe for client components.
// Port of project_router.py::route_ai_model
__turbopack_context__.s([
    "routeAiModel",
    ()=>routeAiModel
]);
const CODE_ERROR_SIGNALS = [
    "traceback (most recent call last)",
    "error:",
    "exception",
    "module not found",
    "err_module_not_found",
    "syntaxerror",
    "typeerror",
    "pnpm ",
    "npm err!",
    "def ",
    "function ",
    "const ",
    "import "
];
const DECISION_SIGNALS = [
    "decision:",
    "why we chose",
    "alternatives:",
    "tradeoff",
    "architecture",
    "migrating from"
];
function routeAiModel(input) {
    const { itemType, rawContent, hasImage = false } = input;
    const contentLower = rawContent.toLowerCase();
    if (CODE_ERROR_SIGNALS.some((sig)=>contentLower.includes(sig)) || itemType === "terminal") {
        return {
            targetModel: "codex-agent",
            taskMode: "error_diagnosis_and_patch",
            reason: "Detected stack trace, terminal log, or source code snippet"
        };
    }
    if (DECISION_SIGNALS.some((sig)=>contentLower.includes(sig))) {
        return {
            targetModel: "reasoning-architect",
            taskMode: "decision_and_graph_extraction",
            reason: "Detected architectural rationale or tradeoff discussion"
        };
    }
    if (hasImage || itemType === "screenshot") {
        return {
            targetModel: "vision-ocr-extractor",
            taskMode: "visual_semantic_markdown",
            reason: "Visual screenshot capture requiring OCR + semantic indexing"
        };
    }
    return {
        targetModel: "fast-memory-structurer",
        taskMode: "summarize_and_link",
        reason: "Standard note or web clip capture"
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/brain/settings.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLEAR_SENTINEL",
    ()=>CLEAR_SENTINEL,
    "SETTING_KEYS",
    ()=>SETTING_KEYS,
    "checkAgentToken",
    ()=>checkAgentToken,
    "effectiveSetting",
    ()=>effectiveSetting,
    "envFallback",
    ()=>envFallback,
    "maskSecret",
    ()=>maskSecret,
    "readSetting",
    ()=>readSetting,
    "readSettings",
    ()=>readSettings,
    "writeSettings",
    ()=>writeSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Project Brain OS — v2.2 Runtime Settings Store
//
// A tiny key/value configuration layer persisted in SQLite (Prisma Setting model) so
// the AI backend, dedup window, and agent ingest token can be tuned at runtime from
// the UI — no server restart or redeploy required.
//
// Precedence rules used across the engine:
//   - Secrets/URLs:  DB setting (non-empty)  ->  environment variable  ->  built-in default
//   - dedup window:  DEDUP_WINDOW_HOURS env  ->  DB setting         ->  36 (v2.1 default)
//   - provider:      DB setting llm_provider ->  auto-detect chain (env-key based)
//
// Secrets are never returned in plaintext by the API — `maskSecret()` renders a
// "sk-…abcd" preview plus a `configured` flag instead.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-client] (ecmascript)");
;
const SETTING_KEYS = [
    "llm_provider",
    "ollama_url",
    "ollama_model",
    "openai_api_key",
    "anthropic_api_key",
    "gemini_api_key",
    "openai_base_url",
    "anthropic_base_url",
    "gemini_base_url",
    "llm_timeout_seconds",
    "dedup_window_hours",
    "agent_ingest_token",
    "auth_mode"
];
const CLEAR_SENTINEL = "__clear__";
async function readSettings() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].setting.findMany();
    const map = {};
    for (const row of rows){
        if (SETTING_KEYS.includes(row.key) && row.value !== "") {
            map[row.key] = row.value;
        }
    }
    return map;
}
async function readSetting(key) {
    const map = await readSettings();
    return map[key] ?? "";
}
async function writeSettings(patch) {
    const written = [];
    for (const [key, value] of Object.entries(patch)){
        if (!SETTING_KEYS.includes(key)) continue;
        const finalValue = value === CLEAR_SENTINEL ? "" : value ?? "";
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].setting.upsert({
            where: {
                key
            },
            create: {
                key,
                value: finalValue
            },
            update: {
                value: finalValue
            }
        });
        written.push(key);
    }
    return written;
}
function maskSecret(value) {
    const v = (value ?? "").trim();
    if (!v) return "";
    if (v.length <= 8) return `${v.slice(0, 2)}…`;
    return `${v.slice(0, 3)}…${v.slice(-4)}`;
}
function envFallback(key) {
    switch(key){
        case "openai_api_key":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OPENAI_API_KEY || "";
        case "anthropic_api_key":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.ANTHROPIC_API_KEY || "";
        case "gemini_api_key":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GEMINI_API_KEY || "";
        case "openai_base_url":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OPENAI_BASE_URL || "";
        case "anthropic_base_url":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.ANTHROPIC_BASE_URL || "";
        case "gemini_base_url":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GEMINI_BASE_URL || "";
        case "ollama_url":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.OLLAMA_URL || "";
        case "agent_ingest_token":
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BRAIN_INGEST_TOKEN || "";
        default:
            return "";
    }
}
async function effectiveSetting(key) {
    const stored = await readSetting(key);
    if (stored) return stored;
    return envFallback(key);
}
async function checkAgentToken(provided) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"].setting.findUnique({
        where: {
            key: "agent_ingest_token"
        }
    }).catch(()=>null);
    const expected = (row?.value || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BRAIN_INGEST_TOKEN || "").trim();
    if (!expected) return {
        required: false,
        ok: true
    };
    return {
        required: true,
        ok: (provided ?? "").trim() === expected
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$index$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/index-browser.js [app-client] (ecmascript)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$index$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/feature-flags-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFlag",
    ()=>useFlag,
    "useFlags",
    ()=>useFlags
]);
// Client access to the self-hosted feature flags (blueprint "Feature Flags" +
// "Progressive Rollouts"). Server state through TanStack Query; a flag that
// fails to load evaluates to TRUE so gating never regresses existing behavior.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const useFlagsQuery = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "feature-flags"
        ],
        queryFn: {
            "useFlagsQuery.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGet"])("/api/feature-flags")
        }["useFlagsQuery.useQuery"],
        staleTime: 15_000
    });
};
_s(useFlagsQuery, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useFlags = useFlagsQuery;
const useFlag = (id)=>{
    _s1();
    return useFlagsQuery().data?.flags.find((f)=>f.id === id)?.enabled ?? true;
};
_s1(useFlag, "eTQD4BNu3wAdPvDSKF/e78VE5Ec=", false, function() {
    return [
        useFlagsQuery
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/realtime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REALTIME_JOIN_DEBOUNCE_MS",
    ()=>REALTIME_JOIN_DEBOUNCE_MS,
    "connectRealtime",
    ()=>connectRealtime
]);
// ============================================================
// Realtime client — typed socket.io handle for live collaboration
// ============================================================
// Blueprint ("Real-time Chat Integration"): persistent bidirectional
// channel alongside the NDJSON ask/stream pipeline.
//
// Sandbox topology (MUST keep): every connection goes through the Caddy
// gateway — `io('/?XTransformPort=3003')` with path "/". NEVER connect to
// a bare host:port URL (the gateway is the only externally exposed port).
//
// Graceful degradation: the realtime service is optional infrastructure.
// If it is not running, the handle goes offline after a few bounded
// reconnect attempts, silently — the grounded chat keeps working and the
// UI simply hides presence/typing affordances.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
const REALTIME_URL = "/?XTransformPort=3003";
const JOIN_DEBOUNCE_MS = 60;
/** Resolve the display identity once per page session (open mode => Guest). */ let identityCache = null;
const resolveIdentity = async ()=>{
    if (identityCache) return identityCache;
    try {
        const res = await fetch("/api/auth/session", {
            credentials: "same-origin"
        });
        const data = await res.json();
        const user = data.user;
        identityCache = {
            id: user?.id ?? "local",
            name: user?.name?.trim() || user?.email?.split("@")[0] || "Guest"
        };
    } catch  {
        identityCache = {
            id: "local",
            name: "Guest"
        };
    }
    return identityCache;
};
const connectRealtime = (room, handlers)=>{
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(REALTIME_URL, {
        transports: [
            "websocket",
            "polling"
        ],
        reconnection: true,
        reconnectionAttempts: 4,
        reconnectionDelay: 1200,
        timeout: 8000
    });
    const onPresence = (data)=>{
        // Presence is "others online" — the server stamps peer ids with server-side
        // socket ids, so the local socket can subtract itself before surfacing.
        handlers.onPresence?.((data.peers ?? []).filter((p)=>p.id !== socket.id));
    };
    const onTyping = (data)=>{
        if (data.user) handlers.onTyping?.({
            user: data.user,
            typing: Boolean(data.typing)
        });
    };
    const onNote = (data)=>{
        if (data.note) handlers.onNote?.(data.note);
    };
    const onConnect = ()=>{
        handlers.onStatus?.(true);
        void resolveIdentity().then((user)=>{
            socket.emit("chat:join", {
                room,
                user
            });
        });
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", ()=>handlers.onStatus?.(false));
    socket.on("connect_error", ()=>handlers.onStatus?.(false));
    socket.on("chat:presence", onPresence);
    socket.on("chat:typing", onTyping);
    socket.on("chat:note", onNote);
    return {
        socket,
        emitTyping: (typing)=>socket.emit("chat:typing", {
                room,
                typing
            }),
        sendNote: (note)=>socket.emit("chat:note", {
                room,
                note
            }),
        close: ()=>{
            socket.off("chat:presence", onPresence);
            socket.off("chat:typing", onTyping);
            socket.off("chat:note", onNote);
            socket.disconnect();
        }
    };
};
const REALTIME_JOIN_DEBOUNCE_MS = JOIN_DEBOUNCE_MS;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/auth-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore,
    "useCanEdit",
    ()=>useCanEdit
]);
// authStore — blueprint authStore (Zustand + persist), adapted to cookie
// sessions: the JWT itself lives in an httpOnly cookie (never in localStorage),
// so the store persists only the non-sensitive user PROFILE for instant UI
// paint; /api/auth/session is always re-verified on boot by the AuthGate.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        status: "checking",
        user: null,
        error: null,
        busy: false,
        setSession: ({ mode, authenticated, needs_setup, user })=>{
            if (mode === "open") set({
                status: "open",
                user: null,
                error: null
            });
            else if (authenticated && user) set({
                status: "authenticated",
                user,
                error: null
            });
            else set({
                status: needs_setup ? "setup" : "locked",
                user: null,
                error: null
            });
        },
        setup: async (input)=>{
            set({
                busy: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/api/auth/setup", input);
                set({
                    status: "authenticated",
                    user: res.user,
                    busy: false
                });
                return true;
            } catch (e) {
                set({
                    busy: false,
                    error: e instanceof Error ? e.message : "Setup failed"
                });
                return false;
            }
        },
        login: async (input)=>{
            set({
                busy: true,
                error: null
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/api/auth/login", input);
                set({
                    status: "authenticated",
                    user: res.user,
                    busy: false
                });
                return true;
            } catch (e) {
                set({
                    busy: false,
                    error: e instanceof Error ? e.message : "Login failed"
                });
                return false;
            }
        },
        logout: async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiPost"])("/api/auth/logout");
            } finally{
                set({
                    status: "locked",
                    user: null,
                    error: null
                });
            }
        }
    }), {
    name: "brain-os-auth-storage",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    partialize: (state)=>({
            user: state.user
        })
}));
const useCanEdit = ()=>{
    _s();
    const role = useAuthStore({
        "useCanEdit.useAuthStore[role]": (s)=>s.user?.role
    }["useCanEdit.useAuthStore[role]"]);
    return role !== "viewer"; // null role = open mode = full access (pre-auth parity)
};
_s(useCanEdit, "/hMJssJVO78AZDD55s7erKuH82I=", false, function() {
    return [
        useAuthStore
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_0_rbxg3j6llj1._.js.map