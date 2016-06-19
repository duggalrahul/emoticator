import { Meteor } from 'meteor/meteor';
import { responses } from '../responses.js'; 


Meteor.publish('getMyResponses',function(){
	if(this.userId){
		console.log('getMyResponses',responses.find({user_id:this.userId}).fetch());
		return responses.find({user_id:this.userId});
	}		
});

Meteor.publish('getUserResponses',function(userId){
	if(this.userId){
		console.log('getUserResponses',responses.find({user_id:userId}).fetch());
		return responses.find({user_id:this.userId});
	}		
});

Meteor.publish('getMySongResponse',function(songId){
	if(this.userId){		
		return responses.find({user_id:this.userId, song_id:songId});	
	}	
});

Meteor.publish('getSongResponses',function(songId){
	if(Roles.userIsInRole(this.userId,'admin')){		
		return responses.find({song_id:songId});
	}		
});

Meteor.publish('getAllUserResponses',function(){
	if(Roles.userIsInRole(this.userId,'admin')){
		return responses.find({});	
	}
	else{
		return 'You dont have permissions';
	}
});
