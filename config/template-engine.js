/**
 * Template Engine Setup
 */
const hbs = require('express-handlebars');

module.exports = app => {
  app.set('views', app.get('views'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'index',
      layoutsDir: app.get('views') + '/layouts',
      partialsDir: [app.get('views') + '/partials']
      // helpers: {
      //   ifLengthOf:
      //     ('ifLengthOf',
      //     (list, value, options) => {
      //       'use strict';
      //       if (list.length > value) {
      //         console.log('it is greater than 0');
      //         return options.fn(this);
      //       }
      //       return options.inverse(this);
      //     })
      // }
    })
  ).engine;
  app.set('view engine', 'hbs');
  return app;
};
