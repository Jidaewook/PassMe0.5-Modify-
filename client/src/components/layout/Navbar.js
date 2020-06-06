import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                   <Link className="nav-link" to="/usermanage">
                        회원관리
                   </Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to="/bbsmanage">
                        게시판관리
                   </Link>
                </li>
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />{' '}
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLink = (
            <ul className="navbar-nav ml-auto">
               
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );


        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            PassMe
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="nav-bar-toggler-icon" />
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        {isAuthenticated ? authLink : guestLink}
                    </div>
                </nav>
        );
    }
};

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);