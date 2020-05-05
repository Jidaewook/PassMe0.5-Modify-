const ncsModel = require('../model/ncs');

exports.ncs_post = (req, res) => {
    const ncsFields = {};

    if (req.body.title) ncsFields.title = req.body.title;
    if (req.body.desc) ncsFields.desc = req.body.desc;
    if (req.body.url) ncsFields.url = req.body.url;
    if (req.file.path) ncsFields.thumbnail = req.file.path;
    if (req.body.comments) ncsFields.comments = req.body.comments;
    if (req.body.likes) ncsFields.likes = req.body.lieks;
    if (req.body.attached) ncsFields.attached = req.body.attached;
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

exports.ncs_get = (req, res) => {
    ncsModel
        .find()
        .then(items => {
            res.status(200).json({
                message: 'Successful Get NCS',
                count: items.length,
                // results로 프론트/api에서 출력 항목을 설정했으면, 아래 불러올 항목의 이름이 일치해야 한다.
                results: items
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.ncs_detailget = (req, res) => {
    ncsModel
        .findById(req.params.ncsModelId)
        .then(item => {
            res.status(200).json({
                message: 'Successful Get NCS Detail',
                results: item
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });

};

exports.ncs_del = (req, res) => {
    ncsModel
    // 선택해야 하는 대상을 잘 모르겠음
        .findByIdAndDelete(req.params.ncsModelId)
        .then(() => {
            ncsModel
                .findByIdAndDelete(req.params.ncsModelId)
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

exports.ncs_patch = (req, res) => {
   
    const { title, desc, url, thumbnail, attached } = req.body;

    ncsModel
        .findOneAndUpdate(
            { _id: req.params.ncsModelId },
            { $set: { title, desc, url, thumbnail, attached } },
            { new: true }
        )
        .then(ncs => {
            res.status(200).json({
                message: "Updated NCS",
                newNcs: ncs
            });
        })
        .catch(err => {
            res.status(400).json({
                err: "Update Error"
            })
        });

};