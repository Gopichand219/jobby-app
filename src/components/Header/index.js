import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-list-item">
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <Link to="/login">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
