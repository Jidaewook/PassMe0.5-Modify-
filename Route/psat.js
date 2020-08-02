const express = require('express');
const router = express.Router();
const multer = require('multer');

const psatModel = require('../model/psat');

const {psat_post, psat_get, psat_detailget, psat_del, psat_patch, psat_search} = require('../controller/psat');
const upload = require('../config/multer');

const passport = require('passport');
const authCheck = passport.authenticate("jwt", {session: false});


// create 
// @route POST /lecture/psat
// @desc Create psat
// @access private(admin)

router.post('/', upload.upload.single('thumbnail'), psat_post);


// get
router.get('/', psat_get);

// detailget
router.get('/:psatModelId', authCheck, psat_detailget);

// delete
router.delete('/:psatModelId', authCheck, psat_del);

// search -> controller화 할 것
router.get('/search', psat_search);

// patch
router.patch('/:psatModelId',authCheck,  psat_patch);

module.exports = router;
