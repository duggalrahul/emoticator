import './show_song.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 

Template.show_song.helpers({
	isAdmin : function (){		
		return !Meteor.user() || Meteor.user().isAdmin;
	}
});