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
        host: 'https://api.trade.gov/consolidated_screening_list/search',
      },
    },
  },
});

export default config[process.env.NODE_ENV];
