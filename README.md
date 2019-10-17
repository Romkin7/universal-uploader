Cloud - Universal file manager
==============================

React & Node file uploader v1.0.0

made by Roman Tuomisto

Website
-------
https://cloud-server-rt.herokuapp.com/

can be hosted on heroku 
download heroku cli 
and run command:  heroku create "name of your choise" 
set config: heroku config:set APP_ACCESS_TOKEN = your dropbox account access token"
then deploy by running command git push heroku master

Table of contents
-----------------
Getting started
Features

Getting started
---------------
Seting up Dropbox account
The setup
In order to build on top of Dropbox, you first need a Dropbox account. After you’ve registered, head over to the developer section. Choose My apps on the lefthand side of the dashboard and click Create app.

Choose the following settings, and give your app a unique name.

Preferred settings for this tutorial

Preferred settings for this tutorial

In the dashboard, go to OAuth 2 section under Generated access token and click the Generate button to get an API accessToken, which we will save for later.

after getting dropbox configuation

type into commandline or torminal

npm install concurrently nodemon --save-dev -g

to start whole app run command 

you should run it inside of very root folder on  nodejs backend server side

npm run dev


Features
--------

Featurs of this app are as followes

ability to uload an image, fetch images and download ona
