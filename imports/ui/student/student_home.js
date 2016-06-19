import './student_home.html'
import { songs } from '../../api/songs/songs.js';
import { responses } from '../../api/responses/responses.js';

Template.student_home.helpers({
	'songs' : function(){
		return _.map(songs.find().fetch(),function(s,i){
			s['index'] = i+1;
			return s;
		})
	},
	'mySongResponse' : function(){
		var response = responses.find({user_id:Meteor.userId(),song_id:this._id}).fetch()[0];
		console.log('songResponses',response);
		return response;
	},
	'summary' : function(responseId){
		var self = responses.findOne(responseId);		
		if(self){
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
		return ['-'];		
	},
	prettyTime : function(response){
		console.log('response',response);
		if(!response){
			return '';
		}
		else if(response.edited_at){
			return moment(response.edited_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
		}
		else if(response.created_at){
			return moment(response.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
		}
		
		
	}
})