import { carBrand, carModal } from './carBrands';

export function randomNumInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export function getRandomCar() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function getRandomName() {
  const brand = carBrand[randomNumInRange(0, carBrand.length - 1)];
  const modal = carModal[randomNumInRange(0, carModal.length - 1)];
  return brand + ' ' + modal;
}

