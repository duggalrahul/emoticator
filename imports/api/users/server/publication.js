import { Meteor } from 'meteor/meteor';

Meteor.publish('getAllUsers',function(){
	if(Roles.userIsInRole(Meteor.users.findOne(this.userId),'admin')){
		return Meteor.users.find();
	}	
});
Meteor.publish('getAllAdminUsers',function(){
	if(Roles.userIsInRole(Meteor.users.findOne(this.userId),'admin')){
		return Roles.getUsersInRole('admin');
	}	
});

