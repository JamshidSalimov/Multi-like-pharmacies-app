const url = 'https://api.multilek.uz/api'
export default {
  // Endpoints
  loginEndpoint: `${url}/user/login/`,
  registerEndpoint: `${url}/user/register/`,
  refreshEndpoint: `${url}/token/refresh/`,
  logoutEndpoint: `${url}/user/logout/`,

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh',
}
