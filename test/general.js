'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('surprise:generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        docRoot: 'public_html'
      })
      .on('end', done);
  });

  it('can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../generators/app');
  });

  it('creates expected directories', function() {
    assert.file([
      'public_html/',
      'public_html/assets',
      'public_html/assets/components',
      'public_html/assets/dist',
      'public_html/assets/dist/css',
      'public_html/assets/dist/js',
      'public_html/assets/img',
      'public_html/assets/vendor',
      'public_html/mockups',
      'public_html/mockups/_includes',
      'source/js',
      'source/scss',
      'gulp-tasks'
    ]);
  });

  it('creates expected files', function () {
    assert.file([
      'package.json',
      'gulpfile.babel.js',
      'bower.json',
      'README.md',
      '.babelrc',
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.nvmrc',
      '.sublime-project',
      'public_html/apple-touch-icon.png',
      'public_html/browserconfig.xml',
      'public_html/crossdomain.xml',
      'public_html/favicon.ico',
      'public_html/humans.txt',
      'public_html/robots.txt',
      'public_html/tile-wide.png',
      'public_html/tile.png',
      'source/scss/_mixins.scss',
      'source/scss/styles.scss',
      'source/scss/_base.scss',
      'source/scss/_variables.scss',
      'source/scss/modules/_forms.scss',
      'source/scss/modules/_buttons.scss',
      'source/scss/modules/_footer.scss',
      'source/scss/modules/_header.scss'
    ]);
  });
});