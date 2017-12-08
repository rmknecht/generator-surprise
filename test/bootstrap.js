'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:boostrap', function () {
  describe('on', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          docRoot: docRoot,
          framework: 'incBootstrap',
        })
        .on('end', done);
    });

    it('generates the correct readme file', function () {
      assert.fileContent('README.md', '[Bootstrap SASS]');
    });

    it('generates the correct scss files', function () {
      assert.fileContent('source/scss/styles.scss', '@import "vendor/bootstrap-settings";');
      assert.fileContent('source/scss/styles.scss', '@import "vendor/bootstrap-custom";');
      assert.fileContent('source/scss/modules/_styleguide.scss', 'Style guide styles for Bootstrap SASS');
      assert.file('source/scss/vendor/_bootstrap-custom.scss');
      assert.file('source/scss/vendor/_bootstrap-settings.scss');
    });

    describe('with style guide', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            docRoot: docRoot,
            framework: 'incBootstrap',
            addStyleGuide: true
          })
          .on('end', done);
      });

      it('creates the bootstrap style guide document', function () {
        assert.fileContent(docRoot+'/mockups/styleguide.php', 'Bootstrap Style Guide');
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

      it('includes normalize-scss in bower file', function () {
        assert.fileContent('bower.json', '"normalize-scss": "~3.0.3"');
      });

      it('imports _normalize.scss in styles.scss', function () {
        assert.fileContent('source/scss/styles.scss', '@import "../../public_html/assets/components/normalize-scss/_normalize.scss";');
      });

      it('is not included in the readme file', function () {
        assert.noFileContent('README.md', '[Bootstrap SASS]');
      });

      it('does not generates scss', function () {
        assert.noFileContent('source/scss/styles.scss', '@import "vendor/bootstrap-settings";');
        assert.noFileContent('source/scss/styles.scss', '@import "vendor/bootstrap-custom";');
        assert.noFileContent('source/scss/modules/_styleguide.scss', 'Style guide styles for Bootstrap SASS');
        assert.noFile('source/scss/vendor/_bootstrap-custom.scss');
        assert.noFile('source/scss/vendor/_bootstrap-settings.scss');
      });
    });
});