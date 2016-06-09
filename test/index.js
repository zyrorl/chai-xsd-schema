import chai from 'chai';
import fs from 'fs';

const expect = chai.expect;
chai.use(require('../index'));

describe('Test XML', () => {
  it('Fails with invalid input and valid schema', () => {
    const schema = fs.readFileSync(`${__dirname}/schemas/dhl.xsd`, {
      encoding: 'utf8',
    });

    const xml = fs.readFileSync(`${__dirname}/vectors/invalidData.xml`, {
      encoding: 'utf8',
    });

    expect(xml).to.not.be.validXML(schema);
  });

  it('Passes with valid input and valid schema', () => {
    const schema = fs.readFileSync(`${__dirname}/schemas/dhl.xsd`, {
      encoding: 'utf8',
    });

    const xml = fs.readFileSync(`${__dirname}/vectors/validData.xml`, {
      encoding: 'utf8',
    });

    expect(xml).to.be.validXML(schema);
  });
});
