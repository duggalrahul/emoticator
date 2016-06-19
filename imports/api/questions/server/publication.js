import { Meteor } from 'meteor/meteor';
import { questions } from '../questions.js'; 


Meteor.publish('getQuestion',function(id){
	console.log(this.userId);
	if(this.userId){
		return questions.find({_id:id});
	}
	return 'Please login';	
});


Meteor.publish('getAllQuestions',function(){
	if(this.userId){
		return questions.find();
	}
	return 'Please login';	
})