import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ()=>{
    const [showAccout, setShowAccout] = useState(false);
    const handleAccoutClick = ()=>{
        setShowAccout(!showAccout);
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-7 sticky-top">
            <div className="container-fluid"> 
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">lakeSide Hotel</span>
                </Link>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggler="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink 
                            className={"nav-link"}
                            aria-current={"page"}
                            to={"/browse-all-rooms"}
                            >
                                Browse all rooms
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                            className={"nav-link"}
                            aria-current={"page"}
                            to={"/admin"}
                            >
                                Admin
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className={'nav-link'} to={"/find-booking"}
                            >
                                Find My Booking
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                            className={`nav-link dropdown-toggle ${showAccout ? "show" : ""}`}
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={handleAccoutClick}
                            >
                                {" "}
                                Accout
                            </a>
                            <ul 
                            className={`dropdown-menu ${showAccout ? "show" : ""}`}
                            aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link to={"/login"} className="dropdown-item">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/profile"} className="dropdown-item">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/logout"} className="dropdown-item">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;