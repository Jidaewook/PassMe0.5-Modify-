import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';
import styled from 'styled-components';

import { 

    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';



const View = styled.div`
  width: 100px;
`;

class Navibar extends Component {

    state = {
        isOpen: false,
        setIsOpen: false
    }
    
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        



        const {isAuthenticated, user} = this.props.auth;

        const authLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                   <Link className="nav-link" to="/user">
                        <View>회원관리</View>
                   </Link>
                </li>
                <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.isOpen} navbar></Collapse>
                <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <View>게시판</View>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/notice">
                                        공지사항
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/bbs">
                                        자유게시판
                                    </Link>
                                
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/psat">
                                        PSAT
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/ncs">
                                        NCS
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>



                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        <View>
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />{' '}
                        Logout
                        </View>
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


        const {isOpen, setIsOpen} = this.state;


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

Navibar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navibar);