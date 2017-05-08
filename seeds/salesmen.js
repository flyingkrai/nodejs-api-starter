// eslint-disable

const faker = require('faker');

const config = require('../src/config/default');
const configDev = require('../src/config/development');

const configs = Object.assign({}, config, configDev);
faker.locale = 'pt_BR';

module.exports.seed = (db) => {
  const length = 5;
  const types = Object.keys(configs.salesmen.types);

  return db.table('salesmen').delete()
    .then(() => Promise
      .all(Array.from({ length })
        .map(() => db.insert({
          id: faker.random.uuid().split('-')[0],
          name: faker.name.findName(),
          cellphone: faker.phone.phoneNumber(),
          type_id: faker.random.arrayElement(types),
        }).into('salesmen'))));
};
