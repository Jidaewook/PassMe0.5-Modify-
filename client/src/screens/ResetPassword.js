import React, {useState, useEffect} from 'react';
import authSvg from '../assets/forget.svg';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { set } from 'lodash';



const ResetPassword = ({match}) => {

    const[formData, setFormData] = useState({
        password1: '',
        password2: '',
        token: '',
        textChange: 'Reset your Password'
    });

    const {password1, password2, token, textChange} = formData;

    useEffect(() => {
        let token = match.params.token;
        if(token) {
            setFormData({...formData, token})
        }
    }, [])

    // const handleChange = text = e => {
    //     setFormData({...formData, [text]: e.target.value});
    // };

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if((password1==password2) && password1 && password2) {
            setFormData({...formData, textChange: 'Submitting'});
            axios   
                .put(`http://localhost:5000/users/resetpw`, {
                    newPassword: password1,
                    resetPasswordLink: token
                })
                .then(res => {
                    console.log("message", res.data.message)
                    setFormData({
                        ...formData,
                        password1: '',
                        password2: ''
                    });
                    toast.success(res.data.message);
                })
                .catch(err => {
                    
                    toast.error('Something is wrong. try again')
                })
        } else {
            toast.error('Password don\'t matches');
        }

        // Server 태우는 과정
        // axios
        //     .post(`http://localhost:5000/users/resetpw`, {
        //         email
        //     })
        //     .then(res => {
        //         console.log("res", res)
        //         setFormData({
        //             ...formData,
        //             show: false
        //         });
        //         console.log(email);
        //     })
        //     .catch(err => {
        //         toast.error(err.response.data.errors);
        //     })

        console.log(password1, password2);

    }

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Password Reset 
                        </h1>
                        <h2>소개글</h2>
                        <div className="w-full flex-1 mt-8 text-indigo-500">
                            <form
                                className='mx-auto max-w-xs relative'
                                onSubmit={handleSubmit}
                            >

                                <input 
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='password'
                                    placeholder='password'
                                    onChange={handleChange('password1')}
                                    value={password1}
                                />
                                <input 
                                    className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='password'
                                    placeholder='Confirm Password'
                                    onChange={handleChange('password2')}
                                    value={password2}
                                />

                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>Reset your Password</span>
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${authSvg})` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;