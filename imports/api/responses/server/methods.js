import { responses } from '../responses.js'; 
import { songs } from '../../songs/songs.js'; 
import { questions } from '../../questions/questions.js'; 

Meteor.methods({
	'createResponsesDocument' : function(newResponsesObject){
		console.log(this.userId,newResponsesObject.user_id);

		if(this.userId && (this.userId==newResponsesObject.user_id) && songs.findOne(newResponsesObject.song_id) && questions.findOne(newResponsesObject.question_id)){
			// if user logged in, creating his own response, for an existing song and question
			console.log('pass');
			return responses.insert(newResponsesObject);
		}
		return 'response not saved';		
	},
	'updateResponsesDocument' : function(newResponsesObject){
		if(this.userId && (this.userId==newResponsesObject.user_id)){
			newResponsesObject['edited_by'] = this.userId;
			newResponsesObject['edited_at'] = new Date();

			responses.update({_id:newResponsesObject._id},newResponsesObject);
		}
	},
	'deleteResponsesDocument' : function(id){
		var response = responses.findOne(id);
		if(Roles.userIsInRole(this.userId,'admin') || (this.userId==response.user_id)){			
			responses.remove({_id:id});
		}
	}
});