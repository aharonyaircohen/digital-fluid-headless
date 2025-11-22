export const LOGIN_MUTATION = /* GraphQL */ `
  mutation HeadlessLogin($username: String!, $password: String!) {
    login(input: { username: $username, password: $password, clientMutationId: "login" }) {
      user {
        id
        nicename
        email
      }
    }
  }
`;

export const LOGOUT_MUTATION = /* GraphQL */ `
  mutation HeadlessLogout {
    logout(input: { clientMutationId: "logout" }) {
      success
    }
  }
`;

export const VIEWER_QUERY = /* GraphQL */ `
  query Viewer {
    viewer {
      id
      name
      email
      nicename
      avatar {
        url
      }
      roles {
        nodes {
          name
        }
      }
    }
  }
`;
