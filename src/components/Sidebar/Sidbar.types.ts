import { Euler, Object3D, Vector3 } from "three";

interface SidebarProps {
    selectedHouseObject: Object3D | undefined;
    housePosition: Vector3;
    houseRotation: Euler;
    foundModels: Object3D[];
}

export default SidebarProps;