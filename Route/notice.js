const express = require('express');
const router = express.Router();

const passport = require('passport');
const authCheck = passport.authenticate("jwt", {session: false});

// upload files
const upload = require('../config/multer');

const {notice_del, notice_detailget, notice_get, notice_patch, notice_post} = require('../controller/notice');

router.post('/', upload.upload.single('thumbnail'), notice_post);

router.get('/', notice_get);

router.get('/:noticeModelId', notice_detailget);

router.patch('/:noticeModelId', notice_patch);

router.delete('/:noticeModelId', notice_del);

module.exports = router;
