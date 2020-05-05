const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const noticeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        title: {
            type: String
        },
        desc: {
            type: String
        },
        url: {
            type: String
        },
        thumbnail: {
            type: String
        },
        backimage: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('notice', noticeSchema);