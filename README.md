# ChatBot
 This project was developed with node.js, react.js, typescript, socket.io and mongodb.
 Pleace install [mongodb](https://docs.mongodb.com/manual/installation/), [nodejs](https://nodejs.org/en/download/)

## Services
In this repo twq is three services:
- client: Shows the users messages and get messages on stream.
- chatbot-framework:  A service which handle bot telegram and stream this messages to the clients on sockeio.

## Installation
After Installing mongodb and nodejs you can run the code.
- chatbot-framework
Install the dependencies and devDependencies and start the server.
```sh
cd chatbot-framework
npm i
npm start
```
For changing configurations you can change local the defual.json file or create another env.json file


- client
Install the dependencies and devDependencies and start the server.
```sh
cd client
npm i
npm start
For changing configurations you can change local the config.json file
