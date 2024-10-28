const ordersService = require('../services/order.service');
const customersService = require('../services/customer.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');


async function createOrder(req, res, next) {
  

    console.log("in ra dữ liệu:",req.body);

    const customer_id = Number(req.body.customer_id);
    const order_total = Number(req.body.order_total);


  if (!customer_id || isNaN(customer_id)) {
    return next(new ApiError(400, 'Customer ID should be a valid number ( order )'));
  }

  if (!order_total || isNaN(order_total)) {
    return next(new ApiError(400, 'Order total should be a valid number'));
  }


  if (!req.body?.order_payment_method || typeof req.body.order_payment_method !== 'string') {
    return next(new ApiError(400, 'Payment method should be a non-empty string'));
  }

  if (!req.body?.order_status || typeof req.body.order_status !== 'string') {
    return next(new ApiError(400, 'Order status should be a non-empty string'));
  }

  try {
    const customerExists = await customersService.getCustomerById(customer_id);
    if (!customerExists) {
      return next(new ApiError(404, 'Customer not found'));
    }

    const order = await ordersService.createOrder({
      customer_id: customer_id,
      order_total: order_total,
      order_payment_method: req.body.order_payment_method,
      order_status: req.body.order_status,
      order_note: req.body.order_note || null, 
    });

    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${order.order_id}`
      })
      .json(
        JSend.success({
          order,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, 'An error occurred while creating the order')
    );
  }
}


async function getOrdersByFilter(req, res, next) {
    console.log("getOrdersByFilter is called");
    
    let result = {
        metadata: {
        orders: [],
        totalRecords: 0,
        firstPage: 1,
        lastPage: 1,
        page: 1,
        limit: 5,
        }
    };
    try {
        result = await ordersService.getManyOrders(req.query);
        
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while retrieving orders'));
    }

    return res.json(
        JSend.success({
        orders: result.orders,
        metadata: result.metadata,
        })
    );
}

async function getOrder(req, res, next) {
  const { order_id } = req.params;

  try {
    const order = await ordersService.getOrderById(order_id); 
    if (!order) {
      return next(new ApiError(404, "Order not found")); 
    }
    return res.json(JSend.success({ order })); 
  } catch (error) {
    console.error(error); 
    return next(new ApiError(500, `Error retrieving order with order_id=${order_id}`)); 
  }
}

async function updateOrder(req, res, next) {

    console.log(req.body);

    if (Object.keys(req.body).length === 0 && !req.file) {
      return next(new ApiError(400, 'Data to update cannot be empty'));
    }
  
    const { order_id } = req.params; 
    const { customer_id } = req.body; 

    try {
        if (customer_id) {
            const customerExists = await customersService.getCustomerById(Number(customer_id));
        if (!customerExists) {
            return next(new ApiError(404, 'Customer not found')); 
        }
    }


   
      const updatedOrder = await ordersService.updateOrder(order_id, {
        ...req.body, // Thêm dữ liệu từ body
      });
  
      if (!updatedOrder) {
        return next(new ApiError(404, 'Order not found')); 
      }
  
      return res.json(JSend.success({
        order: updatedOrder, 
      }));
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, `Error updating order with order_id=${order_id}`)); 
    }
  }

  async function deleteOrder(req, res, next) {
    const { order_id } = req.params; 
  
    try {
      const deleted = await ordersService.deleteOrder(order_id); 
  
      if (!deleted) {
        return next(new ApiError(404, 'Order not found')); 
      }
  
      return res.json(JSend.success()); 
    } catch (error) {
      console.log(error); 
      return next(new ApiError(500, `Could not delete order with order_id=${order_id}`)); 
    }
  }

    async function deleteAllOrder(req, res, next) {
    try {
      await ordersService.deleteAllOrder();
      return res.json(JSend.success());
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'An error occurred while removing all orders'));
    }
  }

module.exports = {
    createOrder,
    getOrdersByFilter,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    deleteAllOrder
};
