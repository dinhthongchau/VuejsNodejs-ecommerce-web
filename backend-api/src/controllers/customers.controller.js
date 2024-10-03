const JSend = require('../jsend');

function createCustomer(req, res) {
    return res.status(201).json(JSend.success({ customer: {} }));
  }
  
  function getCustomersByFilter(req, res) {
    const filters = [];
    const { email, name } = req.query;
  
    if (email) {
      filters.push(`email='${email}'`);
    }
  
    if (name) {
      filters.push(`name='${name}'`);
    }
  
    return res.json(JSend.success({ customer: {} }));
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
  