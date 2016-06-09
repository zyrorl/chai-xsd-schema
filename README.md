# Chai plugin for XML validation using libxml-xsd
Chai plugin to allow XML Schemas (XSD) to be used with expect.
This is currently a stub and is under heavy development.
All contributions are welcome.

##Usage
This plugin adds validWithSchema to the expect validation methods.
```
expect('xmldocstring').to.be.validXML(['xsdschemastring1','xsdschemastring1]);
expect('xmldocstring').to.be.validXML('xsdschemastring');
```

##Simple Example
```
import chai from 'chai';
import fs from 'fs';

chai.use(require('chai-xsd-schema'))

const expect = chai.expect;

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

```
