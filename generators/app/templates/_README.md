<%= appName %>
=========================

This a Surprise Highway starter project for front-end workflow and mockups. It features some sensible base styles and initial markup for building mockups.

Asset and Directory Structure
---------------
* **gulp-tasks** (Collection of Gulp related task scripts)
* **node_modules** (Node dependencies installed with NPM)
* **<%= docRoot %>** (Public document root)
	* **assets**
	    * **components** (Managed components installed with Bower)
	    * **dist** (Distributable compiled code)
			* **css** (CSS files compiled by Gulp)
			* **js** (Javascript compiled by Gulp)
			* **rev-manifest.json** (Generated manifest of revisioned files)
		* **img** (Frontend related images)
		* **vendor** (Unmanaged third-party components)
	* **mockups** (Static HTML and PHP mockups)
        * **\_includes** (Includes used across mockup files)
* **source** (Source code and assets)
	* **js** (Javascript)
	* **scss** (SCSS)
		* **modules** (Site specific styling)
* **.bowerrc** (Path to bower components)
* **bower.json** (Bower packages manifest)
* **gulpfile.babel.js** (Main Gulp file)
* **package.json** (NPM packages manifest)
* **README.md** (Project README file)

Frontend Workflow
---------------

This project uses [Sass](http://sass-lang.com) to process and compile CSS. [Gulp](http://gulpjs.com/) is used to monitor files, run node-sass, minify css, concatenate and minify javascript, and enable the LiveReload browser plugin.

For developers that have not used Gulp before follow the first set of directions "Getting started with Gulp for the first time." If Node and Gulp have already been installed, please follow "Using Gulp with pre-existing projects." A short primer on creating a Gulp project from scratch is also included below.

## Getting started with Gulp for the first time.
1. Install [Node](http://nodejs.org/download/) if you don't already have it.
2. Install the [Gulp](http://gulpjs.com/) package globally.

	````
	$ sudo npm install gulp -g
	````

3. Clone this repo locally.
4. CD to the project root.
5. Run `$ sudo npm install` to install each node package as defined in the project's packages.json dependency list.
6. Now, just run `$ gulp` to start watch tasks (defined in gulpfile.js).
7. Don't forget to activate your [live reload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) browser extension.

## Using Gulp with pre-existing projects.
1. Clone this repo locally and CD to the project root.
3. Run `$ sudo npm install` to install each node package as defined in the project's packages.json dependency list.
4. Run `$ gulp` to start watch tasks (defined in gulpfile.js). You're all set, get to work!
5. Don't forget to activate your [live reload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) browser extension.

<% if (framework !== false) { %>

Frontend Frameworks
---------------
	<% if (framework == "incBourbonNeat") { %>
	We're using [Bourbon Neat](http://neat.bourbon.io/) for styling and layout. Boubon and Neat SASS components are imported at `/<%= docRoot %>/assets/sass/styles.scss`.

	<% } else if (framework == "incFoundation") {%>
	We're using [Foundation Sites 6](https://github.com/zurb/foundation-sites) for styling and layout.

	<% } else if (framework == "incBootstrap") {%>
	We're using [Bootstrap SASS](https://github.com/twbs/bootstrap-sass) for styling and layout.

	<%}%>
<%}%>

Mockups
---------------
[<%= packageName %>.localhost/mockups/](http://<%= packageName %>.localhost/mockups/)

Static HTML mockups are placed in the `<%= docRoot %>/mockups` folder. The index file lists and links to all of the static mockup files.

PHP includes for the header, footer and any other partials that are reused across a number of mockups are in the `_includes` directory.

There are two sets of assets. One set of CSS, JS, and image assets for production and development use; stored in the `<%= docRoot %>/assets/dist` directory. And one for proof of concept demonstrations in `<%= docRoot %>/mockups/assets`; these are for quick and dirty experiments only. Do not use mockup assets within the production and development asset pipleline.

Ideally, the asset paths in the mockups are absolute (e.g. `/assets/dist/css/styles.css` not `../assets/dist/css/styles.css`). We usually accomplish this by using MAMP or Vagrant to run a local virtual server.

Environments
---------------

**Development:**
[<%= packageName %>.crudecode.com](http://<%= packageName %>.crudecode.com)
Password protected site for developer sandbox and QA.

**Local:**
[<%= packageName %>.localhost](http://<%= packageName %>.localhost)
The bleeding edge hosted on developers' local machines using MAMP.

Deployment
---------------
We use [DeployHQ](http://deployhq.com/) for code deployment.

DeployHQ watches the Git repository. When you push to the development or staging branches DeployHQ notices and automatically pushes those changes to the development and staging servers.

Production deployments are manually initiated using the DeployHQ website.

Website Specifics
--------------------------
### Include any additional documentation here