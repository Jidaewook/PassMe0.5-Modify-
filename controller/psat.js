const psatModel = require('../model/psat');
const mailgun = require('../config/mailgun');
const template = require('../config/template');

exports.psat_post = (req, res) => {
    const psatFields = {};

    if (req.body.title) psatFields.title = req.body.title;
    if (req.body.desc) psatFields.desc = req.body.desc;
    if (req.body.url) psatFields.url = req.body.url;
    if (req.body.comments) psatFields.comments = req.body.comments;
    if (req.body.likes) psatFields.likes = req.body.likes;
    if (req.file.path) psatFields.thumbnail = req.file.path;
    if (req.body.attached) psatFields.attached = req.body.attached;
    if (typeof req.body.tag !== 'undefined') {
        psatFields.tag = req.body.tag.split(',')
    }

    const newPsat = new psatModel(psatFields);
    newPsat
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Successful Psat',
                results: item
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.psat_get = (req, res) => {
    psatModel
        .find()
        .then(items => {
            res.status(200).json({
                message: 'Successful Get PSAT',
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

exports.psat_detailget = (req, res) => {
    psatModel
        .findById(req.params.psatModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get PSAT Detail',
                results: item
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });

};

exports.psat_del = (req, res) => {
    psatModel
    // 선택해야 하는 대상을 잘 모르겠음
        .findByIdAndDelete(req.params.psatModelId)
        .then(() => {
            psatModel
                .findByIdAndDelete(req.params.psatModelId)
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

exports.psat_patch = (req, res) => {
   
    const { title, desc, url, thumbnail, attached } = req.body;

    psatModel
        .findOneAndUpdate(
            { _id: req.params.psatModelId },
            { $set: { title, desc, url, thumbnail, attached } },
            { new: true }
        )
        .then(psat => {
            res.status(200).json({
                message: "Updated PSAT",
                newPsat: psat
            });
        })
        .catch(err => {
            res.status(400).json({
                err: "Update Error"
            })
        });

};

