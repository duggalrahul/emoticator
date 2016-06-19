import './song_responses.html';
import { songs } from '../../api/songs/songs.js';
import { responses } from '../../api/responses/responses.js';

Template.song_responses.helpers({
	'songReady' : function(){
		return FlowRouter.subsReady('singleSong');
	},
	'song' : function(){
		var id = FlowRouter.getParam('id');
		return songs.findOne(id);
	},
	'user' : function(userId){
		console.log(userId,Meteor.users.findOne(userId))
		return Meteor.users.findOne(userId);
	},
	'responses' : function(songId){
		return _.map(responses.find({song_id:songId}).fetch(),function(r,i){
			r['index'] = i+1;
			return r;
		})
	},
	'summary' : function(){
		self = this;
		var rubbish = ['_id','song_id','user_id','question_id','created_at','index','edited_by','edited_at'];
		var emotions = _.difference(_.keys(self),rubbish);
		emotions = _.reduce(emotions,function(memo,e){
														if(self[e]){
															memo.push(e);
														}
														return memo;
													},[]);
		
		return emotions;
	}
});

Template.song_responses.events({
	'click .delete-response' : function(event,template){
		var c = confirm('You sure you want to delete this response?');
		if(c){
			Meteor.call('deleteResponsesDocument',this._id);
		}
	}
})