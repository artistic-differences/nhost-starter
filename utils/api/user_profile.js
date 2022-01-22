const GET_USER_DETAILS_BY_EMAIL = `
    query getUserDetailsByEmail($email: String = "") {
      user_profile(where: {email: {_eq: $email}}, limit: 1) {
        id
      }
    }
`;

export {
    GET_USER_DETAILS_BY_EMAIL
}