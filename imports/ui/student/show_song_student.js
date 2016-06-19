import './show_song_student.html';
import '../rating.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 
import { songs } from '../../api/songs/songs.js';
import { questions } from '../../api/questions/questions.js'; 
import { responses } from '../../api/responses/responses.js'; 

export const reloadRatingRv = new ReactiveVar();


Template.show_song_student.helpers({
	'dataReady' : function(){
		return FlowRouter.subsReady();
	},
	'song' : function(){
		var id = FlowRouter.getParam('id');
		return songs.findOne(id);
	},
	questions : function(){
		return _.map(questions.find().fetch(),function(q,i){
				q['index'] = i+1;
				return q;
		});
	},
	options : function(){
		var id = FlowRouter.getParam('id');
		var song = songs.findOne(id);
		var question = questions.findOne(song.qs_id);
		var response = responses.find({user_id:Meteor.userId(),song_id:id}).fetch()[0];

		console.log('response',response);
		return _.map(question.options,function(o,i){
			o["response_id"] = response ? response._id : undefined;
			o["index"] = i+1;			
			o["value"] = response ? response[o["emotion"]] : 0;
						
			return o;
		});
	}
});

Template.show_song_student.events({
	'click .save-response' : function(event,template){
		var id = FlowRouter.getParam('id');
		var song = songs.findOne(id);
		var question = questions.findOne(song.qs_id);
		var response = responses.find({user_id:Meteor.userId(),song_id:song._id}).fetch()[0];

		if(!response){
			response = {
				user_id : Meteor.userId(),
				song_id : song._id,
				question_id : question._id,
				created_at : new Date()
			};
		}
		

		_.reduce(question.options,function(m,v,i){
			m[v.emotion] = $('#rating-'+(i+1)).rateit('value');
			return m;
		},response);

		console.log(response);

		if(response._id){
			Meteor.call('updateResponsesDocument',response,function(error){
				if(error){
					FlowRouter.go('home');
				}	
				else{
					alert('your response has been saved');
				}			
			});
		}
		else{
			Meteor.call('createResponsesDocument',response,function(error,data){
				if(error){
					console.log('error in inserting',data);
					FlowRouter.go('home');
				}		
				else{
					alert('your response has been saved');
				}		
			});
		}
	},
	'click .next-song' : function(event,template){
		var id = FlowRouter.getParam('id');
		var songsList = songs.find({_id:{$ne:id}}).fetch();
		songsList = _.shuffle(songsList);

		console.log(id,songsList);

		FlowRouter.go('Songs.show',{id:songsList[0]._id});

	},
	'click .delete-response' : function(event,template){
		var response = responses.find({user_id:Meteor.userId(),song_id:FlowRouter.getParam('id')}).fetch()[0];
		Meteor.call('deleteResponsesDocument',response._id,function(error){
			if(!error){
				// $('.rateit').rateit('reset');
			}
		});
	}
 	
})

