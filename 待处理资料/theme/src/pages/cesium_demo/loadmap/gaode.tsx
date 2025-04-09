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

    //高德影像
    // layers.addImageryProvider(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: "http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    //   })
    // );
    //高德矢量
    layers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "http://webst02.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}",
      })
    );
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
