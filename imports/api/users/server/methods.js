import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { responses } from '../../responses/responses.js'; 

Meteor.methods({
	'addStudent' : function(username,email,password){
		if(Roles.userIsInRole(this.userId,'admin')){
			user = {
				username : username,
				email : email,
				password : password,
				profile : {}
			}
			userId = Accounts.createUser(user);
			Roles.addUsersToRoles(userId,'student');

		}
		else{
			console.log('you donot have admin permissions');
		}
		
	},
	'deleteUser' : function(id){
		if(Roles.userIsInRole(this.userId,'admin')){
			responses.remove({user_id:id});
			Meteor.users.remove({_id:id});
		}
		else{
			console.log('you donot have admin permissions');
		}
		
	}
})