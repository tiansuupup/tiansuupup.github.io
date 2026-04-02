# Portfolio 网站实施计划

> 技术栈：Astro 5 + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion
> 设计风格：赛博朋克 × 像素艺术，深色主题，霓虹色点缀（#00FFD1 / #FF2E97 / #FFD700）

---

## 文件结构

```
src/
├── layouts/
│   └── BaseLayout.astro          ← 全局 Layout（SEO head + 字体 + global.css）
├── components/
│   ├── Navbar.astro               ← 静态导航（无需交互 JS）
│   ├── Footer.astro               ← 静态底部
│   ├── Hero.tsx                   ← React island（动效重，client:load）
│   ├── ParticleBackground.tsx     ← Canvas 粒子，Hero 子组件
│   ├── GlitchText.tsx             ← glitch 文字动画，Hero 子组件
│   ├── TypewriterText.tsx         ← 打字机效果，Hero 子组件
│   ├── About.astro                ← 静态外壳
│   ├── SkillTree.tsx              ← React island（动态进度条，client:visible）
│   ├── Projects.tsx               ← React island（筛选逻辑，client:load）
│   ├── ProjectCard.tsx            ← Projects 子组件（翻转卡片）
│   ├── Experience.astro           ← 静态时间线（纯 CSS 动画）
│   └── Contact.astro              ← 静态联系区块
├── content/
│   ├── config.ts                  ← content collection schema
│   └── projects/
│       ├── game-one.md
│       └── game-two.md
├── pages/
│   ├── index.astro                ← 单页主入口，组合所有 section
│   └── projects/
│       └── [slug].astro           ← 项目详情页（可选）
├── styles/
│   └── global.css                 ← Tailwind 入口 + CSS 变量
└── assets/
    └── images/
```

---

## CSS 变量（global.css）

```css
:root {
  --neon-cyan:   #00FFD1;
  --neon-pink:   #FF2E97;
  --neon-gold:   #FFD700;
  --bg-dark:     #0a0a0f;
  --bg-surface:  #12121a;
}
```

字体：Space Mono（标题）、JetBrains Mono（代码）、清晰无衬线（正文）

---

## Layout：Navbar + Footer

**文件**：`BaseLayout.astro`、`Navbar.astro`、`Footer.astro`

- **BaseLayout**：`<head>` 含 SEO meta、Google Fonts、import global.css
- **Navbar**：固定顶部，毛玻璃背景，锚点导航，滚动后高亮当前 section（inline script）
- **Footer**：社交图标行 + 版权行，霓虹色 hover 效果
- 两者均为纯 `.astro`，零 React JS

---

## Section 1：Hero

**文件**：`Hero.tsx`、`ParticleBackground.tsx`、`GlitchText.tsx`、`TypewriterText.tsx`

```
Hero（React island, client:load）
├── ParticleBackground   ← 原生 Canvas API，粒子颜色 #00FFD1 / #FF2E97
├── GlitchText           ← Framer Motion keyframes，clip-path / translateX 抖动
├── TypewriterText       ← 逐字动画，文字轮播："Game Developer | Creative Coder | ..."
├── CTA 按钮             ← Framer Motion whileHover 霓虹光晕（box-shadow）
└── 滚动箭头             ← Framer Motion animate y 呼吸循环
```

---

## Section 2：About Me

**文件**：`About.astro`、`SkillTree.tsx`

```
About（Astro 外壳）
├── 左列：头像 + 个人简介（静态 HTML）
└── 右列：<SkillTree client:visible />
         ├── 技能分类：Programming / Game Engines / Web
         ├── 每条：标签 + 百分比进度条
         └── Framer Motion：进入视口时从 0 滑入目标值
```

数据结构（硬编码在组件内）：
```ts
type Skill = { name: string; level: number; category: string }
```

---

## Section 3：Projects

**文件**：`Projects.tsx`、`ProjectCard.tsx`、`content/config.ts`、`content/projects/*.md`

```
Projects（React island, client:load）
├── 筛选栏：[All] [Unity] [Unreal] [Web]（useState）
├── 项目网格：按 activeTag 过滤，AnimatePresence 切换动画
└── ProjectCard
    ├── 正面：封面图 + 项目名 + 技术标签
    ├── 背面（hover）：简介 + GitHub/Demo 链接
    └── Framer Motion whileHover：scale + rotateY 翻转
```

Content Collection Schema（`content/config.ts`）：
```ts
projects: {
  title: string
  tags: string[]       // ["Unity", "C#"] 等
  cover: string
  description: string
  github?: string
  demo?: string
  year: number
}
```

数据流：`index.astro` 用 `getCollection('projects')` 取数据 → props 传给 `<Projects client:load projects={...} />`

---

## Section 4：Experience

**文件**：`Experience.astro`

```
Experience（纯 Astro，零 JS）
└── 时间线：
    ├── 左侧竖线（border-left，霓虹色）
    └── 每个节点：
        ├── 圆形标记点（::before 伪元素，霓虹 glow）
        ├── 时间标签
        ├── 职位/项目名（Space Mono）
        └── 描述段落
```

动画：CSS `@keyframes` + `animation-delay` 错落入场
数据：硬编码数组，在 `.astro` 内 `map` 渲染

---

## Section 5：Contact

**文件**：`Contact.astro`

```
Contact（纯 Astro，零 JS）
├── 标题 + 邀请语
├── 社交链接：GitHub / LinkedIn / Twitter / Email
│   SVG inline 图标，hover 霓虹 glow（Tailwind group-hover）
└── Email 直接显示（mailto 链接）
    无表单，避免后端依赖
```

---

## 开发顺序

| 步骤 | 内容 | 状态 |
|------|------|------|
| 1 | BaseLayout + Navbar + Footer + global.css | ⬜ |
| 2 | Hero section（确认设计风格基调） | ⬜ |
| 3 | Content Collection schema + 示例 .md 数据 | ⬜ |
| 4 | Projects section（数据驱动，逻辑最复杂） | ⬜ |
| 5 | About + SkillTree | ⬜ |
| 6 | Experience | ⬜ |
| 7 | Contact | ⬜ |
| 8 | 全局滚动动画 polish（Framer Motion viewport stagger） | ⬜ |
| 9 | SEO meta + OG 图片 | ⬜ |
| 10 | qa-reviewer 审查 → 部署 | ⬜ |

---

## Subagents 分工

| Agent | 负责 |
|-------|------|
| `ui-designer` | 所有组件的视觉实现、动效、Tailwind 样式 |
| `logic-builder` | content collection、数据流、SEO、部署配置 |
| `qa-reviewer` | 每个区块完成后的 a11y / 性能 / 代码质量审查 |
