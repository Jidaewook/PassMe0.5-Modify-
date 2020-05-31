import axios from 'axios';

import jwt_decode from 'jwt-decoder';
import {GET_ERRORS, SET_CURRENT_USER} from './Types';
import setAuthToken from '../../utils/setAuthToken';

// Login - Get user token

export const loginUser = userData => dispatch => {
    axios   
        .post("http://localhost:7000/users/login", userData)
        .then(res => {
            // Save to localstorage
            const {token} = res.data;

            // Set token to ls
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};
