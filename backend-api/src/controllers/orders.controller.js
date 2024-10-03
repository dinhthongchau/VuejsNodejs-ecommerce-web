function createOrder(req, res) {
    return res.status(201).json({ order: {} });
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
  
    return res.json({ filters: query });
  }
  
  function getOrder(req, res) {
    return res.json({ order: {} });
  }
  function updateOrder(req, res) {
    return res.json({ order: {} });
  }
  function deleteOrder(req, res) {
    return res.json({
      message: "Order deleted",
    });
  }

  
module.exports = {
    createOrder,
    getOrdersByFilter,
    getOrder,
    updateOrder,
    deleteOrder,
  };
  