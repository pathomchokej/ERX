//const { test, expect } = require('@jest/globals');
//const { describe } = require('yargs');
// prevent to generate upper lines
const _countryService = require('../../app/helpers/CountryHelper').Instance;

describe('Country Service',() => {

test('GetCountries', () => {
expect(_countryService.GetCountries().length).toBe(3);
});

});