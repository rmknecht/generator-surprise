'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

const docRoot = 'public_html';

describe('surprise:gulp-tasks', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        docRoot: docRoot
      })
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file([
      'gulp-tasks/bower.js',
      'gulp-tasks/clean.js',
      'gulp-tasks/dist.js',
      'gulp-tasks/paths.js',
      'gulp-tasks/scripts.js',
      'gulp-tasks/styles.js'
    ]);
  });

  it('uses the correct document root directory within gulp tasks', function () {
    assert.fileContent('gulp-tasks/paths.js', docRoot);
  });
});