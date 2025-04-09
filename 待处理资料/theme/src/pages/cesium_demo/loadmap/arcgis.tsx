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
    // viewer.imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
    //   url : 'http://192.168.0.205:6080/arcgis/rest/services/GDSTXF/QGSLT_3857/MapServer',//矢量
    //   //   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
    //   // url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer", //午夜蓝
    // });
    var img_arcgis = new Cesium.ArcGisMapServerImageryProvider({
      name: "img_arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    });
    var layers = viewer.scene.imageryLayers;
    layers.addImageryProvider(img_arcgis);
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
