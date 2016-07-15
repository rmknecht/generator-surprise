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
      'public_html/assets/css',
      'public_html/assets/img',
      'public_html/assets/js',
      'public_html/assets/js/build',
      'public_html/assets/scss',
      'public_html/assets/vendor',
      'public_html/mockups',
      'public_html/mockups/_includes',
    ]);
  });

  it('creates expected files', function () {
    assert.file([
      'package.json',
      'gulpfile.js',
      'bower.json',
      'README.md',
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
      'public_html/assets/scss/_mixins.scss',
      'public_html/assets/scss/styles.scss',
      'public_html/assets/scss/_base.scss',
      'public_html/assets/scss/_variables.scss',
      'public_html/assets/scss/modules/_forms.scss',
      'public_html/assets/scss/modules/_buttons.scss',
      'public_html/assets/scss/modules/_footer.scss',
      'public_html/assets/scss/modules/_header.scss'
    ]);
  });
});