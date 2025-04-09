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
    var geeMetadata = new Cesium.GoogleEarthEnterpriseMetadata({
      url: "http://www.earthenterprise.org/3d",
      proxy: new Cesium.DefaultProxy("/proxy/"),
    });
    var gee_Imagery = new Cesium.GoogleEarthEnterpriseImageryProvider({
      metadata: geeMetadata,
    });
    var gee_Terrain = new Cesium.GoogleEarthEnterpriseTerrainProvider({
      metadata: geeMetadata,
    });

    viewer.imageryProvider = gee_Imagery;
    viewer.terrainProvider = gee_Terrain;
    // Start off looking at San Francisco.
    viewer.camera.setView({
      destination: Cesium.Rectangle.fromDegrees(-123.0, 36.0, -121.7, 39.0),
    });
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
