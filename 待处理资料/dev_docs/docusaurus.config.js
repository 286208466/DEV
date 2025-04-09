// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require("prism-react-renderer/themes/github");
//okaidia palenight vsDark
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// const BASE_URL = "/";
const BASE_URL = "/static/dev_docs/";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "FH",
  tagline: "FH",
  url: "http://8.129.54.83",
  baseUrl: BASE_URL,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "FH", // Usually your GitHub org/user name.
  projectName: "FH", // Usually your repo name.

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
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/juejin_theme.css"),
          ],
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_standard_code",
        path: "docs_standard_code",
        routeBasePath: "docs_standard_code",
        sidebarPath: require.resolve("./sidebarsDocsStandardCode.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_frontend_structure",
        path: "docs_frontend_structure",
        routeBasePath: "docs_frontend_structure",
        sidebarPath: require.resolve("./sidebarsDocsFrontendStructure.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_modules",
        path: "docs_modules",
        routeBasePath: "docs_modules",
        sidebarPath: require.resolve("./sidebarsDocsModules.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_system_design",
        path: "docs_system_design",
        routeBasePath: "docs_system_design",
        sidebarPath: require.resolve("./sidebarsDocsSystemDesign.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_tools",
        path: "docs_tools",
        routeBasePath: "docs_tools",
        sidebarPath: require.resolve("./sidebarsDocsTools.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_links",
        path: "docs_links",
        routeBasePath: "docs_links",
        sidebarPath: require.resolve("./sidebarsDocsTools.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_topic",
        path: "docs_topic",
        routeBasePath: "docs_topic",
        sidebarPath: require.resolve("./sidebarsDocsTools.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs_errors",
        path: "docs_errors",
        routeBasePath: "docs_errors",
        sidebarPath: require.resolve("./sidebarsDocsTools.js"),
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "FH",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/logo.svg",
        // },

        items: [
          {
            type: "dropdown",
            label: "前端",
            position: "left",
            items: [
              {
                to: "/docs_modules/01",
                label: "前端基础设施",
              },
              {
                to: "/docs_frontend_structure/项目搭建/01",
                label: "前端架构",
              },
            ],
          },
          
          {
            type: "dropdown",
            label: "后端",
            position: "left",
            items: [],
          },

          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Tutorial",
          // },

          {
            to: "/docs_system_design/01",
            label: "组件库",
            position: "left",
          },
          {
            to: "/docs_system_design/01",
            label: "方案设计",
            position: "left",
          },
          {
            to: "/docs_standard_code/前端/01",
            label: "标准化功能实现",
            position: "left",
          },
          {
            to: "/docs_errors/01",
            label: "开发常见问题及异常解决",
            position: "left",
          },
          {
            to: "/docs_tools/01",
            label: "工具库",
            position: "left",
          },
          {
            to: "/docs_topic/01",
            label: "主题",
            position: "left",
          },
          {
            to: "/docs_links/01",
            label: "网站收藏",
            position: "left",
          },
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
        copyright: `Copyright © ${new Date().getFullYear()} FH, Inc. `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
