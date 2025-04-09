import React, { useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { initMap } from "../common.js";
let Cesium = window.Cesium;
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    let viewer = initMap();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className="demoPageContainer">
        <div className="">
          <div className="demoPageLeft"></div>
          <div className="demoPageCenter">
            <div id="cesiumContainer"></div>
          </div>
          <div className="demoPageRight"></div>
        </div>
      </main>
    </Layout>
  );
}
