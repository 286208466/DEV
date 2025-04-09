export function initMap(opts) {
  let Cesium = window.Cesium;

  let defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MzRhNDBjYi00MWQ2LTRlY2UtODRmMy01ZmQwYmYzZmY5YzUiLCJpZCI6MTA4NzQ0LCJpYXQiOjE2NjM3NTE1MTB9.40TJbLo0OIIrtjN9S9GmqLJeLHZvm63rj7HlRDIXCRE";
  Cesium.Ion.defaultAccessToken = defaultAccessToken;

  let defaultOpts = {
    // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //   //url : 'http://192.168.0.205:6080/arcgis/rest/services/GDSTXF/QGSLT_3857/MapServer',//矢量
    // //   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
    //   url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"//午夜蓝
    // }),
    baseLayerPicker: false, //关闭图层选择器
    //放大镜图标，查找位置工具，查找到之后会将镜头对准找到的地址，默认使用bing地图
    geocoder: false,
    //房子图标，视角返回初始位置
    homeButton: false,
    infoBox: false, //是否显示信息框
    //经纬网图标，选择视角的模式，有三种：3D，2D，哥伦布视图（2.5D)
    sceneModePicker: false,
    sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
    //地图图标，图层选择器，选择要显示的地图服务和地形服务,默认会用到cesium.ion
    selectionIndicator: false, //是否显示选取指示器组件
    //问号图标，导航帮助按钮，显示默认的地图控制帮助
    navigationHelpButton: false,
    animation: false, //动画器件，显示当前时间，允许跳转特定时间
    timeline: false, //时间轴
    //全屏图标，全屏按钮
    fullscreenButton: false,
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //虚拟现实
    //vrButton: true,
    //阴影
    shadows: true,
    //点击后显示详细信息
    //infoBox: true,
    //展示数据版权属性
    CreditsDisplay: false,
    //terrainExaggeration: 3.0, //地形夸大
    shouldAnimate: true,
    showRenderLoopErrors: true, //如果设为true，将在一个HTML面板中显示错误信息
    terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
    contextOptions: {
      //截图需要的
      webgl: {
        alpha: true,
        depth: true,
        stencil: true,
        antialias: true,
        premultipliedAlpha: true,
        //通过canvas.toDataURL()实现截图需要将该项设置为true
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: true,
      },
    },
    //用于渲染星空的SkyBox对象
    // skyBox: new Cesium.SkyBox({
    //   sources: {
    //     positiveX: 'skybox_px.png',
    //     negativeX: 'skybox_nx.png',
    //     positiveY: 'skybox_py.png',
    //     negativeY: 'skybox_ny.png',
    //     positiveZ: 'skybox_pz.png',
    //     negativeZ: 'skybox_nz.png'
    //   }
    // }),
  };
  var viewer = new Cesium.Viewer("cesiumContainer", {
    ...defaultOpts,
    ...opts,
  });

  viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏版本信息
  viewer.scene.debugShowFramesPerSecond = true; //显示帧率,帧率与显示流畅度有关，或说与显卡有关
  viewer.scene.skyBox.show = true; //是否显示星空
  //viewer.scene.backgroundColor = Cesium.Color.BLUE;//地球背景颜色
  viewer.scene.sun.show = true; //是否显示太阳
  viewer.scene.moon.show = true; //是否显示有月亮
  viewer.scene.skyAtmosphere.show = true; //是否隐藏大气圈
  viewer.scene.globe.show = true; //是否显示地球

  return viewer;
}

export function setCenter() {
  //Rectangle(west, south, east, north)
  //   var lon = 100.48;
  //   var lat = 30;
  //   Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  //     lon,
  //     lat,
  //     lon + 1,
  //     lat + 1
  //   );
  //   Cesium.Camera.DEFAULT_VIEW_FACTOR = 2.8;
  //   viewer.camera.setView({
  //     destination: Cesium.Cartesian3.fromDegrees(lon, lat, 19000000.0),
  //     orientation: {
  //       //此视角为观察者/相机
  //       heading: 0, //Cesium.Math.toRadians(0),//偏航
  //       pitch: Cesium.Math.toRadians(-90.0), //俯仰，人如果在赤道上空，俯仰角为0可见地球。如果在北纬，俯仰角为负才能见地球
  //       roll: 0.0, //翻滚
  //     },
  //   });
}
