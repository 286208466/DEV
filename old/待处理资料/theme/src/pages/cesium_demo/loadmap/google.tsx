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
    var layers = viewer.scene.imageryLayers;

    // var img_google = new Cesium.UrlTemplateImageryProvider({
    //   subdomains: ["1", "2", "3"],
    //   url: "http://mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}",
    // });
    // var layers = viewer.scene.imageryLayers;
    // layers.removeAll();
    // layers.addImageryProvider(img_google);

    //谷歌矢量
    var img_vec = new Cesium.UrlTemplateImageryProvider({
      subdomains: ["1", "2", "3"],
      url: "http://mt{s}.google.cn/vt/lyrs=m&hl=zh-CN&x={x}&y={y}&z={z}",
    });
    var layers = viewer.scene.imageryLayers;
    layers.addImageryProvider(img_vec);
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div></div>
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
