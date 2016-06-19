import { questions } from '../questions.js'; 

Meteor.methods({
	'createQuestionDocument' : function(newQuestionObject){
		if(Roles.userIsInRole(this.userId,'admin')){
			var questionObject = newQuestionObject;
			if(!questionObject){
				questionObject = {
					created_at : new Date(),
					created_by : this.userId,
					edited_at : new Date(),
					edited_by : this.userId,
					title : '',
					options : {}
				}
			}
			console.log(questionObject);
			return questions.insert(questionObject);
		}
	},
	'updateQuestionDocument' : function(newQuestionObject){
		if(Roles.userIsInRole(this.userId,'admin')){
			newQuestionObject['edited_by'] = this.userId;
			newQuestionObject['edited_at'] = new Date();

			questions.update({_id:newQuestionObject._id},newQuestionObject);
		}
	},
	'deleteQuestionDocument' : function(id){
		if(Roles.userIsInRole(this.userId,'admin')){			
			questions.remove({_id:id});
		}
	}
});