const express = require('express');
const router = express.Router();

const {ncs_post, ncs_get, ncs_del, ncs_patch, ncs_detailget, ncs_like, ncs_unlike} = require('../controller/ncs');
// upload files
const upload = require('../config/multer');

const passport = require('passport');
const authCheck = passport.authenticate("jwt", {session: false});


// create 
// @route POST /lecture/ncs
// @desc Create ncs
// @access public(최종 private: admin)
// 나중에 authCheck만 더하면 됨

router.post('/', upload.upload.single('thumbnail'), ncs_post);

// get
router.get('/', ncs_get);

// detailget
router.get('/:ncsModelId', ncs_detailget);

// patch
router.patch('/:ncsModelId', ncs_patch);

// delete
router.delete('/:ncsModelId', ncs_del);

// likes
router.post('/likes/:ncsModelId', ncs_like);

// unlikes
router.post('/unlikes/:ncsModelId', authCheck, ncs_unlike);

module.exports = router;
