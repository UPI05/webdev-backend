const itemsController = require('./items.controller');
const { validate } = require('../../middleware/validate');
const router = require('express').Router();
const multer = require('multer');

// Setup multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, filename + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
    !req.query.name ? itemsController.getAllItems(req, res, next) : itemsController.getItemsByName(req, res, next);
});

router.get('/:id', itemsController.getItemDetail);

router.route('/').post(validate, upload.single('thumbnail'), itemsController.uploadItem);

router.get('/catalogue/:category', itemsController.getItemByCategory);
module.exports = router;
