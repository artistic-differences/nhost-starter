# NHOST Starter

- Backend service initialised via nhost
- Backend service has auth, storage, hasura, mailhog and progress db configured

# Nhost Cli

Nhost cli is supposed to be installed using script https://github.com/nhost/cli#installation however this is not
compatible with nvm so have instead used the script but moved the installed details to nvm

`sudo mv /usr/local/bin/nhost /home/ross/.config/nvm/versions/node/v14.17.4/bin/` 

Have had to add a password to nhost account for access by cli
Cli still seems buggy but have been able to get started using `nhost init --remote` and linking this to my existing 
nhost project.

`cd server && nhost init --remote` currently using the Todos project as the nhost seed

This is supposed to be the same as doing a `nhost init` & `nhost link` 

Copy all the contents of the initialised nhost director back to the server directory and then remove the initialised dir.

Cloning the nhost locally this way does not clone the data so need to create some users once 


## Getting Started

Install node dependencies `npm i`

To start the local nhost backend use `nhost dev` this fires up a custom docker-compose env all configured to work 
together see nhost/config.yaml for config settings.

need to change the `nhost/config.yaml` to have the correct default roles 
!Important do this before creating users

```
user:
    allowed_roles: anonymous, user
    default_allowed_roles: anonymous, user
    default_role: anonymous
```

## Creating users 

Easiest way is to use insomnia 

```
localhost:1337/v1/auth/signup/email-password
{
    "usersname" : "",
    "password" : ""
}
```
now accept the email and create the user_profile details.

```
{
	"event" : {
		"data" : {
			"new" : {
				"id": "",
	 			"email": "",
   			"password": ""
			}
		}
	}
}
```


# Server Structure

Almost all development is done in the functions directory with additional code held in the utils dir. 

## Functions

Functions directory provides the backend api this uses dir/file based routing with some excluded files such as 
package.json

You seem to be able to install any npm packages you want this can be done in the functions directory itself or at the
root directory level and nhost will find them

functions can also be accessed from the frontend client using nhost.functions route


## Deployment

All local changes through the hasura console are tracked and create migrations for db and metadata. Pushing to the main branch will cause a deploymnet to nhost see below

https://docs.nhost.io/platform/nhost/github-integration

