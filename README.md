# talk-now 
A real time web application for hassle-free video call &amp; chat in the browser using WebRTC and socket.io.

#### Discontinued (Apr 30, 2017)
#### Note: This project is not being maintained anymore. Any version changes in services it depends on might cause this project to break.

Reasons:
1. Video call functionality completely depends on SimpleWebRTC API and their servers.
3. The STUN/TURN servers will be really expensive once this goes live.
4. I'm working on other things now.

# Functionalities

1. Users are able to create a room/join a room that is password protected (or not).
2. Room Video call multiple users.
3. Room Chat for multiple users.

# Tech stack used so far: 
<ul>
<li>db: mongodb</li>
<li>backend: express, node.js</li>
<li>frontend: angular, bootstrap, html, css, js</li>
<li>other libs: SimpleWebRTC, socketio, etc.</li>
</ul>

# Installation 
1. You must have nodejs and mongodb installed on your computer
2. run `npm install` on the project root folder
3. run `mongod`
4. run `nodemon` (if u dont have nodemon, run `npm install -g nodemon` to install globally or `npm install --save-dev nodemon` to install locally.)
5. Enjoy this unfinished project. (it will run on `localhost:3000` by default)
