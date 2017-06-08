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
    : 60 * 60; // Default expiration time to 1 hour.

  delete options.serial;
  delete options.expired;

  if (!serial || disabled === true) {
    console.warn('Cache skipped.');
    return this[method](options);
  }

  return redisCli.getAsync(serial).then(async (result) => {
    if (result === null) {
      const cache = await this[method](options).then(data => data.toJSON());

      // Store record
      redisCli.setAsync(serial, JSON.stringify(cache), 'ex', expired);

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
    console.warn('Cache disabled.');
  }

  bookshelf.Model.prototype.fetchAllCache = function (options) { // eslint-disable-line
    return retrieveCache.apply(this, [options, 'fetchAll']);
  };

  bookshelf.Model.fetchAllCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this.forge(), [...args, 'fetchAll']);
  };

  bookshelf.Collection.prototype.fetchAllCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this.model.forge(), [...args, 'fetchAll']);
  };

  bookshelf.Model.prototype.fetchPageCache = function (options) { // eslint-disable-line
    return retrieveCache.apply(this, [options, 'fetchPage']);
  };

  bookshelf.Model.fetchPageCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this.forge(), [...args, 'fetchPage']);
  };

  bookshelf.Collection.prototype.fetchPageCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this.model.forge(), ...args);
  };

  bookshelf.Model.prototype.fetchCache = function (options) { // eslint-disable-line
    return retrieveCache.apply(this, [options, 'fetch']);
  };

  bookshelf.Model.fetchCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this.forge(), [...args, 'fetch']);
  };

  bookshelf.Collection.prototype.fetchCache = function (...args) { // eslint-disable-line
    return retrieveCache.apply(this.model.forge(), [...args, 'fetch']);
  };
};
