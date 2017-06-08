import config from 'config';

let disabled = false;
/** @type {{ getAsync: Function, setAsync: Function }} redisCli */
let redisCli;

// Generic function to override default fetch methods.
async function retrieveCache(ops, method) {
  /** @type {{ expired, serial }} options */
  const options = Object.assign({}, ops || {});
  const serial = Object.prototype.hasOwnProperty.call(options, 'serial')
    ? options.serial
    : undefined;
  const expired = Object.prototype.hasOwnProperty.call(options, 'expired')
    ? options.expired
    : config.get('query.cacheTimeLimit') * 60; // in seconds

  delete options.serial;
  delete options.expired;

  if (!serial || disabled === true) {
    console.log(`    > Cache skipped [${serial}]`);
    return this[method](options);
  }

  return redisCli.getAsync(serial).then(async (result) => {
    if (result === null) {
      const cache = await this[method](options).then(data => data.toJSON());

      // Store record
      redisCli.setAsync(serial, JSON.stringify(cache), 'EX', expired);
      console.log(`    > Cache refreshed [${serial}]`);

      return {
        toJSON: () => cache,
      };
    }

    return {
      toJSON: () => JSON.parse(result),
    };
  });
}


export default(bookshelf, settings) => {
  // Destructuring settings.
  const { redis } = settings;
  redisCli = redis;

  // Disable plugin if there is no Redis instance.
  if (Object.prototype.hasOwnProperty.call(settings, 'disabled') && settings.disabled === true) {
    disabled = true;
    console.log('    > Cache disabled.');
  }

  bookshelf.Model.prototype.fetchAllCache = function (options) { // eslint-disable-line
    return retrieveCache.apply(this, [options, 'fetchAll']);
  };

  bookshelf.Model.fetchAllCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this, [...args, 'fetchAll']);
  };

  bookshelf.Collection.prototype.fetchAllCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this, [...args, 'fetchAll']);
  };

  bookshelf.Model.prototype.fetchPageCache = function (options) { // eslint-disable-line
    return retrieveCache.apply(this, [options, 'fetchPage']);
  };

  bookshelf.Model.fetchPageCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this, [...args, 'fetchPage']);
  };

  bookshelf.Collection.prototype.fetchPageCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this, ...args);
  };

  bookshelf.Model.prototype.fetchCache = function (options) { // eslint-disable-line
    return retrieveCache.apply(this, [options, 'fetch']);
  };

  bookshelf.Model.fetchCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this, [...args, 'fetch']);
  };

  bookshelf.Collection.prototype.fetchCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this, [...args, 'fetch']);
  };
};
