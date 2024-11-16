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

function makeAdminService() {
  const baseUrl = 'http://localhost:3300/api/v1/admins';

  // /**
  //  * Fetch customers by filter (e.g., pagination, filtering by fields)
  //  * @param {number} page - Số trang để phân trang
  //  * @param {number} limit - Giới hạn số sản phẩm mỗi trang
  //  */
//   async function fetchAdmins(page, limit = 10) {
//     let url = `${baseUrl}?page=${page}&limit=${limit}`;
//     const data = await efetch(url);

//     // Nếu có cần xử lý dữ liệu sản phẩm
//     data.customers = data.customers.map((customer) => {
//       return {
//         ...customer
//       };
//     });
//     return data;
//   }

  async function fetchAdmin(id) {
    const { admin } = await efetch(`${baseUrl}/${id}`);
    return {
      ...admin
    };
  }

  async function login(username, password) {
    const formData = new FormData();
    formData.append('admin_username', username);
    formData.append('admin_password', password);
    const data = await efetch(`${baseUrl}/login/`, {
      method: 'POST',
      body: formData
    });
    return data.data;
  }

  async function logout() {
    return efetch(`${baseUrl}/logout/`, {
      method: 'POST'
    });
  }

  async function createAdmin(admin) {
    return efetch(`${baseUrl}/create/`, {
      method: 'POST',
      body: admin
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
    return efetch(`${baseUrl_2}/${id}`, {
      method: 'DELETE'
    });
  }

  async function deleteAllCustomers() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  return {
    fetchAdmin,
    createAdmin,
    login,
    logout
  };
}

export default makeAdminService();
