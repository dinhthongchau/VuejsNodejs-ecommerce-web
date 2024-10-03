function createCustomer(req, res) {
    return res.status(201).json({ customer: {} });
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
  
    return res.json({ customers: [] });
  }
  
  function getCustomer(req, res) {
    return res.json({ customer: {} });
  }
  function updateCustomer(req, res) {
    return res.json({ customer: {} });
  }
  function deleteCustomer(req, res) {
    return res.json({
      message: "Customer deleted",
    });
  }
  
  
module.exports = {
    createCustomer,
    getCustomersByFilter,
    getCustomer,
    updateCustomer,
    deleteCustomer,
   
  };
  