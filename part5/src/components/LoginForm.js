import React from 'react'

import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = props => {
  const { notifyWith, user, setUser, username, setUsername, password, setPassword } = props

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
      setTimeout(() => { }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  let html

  if (user) {
    html = (
      <div>
        <p>
          {user.name} Logged in <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
    )
  } else {
    html = (
      <div>
        <h2>Log in to application</h2>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              Username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }

  return html
}

export default LoginForm