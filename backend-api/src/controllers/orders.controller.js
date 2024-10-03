const JSend = require('../jsend');

function createOrder(req, res) {
    return res.status(201).json(JSend.success({ order: {} }));
  }
  
  function getOrdersByFilter(req, res) {
    const { status, customer_id, order_date, start_date, end_date } = req.query;
    const filters = [];
  
    if (status) {
      filters.push(`status=${status}`);
    }
  
    if (customer_id) {
      filters.push(`customer_id=${customer_id}`);
    }
  
    if (order_date) {
      filters.push(`order_date=${order_date}`);
    }
  
    // Lọc theo khoảng thời gian order_date
    if (start_date && end_date) {
      filters.push(`order_date BETWEEN ${start_date} AND ${end_date}`);
    }
  
    return res.json(JSend.success({ order: [], }));
  }
  
  function getOrder(req, res) {
    return res.json(JSend.success({ order: {} }));
  }
  function updateOrder(req, res) {
    return res.json(JSend.success({ order: {} }));
  }
  function deleteOrder(req, res) {
    return res.json(JSend.success({ order: {} }));
  }

  
module.exports = {
    createOrder,
    getOrdersByFilter,
    getOrder,
    updateOrder,
    deleteOrder,
  };
  