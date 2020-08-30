const userModel = require('../model/user');

const tokenGenerator = require('../config/tokengenerator');

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);
const jwt = require('jsonwebtoken');



exports.user_register =(req, res) => {
    const { name, email, password } = req.body;


    userModel
        .findOne({ email })
        .then(user => {
            if (user) {
                return res.status(404).json({
                    error: 'Email already exists'
                });
            }
            // const newUser = new userModel({
            //     name, email, password
            // });

            // newUser
            //     .save()
            //     .then(user => {
            //         res.status(200).json({
            //             message: "Successful new User",
            //             userInfo: user
            //         });

            //         // const message = template.signupEmail(user.name);
            //         // mailgun.sendEmail(user.email, message);
            //     })
            //     .catch(err => {
            //         res.status(400).json({
            //             message: err.message
            //         });
            //     });

            const payload = {name, email, password};
            const token = jwt.sign(
                payload, 
                process.env.JWT_ACCOUNT_ACTIVATION,
                {expiresIn: '20m'}
            )

            const emailData = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'PASSME NCS Account Activation Link',
                html: `
                    <h1>Please use the following to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                    <hr />
                    <p>This email may containe sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
            };

            sgMail
                .send(emailData)
                .then(() => {
                    return res.status(200).json({
                        message: `Email has been sent to ${email}`
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        errors: err
                    })
                });
        });
    };

exports.user_activation = (req, res) => {
    const {token} = req.body;

    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if(err){ 
                console.log('Activation Error');
                return res.status(401).json({
                    errors: 'Expired Link'
                });
            } else {
                const {name, email, password} = jwt.decode(token);

                const user = new userModel({
                    name, email,
                    password
                });
                
                user    
                    .save()
                    .then(user => {
                        res.status(200).json({
                            success: true,
                            userInfo: user
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: err
                        })
                    })

            }


        })
    }
};

exports.user_login = (req, res) => {
    const { email, password } = req.body;

    userModel
        .findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: 'user not found'
                });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err || isMatch === false) {
                    return res.status(400).json({
                        err: "Wrong password"
                    });
                }
                const payload = { id: user._id, name: user.name, email: user.email, avatar: user.avatar };

                res.status(200).json({
                    success: isMatch,
                    token: tokenGenerator(payload)
                });
            })

        });

};

exports.user_forgot = (req, res) => {
    const { email } = req.body;

    userModel
        .findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: 'user not found, 이메일이 없음'
                });
            } else {
                const token = jwt.sign(
                    {_id: user._id},
                    process.env.JWT_RESET_PASSWORD,
                    {expiresIn: '10m'}
                );
                const emailData = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: `Password Reset link`,
                    html: `
                        <h1>Please use the following link to reset your password</h1>
                        <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                        <hr />
                        <p>This email may contain sensetive information</p>
                        <p>${process.env.CLIENT_URL}</p>
                        `
                };

                return user
                    .updateOne({resetPasswordLink: token}, (err, success) => {
                        if(err) {
                            return res.status(400).json({
                                error: 'Database connection error'
                            })
                        } else {
                            sgMail
                                .send(emailData)
                                .then(() => {
                                    return res.status(200).json({
                                        message: `Email has been setn to ${email}, Follow the instruction to activate your account`
                                    })
                                })
                                .catch(err => {
                                    res.status(404).json({
                                        message: err.message
                                    })
                                })
                        }
                    })
                    
            }


        })



};

exports.user_reset = (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(422).json({
            error: '비밀번호를 입력하세요.'
        })
    }
    userModel
        .findOne(
            {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            },
        )
        .then(user => {
            console.log(user);
            if (!user) {
                return res.status(422).json({
                    error: '사용자 토큰이 만료되었습니다. 다시 로그인하세요.'
                });
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        return res.status(422).json({
                            error: err.message
                        });
                    }
                    password = hash;

                    user.password = password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user
                        .save(err => {
                            if (err) {
                                return res.status(422).json({
                                    error: '리셋한 패스워드를 저장하는 과정에서 에러가 발생했습니다.'
                                });
                            }

                            // const message = template.confirmResetPasswordEmail();
                            // mailgun.sendEmail(user.email, message);

                            return res.status(200).json({
                                success: true,
                                message: '패스워드가 리셋되었고, 이메일을 보내주었다.'
                            })
                        })

                })
            });
        })
        .catch();
};

exports.user_current = (req, res) => {
    res.status(200).json({
        userInfo: req.user
    });
};