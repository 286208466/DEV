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

    var mapbox_street = new Cesium.MapboxImageryProvider({
      mapId: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
    });
    var layers = viewer.scene.imageryLayers;
    layers.addImageryProvider(mapbox_street);
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
