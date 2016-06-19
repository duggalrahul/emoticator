import './stubs.js';
import './routes.js';
import '../../ui/body.js';

import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

BlazeLayout.setRoot('.layout');


Tracker.autorun(function(){
	if(!Meteor.user()){
		FlowRouter.go('/');
	}	
});

