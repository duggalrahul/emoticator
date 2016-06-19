import './user_responses.html';
import { songs } from '../../api/songs/songs.js';
import { responses } from '../../api/responses/responses.js';

Template.user_responses.helpers({	
	'song' : function(songId){
		return songs.findOne(songId);
	},
	'user' : function(){		
		return Meteor.user();
	},
	'responses' : function(){
		var id = FlowRouter.getParam('id');
		return _.map(responses.find({user_id:id}).fetch(),function(r,i){
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
})

Template.user_responses.events({
	'click .delete-response' : function(event,template){
		var c = confirm('Do you really want to delete this response?');
		if(c){
			Meteor.call('deleteResponsesDocument',this._id);
		}
		
	}
})