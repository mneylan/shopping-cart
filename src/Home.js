import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {NavLink} from "react-router-dom"

const Home = () => {
  
  return (
    <div className="background">
      <div className="top-flex-container">
        <div className="top-flex-item1">
          <h1>Avalon</h1>
          <div className="avalon-sub-container">
            <hr></hr>
            <h2>interior</h2>
          </div>
        </div>
        <div className="top-flex-item2">
          <h2 className="nav-link">Home</h2>
          <NavLink to="/shop" className="nav-link">Shop</NavLink>
        </div>
      </div>

      <div className="hero-container">
        <h2 className="hero-text">Go bold with our new selection</h2> 
        <h2 className="hero-text">of Fall lighting
        </h2>
      </div>

      <NavLink to="/shop" className="button-container">
        <button type="button">Explore</button>
      </NavLink>

      <div className="hamburger-container">
        <FontAwesomeIcon icon={faBars} className="hamburger"/>
        <NavLink to="/" className="li">Home</NavLink>
        <NavLink to="/shop" className="li">Shop</NavLink>
      </div>
    </div>
  )
}

export default Home