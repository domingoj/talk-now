# talk-now
<b>*In Progress*</b> A real time web application for hassle-free video call &amp; chat in the browser using WebRTC and socket.io.

# This project is discontinued indeterminately. Reasons:
1. I kind of lost interest in WebRTC as the documentation is messy and outdated.
2. Video call functionality completely depends on SimpleWebRTC API and their servers. I would want to create my own system for that but see #1.
3. The STUN/TURN servers will be really expensive once this goes live.
4. I'm working on other things now.

# Current Functionalities
1. Users are able to create a room/join a room that is password protected (or not).
2. Room Video call .
3. Room Chat.

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

