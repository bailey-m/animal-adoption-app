const CLIENT_ID = process.env.CLIENT_ID || '0oa5245v2xzw3pWIO5d7';
const ISSUER = process.env.ISSUER || 'https://dev-67164745.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = true;

const oktaConfig = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login/callback' : 'https://animal-adoption-app-347718.uc.r.appspot.com/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/api/messages',
  },
};

export default oktaConfig;
