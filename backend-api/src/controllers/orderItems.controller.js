const JSend = require('../jsend');

function createOrderItem(req, res) {
    return res.status(201).json(JSend.success({ orderItem: {} }));
}

function getOrderItemsByFilter(req, res) {
    const { id, product_id, order_id } = req.query; // Thêm id vào các tham số truy vấn
    const filters = [];

    if (id) {
        filters.push(`id=${id}`);
    }

    if (product_id) {
        filters.push(`product_id=${product_id}`);
    }

    if (order_id) {
        filters.push(`order_id=${order_id}`);
    }

    
    const orderItems = []; // Thay thế với dữ liệu thực tế nếu cần

    return res.json(JSend.success({ orderItems })); 
}

function getOrderItem(req, res) {
    return res.json(JSend.success({ orderItem: {} }));
}

function updateOrderItem(req, res) {
    return res.json(JSend.success({ orderItem: {} }));
}

function deleteOrderItem(req, res) {
    return res.json(JSend.success({ orderItem: {} }));
}

module.exports = {
    createOrderItem,
    getOrderItemsByFilter,
    getOrderItem,
    updateOrderItem,
    deleteOrderItem,
};
