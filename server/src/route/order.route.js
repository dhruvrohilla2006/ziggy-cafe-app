const {Router} = require('express');
const tokenValidate = require('../middleware/token.middleware');
const roleValidate = require('../middleware/role.middleware');
const { getAllAdmin, getAllUser } = require('../controller/order.controller');

const router = Router()
 
// Get All Orders for admin  /getAllAdmin

router.get('/getAllAdmin',
            tokenValidate,
            roleValidate(['admin']),
            getAllAdmin)

// Get All Order of User for user /getAllUser

router.get('/getAllUser',
            tokenValidate,
            roleValidate(['admin','user']),
            getAllUser)

// Create Order for user  /create/order

// Update the Status of the order /status/:orderId

// Cancel the order from userSide /status/:orderId/CancelUser

