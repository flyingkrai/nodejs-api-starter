module.exports = {
  query: {
    limit: 30,
    cacheTimeLimit: 60, // in minutes
  },
  states: require('./states.json'), // eslint-disable-line
  vehicles: require('./vehicles.json'), // eslint-disable-line
};
