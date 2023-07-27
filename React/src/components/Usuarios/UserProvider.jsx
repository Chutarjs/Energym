import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { UserContext } from '../../context/UserContext'
import PropTypes from 'prop-types';

export default function UserProvider (props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const saveUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const clearUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }
  const decodeToken = () => {
    if (user) {
      // const decodedToken = jwtDecode(user)
      const decodedToken =jwtDecode(user)
      return decodedToken
    } else {
      return null
    }
  }
  const autorize = ({ allowedRoles }) => {
    const userData = decodeToken()
    if (userData && allowedRoles) {
      console.log(userData && userData.rol && allowedRoles.includes(userData.rol.name))
      return userData && userData.rol && allowedRoles.includes(userData.rol.name)
    }
    return false
  }

  UserProvider.propTypes = {children: PropTypes.node.isRequired,};
  return (
    <UserContext.Provider value={{ user, saveUser, clearUser, autorize, decodeToken }}>
      {props.children}
    </UserContext.Provider>
  )
}
