// cart.service.js
const cartService = {
  

  async createOrder(orderData) {
    const response = await fetch('/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return response.json();
  }
};

export default cartService;
