import './admin_questions_list.html'
import { questions } from '../../api/questions/questions.js'; 

Template.admin_questions_list.onCreated(function(){

})

Template.admin_questions_list.helpers({
	'dataReady' : function(){
		return FlowRouter.subsReady('allQuestions');
	},
	questions : function(){
		console.log(questions.find().fetch());
		 return _.map(questions.find().fetch(),function(q,i){
		 	q['index'] = i+1;
		 	return q;
		 });
	}
});

Template.admin_questions_list.events({
	'click .remove-question' : function(){
		var r = confirm('Are you sure you want to delete this question?');
		if(r){
			Meteor.call('deleteQuestionDocument',this._id);
		}
	}
})