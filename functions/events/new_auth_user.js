const { addMiddleware } = require('../../utils/security');
const { makeRequest } = require('../../utils/nhost');
const { GET_USER_DETAILS_BY_EMAIL } = require('../../utils/api/user_profile');
const { DELETE_AUTH_USER_CURRENT_ROLES, INSERT_AUTH_USER_ROLES, UPDATE_USER_BY_ID } = require('../../utils/api/auth');


/* user sign up workflow
 nhost.auth does not work on the server and provider sign up is only available at front end anyhow
 so we let the user signup / register with limited access role anonymous
 hasura fires webhook with event data to this end point on new users
 auth user email is used to link auth user to user_profiles within the system and if found adjusts the roles based on the user_profile_roles
 user_profile is created by the admin user or at least admin users have to assign roles above user
 if user_profile is not found and application settings allow a user_profile can be created using the auth user details and assigned the user role
 nhost/config.yaml should be adjusted to:

        user:
            allowed_roles: anonymous, user
        default_allowed_roles: anonymous, user
        default_role: anonymous
*/
module.exports = async(req, res) => {
    addMiddleware(req, res);

    const payload = req.body?.event?.data?.new;

    if (!payload) {
        res.status(500).send(`No event data`);
    }

    const {email, id: userId} = payload;
    if (!email) {
        res.status(500).send(`No email`);
    }

    console.log(payload);

    try {

        const {data, error} = await makeRequest(GET_USER_DETAILS_BY_EMAIL, {email});
        if (error) {
            return res.status(500).send('Error getting user data');
        }
        //user-profile found
        const {user_profile} = data;

        //update the auth user with the user-profile roles
        if (user_profile.length){
            const profile = data.user_profile[0]; //array but will only be one this will have our roles init too
            console.log('profile:',profile);
            let fetched = await makeRequest(DELETE_AUTH_USER_CURRENT_ROLES, {userId});
            console.log('deleted:',fetched);
            fetched = await makeRequest(INSERT_AUTH_USER_ROLES, {
                authUserRoles: [
                    {userId, role: "user"}
                ]
            });
            fetched = await makeRequest(UPDATE_USER_BY_ID, {
                userId,
                "_set": {
                    defaultRole: "user"
                }
            });
            console.log('inserted:',fetched);
        }

        //no user profile found so either create one here if allowed and adjust role to user

    } catch(err) {
        console.log('exception');
        console.log(err);
        return res.status(500).send(err);
    }

    return res.status(200).send(`Nhost, from Javascript, pays it's respects @ ${req.requestTime} !`);

};