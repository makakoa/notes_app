'use strict';

var expect = require('chai').expect;
var some_func = require('../../../app/js/some_func.js');

describe('the test', function() {
  it('should be true', function() {
    expect(true).to.be.true;
  });

  it('should have a true function', function() {
    expect(some_func()).to.be.true;
  });
});
