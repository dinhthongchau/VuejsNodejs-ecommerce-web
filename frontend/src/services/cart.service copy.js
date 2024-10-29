// cart.service.js
const cartService = {
  // Lấy giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng
  getCart() {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : []; // Nếu không có, trả về mảng rỗng
    console.log('Lấy giỏ hàng:', cart); // Kiểm tra giỏ hàng
    return cart; // Trả về giỏ hàng
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product) {
    const cart = this.getCart(); // Lấy giỏ hàng hiện tại
    const existingItem = cart.find((item) => item.id === product.id);

    // Nếu sản phẩm đã có trong giỏ hàng, chỉ cần tăng số lượng
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Nếu không có, thêm sản phẩm mới vào giỏ hàng
      product.quantity = 1; // Thiết lập số lượng ban đầu là 1
      cart.push(product); // Thêm sản phẩm vào giỏ hàng
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
    console.log('Giỏ hàng sau khi thêm:', cart); // Log giỏ hàng
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(id) {
    let cart = this.getCart(); // Lấy giỏ hàng hiện tại
    cart = cart.filter((item) => item.id !== id); // Xóa sản phẩm khỏi giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
    console.log('Giỏ hàng sau khi xóa:', cart); // Kiểm tra giỏ hàng
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateQuantity(item) {
    const cart = this.getCart(); // Lấy giỏ hàng hiện tại
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity = item.quantity; // Cập nhật số lượng
      localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
    }
  },

  async createCustomer(customerData) {
    const response = await fetch('/api/v1/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });

    if (!response.ok) {
      throw new Error('Failed to create customer');
    }

    return response.json();
  },

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
