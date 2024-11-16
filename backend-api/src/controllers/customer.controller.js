const customersService = require('../services/customer.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');



async function createCustomer(req, res, next) {
    // if (!req.session.customer) {
    //   return next(new ApiError(401, "Vui lòng đăng nhập!"));
    // }

  if (!req.body?.customer_name || typeof req.body.customer_name !== 'string') {
    return next(new ApiError(400, 'Customer name should be a non-empty string'));
  }

  try {
    const customer = await customersService.createCustomer({
      ...req.body,
    });

    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${customer.customer_id}`
      })
      .json(
        JSend.success({
          customer,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, 'An error occurred while creating the customer')
    );
  }
}

async function getCustomersByFilter(req, res, next) {
  let result = {
    metadata: {
    customers: [],
    totalRecords: 0,
    firstPage: 1,
    lastPage: 1,
    page: 1,
    limit: 5,
    }
  };
  try {
    result = await customersService.getManyCustomers(req.query);
    
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'An error occurred while retrieving customers'));
  }

   return res.json(
    JSend.success({
      customers: result.customers,
      metadata: result.metadata,
    })
  );
}
  
async function getCustomer(req, res, next) {
  const { customer_id } = req.params;

  try {
    const customer = await customersService.getCustomerById(customer_id); 
    if (!customer) {
      return next(new ApiError(404, "Customer not found")); 
    }
    return res.json(JSend.success({ customer })); 
  } catch (error) {
    console.error(error); // Ghi lại lỗi
    return next(new ApiError(500, `Error retrieving customer with customer_id=${customer_id}`)); 
  }
}

  
  async function updateCustomer(req, res, next) {
    
    if (Object.keys(req.body).length === 0 && !req.file) {
      return next(new ApiError(400, 'Data to update cannot be empty'));
    }
  
    const { customer_id } = req.params; 
  
    try {
      const updatedCustomer = await customersService.updateCustomer(customer_id, {
        ...req.body, 
      });
  
      if (!updatedCustomer) {
        return next(new ApiError(404, 'Customer not found')); 
      }
  
      return res.json(JSend.success({
        customer: updatedCustomer, 
      }));
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, `Error updating customer with customer_id=${customer_id}`)); 
    }
  }
  

  async function deleteCustomer(req, res, next) {
    const { customer_id } = req.params; 
  
    try {
      const deleted = await customersService.deleteCustomer(customer_id); 
  
      if (!deleted) {
        return next(new ApiError(404, 'Customer not found')); 
      }
  
      return res.json(JSend.success()); 
    } catch (error) {
      console.log(error); 
      return next(new ApiError(500, `Could not delete customer with customer_id=${customer_id}`)); 
    }
  }
  

 
  async function deleteAllCustomer(req, res, next) {
    try {
      await customersService.deleteAllCustomer();
      return res.json(JSend.success());
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'An error occurred while removing all customers'));
    }
  }
  
module.exports = {
    createCustomer,
    getCustomersByFilter,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomer,
  };
  