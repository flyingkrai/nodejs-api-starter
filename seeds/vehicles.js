// eslint-disable

const faker = require('faker');

faker.locale = 'pt_BR';

module.exports.seed = (db) => {
  const length = 500;
  const vehicle = [];

  return Promise
    .all(Array.from({ length }).map(() => {
      const id = faker.random.uuid();
      vehicle.push(id);

      return db.insert({
        id,
        brand: `customer_email_${i}@email.com`,
        model: faker.name.findName(),
        plate: faker.company.companyName(),
        color: faker.name.jobTitle(),
        fuel: faker.finance.account(),
        year: faker.finance.account(),
        renavam: faker.phone.phoneNumber(),
        chassi: faker.phone.phoneNumber(),
      }).into('vehicles');
    }))
    .then(Promise.all(Array.from({ length }).map((_, i) => db.insert({
      id: faker.random.uuid(),
      value: faker.commerce.price(10000, 100000, 2),
      vehicle_id: vehicle[i],
    }).into('vehicles_price_history'))));
};
