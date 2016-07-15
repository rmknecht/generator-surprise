'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var changeCase = require('change-case');

var appName = 'Temp Name';
var packageName = appName.replace(/\s+/g, '-').toLowerCase();
var pascalName = changeCase.pascalCase(appName);


describe('surprise:project-name', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        docRoot: 'public_html',
        appName: appName
      })
      .on('end', done);
  });

  it('generates the same package name in every file', function () {
    assert.fileContent('package.json', packageName);
    assert.fileContent('bower.json', packageName);
  });

  it('generates the same app name in every file', function () {
      assert.fileContent('README.md', appName);
      assert.fileContent('public_html/mockups/_includes/site-header.php', appName);
      assert.fileContent('public_html/mockups/_includes/site-header.php', appName);
      assert.fileContent('public_html/mockups/index.php', appName);
      assert.fileContent('public_html/mockups/styleguide.php', appName);
  });

  it('generates the same pascal case name in every file', function () {
    assert.fileContent('public_html/assets/js/common.js', pascalName);
    assert.fileContent('public_html/assets/js/site.js', pascalName);
  });
});