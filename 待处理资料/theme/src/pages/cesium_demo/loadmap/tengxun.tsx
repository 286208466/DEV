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
    layers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=229",
        customTags: {
          sx: function (imageryProvider, x, y, level) {
            return x >> 4;
          },
          sy: function (imageryProvider, x, y, level) {
            return ((1 << level) - y) >> 4;
          },
        },
      })
    );
    var custom = new Cesium.UrlTemplateImageryProvider({
      url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=2&version=297",
    });

    viewer.imageryLayers.addImageryProvider(custom);
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
