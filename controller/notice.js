const noticeModel = require('../model/notice');

exports.notice_post = (req, res) => {
    const noticeFields = {};

    if(req.body.title) noticeFields.title = req.body.title;
    if(req.body.desc) noticeFields.desc = req.body.desc;
    if(req.body.url) noticeFields.url = req.body.url;
  
    const newNotice = new noticeModel(noticeFields);
    newNotice
        .save()
        .then(item => {
            res.status(200).json({
                message: 'Successful Notice',
                noticeInfo: item
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });

};

exports.notice_get = (req, res) => {
    noticeModel
        .find()
        .then(notices => {
            res.status(200).json({
                message: 'Successful Get Notice',
                count: notices.length,
                noticeInfo: notices
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.notice_detailget = (req, res) => {
    noticeModel
        .findById(req.params.noticeModelId)
        .then(detail => {
            res.status(200).json({
                message: 'Successful Get Notice Detail',
                noticeInfo: detail
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
};

exports.notice_del = (req, res) => {
    noticeModel
        .findByIdAndDelete(req.params.noticeModelId)
        .then(() => {
            noticeModel
                .findByIdAndDelete(req.params.noticeModelId)
                .then(() => {
                    res.status(200).json({
                        message: "Successful Delete"
                    });
                });
        })
        .catch(err => {
            message: err.message
        });
};

exports.notice_patch = (req, res) => {
   
    const { title, desc, url, thumbnail } = req.body;

    noticeModel
        .findOneAndUpdate(
            { _id: req.params.noticeModelId },
            { $set: { title, desc, url, thumbnail } },
            { new: true }
        )
        .then(notice => {
            res.status(200).json({
                message: "Updated Notice",
                newNotice: notice
            });
        })
        .catch(err => {
            res.status(400).json({
                err: "Update Error"
            })
        });

};