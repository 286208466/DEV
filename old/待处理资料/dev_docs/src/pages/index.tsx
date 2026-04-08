import React, { useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import jquery from "../assets/jquery.png";
import backbone from "../assets/backbone.png";
import sliderHillImg from "../assets/hill.png";
import sliderSunImg from "../assets/sun.png";
import sliderBirds1Img from "../assets/birds1.png";
import sliderBirds2Img from "../assets/birds2.png";
import sliderHouseImg from "../assets/house.png";
import clientImg from "../assets/clients.png";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // renderBg();
  }, []);

  const renderBg = function () {
    var e: any = document.getElementById("bg-canvas"),
      i = document.documentElement.clientWidth,
      o = document.documentElement.clientHeight;
    e.width = i;
    e.height = o;
    var n = e.getContext("2d");
    n.strokeStyle = "#f6f6f6";
    n.lineWidth = 1;
    n.beginPath();
    n.translate(0.5, 0.5);
    for (var t = 20; t <= o; t += 20) {
      n.moveTo(0, t);
      n.lineTo(i, t);
    }
    for (t = 20; t <= i; t += 20) {
      n.moveTo(t, 0);
      n.lineTo(t, o);
    }
    n.closePath();
    n.stroke();
  };

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        {/* <HomepageFeatures /> */}

        <section className={styles.homeSlider}>
          <div className={styles.container}>
            <div
              style={{
                position: "absolute",
                bottom: 30,
                color: "#686868",
                width: 430,
              }}
            >
              <h3 style={{ fontSize: 36 }}>Hello，我是FH</h3>
              <p>
                从事开发多年，有丰富的PC网站、移动端h5、微信公众号、微信小程序、大屏可视化等项目开发经验，
                熟悉vue、react、jquery、backbone等框架及相关技术栈，熟悉nodejs和python，可全栈开发，有前端团队管理和项目管理经验，有良好的沟通能力和团队合作精神、对待工作认真负责，学习能力强，善于发现问题、解决问题
              </p>
              <p>如果您想联系我，可发邮件至<a href="mailto://272366149@qq.com">《我的邮箱》</a></p>
            </div>
            <img src={sliderHillImg} className={styles.sliderHill} />
            <img src={sliderSunImg} className={styles.sliderSun} />
            <img src={sliderBirds1Img} className={styles.sliderBirds1} />
            <img src={sliderBirds2Img} className={styles.sliderBirds2} />
            <img
              src={sliderHouseImg}
              className={styles.sliderHouse}
              alt="slider image"
            ></img>
          </div>
        </section>
        
        <section>
          
        </section>

        <div className={styles.column1}>
          <div className={styles.container}>
            <div className="flex">
              <div className="flexItem">
                <img src={clientImg} />
                {/* <h2>可视化项目案例</h2> */}
                <div>
                  <ul>
                    <li>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <div className={styles.container}>
            <h2 className="columnTitle">
              <span>我使用的技术</span>
            </h2>
            <div className="marquee">
              <div className="marquee-content ">
                <li>
                  <img src={jquery} />
                </li>
                <li>
                  <img src={backbone} />
                </li>
              </div>
            </div>
          </div>
        </div> */}

        <div></div>

        {/* <canvas id="bg-canvas" width="899" height="936"></canvas>
        <div className={styles.mask}></div> */}
      </main>
    </Layout>
  );
}
