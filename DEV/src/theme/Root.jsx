import React from "react";
import PasswordProtect from "@site/src/components/PasswordProtect";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Root({ children }) {
  // 如果不需要保护某些页面，可以在这里添加条件判断
  const { siteConfig } = useDocusaurusContext();

  const customFields = siteConfig.customFields;
  const enablePassword = customFields.enablePassword;
  // 根据路径或其他条件设置

  if (typeof enablePassword != "undefined") {
    if (enablePassword) {
      return <PasswordProtect>{children}</PasswordProtect>;
    }
  }

  return children;
}
