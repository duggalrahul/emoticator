import './rating.html'

import {responses} from '../api/responses/responses.js'; 

Template.rating.onRendered(function(){
	self=this;
	console.log(self.data.emotion,self.data.value);
	this.autorun(function(){
		var response = responses.findOne(self.data.response_id);
		console.log('inside rating',self.data.value);
		self.$('.rateit').rateit();
	})
	
})

Template.rating.helpers({
	value:function(){

	}
})