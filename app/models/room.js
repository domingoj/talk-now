'use strict';

// grab the packages that we need for the room model
let mongoose = require('mongoose'); //for working with our database
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

//User Schema
let RoomSchema = new Schema({
	name: { type: String, required: true, index: { unique: true }},
	owner: { type: String, required: true },
	password: { type: String, select: false },
	members: { type : Array , "default" : [] }
});

RoomSchema.pre('save', function(next){
	
	// hash the password only if the password has been changed or room is new
	if(!this.isModified('password')) return next();

	let room = this;

	bcrypt.genSalt(14 /*<< Setting to 14 from 10 caused call to be 10x slower */, function(err, salt) {
    
    	if (err) return next(err);

		// generate the hash
		bcrypt.hash(room.password, salt, function(err, hash){
			if(err) return next(err);

	        // change the password to the hashed version
	        room.password = hash;
			next();
		});
	});
});

// method to compare a given password with the database hash
RoomSchema.methods.comparePassword = function(password){ 
	let room = this;
	return bcrypt.compareSync(password, room.password);
};

// return the model
module.exports = mongoose.model('Room', RoomSchema);