module.exports = {
  query: {
    limit: 30,
    cacheTimeLimit: 60, // in minutes
  },
  states: require('./states.json'), // eslint-disable-line
  vehicles: {
    brands: require('./vehicles.json'), // eslint-disable-line
    fuelTypes: [
      'Gasolina',
      'Álcool',
      'Flex',
      'Gás',
      'Diesel',
    ],
    colors: [
      'Amarelo',
      'Azul',
      'Bege',
      'Branco',
      'Cinza',
      'Dourado',
      'Fantasia',
      'Grena',
      'Laranja',
      'Marrom',
      'Prata',
      'Preto',
      'Rosa',
      'Roxo',
      'Verde',
      'Vermelho',
    ],
  },
  salesmen: {
    types: {
      store: {
        id: 'store',
        title: 'Loja',
      },
      broker: {
        id: 'broker',
        title: 'Loja',
      },
      third_parties: {
        id: 'third_parties',
        title: 'Terceiros',
      },
      others: {
        id: 'others',
        title: 'Outros',
      },
    },
  },
};
