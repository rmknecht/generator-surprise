'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:bourbon', function () {
  describe('on', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          docRoot: docRoot,
          framework: 'incBourbonNeat',
        })
        .on('end', done);
    });

    it('generates the correct package.json', function () {
      assert.fileContent('package.json', '"bourbon": "^4.2.7"');
      assert.fileContent('package.json', '"bourbon-neat": "^1.8.0"');
    });

    it('generates the correct gulpfile', function () {
      assert.fileContent('gulp-tasks/styles.js', "import bourbon from 'bourbon';");
      assert.fileContent('gulp-tasks/styles.js', "import neat from 'bourbon-neat';");
      assert.fileContent('gulp-tasks/styles.js', '{includePaths: bourbon.includePaths.concat(neat.includePaths)}');
    });

    it('generates the correct readme', function () {
      assert.fileContent('README.md', '[Bourbon Neat]');
    });

    it('generates the correct scss', function () {
      assert.fileContent('source/scss/styles.scss', '@import "bourbon";');
      assert.fileContent('source/scss/styles.scss', '@import "neat-settings";');
      assert.fileContent('source/scss/styles.scss', '@import "neat";');
      assert.fileContent('source/scss/styles.scss', '@import "grid";');
      assert.fileContent('source/scss/modules/_forms.scss', '#{$all-text-inputs}');
      assert.fileContent('source/scss/modules/_forms.scss', '#{$all-text-inputs-focus}');
      assert.fileContent('source/scss/modules/_styleguide.scss', 'Bourbon Neat Style Guide styles');
      assert.file('source/scss/_grid.scss');
      assert.file('source/scss/_neat-settings.scss');
    });

    describe('with style guide', function () {
      before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
          .withPrompts({
            docRoot: docRoot,
            framework: 'incBourbonNeat',
            addStyleGuide: true
          })
          .on('end', done);
      });

      it('creates the default styleguide', function () {
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

      it('does not list dependencies in package.json', function () {
        assert.noFileContent('package.json', '"bourbon": "^4.2.7"');
        assert.noFileContent('package.json', '"bourbon-neat": "^1.8.0"');
      });

      it('is not required in the gulp task', function () {
        assert.noFileContent('gulp-tasks/styles.js', "import bourbon from 'bourbon';");
        assert.noFileContent('gulp-tasks/styles.js', "import neat from 'bourbon-neat';");
        assert.noFileContent('gulp-tasks/styles.js', '{includePaths: bourbon.includePaths.concat(neat.includePaths)}');
      });

      it('is not included in the readme', function () {
        assert.noFileContent('README.md', '[Bourbon Neat]');
      });

      it('does not generate scss', function () {
        assert.noFileContent('source/scss/styles.scss', '@import "bourbon";');
        assert.noFileContent('source/scss/styles.scss', '@import "neat-settings";');
        assert.noFileContent('source/scss/styles.scss', '@import "neat";');
        assert.noFileContent('source/scss/styles.scss', '@import "grid";');
        assert.noFileContent('source/scss/modules/_forms.scss', '#{$all-text-inputs}');
        assert.noFileContent('source/scss/modules/_forms.scss', '#{$all-text-inputs-focus}');
        assert.noFileContent('source/scss/modules/_styleguide.scss', 'Bourbon Neat Style Guide styles');
        assert.noFile('source/scss/_grid.scss');
        assert.noFile('source/scss/_neat-settings.scss');
      });
    });
});