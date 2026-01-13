import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe} from '../controllers/orderControler.js'
import adminAuth from '../middleware/adminAuth.js'
import AuthUser from '../middleware/auth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', AuthUser, placeOrder)
orderRouter.post('/stripe', AuthUser, placeOrderStripe)
orderRouter.post('/razorpay', AuthUser, placeOrderRazorpay)

// User Features
orderRouter.post('/userorders', AuthUser, userOrders)

//Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter
