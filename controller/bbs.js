const bbsModel = require('../model/bbs');
const userModel = require('../model/user');

exports.bbs_post = (req, res) => {
    const bbsFields = {};

    if (req.body.title) bbsFields.title = req.body.title;
    if (req.body.desc) bbsFields.desc = req.body.desc;
    if (req.body.comments) bbsFields.comments = req.body.comments;
    if (req.body.likes) bbsFields.likes = req.body.lieks;
    if (req.body.attached) bbsFields.attached = req.body.attached;
    if (typeof req.body.tag !== 'undefined') {
        bbsFields.tag = req.body.tag.split(',')
    }

    const newBbs = new bbsModel(bbsFields);
    newBbs
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Successful BBS',
                results: item

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.bbs_get = (req, res) => {
    bbsModel
        .find()
        .then(items => {
            res.status(200).json({
                message: 'Successful Get bbs',
                count: items.length,
                results: items
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.bbs_detailget = (req, res) => {
    bbsModel
        .findById(req.params.bbsModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful BBS Detail',
                results: item
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
};

exports.bbs_del = (req, res) => {
    bbsModel
        .findByIdAndDelete(req.params.bbsModelId)
        .then(() => {
            bbsModel
                .findByIdAndDelete(req.params.bbsModelId)
                .then(() => {
                    res.status(200).json({
                        message: "Successful Delete"
                    });
                });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
};

exports.bbs_patch = (req, res) => {
    const {title, desc, url, thumbnail, attached} = req.body;
        console.log(req.body);
    bbsModel
        .findOneAndUpdate(
            { _id: req.params.bbsModelId},
            { $set: {title, desc, url, thumbnail, attached}},
            { new: true}
            
        )
        .then(bbs => {
            res.status(200).json({
                message: "Updated BBS",
                newBbs: bbs
            });
        })
        .catch(err => {
            res.status(400).json({
                err: "Update Error"
            })
        });
};

exports.bbs_like = (req, res) => {
    console.log(req.user);
    userModel
        .findById(req.user.id)
        .then(user => {
            bbsModel
                .findById(req.params.bbsModelId)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyliked: 'user already liked this post'});
                    }
                    post.likes.unshift({user: req.user._id});
                    post    
                        .save()
                        .then(
                            post => res.json(post)
                        );
                })
                .catch(err => res.status(400).json({
                    msg: err.message
                }))
        })
        .catch(err => {
            res.status(400).json({
                msg: err.message
            })
        });
};

exports.bbs_unlike = (req, res) => {
    userModel
        .findById(req.user.id)
        .then(user => {
            bbsModel
                .findById(req.params.bbsModelId)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === like.user.id).length ===0){
                        return res.status(400).json({
                            notliked: 'You have not liked this post'
                        })
                    }
                    const removeIndex = post
                        .likes
                        .map(item => item.user.toString())
                        .indexOf(req.user._id);
                    post.likes.splice(removeIndex, 1);
                    post
                        .save()
                        .then(post => res.json(post));
                })
                .catch(err => 
                    res.status(500).json({
                        err: err.message
                    })    
                );
        });
};

exports.bbs_comments = (req, res) => {
    bbsModel
        .findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            post
                .save()
                .then(post => res.json(post));
        })
        .catch(err => 
            res.json(err)
        );
};

exports.bbs_search = (req, res) => {
    const {keyword} = req.body;

    bbsModel
        .findOne({title: keyword})
        .then(result => {
            console.log(result);
        })
        .catch()


};