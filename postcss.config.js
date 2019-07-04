var cssvariables = require('postcss-css-variables');
var calc = require('postcss-calc');

module.exports = {
  plugins: [
    cssvariables({
        preserveAtRulesOrder: true
    }),
    calc()
  ]
}