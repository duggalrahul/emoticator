import './admin_home.html';
import { songs } from '../../api/songs/songs.js';
import { responses } from '../../api/responses/responses.js';

Template.admin_home.helpers({
	songs : function(){
		return _.map(songs.find().fetch(),function(s,i){
					s['index'] = i+1;
					return s;
				});
	},
	user : function(id){
		return Meteor.users.findOne(id);
	},
	voteCount : function(){
		return responses.find({song_id:this._id}).count();
	}
});

Template.admin_home.events({
	'click .delete-song' : function(event,template){
		var c = confirm('Do you really want to delete this song?');
		if(c){
			Meteor.call('deleteSongDocument',this._id);
		}
		
	}
})