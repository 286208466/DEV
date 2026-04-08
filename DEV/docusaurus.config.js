// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const enablePassword = true;
const customFields = {
  port: 8881,
  enablePassword: enablePassword,
  passwords: ["fh", "ds", "guest2026"],
};

const plugins = [
  require.resolve("docusaurus-plugin-image-zoom"),
  [
    "@docusaurus/plugin-content-docs",
    {
      id: "platform",
      path: "DOCS_CORE/20书签",
      routeBasePath: "DOCS_CORE/20书签",
      sidebarPath: require.resolve("./sidebars.js"),
    },
  ],

  [
    "@docusaurus/plugin-content-docs",
    {
      id: "10doc",
      path: "DOCS_CORE/21软件工具",
      routeBasePath: "DOCS_CORE/21软件工具",
      sidebarPath: require.resolve("./sidebars.js"),
    },
  ],

  [
    "@docusaurus/plugin-content-docs",
    {
      id: "13doc",
      path: "DOCS_CORE/13EMAG",
      routeBasePath: "DOCS_CORE/13EMAG",
      sidebarPath: require.resolve("./sidebars.js"),
    },
  ],

  [
    "@docusaurus/plugin-content-blog",
    {
      id: "BLOG_CORE",
      path: "BLOG_CORE",
      routeBasePath: "BLOG_CORE",
      postsPerPage: 10,
      blogSidebarTitle: "文章列表",
      blogSidebarCount: "ALL",
    },
  ],
  // [
  //   "@docusaurus/plugin-content-blog",
  //   {
  //     id: "blog_notes_webpack",
  //     path: "blog_notes/webpack",
  //     routeBasePath: "blog_notes/webpack",
  //     postsPerPage: 10,
  //     blogSidebarTitle: "文章列表",
  //     blogSidebarCount: "ALL",
  //   },
  // ],
  // [
  //   "@docusaurus/plugin-content-docs",
  //   {
  //     id: "docs_dev",
  //     path: "docs_dev",
  //     routeBasePath: "docs_dev",
  //     sidebarPath: require.resolve("./sidebars.js"),
  //   },
  // ],
];

const items = [
  {
    to: "DOCS_CORE/20书签/00overview",
    label: "书签",
    position: "left",
  },
  {
    to: "DOCS_CORE/21软件工具/00overview",
    label: "软件工具",
    position: "left",
  },
  {
    type: "dropdown",
    label: "电商平台",
    items: [
      // { to: "DOCS_CORE/01AMZ/00overview", label: "亚马逊" },
      // { to: "DOCS_CORE/02TEMU/00overview", label: "TEMU" },
      // { to: "DOCS_CORE/03SHEIN/00overview", label: "希音" },
      { to: "DOCS_CORE/13EMAG/00overview", label: "EMAG" },
    ],
  },
  { to: "/BLOG_CORE", label: "文章", position: "left" },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "QingLan",
  tagline: "",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "QingLan", // Usually your GitHub org/user name.
  projectName: "QingLan", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  //==============================
  baseUrl: "/dev",
  customFields: customFields,
  plugins: plugins,

  //==============================
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: ["./src/css/custom.css", "./src/css/juejin_theme.css"],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      zoom: {
        selector: ".markdown img", // 默认选择器，对Markdown中的图片生效
        background: {
          light: "rgb(255, 255, 255)", // 浅色模式背景色
          dark: "rgb(50, 50, 50)", // 深色模式背景色
        },
        // config: { } // 可以传入 medium-zoom 库的更高级配置
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "QingLan",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          ...items,

          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "left",
          //   label: "Tutorial",
          // },
          // { to: "/blog", label: "Blog", position: "left" },
          // {
          //   href: "https://github.com/facebook/docusaurus",
          //   label: "GitHub",
          //   position: "right",
          // },
        ],
      },
      footer: {
        style: "dark",
        links: [
          // {
          //   title: "Docs",
          //   items: [
          //     {
          //       label: "Tutorial",
          //       to: "/docs/intro",
          //     },
          //   ],
          // },
          // {
          //   title: "Community",
          //   items: [
          //     {
          //       label: "Stack Overflow",
          //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
          //     },
          //     {
          //       label: "Discord",
          //       href: "https://discordapp.com/invite/docusaurus",
          //     },
          //     {
          //       label: "X",
          //       href: "https://x.com/docusaurus",
          //     },
          //   ],
          // },
          // {
          //   title: "More",
          //   items: [
          //     {
          //       label: "Blog",
          //       to: "/blog",
          //     },
          //     {
          //       label: "GitHub",
          //       href: "https://github.com/facebook/docusaurus",
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QingLan`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
