const knex = require('../database/knex');
const Paginator = require('./paginator');
//const { unlink } = require('node:fs');

function customerRepository() {
    return knex('Customer');
}

function readCustomer(payload) {
    return {
        customer_id: payload.customer_id,
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        customer_phone: payload.customer_phone,
        customer_address: payload.customer_address,
    };
}
async function createCustomer(payload) {
  const customer = readCustomer(payload); 
  const [customer_id] = await customerRepository().insert(customer); 
  return { customer_id, ...customer }; 
}

async function getManyCustomers(query) {
  try {
    const { customer_name, customer_email, customer_phone ,customer_address, page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);

    let results = await customerRepository()
      .where((builder) => {
        if (customer_name) {
          builder.where('customer_name', 'like', `%${customer_name}%`);
        }
        if (customer_email) {
          builder.where('customer_email', '=', customer_email);
        }
        if (customer_phone) {
          builder.where('customer_phone', 'like', `%${customer_phone}%`);
        }
        if (customer_address) {
          builder.where('customer_address', 'like', `%${customer_address}%`);
        }
      })
      .select(
        knex.raw('count(customer_id) OVER() AS recordCount'),
        'customer_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address'
      )
      .limit(paginator.limit)
      .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordCount;
      delete result.recordCount;
      return result;
    });

    return {
      metadata: paginator.getMetadata(totalRecords),
      customers: results,
    };
  } catch (error) {
    console.error('Error in getManyCustomers:', error); // Ghi log lỗi
    throw new ApiError(500, 'An error occurred while retrieving customers');
  }
}



async function getCustomerById(customer_id) {
  return customerRepository().where('customer_id', customer_id).select('*').first();
}

async function updateCustomer(customer_id, payload) {
  const updatedCustomer = await customerRepository()
    .where("customer_id", customer_id)
    .select("*")
    .first();

  if (!updatedCustomer) {
    return null; 
  }

  const update = readCustomer(payload); 


  await customerRepository().where("customer_id", customer_id).update(update);

  return { ...updatedCustomer, ...update }; 
}
async function deleteCustomer(customer_id) {
  const deletedCustomer = await customerRepository()
    .where('customer_id', customer_id)
    .first();
    
  if (!deletedCustomer) {
    return null; 
  }

  await customerRepository().where('customer_id', customer_id).del();

  return deletedCustomer; 
}

async function deleteAllCustomer() {
  await customerRepository().del();
}

module.exports = {
    createCustomer,
    getManyCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomer,
};
