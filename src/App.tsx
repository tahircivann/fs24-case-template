import {
  Euler,
  Matrix4,
  Object3D,
  Quaternion,
  Vector3,
  Vector3Tuple
} from "three";
import { useState } from "react";
import { House } from "managers/HouseManager/HouseManager.types";
import AxesHelper from "components/AxesHelper";
import CameraControls from "components/CameraControls";
import Canvas from "components/Canvas";
import Container from "components/Container";
import GridHelper from "components/GridHelper";
import HouseManager from "managers/HouseManager";
import Light from "components/Light";
import PivotControls from "components/PivotControls";

/** Constants */
const CAMERA_POSITION = [10, 10, 10] as Vector3Tuple;
const GRID_POSITION = [0, -0.001, 0] as Vector3Tuple;
const GRID_SIZE = 50;
const CONTAINER_STYLE = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#151d2c"
};
const HOUSE_INIT: House = {
  points: [
    [0, 0, 0],
    [2, 0, 0],
    [20, 0, 2],
    [0, 0, 2]
  ],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  height: 2
};
const PIVOT_DEFAULT_PROPS = {
  autoTransform: false,
  depthTest: false,
  fixed: true,
  scale: 60,
  disableScaling: true,
  disableSliders: true
};

/** Variables */
const pivotMatrix = new Matrix4();

/** App */
const App = () => {
  /** States */
  const [houses, setHouses] = useState<House[]>([HOUSE_INIT]);
  const [enabledCameraControls, setEnabledCameraControls] = useState(true);
  const [selectedHouseObject, setSelectedHouseObject] = useState<Object3D>();
  const [selectedPointObject, setSelectedPointObject] = useState<Object3D>();
  const [selectedPointLocalPosition, setSelectedPointLocalPosition] = useState<Vector3>(new Vector3());

  /** Callbacks */
  const handleOnClickHousePointObject = (
    pointObject: Object3D,
    houseObject: Object3D
  ) => {
    pivotMatrix.copy(pointObject.matrixWorld);
    setSelectedPointObject(pointObject);
    setSelectedHouseObject(houseObject);

    // Store the local position of the selected point
    const localPosition = new Vector3();
    pointObject.getWorldPosition(localPosition);
    houseObject.worldToLocal(localPosition);
    setSelectedPointLocalPosition(localPosition);
  };

  const handleOnDragPivotControls = (matrix: Matrix4) => {
    pivotMatrix.copy(matrix);

    /** IMPLEMENT:
     * Add logic that updates the position and rotation of the selected house object
     * based on the selected point object's position and rotation.
     */

    if (selectedHouseObject && selectedPointObject) {
      // Extract position
      const position = new Vector3();
      matrix.decompose(position, new Quaternion(), new Vector3());

      // Calculate new house position based on the pivot's new position
      const newHousePosition = position.clone().sub(selectedPointLocalPosition.clone().applyQuaternion(selectedHouseObject.quaternion));

      // Update house position
      selectedHouseObject.position.copy(newHousePosition);

      // Extract rotation
      const quaternion = new Quaternion();
      matrix.decompose(new Vector3(), quaternion, new Vector3());
      const rotation = new Euler().setFromQuaternion(quaternion);

      // Update house rotation
      selectedHouseObject.rotation.copy(rotation);
    }
  };

  const handleOnDragEndPivotControls = () => {
    setEnabledCameraControls(true);
  };

  const handleOnDragStartPivotControls = () => {
    setEnabledCameraControls(false);
  };

  const handleOnClickGetHousesFromAPI = () => {
    /** IMPLEMENT:
     * Fetch houses from an API and update the houses state.
     * URL: https://scaffcalc.com/api/houses
     * METHOD: GET
     */

    fetch("https://scaffcalc.com/api/houses")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data.houses);
      });
  };

  /** Return */
  return (
    <Container style={CONTAINER_STYLE}>
      <Canvas camera={{ position: CAMERA_POSITION }}>
        <AxesHelper />
        <CameraControls enabled={enabledCameraControls} />
        <GridHelper position={GRID_POSITION} args={[GRID_SIZE, GRID_SIZE]} />
        <HouseManager
          houses={houses}
          onClickHousePointObject={handleOnClickHousePointObject}
        />
        <Light />
        <PivotControls
          {...PIVOT_DEFAULT_PROPS}
          enabled={!!selectedHouseObject}
          matrix={pivotMatrix}
          onDragStart={handleOnDragStartPivotControls}
          onDrag={handleOnDragPivotControls}
          onDragEnd={handleOnDragEndPivotControls}
        />
      </Canvas>
      <button
        style={{ position: "absolute", right: 20, top: 20, height: "40px" }}
        onClick={handleOnClickGetHousesFromAPI}
      >
        GET Houses from API
      </button>
    </Container>
  );
};

export default App;
