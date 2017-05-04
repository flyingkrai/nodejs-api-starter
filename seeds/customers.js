// eslint-disable

const faker = require('faker');

faker.locale = 'pt_BR';

module.exports.seed = (db) => {
  const length = 30;
  const address = [];
  return Promise
    .all(Array.from({ length }).map(() => {
      const id = faker.random.uuid();
      address.push(id);

      return db.insert({
        id,
        zipcode: faker.address.zipCode(),
        place: `${faker.address.streetSuffix()} ${faker.address.streetName()}`,
        number: faker.random.number(),
        neighbor: faker.address.county(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
      }).into('address');
    }))
    .then(Promise.all(Array.from({ length }).map((_, i) => db.insert({
      email: faker.internet.email(),
      name: faker.name.findName(),
      company: faker.company.companyName(),
      occupation: faker.name.jobTitle(),
      cpf: faker.finance.account(),
      rg: faker.finance.account(),
      phone: faker.phone.phoneNumber(),
      cellphone: faker.phone.phoneNumber(),
      address_id: address[i],
    }).into('customers'))));
};
