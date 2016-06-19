import '../songs.js';
import { songs } from '../songs.js'; 
Meteor.methods({
	'createSongDocument' : function(newSongObject){
		if(Roles.userIsInRole(this.userId,'admin')){
			var songObject = newSongObject;
			if(!songObject){
				songObject = {
					created_at : new Date(),
					created_by : this.userId,
					edited_at : new Date(),
					edited_by : this.userId,
					lyrics : '',
					video_link : '',
					qs_id : []
				}
			}
			return songs.insert(songObject);
		}
	},
	'updateSongDocument' : function(newSongObject){
		if(Roles.userIsInRole(this.userId,'admin')){
			newSongObject['edited_by'] = this.userId;
			newSongObject['edited_at'] = new Date();

			songs.update({_id:newSongObject._id},newSongObject);
		}
	},
	'deleteSongDocument' : function(id){
		if(Roles.userIsInRole(this.userId,'admin')){			
			songs.remove({_id:id});
		}
	}
});