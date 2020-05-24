import React from 'react';

const Landing = () => {
    return (
        <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Admin Connector</h1>
                                <p className="lead">
                                    {' '}
                                    PassMe Admin Page
                                </p>
                                <hr />
                                
                                <a href="login.html" className="btn btn-lg btn-light">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Landing;