# Inventory Tracker
An inventory tracking web application for a logistics company.

https://user-images.githubusercontent.com/51466389/149681828-479091a4-da6d-4e16-b691-208bb60a9fea.mov

## Features
- Create inventory items
- Edit them
- Delete them
- View a list of them
- Ability to assign/remove inventory items to a named group/collection

## Installation
Install [Node](https://nodejs.org/en/).

Create [MongoDB Atlas Database](https://account.mongodb.com/account/register).

Create ATLAS_URI and PORT in `server/config.env`:
```
ATLAS_URI=mongodb+srv://admin:<password>@cluster0.cjwid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=5000
```

## Usage
Start server:
```
cd server
npm install
npm start
```

Start Web server:
```
cd client
npm install
npm start
```

## Resources
[Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)
