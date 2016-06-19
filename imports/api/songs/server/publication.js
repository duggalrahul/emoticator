import { Meteor } from 'meteor/meteor';
import { songs } from '../songs.js'; 

Meteor.publish('getSong',function(id){
	console.log(this.userId);
	if(this.userId){
		return songs.find({_id:id});
	}
	return 'Please login';	
});

Meteor.publish('getAllSongs',function(){
	console.log(this.userId);
	if(this.userId){
		return songs.find();
	}
	return 'Please login';	
})