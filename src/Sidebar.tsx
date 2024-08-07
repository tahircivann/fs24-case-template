import React from "react";
import { Object3D, Vector3, Euler } from "three";

interface SidebarProps {
  selectedHouseObject: Object3D | undefined;
  housePosition: Vector3;
  houseRotation: Euler;
  foundModels: Object3D[]; // New prop for found models
}

const Sidebar: React.FC<SidebarProps> = ({ selectedHouseObject, housePosition, houseRotation, foundModels }) => {
  return (
    <div style={{ padding: "10px", color: "white" }}>
      <h2>Selected House Details</h2>
      {selectedHouseObject ? (
        console.log('selectedHouseObject', selectedHouseObject.uuid),
        <ul>
          <li><strong>UUID:</strong> {selectedHouseObject.uuid}</li>
          <li><strong>Name:</strong> {selectedHouseObject.name}</li>
          <li><strong>Position:</strong> {`(${housePosition.x.toFixed(2)}, ${housePosition.y.toFixed(2)}, ${housePosition.z.toFixed(2)})`}</li>
          <li><strong>Rotation:</strong> {`(${houseRotation.x.toFixed(2)}, ${houseRotation.y.toFixed(2)}, ${houseRotation.z.toFixed(2)})`}</li>
        </ul>
      ) : (
        <p>No house selected.</p>
      )}
      <h1>Found Models</h1>
      {foundModels.length > 0 ? (
        <ul>
          {foundModels.map((model, index) => (
            console.log(model.uuid),
            <li key={model.uuid}>
              <h2>{model.name + " " + index}</h2>
              <ul>
                <li><strong>UUID:</strong> {model.uuid}</li>
                <li><strong>Name:</strong> {model.name}</li>
                <li><strong>Position:</strong> {`(${model.position.x.toFixed(2)}, ${model.position.y.toFixed(2)}, ${model.position.z.toFixed(2)})`}</li>
                <li><strong>Rotation:</strong> {`(${model.rotation.x.toFixed(2)}, ${model.rotation.y.toFixed(2)}, ${model.rotation.z.toFixed(2)})`}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found.</p>
      )}
    </div>
  );
};

export default Sidebar;