const express = require('express');
const {
    addOne,
    removeOne,
    getAll
} = require('../controllers/favoriteControllers');
const authMiddleware = require('../middleware/userMiddleware')

const router = express.Router();

router.use(authMiddleware)

router.get('/',getAll)
router.post('/',addOne)
router.delete('/:id',removeOne)


module.exports = router