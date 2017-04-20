var assert = require('assert');
var authCAS = require('../lib/auth-cas')
var http = require('http');
var config = require('./test-config.json');



it('A host must be specified', function(){
  assert.throws(
    () => {
      new authCAS();
    },
    /Host must be supplied/
  );
  assert.throws( ()=>{
    new authCAS(undefined);
  }, /Host must be supplied/
  );
});

it('A CAS host must be specified', function(){
  assert.throws(
    () => {
      new authCAS('https://cashost.com')},
      /CAS host must be specified/
  )
});


it('visiting the login page should redirect to the CAS server login page', function(done){
  http.get(config.host + '/login', function(res){
    assert.equals(res.statusCode, 302);
      var redirect = url.parse(res.headers.location);
      var expected = url.parse(config.casHost);
      var service = encodedURIComponent(config.host + '/login');
      assert.equals(location.protocol, expected.protocol);
      assert.equals(location.hostname, expected.hostname);
      assert.equals(location.port, expected.port);
      assert.equals(location.pathname, '/login');
      assert.equals(location.search, '?service=' + service);
  });
});
