import './show_question_admin.html'
import { questions } from '../../api/questions/questions.js'; 

Template.show_question_admin.onCreated(function(){
	Session.set('state',{
		edit : false
	});
	this.questionObjectRV = new ReactiveVar(null);
	this.dataUptoDateRV = new ReactiveVar(false);

	self = this;

	if(FlowRouter.getRouteName() == "Admin.Questions.Add"){
		var state = Session.get('state');
		state.edit = true;
		Session.set('state',state);

		this.questionObjectRV.set({
			created_at : new Date(),
			created_by : Meteor.userId(),
			edited_at : new Date(),
			edited_by : Meteor.userId(),
			title : '',
			options : []
		});
		this.dataUptoDateRV.set(true);
	}
	else{
		this.autorun(function(){
			var id = FlowRouter.getParam('id');
			if(FlowRouter.subsReady('myQuestion')){
				self.questionObjectRV.set(questions.findOne(id));
				self.dataUptoDateRV.set(true);
			}
		});		
	}
	
});

Template.show_question_admin.helpers({
	'dataReady' : function(){
		return Template.instance().dataUptoDateRV.get();
	},
	'state' : function(){
		return Session.get('state');
	},
	'question' : function(){
		var state = Session.get('state');
		if(state.edit){
			return Template.instance().questionObjectRV.get();
		}
		else{
			var id = FlowRouter.getParam('id');
			return questions.findOne(id);
		}
		
	}
})

Template.show_question_admin.events({
	'click .edit-question' : function(event,template){
		var state = Session.get('state');
		state.edit = true;
		Session.set('state',state);
	},
	'click .add-option' : function(event,template){
		var questionObject = Template.instance().questionObjectRV.get();

		console.log('before',questionObject);

		var emotion = template.$('.input-emotion').val();
		var maxIntensity = template.$('.input-max-intensity').val();
		var option = {};

		option['emotion'] = emotion;
		option['max_intensity'] = maxIntensity;

		questionObject.options.push(option);

		_.map(questionObject.options,function(o,i){
			o['index'] = i+1;
		});

		console.log('after',questionObject);

		Template.instance().questionObjectRV.set(questionObject);
	},
	'click .remove-option' : function(event,template){
		var questionObject = Template.instance().questionObjectRV.get();
		var index = this.index;

		questionObject.options.splice(index-1,1);
		_.map(questionObject.options,function(o,i){
			o['index'] = i+1;
		});
		Template.instance().questionObjectRV.set(questionObject);
	},
	'click .save-question' : function(event,template){
		var questionObject = Template.instance().questionObjectRV.get();
		var title = template.$('.input-title').val();

		questionObject['title'] = title;

		templateInstanceObject = Template.instance();

		if(questionObject._id){
			Meteor.call('updateQuestionDocument',questionObject,function(error){
				var state = Session.get('state');
				state.edit = false;
				Session.set('state',state);
				if(error){
					alert('unable to save');
					FlowRouter.go('home')
				}
				else{
					templateInstanceObject.questionObjectRV.set(questionObject);
					FlowRouter.go('Admin.Questions.Show',{id:questionObject._id});
				}
			});
		}
		else{
			Meteor.call('createQuestionDocument',questionObject,function(error,id){
				var state = Session.get('state');
				state.edit = false;
				Session.set('state',state);
				if(error){
					alert('unable to save');
					FlowRouter.go('home')
				}
				else{
					templateInstanceObject.questionObjectRV.set(questionObject);
					FlowRouter.go('Admin.Questions.Show',{id:id});
				}
			});
		}
	}
});