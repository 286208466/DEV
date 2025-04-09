相机据地面较远时，scene.pickPosition 误差很大；

相机据地面较近时，scene.pickPosition 误差较小，但是为负值，显然不对。

scene.pickPosition 结果不准。

globe.pick 结果稳定。

结论

综上试验结论：

1. globe.pick 的结果相对稳定准确，不论地形深度检测开启与否，不论加载的是默认地形还是别的地形数据；

2. scene.pickPosition 只有在开启地形深度检测，且不使用默认地形时是准确的。

注意点：

1. globe.pick 只能求交地形； 2. scene.pickPosition 不仅可以求交地形，还可以求交除地形以外其他所有写深度的物体。

所以使用时可以二者结合来使用。

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  selectionIndicator: false,

  infoBox: false,

  // 注释时相当于使用默认地形，解开注释相当于使用全球地形

  //terrainProvider: Cesium.createWorldTerrain()
});

// 深度开启或关闭

viewer.scene.globe.depthTestAgainstTerrain = true;

var scene = viewer.scene;

if (!scene.pickPositionSupported) {
  console.log("This browser does not support pickPosition.");
}

var handler;

Sandcastle.addToolbarButton("Pick position", function () {
  var modelEntity = viewer.entities.add({
    name: "milktruck",

    position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),

    model: {
      uri: "../../SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.gltf",
    },
  });

  viewer.zoomTo(modelEntity);

  var labelEntity = viewer.entities.add({
    label: {
      show: false,

      showBackground: true,

      font: "14px monospace",

      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,

      verticalOrigin: Cesium.VerticalOrigin.TOP,

      pixelOffset: new Cesium.Cartesian2(15, 0),
    },
  });

  var tempRay = new Cesium.Ray();

  var tempPos = new Cesium.Cartesian3();

  // Mouse over the globe to see the cartographic position

  handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

  handler.setInputAction(function (movement) {
    var foundPosition = false;

    var scene = viewer.scene;

    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      //var pickedObject = scene.pick(movement.endPosition);

      if (true) {
        labelEntity.label.text = "";

        var cartesian = viewer.scene.pickPosition(movement.endPosition);

        if (Cesium.defined(cartesian)) {
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);

          var longitudeString = Cesium.Math.toDegrees(
            cartographic.longitude
          ).toFixed(2);

          var latitudeString = Cesium.Math.toDegrees(
            cartographic.latitude
          ).toFixed(2);

          var heightString = cartographic.height.toFixed(2);

          labelEntity.label.text +=
            "Lon: " +
            (" " + longitudeString).slice(-7) +
            "\u00B0" +
            "\nLat: " +
            (" " + latitudeString).slice(-7) +
            "\u00B0" +
            "\nAlt: " +
            (" " + heightString).slice(-7) +
            "m";
        }

        var ray = scene.camera.getPickRay(movement.endPosition, tempRay);

        var cartesian2 = scene.globe.pick(ray, scene, tempPos);

        if (Cesium.defined(cartesian2)) {
          var cartographic2 = Cesium.Cartographic.fromCartesian(cartesian2);

          var longitudeString2 = Cesium.Math.toDegrees(
            cartographic2.longitude
          ).toFixed(2);

          var latitudeString2 = Cesium.Math.toDegrees(
            cartographic2.latitude
          ).toFixed(2);

          var heightString2 = cartographic2.height.toFixed(2);

          labelEntity.label.text +=
            "\nLon2: " +
            (" " + longitudeString2).slice(-7) +
            "\u00B0" +
            "\nLat2: " +
            (" " + latitudeString2).slice(-7) +
            "\u00B0" +
            "\nAlt2: " +
            (" " + heightString2).slice(-7) +
            "m";
        }

        if (cartesian || cartesian2) {
          labelEntity.position = cartesian || cartesian2;

          labelEntity.label.show = true;

          labelEntity.label.eyeOffset = new Cesium.Cartesian3(0.0, 0.0, 0);

          labelEntity.label.disableDepthTestDistance = Number.POSITIVE_INFINITY;

          foundPosition = true;
        }
      }
    }

    if (!foundPosition) {
      labelEntity.label.show = false;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});

Sandcastle.reset = function () {
  viewer.entities.removeAll();

  handler = handler && handler.destroy();
};
```
