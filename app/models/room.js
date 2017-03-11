'use strict';

// grab the packages that we need for the room model
let mongoose = require('mongoose'); //for working with our database
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

//User Schema
let RoomSchema = new Schema({
	name: { type: String, required: true, index: { unique: true }},
	roomPassword: { type: String, select: false }
});

RoomSchema.pre('save', function(next){
	
	// hash the password only if the password has been changed or room is new
	if(!this.isModified('roomPassword')) return next;

	let room = this;

	// generate the hash
	bcrypt.hash(room.roomPassword, null, null, function(err, hash){
		if(err) return next(err);

        // change the password to the hashed version
        room.roomPassword = hash;
		next();
	});
});

// method to compare a given password with the database hash
RoomSchema.methods.comparePassword = function(roomPassword){ 
	let room = this;
	return bcrypt.compareSync(roomPassword, room.roomPassword);
};

// return the model
module.exports = mongoose.model('Room', RoomSchema);