import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Object3D } from "three";
import FindModelsProps from "./FindModel.types";



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
    }, [scene, setFoundModels, houses, modelUpdates]); // Add houses and modelUpdates as dependencies

    return null;
};

export default FindModels;