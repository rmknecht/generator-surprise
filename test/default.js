'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:default-framework', function () {

  describe('with style guide', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          docRoot: docRoot,
          framework: false,
          addStyleGuide: true
        })
        .on('end', done);
    });

    it('creates the correct styleguide scss', function () {
      assert.fileContent(docRoot + '/assets/scss/modules/_styleguide.scss', 'Default Styleguide SCSS');
    });

    it('creates the correct styleguide document', function () {
      assert.fileContent(docRoot + '/mockups/styleguide.php', 'Default Style Guide');
    });
  });
});