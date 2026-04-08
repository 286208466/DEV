import React, { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const STORAGE_KEY = "docusaurus-auth";

export default function PasswordProtect({ children }) {
  const { siteConfig } = useDocusaurusContext();

  const customFields = siteConfig.customFields;

  const PASSWORDS = customFields.passwords; // 设置你的密码

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 检查本地存储中是否有认证信息
    const auth = localStorage.getItem(STORAGE_KEY);
    if (PASSWORDS.includes(auth)) {
      setIsAuthenticated(true);
    }

    const authTime = localStorage.getItem("auth-timestamp");
    const now = Date.now();
    // 24小时后过期
    if (authTime && now - parseInt(authTime) > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("auth-timestamp");
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (PASSWORDS.includes(password)) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, password);
      localStorage.setItem("auth-timestamp", Date.now());
      setError("");
    } else {
      setError("密码错误，请重试");
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          border: "1px solid #e3e3e3",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2>需要密码访问</h2>
        <p>请输入密码查看本站内容</p>
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入访问密码"
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#3578e5",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            进入网站
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
}
