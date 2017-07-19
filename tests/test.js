var test = require('tape');
var fetch = require('../scripts/updateContent.js');



test('check tape is working', function(t) {
  t.equal(1, 1, 'one should equal one');
  t.end();
});

test('check flagUrl returns UK', function(t) {
  var expected = "https://countryapi.gear.host/v1/Country/getCountries?pName=united+kingdom";
  var result = fetch('UK')
  t.equal(result, expected, 'Expected url for UK flag');
  t.end();
});

test('check flagUrl returns South Korea', function(t) {
  var expected = "https://countryapi.gear.host/v1/Country/getCountries?pName=Korea+(Republic+of)";
  var result = fetch('South Korea')
  t.equal(result, expected, 'Expected url for South Korea flag');
  t.end();
});
