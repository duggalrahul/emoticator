import './users_list.html';
import { responses } from '../../api/responses/responses.js';

Template.users_list.helpers({
	users : function(){
		var users = Meteor.users.find();
		return _.map(users.fetch(),function(u,i){
			u['index'] = i+1;
			return u;
		});
	},
	voteCount : function(){
		return responses.find({user_id:this._id}).count();
	}
});

Template.users_list.events({
	'click .remove-user' : function(event,Template){
		console.log(this);
		var c = confirm('Are you sure you want to delete this user?');
		if(c){
			Meteor.call('deleteUser',this._id);
		}
	}
})