//This component provides the title 'Expensify' and the two links 'Go Home' and 'Go to Create'
import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => (
    <header>
      <h1>Expensify</h1>
      <p><NavLink to="/" activeClassName= "is-active" exact={true}>Go home</NavLink></p>
      <p><NavLink to="/create" activeClassName= "is-active">Go to create</NavLink></p>
    </header>
  );

  export default Header