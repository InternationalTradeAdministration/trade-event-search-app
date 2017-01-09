const config = Object.assign({
  development: {
    api: {
      trade_events: {
        host: 'https://intrasearch.govwizely.com/v1/trade_events',
      },
    },
  },
  production: {
    api: {
      trade_events: {
        host: 'https://intrasearch.export.gov/v1/trade_events',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
