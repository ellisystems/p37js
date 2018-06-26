import P37 from '../src/p37.js';
import { expect } from 'chai';
describe('P37', function() {
  describe('Viewability', function() {
    it('should call module function', function(done) {
      const p37 = new P37();
      expect(p37.viewableName).to.equal('p37');
      done();
    });
  });
});
