'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:document-root', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        docRoot: docRoot,
      })
      .on('end', done);
  });

  it('creates the correct document root directory', function () {
    assert.file(docRoot);
  });
});