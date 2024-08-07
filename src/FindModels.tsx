import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Object3D } from "three";
import { House } from "managers/HouseManager/HouseManager.types";

interface FindModelsProps {
    setFoundModels: React.Dispatch<React.SetStateAction<Object3D[]>>;
    houses: House[]; // Add houses as a dependency
    modelUpdates: number; // Add modelUpdates as a dependency
}

const FindModels: React.FC<FindModelsProps> = ({ setFoundModels, houses, modelUpdates }) => {
    const { scene } = useThree();

    useEffect(() => {
        const findAll3DModels = (object: Object3D) => {
            const models: Object3D[] = [];
            object.traverse((child) => {
                if (child instanceof Object3D && child.type === "Group" && child.name === "HouseGroup") {
                    models.push(child);
                }
            });
            return models;
        };

        const models = findAll3DModels(scene);
        setFoundModels(models);
        console.log("All 3D models in the scene:", models);
        console.log("Houses:", houses);
        console.log("Model updates:", modelUpdates);
    }, [scene, setFoundModels, houses, modelUpdates]); // Add houses and modelUpdates as dependencies

    return null;
};

export default FindModels;