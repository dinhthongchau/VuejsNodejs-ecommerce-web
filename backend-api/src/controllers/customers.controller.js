// const contactsService = require('../services/customers.service');

// const ApiError = require('../api-error');
const JSend = require('../jsend');

function createCustomer(req, res) {
    return res.status(201).json(JSend.success({ customer: {} }));
  }
  
  function getCustomersByFilter(req, res) {
    const filters = [];
    const { id, email, name, phone, address } = req.query;

    if (id) {
        filters.push(`id=${parseInt(id)}`); // Lọc theo id
    }
    if (email) {
        filters.push(`email='${email}'`); // Lọc theo email
    }
    if (name) {
        filters.push(`name LIKE '%${name}%'`); // Lọc theo tên với tìm kiếm gần đúng
    }
    if (phone) {
        filters.push(`phone='${phone}'`); // Lọc theo số điện thoại
    }
    if (address) {
        filters.push(`address LIKE '%${address}%'`); // Lọc theo địa chỉ với tìm kiếm gần đúng
    }

    // Giả sử `contactsService.getCustomersByFilters` là hàm xử lý logic với các bộ lọc
    contactsService.getCustomersByFilters(filters)
        .then((customers) => {
            return res.json(JSend.success({ customers }));
        })
        .catch((error) => {
            return res.status(500).json(JSend.error(error.message));
        });
}
  
  function getCustomer(req, res) {
    return res.json(JSend.success({ customer: {} }));
  }
  function updateCustomer(req, res) {
    return res.json(JSend.success({ customer: {} }));
  }
  function deleteCustomer(req, res) {
    return res.json(JSend.success({ customer: {} }));
  }
  
  
module.exports = {
    createCustomer,
    getCustomersByFilter,
    getCustomer,
    updateCustomer,
    deleteCustomer,
   
  };
  