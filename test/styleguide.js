'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:styleguide', function () {

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

    it('creates the default style guide', function () {
      assert.fileContent(docRoot+'/mockups/styleguide.php', 'Default Style Guide');
    });

    it('imports a style guide scss module', function () {
      assert.fileContent(docRoot + '/assets/scss/styles.scss', '@import "modules/styleguide";');
    });

    it('creates a style guide scss module', function () {
      assert.file(docRoot + '/assets/scss/modules/_styleguide.scss');
    });

    it('creates a style guide document', function () {
      assert.file(docRoot + '/mockups/styleguide.php');
    });
  });

  describe('without style guide', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            docRoot: docRoot,
            framework: false,
            addStyleGuide: false
          })
          .on('end', done);
      });

      it('does not import a style guide scss module', function () {
        assert.noFileContent(docRoot + '/assets/scss/styles.scss', '@import "modules/styleguide";');
      });

      it('does not create style guide scss module', function () {
        assert.noFile(docRoot + '/assets/scss/modules/_styleguide.scss');
      });

      it('does not create a style guide document', function () {
        assert.noFile(docRoot + '/mockups/styleguide.php');
      });
  });

});