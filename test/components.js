'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var docRoot = 'public_html';

describe('surprise:components', function () {

  describe('on', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          docRoot: docRoot,
          components: [
            {
              'name': 'font-awesome',
              'version': '~4.5.0',
            },
            {
              'name': 'slick-carousel',
              'version': '~1.5.9',
            },
            {
              'name': 'velocity',
              'version': '~1.2.3',
            }
          ]
        })
        .on('end', done);
    });

    it('includes components in bower.json', function () {
      assert.fileContent('bower.json', 'font-awesome');
      assert.fileContent('bower.json', 'slick-carousel');
      assert.fileContent('bower.json', 'velocity');
    });
  });

  describe('off', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          docRoot: docRoot,
          components: []
        })
        .on('end', done);
    });

    it('does not include components in bower.json', function () {
      assert.noFileContent('bower.json', 'font-awesome');
      assert.noFileContent('bower.json', 'slick-carousel');
      assert.noFileContent('bower.json', 'velocity');
    });
  });
});