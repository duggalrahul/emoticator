import { Template } from 'meteor/templating'; 



import './body.html';

Template.body.helpers({
	'isAdmin' : function(){
		return Roles.userIsInRole(Meteor.user(),'admin');
	},
	'loggedIn' : function(){
		return Meteor.user();
	}
})


