import './show_song_admin.html';
import '../rating.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 
import { songs } from '../../api/songs/songs.js';
import { questions } from '../../api/questions/questions.js'; 


Template.show_song_admin.onCreated(function(){
	Session.set('state',{
		edit : false
	});
	this.songObjectRV = new ReactiveVar(null);
	

	if(FlowRouter.getRouteName() == "Admin.Songs.add"){
		console.log('2');
		var state = Session.get('state');
		state.edit = true;
		Session.set('state',state);

		this.songObjectRV.set({
			created_at : new Date(),
			created_by : Meteor.userId(),
			edited_at : new Date(),
			edited_by : Meteor.userId(),
			lyrics : '',
			video_link : '',
			qs_id : ''
		});		
	}

	self = this;
	
	this.autorun(function(){
		FlowRouter.watchPathChange();
		var id = FlowRouter.getParam('id');
		if(FlowRouter.subsReady() && id){
			self.songObjectRV.set(songs.findOne(id));
		}
	});		
	
	

});
Template.show_song_admin.onRendered(function(){

	$('.rateit').rateit()

})

Template.show_song_admin.helpers({
	'dataReady' : function(){
		return FlowRouter.subsReady();
	},
	'state' : function(){
		return Session.get('state');
	},
	'song' : function(){
		var id = FlowRouter.getParam('id');
		return songs.findOne(id);
	},
	questions : function(){
		console.log(questions.find().fetch());
		return questions.find();
	},
	options : function(){
		var id = FlowRouter.getParam('id');
		var song = songs.findOne(id);
		var question = questions.findOne(song.qs_id);
		return _.map(question.options,function(o,i){
			o["index"] = i+1;
			return o;
		});
	},
	active : function(){
		var id = FlowRouter.getParam('id');
		var song = songs.findOne(id); 
		if(song){			
			console.log(this,song);
			return (this._id == song.qs_id) ? "Selected" : "";
		}
		return "";
		
	}
});

Template.show_song_admin.events({
	'click .edit' : function(event,template){
		console.log('click');
		var state = Session.get('state');
		state.edit = true;
		Session.set('state',state);
	},	
	'click .save' : function(event,template){
		var name = template.$('.input-name').val();
		var artist = template.$('.input-artist').val();
		var qsId = template.$('.input-questions-dropdown').val();
		var web_link = template.$('.input-web-link').val();
		var lyrics = template.$('.input-lyrics').val();

		var songObject = Template.instance().songObjectRV.get();

		songObject['name'] = name;
		songObject['artist'] = artist;
		songObject['qs_id'] = qsId;
		songObject['web_link'] = web_link;
		songObject['lyrics'] = lyrics;

		Template.instance().songObjectRV.set(songObject);

		TemplateInstance = Template.instance();

		if(songObject._id){
			Meteor.call('updateSongDocument',songObject,function(error){
				if(error){
					FlowRouter.go('home');
				}
				else{
					var state = Session.get('state');
					state.edit = false;
					Session.set('state',state);
					FlowRouter.go('Admin.Songs.show',{id:FlowRouter.getParam('id')});
				}
			})
		}
		else{
			Meteor.call('createSongDocument',songObject,function(error,id){
				if(error){
					FlowRouter.go('home');
				}
				else{
					var state = Session.get('state');
					state.edit = false;
					Session.set('state',state);
					FlowRouter.go('Admin.Songs.show',{id:id});
				}
			})
		}
		
	}
})

