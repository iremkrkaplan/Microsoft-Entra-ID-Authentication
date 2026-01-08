import { useMsal } from '@azure/msal-react'

function SignOutButton() {
  const { instance } = useMsal()

  const handleSignOut = () => {
    try {
      const account = instance.getActiveAccount()
      if (account) {
        instance.logoutRedirect({
          postLogoutRedirectUri: window.location.origin,
          account: account,
        })
      } else {
        instance.clearCache()
        window.location.href = window.location.origin
      }
    } catch (error) {
      console.error('Sign out error:', error)
      instance.clearCache()
      window.location.href = window.location.origin
    }
  }

  return (
    <button onClick={handleSignOut} className="sign-out-button">
      Sign Out
    </button>
  )
}

export default SignOutButton

