import './add_user.html';

Template.add_user.events({
	'click .save-user' : function(event,template){
		var username = template.$('.input-username').val();
		var email = template.$('.input-email').val();
		var password = template.$('.input-password').val();

		var c = confirm('Are you sure you want to add this user?');

		Meteor.call('addStudent',username,email,password,function(error){
			if(error){
				alert('there was some error');
			}
			else{
				alert('user added successfully');
				FlowRouter.go('Admin.Users.List');
			}
		});
		
	}
})