import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'

function Profile({ user }) {
  const { instance } = useMsal()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (user) {
      console.log('=== USER ACCOUNT DEBUG ===')
      console.log('User account:', user)
      console.log('ID Token Claims (FULL):', JSON.stringify(user.idTokenClaims, null, 2))
      console.log('All token claims keys:', user.idTokenClaims ? Object.keys(user.idTokenClaims) : 'No claims')
      console.log('Username:', user.username)
      console.log('Name:', user.name)
      console.log('Raw user object:', JSON.stringify(user, null, 2))
      console.log('========================')
      
      const email = user.idTokenClaims?.emails?.[0] || 
                    user.idTokenClaims?.email || 
                    user.idTokenClaims?.preferred_username || 
                    user.idTokenClaims?.upn ||
                    user.username || 
                    user.name || 
                    'N/A'
      
      const givenName = user.idTokenClaims?.given_name || 
                        user.idTokenClaims?.givenName || 
                        user.idTokenClaims?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] ||
                        'N/A'
      
      const surname = user.idTokenClaims?.family_name || 
                      user.idTokenClaims?.surname || 
                      user.idTokenClaims?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'] ||
                      'N/A'
      
      const name = (givenName !== 'N/A' && surname !== 'N/A' ? `${givenName} ${surname}` : null) ||
                   user.idTokenClaims?.name || 
                   user.idTokenClaims?.displayName || 
                   user.idTokenClaims?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
                   user.name || 
                   email || 
                   'N/A'
      
      console.log('Extracted user info:', {
        email,
        givenName,
        surname,
        name
      })
      
      setUserInfo({
        email: email,
        givenName: givenName,
        surname: surname,
        name: name,
      })
    }
  }, [user])

  if (!userInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-container">
      <h2>Protected Profile Page</h2>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Email:</strong> {userInfo.email}
        </div>
        <div className="profile-item">
          <strong>Given Name:</strong> {userInfo.givenName}
        </div>
        <div className="profile-item">
          <strong>Surname:</strong> {userInfo.surname}
        </div>
        <div className="profile-item">
          <strong>Full Name:</strong> {userInfo.name}
        </div>
      </div>
      <div className="profile-message">
        <p>This is a protected page that is only accessible after sign-in.</p>
      </div>
      {import.meta.env.DEV && (
        <div className="profile-debug" style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '6px', fontSize: '0.9rem' }}>
          <strong>Debug Info:</strong>
          <pre style={{ marginTop: '0.5rem', overflow: 'auto', maxHeight: '200px' }}>
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default Profile

