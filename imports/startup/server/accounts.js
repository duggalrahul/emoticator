import { Accounts } from 'meteor/accounts-base'

console.log('inside server/accounts');

Accounts.onCreateUser((options, user) => {
  // Generate a user ID ourselves
  
  Roles.addUsersToRoles(user._id,'student');
  
  return user;
});