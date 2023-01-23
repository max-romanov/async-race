const brand: Array<string> = [
  'Audi',
  'Alfa Romeo',
  'Alpine',
  'Aston Martin',
  'Axon',
  'Ford',
  'Ferrari',
  'Fiat',
  'GAZ',
  'GMC',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infinity',
  'Isuzu',
  'JAC',
  'Jaguar',
  'Jeep',
  'Kama',
  'Lada',
  'Lexus',
  'Lotus',
  'MAN',
  'Baumbach',
  'MAZ',
  'Mazda',
  'McLarsen',
  'Nissan',
  'Opel',
  'Paca',
  'Pagans',
  'Pontiac',
  'Porsche',
  'Renault',
  'Anaconda',
  'Smart',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'UAZ',
  'Volvo',
  'ZAZ',
  'XPens',
  'TVR',
  'Saab',
  'RAM',
  'Chevrolet',
  'Manzanita',
  'Daewoo',
];
const model: Array<string> = [
  'Roadster',
  'S',
  'X',
  '3',
  'Y',
  'Cybertruck',
  'X5',
  'X7',
  'X3',
  'X6',
  'GT4',
  'FXX',
  '599 GTO',
  'Enzo',
  '458 Italia',
  '250 GTO',
  'Prior',
  '4x4',
  'Rio',
  'Focus',
  'Kalina',
  'Vesta',
  'Spark',
  'Lattice',
  'Nexis',
  'Matic',
  'Cobalt',
  'Captive',
  'A7',
  'A5',
  'A3',
  'A8',
  'TT',
  'Corolla',
  'Camry',
  'RAV4',
  'Imprecate',
  'WRX',
  'ES',
  'LS',
  'RX',
  'GX',
  'LX',
  'GS',
  'LC500',
  'Gallard',
  'Adornment',
  '911',
  'Cayenne',
  'FX37',
];

const generateRandomColor = (): string => {
  const hex: string = '0123456789ABCDEF';
  let color: string = '#';

  while (color.length < 7) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }

  return color;
};

const generateRandomName = (): string => {
  const randomBrand: string = brand[Math.floor(Math.random() * brand.length)];
  const randomModel: string = model[Math.floor(Math.random() * model.length)];

  return `${randomBrand} ${randomModel}`;
};

 export const generateRandomCars = (count: number = 100): Array<{ name: string; color: string }> => {
   return new Array(count).fill(0).map(() => ({
     name: generateRandomName(),
     color: generateRandomColor(),
   }));
 }
