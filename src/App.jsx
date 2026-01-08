import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import { loginRequest } from './authConfig'
import SignInButton from './components/SignInButton'
import SignOutButton from './components/SignOutButton'
import Profile from './components/Profile'
import './App.css'

function App() {
  const { instance, accounts } = useMsal()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    instance.handleRedirectPromise().then((response) => {
      if (response) {
        console.log('Login successful:', response)
        console.log('Account:', response.account)
        console.log('ID Token Claims:', response.account?.idTokenClaims)
      } else {
        console.log('No redirect response, checking for existing accounts...')
        const existingAccount = instance.getActiveAccount()
        if (existingAccount) {
          console.log('Existing account found:', existingAccount)
          console.log('ID Token Claims:', existingAccount.idTokenClaims)
        }
      }
    }).catch((error) => {
      console.error('Login error:', error)
    })
  }, [instance])

  useEffect(() => {
    const account = accounts[0]
    if (account) {
      setIsAuthenticated(true)
      setUser(account)
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [accounts])

  if (isAuthenticated) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Entra External ID App</h1>
          <SignOutButton />
        </header>
        <main className="app-main">
          <Profile user={user} />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Entra External ID App</h1>
      </header>
      <main className="app-main">
        <div className="sign-in-container">
          <h2>Welcome</h2>
          <p>Please sign in to access your profile.</p>
          <SignInButton />
        </div>
      </main>
    </div>
  )
}

export default App

