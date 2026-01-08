const tenantDomain = import.meta.env.VITE_TENANT_DOMAIN || ''
const userFlow = import.meta.env.VITE_USER_FLOW || ''

const baseAuthority = `https://${tenantDomain}.ciamlogin.com/${tenantDomain}.onmicrosoft.com`
const authority = `${baseAuthority}/${userFlow}`

const authorityMetadata = JSON.stringify({
  authorization_endpoint: `${baseAuthority}/oauth2/v2.0/authorize`,
  token_endpoint: `${baseAuthority}/oauth2/v2.0/token`,
  end_session_endpoint: `${baseAuthority}/oauth2/v2.0/logout?post_logout_redirect_uri=`,
  issuer: `${baseAuthority}/v2.0`,
  jwks_uri: `${baseAuthority}/discovery/v2.0/keys`,
  userinfo_endpoint: `${baseAuthority}/openid/v2.0/userinfo`,
})

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    authority: authority,
    knownAuthorities: [`${tenantDomain}.ciamlogin.com`],
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
    authorityMetadata: authorityMetadata,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (import.meta.env.DEV && level !== 'Verbose') {
          console.log('MSAL Log:', level, message)
        }
      },
      logLevel: import.meta.env.DEV ? 'Info' : 'Error',
    },
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'offline_access'],
  prompt: 'select_account',
}

if (import.meta.env.DEV) {
  console.log('MSAL Config:', {
    clientId: msalConfig.auth.clientId,
    tenantDomain: tenantDomain,
    userFlow: userFlow,
    authority: msalConfig.auth.authority,
    redirectUri: msalConfig.auth.redirectUri,
    knownAuthorities: msalConfig.auth.knownAuthorities,
  })
  
  console.log('Authority URL:', msalConfig.auth.authority)
  console.log('Expected format: https://{tenant}.ciamlogin.com/{tenant}.onmicrosoft.com/{userFlow}')
  console.log('Note: External ID uses ciamlogin.com (not b2clogin.com)')
  console.log('Note: User flow is included in authority for MSAL')
  console.log('Testing openid-configuration endpoint...')
  
  const openIdConfigUrl = `${msalConfig.auth.authority}/v2.0/.well-known/openid-configuration`
  console.log('OpenID Config URL:', openIdConfigUrl)
  
  fetch(openIdConfigUrl)
    .then(response => {
      if (response.ok) {
        console.log('✅ OpenID configuration endpoint works!')
        return response.json()
      } else {
        console.error('❌ OpenID configuration endpoint failed:', response.status, response.statusText)
        console.log('This might be a CORS issue. The endpoint might work from the server side.')
      }
    })
    .then(data => {
      if (data) {
        console.log('OpenID Configuration:', data)
        console.log('Authorization endpoint:', data.authorization_endpoint)
        console.log('Token endpoint:', data.token_endpoint)
      }
    })
    .catch(error => {
      console.error('❌ Fetch error:', error)
      console.log('Note: CORS errors are expected. MSAL will handle this internally.')
    })
}
