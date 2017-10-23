# Connect4plus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

# A sample development workflow for beginners using GitHub, Codeship, Heroku, and Angular:

1. Signup to GitHub
	1. Go to https://github.com/.
	2. Verify your email address.
	3. Start a project, ex. fantastikfour project.
	4. Create repository ex. ConnectFourPlus.
	
2. Signup to Codeship (https://codeship.com/)
	1. Signin using your GitHub account then authorize codeship.
	2. Enter your organization, ex. FantasticFour
	3. Then make a new project.
	4. Choose Connect with GitHub repository
	5. Then paste your repository clone URL
	6. Click Connect button.
	7. Select basic project.
	8. Configure project ex. setup commands like unit and integration tests.

3. Signup to Heroku
	1. Go to https://www.heroku.com/
	2. Click signup button and enter the required inputs. 
	3. Select Node.js as the primary development language
	3. Verify your email
	4. Create a new app, ex. fantastik-four
	5. Download and install Heroku CLI - The Heroku Command Line Interface (CLI) like so
	   npm install -g heroku-cli
	6. Verify your version like so,
	   heroku --version
		
		
4. Deploy Angular 4 app with Express and SocketIO to heroku
	1. npm install -g @angular/cli
	2. ng new App1 (take 5 - 10 minutes)
	3. cd app1
	4. ng serve -o, launches the server and opens http://localhost:4200 on your browser
	5. Install express to the app, npm install --save express
	6. Install socket.io like so
    	npm install --save socket.io
	7. Install ng-socket-io module for angular client module
    	npm install ng-socket-io --save
	8. Add an app.js file to the root level and add the following program:
		
		const express = require('express');
		const http = require('http');
		const path = require('path');
		const app = express();

		app.use(express.static(path.join(__dirname, 'dist')));

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, 'dist/index.html'));
		});

		const port = process.env.PORT || '3001';
		app.set('port', port);

		const server = http.createServer(app);
		server.listen(port, () => console.log('Running'));

		// Socket IO
		const io = require('socket.io')(server);
		io.on('connection', (socket) => {
			socket.broadcast.emit('msg', { // sending to all clients except the sender
				msg: '{"command":"ready"}'
			});
			socket.on('msg', (msg) => {
				socket.broadcast.emit('msg', { // sending to all clients except the sender
					msg: msg
				});
			});
		});
		
	9. Notice that the path is in “dist” because this is the output folder when we run "ng build"
	10. Prepare the changes for Heroku
	11. Add "Procfile" file to the app then add the following content
		web: node app.js
	12. In your package.json file add this main config. Heroku needs it to start the server
		...
		"main": "app.js",
		...
	13. Also add the postinstall 'coz we need to call "ng build" so that 
	   the dist folder is created
	    on the server
		...
		"scripts": {
			"ng": "ng",
			"start": "ng serve",
			"build": "ng build",
			"test": "ng test",
			"lint": "ng lint",
			"e2e": "ng e2e",
			"postinstall": "ng build --env=prod"
		  },
		...
	11. Add also the engines which versions of node and npm to install like so
	    ...
		"engines": {
			"node": "~6.11.2",
			"npm": "~3.10.10"
		},
		...
	12. We need to move the "@angular/cli" and "@angular/compiler-cli" from the "devDependencies" 
	    to "dependencies" so that heroku installs them.
		...
		"dependencies": {
			...
			"@angular/cli": "1.3.2",
			"@angular/compiler-cli": "^4.2.4",
			...
	    ...
	13. Test the command in your terminal, ng build --env=prod
		If this is ok, then we are ready now to deploy it to Heroku
	14. Run, heroku --version
	15. Run, heroku login, then enter your credential
	16. "heroku create", creates a new app on the server with random URL, then git push heroku master
	17. git add the app.js and the Procfile then commit changes
	18. Time to integrate GitHub, git remote add github git repo
	19. Double check Git url ex. https://git.heroku.com/secret-dusk-45793.git
	20. Get SSH public key from Codeship and paste it to Heroku before the API key inputs 
	    (https://app.codeship.com/projects/250962/configure)
	21. Check installation number 2
	22. Go to Deploy tab/ or click deploy button in Codeship
	23. Configure branch to use ex. master then save.
	24. Add a deployment to your pipeline by selecting heroku
	25. Copy the heroku app name (go to Heroku dashboard or refer instruction 3) ex. secret-dusk-45793
	26. Get the Heroku API key by following the button link from codeship 
		(https://dashboard.heroku.com/account)
	27. Then click the "Create deployment"
	28. To test the deployment, push some changes to master like so
	    git push origin master
	

4. Install NodeJS
5. Install Angular CLI globally 
	1. npm install -g @angular/cli

6. Test the app https://github.com/leonelllagumbay/connect4plus.git
	1. git clone https://github.com/leonelllagumbay/connect4plus.git
	2. cd connect4plus
	3. run npm update (3-5 minutes)
	4. ng serve --port 4202
	5. Open your browser to this url http://localhost:4202/<route_name> ex. http://localhost:4202/demo3
	6. ng generate module your_firstname_lastname (underscore case with no spaces)
	
7. Install bootstrap and ng-bootstrap and their dependencies
	1. Go to the Angular app folder and open the terminal. Run the following from the terminal
	   npm i --save tether
	   npm i --save jquery
	   npm i --save popper.js@^1.11.0
	   npm i --save bootstrap@next //currently bootstrap@4.0.0-beta
	   npm i --save @ng-bootstrap/ng-bootstrap
	   
8. Once installed you need to add the destination files in angular-cli.json like so
	"styles": [
        "styles.scss",
        "../node_modules/bootstrap/scss/bootstrap.scss"
     ],
     "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/tether/dist/js/tether.js",
        "../node_modules/popper.js/dist/umd/popper.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js"
     ],
9. We're going to use sass, so rename your *.css extension to *.scss and set styleExt   in
   angular-cli.json like so
	"defaults": {
    "styleExt": "scss",
    "component": {}
   }
   (you're not gonna do this if  you run "ng new My_New_Project --style=scss")
   
10. You need to import our ng-bootstrap in your main module like so
      import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
	  @NgModule({
		  declarations: [AppComponent, ...],
		  imports: [NgbModule.forRoot(), ...],
		  bootstrap: [AppComponent]
	  })
	  export class AppModule {
	  }
	  



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
