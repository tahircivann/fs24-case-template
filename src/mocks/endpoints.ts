import { House } from "managers/HouseManager/HouseManager.types";
import { Vector3Tuple } from "three";

export const getHousesGenerator: () => House[] = () => {
  const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateRandomShape = (): [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple] => {
    const point1: Vector3Tuple = [0, 0, 0];
    const point2: Vector3Tuple = [getRandomNumber(1, 10), 0, 0];
    const point3: Vector3Tuple = [getRandomNumber(1, 10), 0, getRandomNumber(1, 10)];
    const point4: Vector3Tuple = [0, 0, getRandomNumber(1, 10)];
    return [point1, point2, point3, point4];
  };

  const numberOfHouses = getRandomInt(1, 10);
  const houses: House[] = [];

  for (let i = 0; i < numberOfHouses; i++) {
    const house: House = {
      points: generateRandomShape(),
      position: [getRandomNumber(-50, 50), 0, getRandomNumber(-50, 50)], // x and z within 100x100m grid, centered at (0,0)
      rotation: [0, getRandomNumber(0, Math.PI * 2), 0], // random rotation around y-axis
      height: getRandomNumber(1, 20) // height between 1m and 20m
    };
    houses.push(house);
  }

  return houses;
};