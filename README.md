# Web App for Starsona

## System Requirements
1. node.js - download and install latest node js (version 8+) from https://nodejs.org/en/
2. git 

## Getting Started
```
Open command prompt and use the following commands step by step to run the project in local machine

# Clone the github repository of the project
git clone git@github.com:Starsona/web.git

# Navigate to repository
cd web

# Use the command to Install dependencies, to be done once 
npm install

# To run the project use the following command
npm start

open http://localhost:8080 in the browser to see the running application.  

```
## Environmental specific config 
Change the contents of env.js file for changing the environment specific constants

## Creating Production Build
Our React application is a simple web project, which consists of static files, such as CSS, Javascript files and a few images. This only requires a web server such as Nginx or Apache at runtime.

1. We’ll install our dependencies by running the following command

   npm install
2. Use the following command to create the production build.

   npm run build 
2. Build will be created in the dist folder in the project folder.
3. Copy the contents of the dist folder and put the contents to the desired folder in the web server, Eg Nginx or Apache.
4. Run the website url to see the output.
