# Chai plugin for XML validation using libxml-xsd
Chai plugin to allow XML Schemas (XSD) to be used with expect.
This is currently a stub and is under heavy development.
All contributions are welcome.

##Installation

To install plugin simply run:
`npm install chai-xsd-schema`

Then add the following to your unit tests under your chai definition:

```javascript
chai.use(require('chai-xsd-schema'))
```


##Usage
This plugin adds validWithSchema to the expect validation methods.
```javascript
expect('xmldocstring').to.be.validXML(['xsdschemastring1','xsdschemastring2']);
expect('xmldocstring').to.be.validXML('xsdschemastring');
```

##Simple Example
```javascript
import chai from 'chai';
import fs from 'fs';

chai.use(require('chai-xsd-schema'))

const expect = chai.expect;

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

```
