'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');
var stringLength = require('string-length');
var mkdirp = require('mkdirp');
var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');

var docRoot = null;

module.exports = yeoman.generators.Base.extend({

	_updateCheck: function(){
		var notifier = updateNotifier({
			pkg: pkg,
			updateCheckInterval: 0 // 1000 * 60 * 60 * 24 // one day
		});

		notifier.notify({defer: false});
	},

	initializing: function() {
		if (!pkg) { return; }

		this._updateCheck();
	},

	// this.props - object properties
	// -----------------------------------------------------------------------------------
	// appName:	string					- The name of the project. Default: "site"
	// packageName: string				- appName hyphenated in lowercase.
	// docRoot:	string					- The project's document root. Default: "public"
	// date: string						- Date generated. Example: 2016-12-25." Defined automatically.
	// framework: string				- The name of the frontend framework to include. Default: false
	// components: object				- Vendor Libraries to managed with bower. Default: null
	// addStyleGuide: bool, true/false	- Include a styleguide mockup page. Default: true

	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log( yosay('Welcome to the ' + chalk.red('Surprise Highway project') + ' generator!') );

		var prompts = [{
			type: 'input',
			name: 'appName',
			message: 'Please enter a name for the project.',
			default: 'site'
		},
		{
			type: 'input',
			name: 'docRoot',
			message: 'Please enter your document root.',
			default: 'public'
		},
		{
			type: 'list',
			name: 'framework',
			message: 'Please select a framework.',
			choices: [
				{ name: 'None',				value: false },
				{ name: 'Bourbon & Neat',	value: 'incBourbonNeat'		},
				{ name: 'Foundation 6',		value: 'incFoundation'	},
				{ name: 'Bootstrap 3',		value: 'incBootstrap'	},
			],
			defualt: 0 // index of our choices array
		},
		{
			type: 'checkbox',
			message: 'Select additional vendor components below.',
			name: 'components',
			choices: [
				// Use bower to confirm component name and version.
				// `bower info font-awesome`
				{
					name: 'Font Awesome',
					value: {
						'name': 'font-awesome',
						'version': '~4.5.0',
					}
				},
				{
					name: 'Slick Carousel',
					value: {
						'name': 'slick-carousel',
						'version': '~1.5.9',
					}
				},
				{
					name: 'Velocity.js',
					value: {
						'name': 'velocity',
						'version': '~1.2.3',
					}
				}
			]
		},
		{
			type: 'confirm',
			name: 'addStyleGuide',
			message: 'Would you like to include a styleguide section?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			// Access props with this.props.someOption;
			this.props = props;
			this.props.date = (new Date()).toISOString().split('T')[0];
			this.props.packageName = this.props.appName.replace(/\s+/g, '-').toLowerCase();
			docRoot = this.props.docRoot;
			done();
		}.bind(this));
	},

	scaffoldFolders: function(){
		mkdirp(docRoot+'/assets');
		mkdirp(docRoot+'/assets/components');
		mkdirp(docRoot+'/assets/dist');
		mkdirp(docRoot+'/assets/dist/js');
		mkdirp(docRoot+'/assets/dist/css');
		mkdirp(docRoot+'/assets/img');
		mkdirp(docRoot+'/assets/vendor');
		mkdirp(docRoot+'/mockups');
		mkdirp(docRoot+'/mockups/_includes');
		mkdirp(docRoot+'/mockups/assets');
		mkdirp('/gulp-tasks');
		mkdirp('/source');
		mkdirp('/source/js');
		mkdirp('/source/scss');
	},

	writing: {
		packageJSON: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					appName: this.props.packageName,
					framework: this.props.framework
				}
			);
		},


		gulpfile: function () {
			this.fs.copyTpl(
				this.templatePath('_gulpfile.babel.js'),
				this.destinationPath('gulpfile.babel.js'),
				{
					date: this.props.date,
					genName: pkg.name,
					genVersion: pkg.version,
					appName: this.props.packageName,
					docRoot: docRoot,
					framework: this.props.framework,
					addStyleGuide: this.props.addStyleGuide
				}
			);
			this.fs.copy(
				this.templatePath('gulp-tasks/**/*'),
				this.destinationPath('gulp-tasks/')
			);
			this.fs.copyTpl(
				this.templatePath('gulp-tasks/styles.js'),
				this.destinationPath('gulp-tasks/styles.js'),
				{
					framework: this.props.framework
				}
			);
			this.fs.copyTpl(
				this.templatePath('gulp-tasks/paths.js'),
				this.destinationPath('gulp-tasks/paths.js'),
				{
					docRoot: docRoot
				}
			);
		},

		bower: function() {
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				{
					appName: this.props.packageName,
					docRoot: docRoot,
					components: this.props.components,
					framework: this.props.framework
				}
			);
		},

		readMe: function() {
			this.fs.copyTpl(
				this.templatePath('_README.md'),
				this.destinationPath('README.md'),
				{
					appName: this.props.appName,
					packageName: this.props.packageName,
					docRoot: docRoot,
					framework: this.props.framework
				}
			);
		},

		project: function() {
			this.fs.copyTpl(
				this.templatePath('project/_babelrc'),
				this.destinationPath('.babelrc'),
				{ docRoot: docRoot }
			);
			this.fs.copyTpl(
				this.templatePath('project/_bowerrc'),
				this.destinationPath('.bowerrc'),
				{ docRoot: docRoot }
			);
			this.fs.copy(
				this.templatePath('project/editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copyTpl(
				this.templatePath('project/_gitattributes'),
				this.destinationPath('.gitattributes'),
				{ docRoot: docRoot }
			);
			this.fs.copy(
				this.templatePath('project/gitignore'),
				this.destinationPath('.gitignore')
			);
			this.fs.copy(
				this.templatePath('project/jshintrc'),
				this.destinationPath('.jshintrc')
			);
			this.fs.copy(
				this.templatePath('project/nvmrc'),
				this.destinationPath('.nvmrc')
			);
			this.fs.copy(
				this.templatePath('project/sublime-project'),
				this.destinationPath('.sublime-project')
			);
		},

		site: function() {
			this.fs.copy(
				this.templatePath('site/**/*'),
				this.destinationPath(docRoot+'/')
			);
		},

		/* Copy the common scss and render scss templates */
		scss: function(){
			/* Copy the common scss assets */
			this.fs.copy(
				this.templatePath('scss/common/**/*'),
				this.destinationPath('source/scss/')
			);

			/* Render the main styles.scss template */
			this.fs.copyTpl(
				this.templatePath('scss/default/styles.scss'),
				this.destinationPath('source/scss/styles.scss'),
				{
					docRoot: docRoot,
					framework: this.props.framework,
					addStyleGuide: this.props.addStyleGuide
				}
			);

			this.fs.copyTpl(
				this.templatePath('scss/default/_base.scss'),
				this.destinationPath('source/scss/_base.scss'),
				{ framework: this.props.framework }
			);

			this.fs.copyTpl(
				this.templatePath('scss/default/modules/_forms.scss'),
				this.destinationPath('source/scss/modules/_forms.scss'),
				{ framework: this.props.framework }
			);

			this.fs.copy(
				this.templatePath('scss/default/_variables.scss'),
				this.destinationPath('source/scss/_variables.scss')
			);
		},

		/* Copy the framework specific scss. */
		scssFrameworks: function(){
			switch (this.props.framework){
				case 'incBourbonNeat':
					this.fs.copy(
						this.templatePath('scss/bourbon-neat/**/*'),
						this.destinationPath('source/scss/')
					);
					break;
				case 'incFoundation':
					this.fs.copyTpl(
						this.templatePath('scss/foundation/_foundation.scss'),
						this.destinationPath('source/scss/vendor/_foundation.scss'),
						{ docRoot: docRoot }
					);

					this.fs.copyTpl(
						this.templatePath('scss/foundation/_settings.scss'),
						this.destinationPath('source/scss/vendor/_settings.scss'),
						{ docRoot: docRoot }
					);

					this.fs.copy(
						this.templatePath('scss/foundation/modules/**/*'),
						this.destinationPath('source/scss/modules/')
					);

					break;
				case 'incBootstrap':
					this.fs.copyTpl(
						this.templatePath('scss/bootstrap/_bootstrap-custom.scss'),
						this.destinationPath('source/scss/vendor/_bootstrap-custom.scss'),
						{ docRoot: docRoot }
					);

					this.fs.copyTpl(
						this.templatePath('scss/bootstrap/_bootstrap-settings.scss'),
						this.destinationPath('source/scss/vendor/_bootstrap-settings.scss'),
						{ docRoot: docRoot }
					);

					this.fs.copy(
						this.templatePath('scss/bootstrap/modules/**/*'),
						this.destinationPath('source/scss/modules/')
					);
					break;
				default:
					if(this.props.addStyleGuide) {
						this.fs.copy(
							this.templatePath('scss/default/modules/_styleguide.scss'),
							this.destinationPath('source/scss/modules/_styleguide.scss')
						);
					}
				}
		},

		javascript: function(){
			var context = {
				pascalName: changeCase.pascalCase(this.props.appName),
			};

			this.fs.copyTpl(
				this.templatePath('js/**/*'),
				this.destinationPath('source/js/'),
				context
			);

		},

		mockups: function(){
			this.fs.copyTpl(
				this.templatePath('mockups/**/*'),
				this.destinationPath(docRoot+'/mockups/'),
				{
					appName: this.props.appName,
					addStyleGuide: this.props.addStyleGuide,
					framework: this.props.framework
				}
			);
		},

		styleguide: function(){
			if(this.props.addStyleGuide) {
				var template;

				switch (this.props.framework){
					case 'incBootstrap':
						template = 'styleguide/styleguide-bootstrap.php';
						break;
					case 'incBourbonNeat':
					case 'incFoundation':
						template = 'styleguide/styleguide-default.php';
						break;
					default:
						template = 'styleguide/styleguide-default.php';
				}

				this.fs.copyTpl(
					this.templatePath(template),
					this.destinationPath(docRoot+'/mockups/styleguide.php'),
					{ appName: this.props.appName }
				);
			}
		}
	},

	install: function() {
		this.installDependencies({
			callback: function() {
				// Emit a new event. Dependency installation complete.
				this.emit('dependenciesInstalled');
			}.bind(this)
		});

		var tasks = ['dist', 'wire:mockups'];

		if(this.props.addStyleGuide) { tasks.push('wire:styleguide'); }

		this.on('dependenciesInstalled', function() {
			/*
				All project files have been written.
				Running Gulp to generate the initial JS and CSS.
			*/
			this.spawnCommand('gulp', tasks);
		});
	}
});
