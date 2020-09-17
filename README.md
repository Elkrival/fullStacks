● General architecture of the application. 
● Reasoning behind main technical choices. 
● Things you didn't implement or trade-offs you made. This can also include details about how you would implement things differently if you were to spend more time on the assignment or if it was for production use.

Architecture
Frontend is written in react using a Flux Architecture for Components and react router to handle routing from different Parent Components.

Backend is written in node with an express server

Frontend and Backend are proxy to each other.

Browser View is App.JS and it implements router and it routes to three components
Login: Parent Component alone component handles login
Register: Parent Component alone compnoent handles register
Main: Parent Component that displays users Drawings or it displays the Drawing Pad.
DrawingsList: Displays two tables that list users Private or Public drawings. The Private drawings have a button to share the url or to the delete the drawing, the public drawings do not have the share url option just delete.
It also displays user information and buttons that route either to the gallery or the drawing pad.
DrawingPad: has a drawing pad, it keeps track of time, has different options for color, line width, eraser and it has the option to set a drawing to private a public and submit it to the server.
ToastComponent: Displays success or error messages from api calls.
DateFNS: used to parse, convert and get time difference.

Server: 
Uses express server that initializes a mongodb database it uses bcrypt to has passwords, jsonwebtokens for authentication, it writes, deletes and verifies files. 

login: Takes emial and password it verifies that passwords match otherwise it returns an error. Route is not token authenticated.

register: Creates new user in mongodb database and it returns a token: Route is not token authenticated

user-public-drawings: get's users public drawings from database and it has src to directory of drawings. Route is token authenticated.

user-private-drawings: gets users private drawings from database. Route is token authenticated.

delete-drawing/:_id: deletes drawing from database and removes file from images directory, also uses route params. Route is token authenticated.

save-drawing: takes form input for image which includes name, elapsed time, time created, image url data. This route takes image data and writes a new file to image directory, it creates a mongodb document with image information. Route is token authenticated.

share-url: prepares drawing url to be shared with others. Route is token authenticated.

express middleware to handle errors on line 163
Function to verify token on line 173
Funciton to generate access token on line 190
Function that starts mongodb instance on line 194
Function to connect with drawings collection line 205

DIR variable is to get path to directory for stored images 

For this project I chose speed and simplicity over a more robust solution and the following are the tradeoffs:

No type checking on frontend, mongodriver,

No Filestack bucket 

No Linter

No Input Sanitation

No custom css

Gains: 

Mobile responsive design

Lightweight

Easy to expand upon

Stylish

Universal

Easy to Use

What I would really like to add are cypress tests, server tests and frontend tests in my next iteration.


