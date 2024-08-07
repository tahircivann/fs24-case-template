import { Object3D } from "three";
import { House } from "managers/HouseManager/HouseManager.types";

interface FindModelsProps {
    setFoundModels: React.Dispatch<React.SetStateAction<Object3D[]>>;
    houses: House[];
    modelUpdates: number;
}

export default FindModelsProps;