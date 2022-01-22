const GET_AUTH_USER_ROLES_BY_USER_ID = `
    query getAuthUserRolesByUserId($userId: uuid = "") {
      authUserRoles(where: {userId: {_eq: $userId}}) {
        id
        userId
        role
      }
    }
`;

const DELETE_AUTH_USER_CURRENT_ROLES = `
    mutation DeleteAuthUsersCurrentRoles($userId: uuid = "") {
      deleteAuthUserRoles(where: {userId: {_eq: $userId}})
      {
        affected_rows
      }
    }
`;

/*
{
  "authUserRoles": [{
    "userId": "b7d81ca5-d9ea-465f-8e30-7bf10760a323",
    "role": "anonymous"
  }]
}
 */
const INSERT_AUTH_USER_ROLES = `
    mutation MyMutation($authUserRoles: [authUserRoles_insert_input!] = {}) {
      insertAuthUserRoles(objects: $authUserRoles) {
        affected_rows
      }
}
`

/*
{
  "userId": "b7d81ca5-d9ea-465f-8e30-7bf10760a323",
  "_set": {
    "defaultRole": "user"
    ......
  }
}
 */
const UPDATE_USER_BY_ID = `
  mutation UpdateUserById($userId: uuid = "", $_set: users_set_input = {},) {
      updateUser(pk_columns: {id: $userId}, _set: $_set) {
        id
      }
    }
`

export {
    GET_AUTH_USER_ROLES_BY_USER_ID,
    DELETE_AUTH_USER_CURRENT_ROLES,
    INSERT_AUTH_USER_ROLES,
    UPDATE_USER_BY_ID

}