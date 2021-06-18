//const { test, expect } = require('@jest/globals');
//const { describe } = require('yargs');
// prevent to generate upper lines
const _countryService = require('../../app/services/CountryService');

describe('Country Service',() => {

test('GetCountries', () => {
expect(_countryService.GetCountries()).toBe('List of Country');
});

});