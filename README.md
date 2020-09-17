# Welcome to the Drawing Pad

**Frontend=** React, react-router, bootstrap

**Backend =** node, expressj, jsonwebtokens, bcrypt

**Database=** mongodb



# Frontend

Frontend is written in react using a Flux Architecture to pass state from Parent Components. Using bootstrap as a mobile first styling processor it's effective out of the box, using react router to navigate between pages. Connects to server via proxy.

## App.js
Container for routes for Parent components.

## Login / Register

## HomePage 

Reuses DrawingTable Component

## Member Area
Parent component for DrawingPad and Memeber Area

## DrawingsList
Displays users drawings reuses DrawingTable

##  DrawingPad


# Server

Uses express server that initializes a mongodb database it uses bcrypt to has passwords, jsonwebtokens for authentication, it writes, deletes and verifies files.

## Not Authenticated routes

**login, register, home-page**

## Authenticated routes

**user-public-drawings, user-private-drawings, delete-drawing, save-drawing, share-url**

## Additional 

**express middleware to handle errors on line 163**

**Function to verify token on line 173**

**Funciton to generate access token on line 190**

**Function that starts mongodb instance on line 194**

**Function to connect with drawings collection line 205**

## Next Implementation trade-offs

**type checking on frontend, mongodriver,**

**Filestack bucket**

**Linter**

**Input Sanitation**

**No custom css**

**cypress**

**tests**

**range of time queries**

**members area**

**videos**

## Gained
**Mobile responsive design**

**Lightweight**

**Easy to expand upon**

**Stylish**

**Universal**

**Easy to Use**