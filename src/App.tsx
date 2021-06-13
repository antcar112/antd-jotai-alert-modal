import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { About, Home, Users } from './pages'
import { alertModalAtom } from './useAlert'
import './App.scss'

const App = () => {
  const [alertModal] = useAtom(alertModalAtom)

  useEffect(() => {
    console.log(alertModal)
  }, [alertModal])

  return (
    <Router>
      <div>
        <nav className='nav'>
          <ul>
            <li>
              <NavLink to='/' activeClassName='active' exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/about' activeClassName='active'>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to='/users' activeClassName='active'>
                Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
