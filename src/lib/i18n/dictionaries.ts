// i18n dictionaries (blueprint: "Internationalization", adapted from next-intl —
// which requires [locale] route segments — to a lightweight dictionary layer that
// fits the single-route workspace). Keys are flat dot-paths; en is the source of
// truth and zh must mirror it (parity is asserted in verify-enterprise.mjs).

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

const en = {
  "app.tagline": "Everything you see, decide, and build — searchable, linked, and ready for AI execution.",
  "app.booting": "Booting Project Brain OS…",

  "nav.dashboard": "Dashboard",
  "nav.vault": "Vault & Editor",
  "nav.timeline": "Timeline",
  "nav.graph": "Knowledge Graph",
  "nav.context": "Context Injector",

  "dash.welcome.title": "Welcome to Brain OS",
  "dash.welcome.desc": "Your intelligent workspace for knowledge, projects, and insights.",
  "dash.welcome.body":
    "Dive into your projects, connect ideas, and collaborate seamlessly. Brain OS transforms complex information into actionable intelligence — captured, routed, and compressed automatically.",
  "dash.welcome.get_started": "Open the Vault",
  "dash.quick_actions": "Quick Actions",
  "dash.quick_actions.desc": "Jump right into your workflow.",
  "dash.quick.capture": "Zero-Save Capture",
  "dash.quick.decision": "Log Decision",
  "dash.quick.project": "New Project",
  "dash.quick.compress": "Compress Memory",
  "dash.quick.selftest": "Run Self-Test",
  "dash.graph.title": "Brain OS Graph",
  "dash.graph.desc": "Connections across the selected project.",
  "dash.chat.title": "Grounded Chat",
  "dash.chat.desc": "Real-time answers citing vault evidence.",
  "dash.activity.title": "Recent Activity",
  "dash.activity.desc": "What's happening across your workspace.",
  "dash.activity.empty": "No captures yet — press Alt+S to save your first thought.",
  "dash.stat.projects": "Projects",
  "dash.stat.captures": "Captures",
  "dash.stat.decisions": "Decisions",
  "dash.stat.edges": "Graph Edges",
  "dash.stat.inbox": "Inbox Items",
  "dash.health.title": "Knowledge Health",

  "auth.setup.title": "Protect your Brain",
  "auth.setup.desc": "Create the owner account to require sign-in. You can skip this and stay in trusted local mode.",
  "auth.setup.name": "Display name",
  "auth.setup.email": "Email",
  "auth.setup.password": "Password (min 8 chars)",
  "auth.setup.submit": "Create owner account",
  "auth.setup.skip": "Continue without protection",
  "auth.login.title": "Sign in to Project Brain OS",
  "auth.login.desc": "This workspace is protected.",
  "auth.login.email": "Email",
  "auth.login.password": "Password",
  "auth.login.submit": "Sign in",
  "auth.login.working": "Working…",
  "auth.expired": "Session expired — sign in again.",

  "user.sign_out": "Sign out",
  "user.role.owner": "Owner",
  "user.role.editor": "Editor",
  "user.role.viewer": "Viewer (read-only)",
  "user.protected": "Protected",

  "error.boundary.title": "Something went wrong",
  "error.boundary.desc": "The view crashed while rendering. The error was logged to the client log.",
  "error.boundary.retry": "Try again",

  "graph.layout.force": "Force-Directed",
  "graph.layout.hierarchy": "Hierarchical",
  "graph.layout.radial": "Radial",
  "graph.zoom": "Zoom",
};

export type MessageKey = keyof typeof en;

const zh: Record<MessageKey, string> = {
  "app.tagline": "你看到、决定和构建的一切 — 可检索、可关联、随时供 AI 执行。",
  "app.booting": "正在启动 Project Brain OS…",

  "nav.dashboard": "仪表盘",
  "nav.vault": "知识库与编辑器",
  "nav.timeline": "时间线",
  "nav.graph": "知识图谱",
  "nav.context": "上下文注入",

  "dash.welcome.title": "欢迎来到 Brain OS",
  "dash.welcome.desc": "面向知识、项目与洞察的智能工作区。",
  "dash.welcome.body":
    "深入项目、连接想法、顺畅协作。Brain OS 将复杂信息转化为可行动的智能 — 自动捕获、自动路由、自动压缩。",
  "dash.welcome.get_started": "打开知识库",
  "dash.quick_actions": "快捷操作",
  "dash.quick_actions.desc": "立即进入你的工作流。",
  "dash.quick.capture": "零负担捕获",
  "dash.quick.decision": "记录决策",
  "dash.quick.project": "新建项目",
  "dash.quick.compress": "压缩记忆",
  "dash.quick.selftest": "运行自检",
  "dash.graph.title": "Brain OS 图谱",
  "dash.graph.desc": "所选项目中的知识关联。",
  "dash.chat.title": "有据问答",
  "dash.chat.desc": "实时回答，引用知识库证据。",
  "dash.activity.title": "最近动态",
  "dash.activity.desc": "整个工作区正在发生什么。",
  "dash.activity.empty": "还没有捕获 — 按 Alt+S 保存你的第一条想法。",
  "dash.stat.projects": "项目",
  "dash.stat.captures": "捕获",
  "dash.stat.decisions": "决策",
  "dash.stat.edges": "图谱边",
  "dash.stat.inbox": "收件箱",
  "dash.health.title": "知识健康度",

  "auth.setup.title": "保护你的 Brain",
  "auth.setup.desc": "创建所有者账户以启用登录保护。也可以跳过，继续使用受信任的本地模式。",
  "auth.setup.name": "显示名称",
  "auth.setup.email": "邮箱",
  "auth.setup.password": "密码（至少 8 位）",
  "auth.setup.submit": "创建所有者账户",
  "auth.setup.skip": "暂不启用保护",
  "auth.login.title": "登录 Project Brain OS",
  "auth.login.desc": "该工作区已启用保护。",
  "auth.login.email": "邮箱",
  "auth.login.password": "密码",
  "auth.login.submit": "登录",
  "auth.login.working": "处理中…",
  "auth.expired": "会话已过期 — 请重新登录。",

  "user.sign_out": "退出登录",
  "user.role.owner": "所有者",
  "user.role.editor": "编辑者",
  "user.role.viewer": "观察者（只读）",
  "user.protected": "已保护",

  "error.boundary.title": "出现了一些问题",
  "error.boundary.desc": "视图渲染时崩溃。错误已写入客户端日志。",
  "error.boundary.retry": "重试",

  "graph.layout.force": "力导向",
  "graph.layout.hierarchy": "层次布局",
  "graph.layout.radial": "放射布局",
  "graph.zoom": "缩放",
};

export const dictionaries: Record<Locale, Record<MessageKey, string>> = { en, zh };
