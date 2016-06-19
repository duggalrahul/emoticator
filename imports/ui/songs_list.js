import './songs_list.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 

Template.songs_list.helpers({
	isAdmin : function (){
		console.log('songs list');
		console.log(Meteor.user());		
		return !Meteor.user() || Meteor.user().isAdmin;
	}
});

