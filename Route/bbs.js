const express = require('express');
const router = express.Router();

const passport = require('passport');
const authCheck = passport.authenticate("jwt", {session: false});

// upload files
const upload = require('../config/multer');

const {bbs_post, bbs_get, bbs_del, bbs_detailget, bbs_patch, bbs_search} = require('../controller/bbs');

router.post('/', upload.upload.single('thumbnail'), bbs_post);

router.get('/', bbs_get);

router.get('/:bbsModelId', bbs_detailget);

router.patch('/:bbsModelId', bbs_patch);

router.delete('/:bbsModelId', bbs_del);

router.get('/search', bbs_search);

module.exports = router;
