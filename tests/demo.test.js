const { expect } = require('chai');
const { describe, it } = require('mocha');

describe('testing', () => {
  it('should equal 2', () => {
    expect(1 + 1).to.equal(2);
  });

  it('should have length 6', () => {
    expect('jordan').to.have.lengthOf(6);
  });
});
