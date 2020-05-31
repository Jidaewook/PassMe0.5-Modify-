const express = require('express');
const router = express.Router();
const multer = require('multer');

const psatModel = require('../model/psat');

const {psat_post, psat_get, psat_detailget, psat_del, psat_patch} = require('../controller/psat');
const upload = require('../config/multer');

// create 
// @route POST /lecture/psat
// @desc Create psat
// @access private(admin)

router.post('/', upload.upload.single('thumbnail'), psat_post);


// get
router.get('/', psat_get);

// detailget
router.get('/:psatModelId', psat_detailget);

// delete
router.delete('/:psatModelId', psat_del);

// search -> controller화 할 것
router.get('/search', (req, res) => {
    const {keyword} = req.body;

    psatModel
        .findOne({title: keyword})
        .then(result => {
            console.log(result);
        })
        .catch()


});

// patch
router.patch('/:psatModelId', psat_patch);

module.exports = router;
