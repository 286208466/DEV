首先我们要知道获取中心点方法

```js
function getCenter(viewer： any) {
    // debugger
    const scene = viewer.scene;
    const target = pickCenterPoint(scene);
    let bestTarget = target;

    const globe = scene.globe;
    const carto = scene.camera.positionCartographic.clone();
    const height = globe.getHeight(carto);
    carto.height = height || 0;
    bestTarget = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);

    const result = formatPosition(bestTarget);

    // 获取地球中心点世界位置 与 摄像机的世界位置 之间的距离
    const distance = Cesium.Cartesian3.distance(bestTarget, viewer.scene.camera.positionWC);
    result.cameraZ = distance;
    return result;
}

function pickCenterPoint(scene： any) {
    const canvas = scene.canvas;
    const center = new Cesium.Cartesian2(canvas.clientWidth / 2, canvas.clientHeight / 2);
    const ray = scene.camera.getPickRay(center);
    const target = scene.globe.pick(ray, scene);
    return target || scene.camera.pickEllipsoid(center);
    }

    function formatPosition(position) {
    const carto = Cesium.Cartographic.fromCartesian(position);
    const result = {};
    result.y = formatNum(Cesium.Math.toDegrees(carto.latitude), 6);
    result.x = formatNum(Cesium.Math.toDegrees(carto.longitude), 6);
    result.z = formatNum(carto.height, 2);
    return result;
}

function formatNum(num, digits) {
    return Number(num.toFixed(digits || 0));
}
```

第二我们要知道屏幕中心点位置

```js
function getScreenCenter(_viewer: any) {
  const viewer = _viewer;
  const result = viewer.camera.pickEllipsoid(
    new Cesium.Cartesian2(
      viewer.canvas.clientWidth / 2,
      viewer.canvas.clientHeight / 2
    )
  );
  const curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
  const lon = (curPosition.longitude * 180) / Math.PI;
  const lat = (curPosition.latitude * 180) / Math.PI;
  const height = curPosition.height;
  return {
    x: lon,
    y: lat,
  };
}
```

下面我们来定义调用切换二三维的方法, 其中 mapType 我定义为 mapView 和 sceneView 类型, 哈哈学习 arcgis 模式

```js
type mapType = 'mapView' | 'sceneView';

public changeSV23D(viewer: any, type: mapType) {
    const viewer = viewer;
    const result: any = getCenter(viewer);
    const curPosition = getScreenCenter(viewer);
    const center = Cesium.Cartesian3.fromDegrees(curPosition.x, curPosition.y);
    if (type === 'sceneView') {
    if (viewer.view === 'sceneView') {
    return;
}
viewer.scene.screenSpaceCameraController.enableTilt = true;
viewer.view = 'sceneView';
let x = -90;
let pitch;
const range = result.cameraZ * 1.2;
viewer.scene.preUpdate.addEventListener(handle3d);
// eslint-disable-next-line @typescript-eslint/no-this-alias
const that = this;
function handle3d() {
x += 1;
pitch = viewer.camera.pitch;
if (pitch < -0.6981317007977318) {
//viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(viewer.camera.heading, pitch, range));
that.tilesTransform(viewer,that.getNavigationCentercenter(viewer),true);
} else {
viewer.scene.preUpdate.removeEventListener(handle3d);
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}
}
} else {
if (viewer.view === 'mapView') {
return;
}
viewer.view = 'mapView';
const range = result.cameraZ * 1.12;
let pitch;
let x: number;

x = -Cesium.Math.toDegrees(Math.abs(viewer.camera.pitch));

viewer.scene.preUpdate.addEventListener(handle2d);
// eslint-disable-next-line @typescript-eslint/no-this-alias
const that = this;
function handle2d() {
x -= 1;
pitch = viewer.camera.pitch;
if (pitch > -1.5533430342749532) {
// viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(0, pitch, range));
that.tilesTransform(viewer,that.getNavigationCentercenter(viewer),false);
} else {
    const result: any = getCenter(viewer);
    viewer.scene.preUpdate.removeEventListener(handle2d);
    viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(0, pitch, result.cameraZ));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    viewer.scene.screenSpaceCameraController.enableTilt = false;
    }
}
}
}

private tilesTransform(viewer: any, cartesian0: any, isUp: boolean) {
const map = viewer; //用于翻转操作
const camera = map.scene.camera;
const ellipsoid = map.scene.globe.ellipsoid;
const mag = Cesium.Cartesian3.magnitude(cartesian0);
const radii = Cesium.Cartesian3.fromElements(mag, mag, mag, new Cesium.Cartesian3());
const newEllipsoid = Cesium.Ellipsoid.fromCartesian3(radii, new Cesium.Ellipsoid());
map.scene._screenSpaceCameraController._rotateFactor = 1.0;
map.scene._screenSpaceCameraController._rotateRateRangeAdjustment = 1.0;
camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
const oldTransform = Cesium.Matrix4.clone(camera.transform, new Cesium.Matrix4());
const transform = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian0, ellipsoid, new Cesium.Matrix4());
const verticalTransform = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian0, newEllipsoid, new Cesium.Matrix4());
camera._setTransform(verticalTransform);
if (isUp == true) {
if (camera.pitch > -0.4) {
camera.rotateUp(0);
} else {
camera.rotateUp(0.05);
}
} else {
camera.rotateDown(0.05);
}
camera._setTransform(oldTransform);
}

private getNavigationCentercenter(viewer: any) {
//获取地图导航操作中心
const x = viewer.scene.canvas.clientWidth / 2;
const y = viewer.scene.canvas.clientHeight / 2;
const pick1 = new Cesium.Cartesian2(x, y);
const ray = viewer.scene.camera.getPickRay(pick1);
const cartesian0 = viewer.scene.globe.pick(ray, viewer.scene);
if (cartesian0 == undefined) {
return;
}
return cartesian0;
}
```

xiaozhuanlan.com/topic/7459016328
