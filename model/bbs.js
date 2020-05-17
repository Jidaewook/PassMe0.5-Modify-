const mongoose = require('mongoose');

const bbsSchema  = new mongoose.Schema(
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
        attached: {
            type: String
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                desc: {
                    type: String,
                    require: true
                },
                like: [
                    {
                        user: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'users'
                        }
                    }
                ],
                date: {
                    type: Date,
                    default: Date.now()
                }
            }
            
        ],
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                }
            }
        ],
        
        tag: [
            {
                type: String
            }          
        ],

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('bbs', bbsSchema);