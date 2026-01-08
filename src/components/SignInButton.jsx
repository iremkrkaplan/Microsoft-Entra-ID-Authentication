import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'

function SignInButton() {
  const { instance, accounts } = useMsal()

  const handleSignIn = async () => {
    try {
      if (accounts.length > 0) {
        console.log('Existing account found, clearing cache...')
        instance.clearCache()
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      console.log('Starting login redirect...')
      console.log('Login request:', loginRequest)
      console.log('Redirect URI:', window.location.origin)
      
      await instance.loginRedirect({
        ...loginRequest,
        prompt: 'login',
      })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <button onClick={handleSignIn} className="sign-in-button">
      Sign In
    </button>
  )
}

export default SignInButton

