import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: {}

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit(e) {
        e.preventDefault();

        const userInfo = {
            email: this.state.email,
            password: this.state.password
        };

        axios
            .post("http://localhost:7000/users/login", userInfo)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data));
    };



    render() {

        const {email, password} = this.state;


        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Admin Login</h1>
                            <p className="lead text-center">
                                패쓰미 애플리케이션 관리자 전용페이지입니다.
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={this.onChange}
                                    />

                                    {/* 테스트할 때는 cmd, option, I를 눌러서 접속하고, 콘솔창으로 바꿔서 테스트 시작 */}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
