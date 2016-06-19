import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../ui/student/student_home.js';
import '../../ui/student/show_song_student.js';
import '../../ui/admin/show_song_admin.js';
import '../../ui/home.js'; 
import '../../ui/songs_list.js';
import '../../ui/show_song.js'; 
import '../../ui/admin/admin_home.js';
import '../../ui/admin/admin_questions_list.js';
import '../../ui/admin/show_question_admin.js';
import '../../ui/admin/users_list.js';
import '../../ui/admin/add_user.js';
import '../../ui/admin/song_responses.js';
import '../../ui/admin/user_responses.js';



FlowRouter.route('/', {
  name: 'Home',
  triggersEnter: [function(context, redirect) {
    console.log('home trigger',Meteor.user());
    if(Meteor.user()){      
      redirect('Songs.list');
    }
  }],
  action : function(){    
    BlazeLayout.render('home');
  }
});

var LoggedIn = FlowRouter.group({
  name: 'LoggedIn.Home',
  triggersEnter: [function(context, redirect) {
    console.log('logged in trigger',Meteor.user());
    if(!Meteor.user()){
    	alert('You need to login to proceed');
    	redirect('Home');
    }
  }]
});

var admin = FlowRouter.group({
  name: 'admin',
  prefix : '/admin',
  triggersEnter: [function(context, redirect) {
    console.log('admin trigger');
    if(!Roles.userIsInRole(Meteor.user(),'admin')){
      alert('An error occured');
      redirect('Home');
    }
    else{
      Meteor.subscribe('getAllUserResponses');
    }
  }]
});


admin.route('/questions/list', {
  name: 'Admin.Questions.List', 
  subscriptions: function(params, queryParams) {
      this.register('allQuestions', Meteor.subscribe('getAllQuestions'));
   },   
  action(params, queryParams) { 
      BlazeLayout.render("admin_questions_list"); 
  }
});

admin.route('/users/list', {
  name: 'Admin.Users.List',  
  action(params, queryParams) { 
      Meteor.subscribe('getAllUsers');
      BlazeLayout.render("users_list"); 
  }
});

admin.route('/users/add', {
  name: 'Admin.Users.Add',  
  action(params, queryParams) {       
      BlazeLayout.render("add_user"); 
  }
});

admin.route('/song/:id/responses', {
  name: 'Admin.Songs.Responses', 
  subscriptions: function(params, queryParams) {
      this.register('singleSong', Meteor.subscribe('getSong',params.id));
      this.register('songResponses',Meteor.subscribe('getSongResponses',params.id));
      this.register('allUsers',Meteor.subscribe('getAllUsers'));
  },   
  action(params, queryParams) {       
      BlazeLayout.render("song_responses"); 
  }
});

admin.route('/user/:id/responses', {
  name: 'Admin.Users.Responses', 
  subscriptions: function(params, queryParams) {
      this.register('allSongs', Meteor.subscribe('getAllSongs'));
      this.register('userResponses', Meteor.subscribe('getUserResponses',params.id));
  },   
  action(params, queryParams) {       
      BlazeLayout.render("user_responses"); 
  }
});

admin.route('/questions/show/new', {
  name: 'Admin.Questions.Add', 
  subscriptions: function(params, queryParams) {
        
   },   
  action(params, queryParams) { 
      BlazeLayout.render("show_question_admin"); 
  }
});

admin.route('/questions/show/:id', {
  name: 'Admin.Questions.Show', 
  subscriptions: function(params, queryParams) {
       this.register('myQuestion', Meteor.subscribe('getQuestion', params.id));
   },   
  action(params, queryParams) { 
      BlazeLayout.render("show_question_admin"); 
  }
});

admin.route('/songs/list', {
  name: 'Admin.Songs.list', 
  subscriptions: function(params, queryParams) {
        this.register('allSongs', Meteor.subscribe('getAllSongs'));
        this.register('allAdminUsers', Meteor.subscribe('getAllAdminUsers'));
   }, 
  triggersEnter: [function(context,redirect){
    console.log('admin songs list trigger');   
  }],
  action(params, queryParams) { 
      BlazeLayout.render("admin_home"); 
  }
});

admin.route('/songs/show/new', {
  name: 'Admin.Songs.add', 
  subscriptions: function(params, queryParams) {       
       this.register('allQuestions', Meteor.subscribe('getAllQuestions'));
    }, 
  triggersEnter: [function(context,redirect){
    console.log('admin songs new trigger');   
  }],
  action(params, queryParams) { 
      BlazeLayout.render("show_song_admin"); 
  }
});

LoggedIn.route('/songs/list', {
  name: 'Songs.list',
  subscriptions: function(params, queryParams) {
        Meteor.subscribe('getAllSongs');
        this.register('myResponses', Meteor.subscribe('getMyResponses'));
   }, 
  triggersEnter: [function(context,redirect){
    if(Roles.userIsInRole(Meteor.user(),'admin')){
      redirect('Admin.Songs.list');
    }
  }],
  action(params, queryParams) { 
  	 	BlazeLayout.render("student_home");	
  }
});

admin.route('/songs/show/:id', {
  name: 'Admin.Songs.show',  
  subscriptions: function(params, queryParams) {
        // this.register('mySong', Meteor.subscribe('getSong', params.id));
        this.register('allSongs',Meteor.subscribe('getAllSongs'));
        this.register('allQuestions', Meteor.subscribe('getAllQuestions'));
    },
  action(params, queryParams) {
     BlazeLayout.render("show_song_admin");
 }
});

LoggedIn.route('/songs/show/:id', {
  name: 'Songs.show',
  subscriptions: function(params, queryParams) {
        // this.register('mySong', Meteor.subscribe('getSong', params.id));
        this.register('allSongs',Meteor.subscribe('getAllSongs'));
        this.register('allQuestions', Meteor.subscribe('getAllQuestions'));
        this.register('mySongResponse', Meteor.subscribe('getMySongResponse',params.id));
  },
  triggersEnter : [function(context,redirect){
    console.log(context,redirect);
    if(Roles.userIsInRole(Meteor.user(),'admin')){
      redirect('Admin.Songs.show',context.params);
    }
  }],
  action(params, queryParams) {
     BlazeLayout.render("show_song_student");
 }
});