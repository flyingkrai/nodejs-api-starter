// eslint-disable

const faker = require('faker');

faker.locale = 'pt_BR';

module.exports.seed = (db) => {
  const length = 10;
  const address = [];
  const customers = [];

  return db.table('customers').delete()
    .then(() => db.table('salesmen').delete())
    .then(() => Promise
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
      .then(() => Promise
        .all(Array.from({ length }).map((_, i) => {
          const id = faker.random.uuid();
          customers.push(id);

          return db.insert({
            id,
            email: `customer_email_${i}@email.com`,
            name: faker.name.findName(),
            company: faker.company.companyName(),
            occupation: faker.name.jobTitle(),
            document: faker.finance.account(),
            rg: faker.finance.account(),
            phone: faker.phone.phoneNumber(),
            cellphone: faker.phone.phoneNumber(),
          }).into('customers');
        }))))
    .then(() => Promise
      .all(Array.from({ length }).map((_, i) => db.insert({
        customer_id: customers[i],
        address_id: address[i],
      }).into('customer_address'))));
};
