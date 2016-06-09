import chai from 'chai';
import fs from 'fs';

const expect = chai.expect;
chai.use(require('../index'));

describe('Test XML', () => {
  it('Fails with invalid input and valid schema', () => {
    const schema = String(fs.readFileSync(`${__dirname}/schemas/dhl.xsd`));
    const xml = String(fs.readFileSync(`${__dirname}/vectors/invalidData.xml`));
    // console.log(xml);
    expect(xml).to.not.be.validXML(schema);
  });

  it('Passes with valid input and valid schema', () => {
    const schema = String(fs.readFileSync(`${__dirname}/schemas/dhl.xsd`));
    const xml = String(fs.readFileSync(`${__dirname}/vectors/validData.xml`));
    // console.log(xml);
    expect(xml).to.be.validXML(schema);
  });
});
