# Chatty App Client 💬

!["Screenshot"](https://github.com/mstop4/chatty-client/blob/master/doc/chatty_screen.png)

Real-time web chat app. The client app server for **[Chatty App Server](https://github.com/mstop4/chatty-server)**.

Allows users to send and receive text messages, images, and Youtube videos in real-time using any web browser.

## Getting Started

1. Follow the instructions to setup and run the [Chatty App Server](https://github.com/mstop4/chatty-server).
2. Fork this repo to your local machine.
3. Run `npm install` to install dependencies.
4. Make a copy of  `.env.example` to `.env` and change the `CLIENT_HOST` address or `CLIENT_PORT` number as you see fit. Change the `SERVER_HOST` and `SERVER_PORT` so that it matches the corresponding settings in the Server's `.env` file.
4. Run `npm start` to start the app server.
5. Get yourself and your friends to go to the `CLIENT` host address and port specified above in your browsers and start chatting.

## Chat Commands

* /youtube [video-id] - Embed a Youtube video
* [any URL that ends with .jpg/.jpeg/.gif/.png/.bmp] - Embed an image

## Dependencies

* Node.js 6.0.0 or higher
* React
* ReactDOM
* ws
* webpack-dotenv-plugin

### Dev

* Babel
  * babel-core
  * babel-loader
  * babel-preset-es2015
  * babel-preset-react
  * babel-preset-stage-0
* Webpack
  * webpack-dev-server
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader
