import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoginActions } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Rootstate } from "../redux/store";
function Header() {
  const { loginUser } = useSelector((state: Rootstate) => state.userLoginSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(userLoginActions.logoutUser());
    navigate("/");
  };
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-faebd8'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            User Management App
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='#'></a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'></a>
              </li>
            </ul>
            <form className='d-flex' role='search'>
              {loginUser != null ? (
                <button type='button' className='btn btn-dark' onClick={logout}>
                  Log out
                </button>
              ) : (
                <Link className='btn btn-dark' to='/login'>
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
