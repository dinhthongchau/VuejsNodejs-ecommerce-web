

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */
async function efetch(url, options = {}) {
  let result = {};
  let json = {};
  try {
    result = await fetch(url, options);
    json = await result.json();
  } catch (error) {
    throw new Error(error.message);
  }
  if (!result.ok || json.status !== 'success') {
    throw new Error(json.message);
  }
  return json.data;
}

function makeCustomerService() {
  const baseUrl = 'http://localhost:3300/api/v1/customers/filter'; 
  const baseUrl_2 = 'http://localhost:3300/api/v1/customers'; 
 
  // /**
  //  * Fetch customers by filter (e.g., pagination, filtering by fields)
  //  * @param {number} page - Số trang để phân trang
  //  * @param {number} limit - Giới hạn số sản phẩm mỗi trang
  //  */
  async function fetchCustomers(page, limit = 10) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    const data = await efetch(url);

    // Nếu có cần xử lý dữ liệu sản phẩm
    data.customers = data.customers.map((customer) => {
      return {
      ...customer,
      
      };
  });
    return data;
  }

  async function fetchCustomer(id) {
    const { customer } = await efetch(`${baseUrl_2}/${id}`);
    return {
      ...customer,
      
    };
  }

  async function createCustomer(customer) {
    return efetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // async function updatecustomer(id, customer) {
  //   return efetch(`${baseUrl}/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(customer),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
 async function updateCustomer(customerId, formData) {
    try {
      const response = await fetch(`http://localhost:3300/api/v1/customers/${customerId}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('No data provided for update');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }


  async function deleteCustomer(id) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }

  async function deleteAllCustomers() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  

  return {
    fetchCustomers,
    fetchCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomers
  };
}

export default makeCustomerService(); 
