// eslint-disable

const faker = require('faker');
const _map = require('lodash/map');

const config = require('../src/config/default');
const configDev = require('../src/config/development');

const configs = Object.assign({}, config, configDev);
faker.locale = 'pt_BR';

function generatePlate() {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return [
    faker.random.arrayElement(letters),
    faker.random.arrayElement(letters),
    faker.random.arrayElement(letters),
    '-',
    faker.random.number({ min: 0, max: 9 }),
    faker.random.number({ min: 0, max: 9 }),
    faker.random.number({ min: 0, max: 9 }),
    faker.random.number({ min: 0, max: 9 }),
  ].join('');
}

function generateYear() {
  const yearStart = faker.random.number({ min: 2000, max: 2017 });
  const yearEnd = Math.floor(Math.random() * 10) % 2 === 0 ? yearStart + 1 : yearStart;

  return `${String(yearStart).slice(2)}/${String(yearEnd).slice(2)}`;
}

module.exports.seed = (db) => {
  const length = 2;
  const vehicle = [];

  return db.table('vehicles_price_history').delete()
    .then(() => db.table('vehicles').delete())
    .then(() => Promise
      .all(Array.from({ length }).map(() => {
        const id = faker.random.uuid();
        const brand = faker.random.arrayElement(configs.vehicles.brands);
        const model = faker.random.arrayElement(brand.models);
        vehicle.push(id);

        return db.insert({
          id,
          brand: brand.name,
          model: model.name,
          plate: generatePlate(),
          color: faker.random.arrayElement(configs.vehicles.colors),
          fuel: faker.random.arrayElement(configs.vehicles.fuelTypes),
          year: generateYear(),
        }).into('vehicles');
      }))
      .then(() => Promise
        .all(Array.from({ length }).map((_, i) => db.insert({
          id: faker.random.uuid(),
          value: faker.commerce.price(10000, 100000, 2),
          vehicle_id: vehicle[i],
        }).into('vehicles_price_history')))));
};
