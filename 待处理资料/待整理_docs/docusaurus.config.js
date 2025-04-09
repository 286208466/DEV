// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "开发资料库",
  tagline: "动手记录，少走弯路",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Fuhai123", // Usually your GitHub org/user name.
  projectName: "Fuhai123", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "datav",
        path: "datav",
        routeBasePath: "datav",
        sidebarPath: require.resolve("./sidebarsDatav.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_links",
        path: "docs_links",
        routeBasePath: "docs_links",
        sidebarPath: require.resolve("./sidebarsLinks.js"),
        // ... 其他设置
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "manage",
        path: "manage",
        routeBasePath: "manage",
        sidebarPath: require.resolve("./sidebarsManage.js"),
        // ... 其他设置
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "lowcode",
        path: "topic/lowcode",
        routeBasePath: "topic/lowcode",
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "microfrontend",
        path: "topic/microfrontend",
        routeBasePath: "topic/microfrontend",
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "typescript",
        path: "topic/typescript",
        routeBasePath: "topic/typescript",
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "react",
        path: "topic/react",
        routeBasePath: "topic/react",
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "知识库",
          },
          { to: "/blog", label: "文章", position: "left" },
          { to: "/case/Overview", label: "主题", position: "left" },
          // {
          //   position: "left",
          //   label: "可视化",
          //   to: "/datav/overview",
          // },
          // {
          //   position: "left",
          //   label: "项目管理",
          //   to: "/manage/overview",
          // },
          {
            position: "left",
            label: "网址收藏",
            to: "/links/comprehensive",
          },
          {
            position: "left",
            label: "案例",
            to: "/case/overview",
          },
          
          
          {
            position: "right",
            label: "关于我",
            to: "/aboutme",
          },
          {
            position: "right",
            label: "联系我",
            to: "/contactme",
          },
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
          //       label: "Twitter",
          //       href: "https://twitter.com/docusaurus",
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
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
