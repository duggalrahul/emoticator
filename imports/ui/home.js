import './home.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 

Template.home.onCreated(function(){
	
  	Tracker.autorun(function(){
  		console.log('before fire in body',Meteor.user());
  		if(Meteor.user() && Meteor.user().roles){
    		console.log('fire in body',Meteor.user(),Meteor.user().roles);
    		FlowRouter.go('Songs.list')
    	}
  	});
})

