import { getHousesGenerator } from '../src/mocks/endpoints';
import { House } from '../src/managers/HouseManager/HouseManager.types';

describe('getHousesGenerator', () => {
    it('should generate a non-empty array of houses', () => {
        const houses: House[] = getHousesGenerator();
        expect(houses.length).toBeGreaterThan(0);
    });

    it('should generate houses with valid properties', () => {
        const houses: House[] = getHousesGenerator();
        houses.forEach(house => {
            expect(house.points).toHaveLength(4);
            house.points.forEach(point => {
                expect(point).toHaveLength(3);
                point.forEach(coord => {
                    expect(typeof coord).toBe('number');
                });
            });
            expect(house.position).toHaveLength(3);
            house.position.forEach(coord => {
                expect(typeof coord).toBe('number');
            });
            expect(house.rotation).toHaveLength(3);
            house.rotation.forEach(coord => {
                expect(typeof coord).toBe('number');
            });
            expect(typeof house.height).toBe('number');
            expect(house.height).toBeGreaterThanOrEqual(1);
            expect(house.height).toBeLessThanOrEqual(20);
        });
    });

    it('should generate houses with positions within the expected range', () => {
        const houses: House[] = getHousesGenerator();
        houses.forEach(house => {
            expect(house.position[0]).toBeGreaterThanOrEqual(-50);
            expect(house.position[0]).toBeLessThanOrEqual(50);
            expect(house.position[2]).toBeGreaterThanOrEqual(-50);
            expect(house.position[2]).toBeLessThanOrEqual(50);
        });
    });

    it('should generate houses with rotations within the expected range', () => {
        const houses: House[] = getHousesGenerator();
        houses.forEach(house => {
            expect(house.rotation[1]).toBeGreaterThanOrEqual(0);
            expect(house.rotation[1]).toBeLessThanOrEqual(Math.PI * 2);
        });
    });
});