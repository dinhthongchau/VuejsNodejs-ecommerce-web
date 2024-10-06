const JSend = require('../jsend');

function createOrder(req, res) {
    return res.status(201).json(JSend.success({ order: {} }));
  }
  
  function getOrdersByFilter(req, res) {
    const { id, customer_id, order_date, total_amount, status, payment_method, notes } = req.query;
    const filters = [];

    if (id) {
        filters.push(`id=${id}`);
    }

    if (customer_id) {
        filters.push(`customer_id=${customer_id}`);
    }

    if (order_date) {
        filters.push(`order_date=${order_date}`);
    }

    if (total_amount) {
        filters.push(`total_amount=${total_amount}`);
    }

    if (status) {
        filters.push(`status=${status}`);
    }

    if (payment_method) {
        filters.push(`payment_method=${payment_method}`);
    }

    if (notes) {
        filters.push(`notes LIKE '%${notes}%'`); // Dùng LIKE cho notes nếu muốn tìm kiếm theo phần
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
  