const ncsModel = require('../model/ncs');
const userModel = require('../model/user');

exports.bbs_post = (req, res) => {
    const bbsFields = {};

    if (req.body.title) bbsFields.title = req.body.title;
    if (req.body.desc) bbsFields.desc = req.body.desc;
    if (req.body.comments) bbsFields.comments = req.body.comments;
    if (req.body.likes) bbsFields.likes = req.body.lieks;
    if (req.body.attached) bbsFields.attached = req.body.attached;
    if (typeof req.body.tag !== 'undefined') {
        ncsFields.tag = req.body.tag.split(',')
    }

    const newNcs = new ncsModel(ncsFields);
    newNcs
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Successful Ncs',
                results: item

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};