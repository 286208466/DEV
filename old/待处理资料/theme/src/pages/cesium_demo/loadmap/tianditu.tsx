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

    //天地图影像
    // var tdt_key="c1d6b49adb2ba817109873dbc13becb4";
    // var img_tdt=new Cesium.WebMapTileServiceImageryProvider({
    //     url: "http://t0.tianditu.com/img_w/wmts?tk="+tdt_key,
    //     layer:'img',
    //     style:'default',
    //     tileMatrixSetID:'w',
    //     format:'tiles',
    //     maximumLevel: 18
    // });
    // var layers= viewer.scene.imageryLayers;
    // var img_cia= new Cesium.WebMapTileServiceImageryProvider({
    //     url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk='+tdt_key,
    //     layer:'cia',
    //     style:'default',
    //     tileMatrixSetID:'w',
    //     format:'tiles',
    //     maximumLevel: 18
    // });
    // layers.addImageryProvider(img_tdt);
    // layers.addImageryProvider(img_cia);

    //天地图矢量
    var tdt_key = "c1d6b49adb2ba817109873dbc13becb4";
    var img_tdt = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/vec_w/wmts?tk=" + tdt_key,
      layer: "vec",
      style: "default",
      tileMatrixSetID: "w",
      format: "tiles",
      maximumLevel: 18,
    });
    var img_cia = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/cva_w/wmts?tk=" + tdt_key,
      layer: "cva",
      style: "default",
      tileMatrixSetID: "w",
      format: "tiles",
      maximumLevel: 18,
    });
    var layers = viewer.scene.imageryLayers;
    layers.addImageryProvider(img_tdt);
    layers.addImageryProvider(img_cia);
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
