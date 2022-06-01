import assign from 'object-assign';

const config = assign({
  development: {
    api: {
      trade_events: {
        host: 'CHANGEME',
        subscription_key: 'CHANGEME',
      },
    },
  },
  production: {
    api: {
      trade_events: {
        host: 'CHANGEME',
        subscription_key: 'CHANGEME',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
