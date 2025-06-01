
import { useEffect, useState } from "react";
import '../styles/Navbar.css'
import { Link } from "react-router-dom";



const Navbar = () => {


    const [shadow, setShadow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  const handleNavItemClick = () => {
    const navbarToggler = document.getElementById('navbarToggler');
    if (window.getComputedStyle(navbarToggler).display !== 'none') {
      navbarToggler.click();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="nav-box">
    <div className={shadow ? "navbar navbarshadow":"navbar"}>
    <div className="navbar-container container">
            <div className="navbar-logo">
              <Link to={"/"}>
                <img src="/footLogo.png" alt="logo" className="navbar-logo-img" />
              </Link>
            </div>
            <input type="checkbox" name="" id=""/>
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
            
            <ul className="menu-items">
                <li>
                  <Link to={"/"} onClick={handleNavItemClick}>
                    Asosiy
                  </Link>
                </li>
                <li>
                <Link to={'/collection'}  onClick={handleNavItemClick}>
                  Maydonlar
                </Link>
                </li>
                <li>
                <Link to={'/order'} onClick={handleNavItemClick}>
                  Buyurtmalar
                </Link>
                </li>
                <li>
                <Link to={'/contacts'} onClick={handleNavItemClick}>
                  Kontaktlar
                </Link>
                </li>
            </ul>
            
        </div>
    </div>
    </div>
  )
}

export default Navbar