import xsd from 'libxml-xsd';

export default function xsdValidation(chai, utils) {
  const Assertion = chai.Assertion;
  const assert = chai.assert;
  chai.xsd = xsd; // eslint-disable-line no-param-reassign

  chai.Assertion.addMethod('validXML', function (schema, msg) {
    const xml = this._obj; // eslint-disable-line no-underscore-dangle

    const schemas = Array.isArray(schema) ? schema : [schema];

    schemas.forEach((schemaTest) => {
      // Check Schema is a string
      new Assertion(schemaTest).to.be.a('string');
      // Check xml is a string
      new Assertion(xml).to.be.a('string');

      // Load and parse schema from string
      const schemaValidator = chai.xsd.parse(schemaTest);

      const validationResult = schemaValidator.validate(xml);

      let valid = true;
      let validationErrors;
      if (validationResult !== null) {
        valid = false;
        validationErrors = validationResult.map(
          (e) => `${e.message.replace(/\n$/, '')} (col ${e.column}: line ${e.line})`
        );
      }

      return assert(
        valid === !utils.flag(this, 'negate'),
        !utils.flag(this, 'negate') ?
          `expected XML to be valid: ${JSON.stringify(validationErrors)}` :
          'expected XML to be invalid'
      );
    });
  });

  assert.validXML = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.be.validXML(exp);
  };

  assert.notValidXML = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.be.validXML(exp);
  };
}
