import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems,
            // attach logged in user
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});


const getOrderById = asyncHandler(async (req, res) => {
    // fetch order and get users info that is associated with order
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
   
});

// update order to paid order
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order) {
        // setting properties
       order.isPaid = true
       order.paidAt = Date.now()
    //    comes from paypal
       order.paymentResult = {
           id: req.body.id,
           status: req.body.status,
           update_time: req.body.update_time,
           email_address: req.body.payer.email_address
       }

    //    saving those properties
    const updatedOrder = await order.save();

    // respond
    res.json(updatedOrder);

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
   
});


// get logged in user orders
const getMyOrders = asyncHandler(async (req, res) => {
    // only logged in user
    const orders = await Order.find({user: req.user._id});
    res.json(orders);

});

export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders};