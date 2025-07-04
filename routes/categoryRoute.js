const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController')

const router = express.Router()
    
//routes
//CREATE CATEGORY
router.post('/create', authMiddleware, createCatController)

//GET ALL CATEGORY
router.get('/getAll', getAllCatController)

//UPDATE CATEGORY
router.get('/update/:id', authMiddleware, updateCatController)

//DELETE CATEGORY
router.get('/delete/:id', authMiddleware, deleteCatController)


//export
module.exports = router