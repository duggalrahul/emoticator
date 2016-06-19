import {responses} from '../../api/responses/responses.js'; 

Meteor.methods({	
	'deleteResponsesDocument' : function(id){
		var response = responses.findOne(id);
		console.log('inside stub');
		if(Roles.userIsInRole(this.userId,'admin') || (this.userId==response.user_id)){			
			responses.remove({_id:id});
		}
	}
});