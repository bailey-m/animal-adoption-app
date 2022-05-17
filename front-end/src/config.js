const CLIENT_ID = process.env.CLIENT_ID || '0oa5245v2xzw3pWIO5d7';
const ISSUER = process.env.ISSUER || 'https://dev-67164745.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = true;
const REDIRECT_URI = 'http://localhost:3000/login/callback'; // `${window.location.origin}

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/api/messages',
  },
};