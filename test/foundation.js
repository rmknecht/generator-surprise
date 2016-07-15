'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:foundation', function () {
  describe('on', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          docRoot: docRoot,
          framework: 'incFoundation',
        })
        .on('end', done);
    });

    it('generates the correct bower file', function () {
      assert.fileContent('bower.json', '"foundation-sites": "~6.1.2"');
    });

    it('generates the correct readme file', function () {
      assert.fileContent('README.md', '[Foundation Sites 6]');
    });

    it('generates the correct scss files', function () {
      assert.fileContent(docRoot+'/assets/scss/styles.scss', '@import "vendor/settings";');
      assert.fileContent(docRoot+'/assets/scss/styles.scss', '@import "vendor/foundation";');
      assert.fileContent(docRoot+'/assets/scss/modules/_styleguide.scss', 'Style guide styles for Foundation 6');
      assert.file(docRoot+'/assets/scss/vendor/_foundation.scss');
      assert.file(docRoot+'/assets/scss/vendor/_settings.scss');
    });

    describe('with style guide', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            docRoot: docRoot,
            framework: 'incFoundation',
            addStyleGuide: true
          })
          .on('end', done);
      });

      it('creates the default styleguide document', function () {
        assert.fileContent(docRoot+'/mockups/styleguide.php', 'Default Style Guide');
      });
    });
  });

  describe('off', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            docRoot: docRoot,
            framework: false,
          })
          .on('end', done);
      });

      it('is not included in the bower file', function () {
        assert.noFileContent('bower.json', '"foundation-sites": "~6.1.2"');
      });

      it('is not included in the readme file', function () {
        assert.noFileContent('README.md', '[Foundation Sites 6]');
      });

      it('does not generates the scss', function () {
        assert.noFileContent(docRoot+'/assets/scss/styles.scss', '@import "vendor/settings";');
        assert.noFileContent(docRoot+'/assets/scss/styles.scss', '@import "vendor/foundation";');
        assert.noFileContent(docRoot+'/assets/scss/modules/_styleguide.scss', 'Style guide styles for Foundation 6');
        assert.noFile(docRoot+'/assets/scss/vendor/_foundation.scss');
        assert.noFile(docRoot+'/assets/scss/vendor/_settings.scss');
      });
    });
});