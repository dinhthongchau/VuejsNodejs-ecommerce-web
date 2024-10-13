const productsService = require('../services/product.service');
const customersService = require('../services/customer.service');
const cartsService = require('../services/cart.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');


async function createCart(req, res, next) {
  console.log("in ra dữ liệu:", req.body);

  const customer_id = Number(req.body.customer_id);
  const product_id = Number(req.body.product_id);
  const quantity = Number(req.body.quantity);

  
  if (!customer_id || isNaN(customer_id)) {
    return next(new ApiError(400, 'Customer ID should be a valid number'));
  }

  if (!product_id || isNaN(product_id)) {
    return next(new ApiError(400, 'Product ID should be a valid number'));
  }

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return next(new ApiError(400, 'Quantity should be a valid number greater than 0'));
  }

  try {
    const customerExists = await customersService.getCustomerById(customer_id);
    if (!customerExists) {
      return next(new ApiError(404, 'Customer not found'));
    }

    const productExists = await productsService.getProductById(product_id);
    if (!productExists) {
      return next(new ApiError(404, 'Product not found'));
    }

    const cart = await cartsService.createCart({
      customer_id: customer_id,
      product_id: product_id,
      quantity: quantity,
    });

    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${cart.cart_id}`,
      })
      .json(
        JSend.success({
          cart,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, 'An error occurred while creating the cart')
    );
  }
}



async function getCartsByFilter(req, res, next) {
    console.log("getCartsByFilter is called");
    
    let result = {
        metadata: {
        carts: [],
        totalRecords: 0,
        firstPage: 1,
        lastPage: 1,
        page: 1,
        limit: 5,
        }
    };
    try {
        result = await cartsService.getManyCarts(req.query);
        
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while retrieving carts'));
    }

    return res.json(
        JSend.success({
        carts: result.carts,
        metadata: result.metadata,
        })
    );
}

async function getCart(req, res, next) {
  const { cart_id } = req.params;

  try {
    const cart = await cartsService.getCartById(cart_id); // Gọi dịch vụ để lấy sản phẩm theo ID
    if (!cart) {
      return next(new ApiError(404, "Cart not found")); // Nếu không tìm thấy sản phẩm
    }
    return res.json(JSend.success({ cart })); // Trả về sản phẩm
  } catch (error) {
    console.error(error); // Ghi lại lỗi
    return next(new ApiError(500, `Error retrieving cart with cart_id=${cart_id}`)); // Trả về lỗi 500
  }
}

async function updateCart(req, res, next) {

    console.log(req.body);

    if (Object.keys(req.body).length === 0 && !req.file) {
      return next(new ApiError(400, 'Data to update cannot be empty'));
    }
  
    const { cart_id } = req.params; // Lấy ID sản phẩm từ params
    const { customer_id } = req.body; // Lấy customer_id từ body nếu có

    try {
        if (customer_id) {
            const customerExists = await customersService.getCustomerById(Number(customer_id));
        if (!customerExists) {
            return next(new ApiError(404, 'Customer not found')); // Trả về lỗi nếu không tìm thấy customer
        }
    }


   
      const updatedCart = await cartsService.updateCart(cart_id, {
        ...req.body, // Thêm dữ liệu từ body
      });
  
      if (!updatedCart) {
        return next(new ApiError(404, 'Cart not found')); 
      }
  
      return res.json(JSend.success({
        cart: updatedCart, 
      }));
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, `Error updating cart with cart_id=${cart_id}`)); 
    }
  }

  async function deleteCart(req, res, next) {
    const { cart_id } = req.params; 
  
    try {
      const deleted = await cartsService.deleteCart(cart_id); 
      if (!deleted) {
        return next(new ApiError(404, 'Cart not found')); 
      }
  
      return res.json(JSend.success()); 
    } catch (error) {
      console.log(error); 
      return next(new ApiError(500, `Could not delete cart with cart_id=${cart_id}`)); 
    }
  }

    async function deleteAllCarts(req, res, next) {
    try {
      await cartsService.deleteAllCart();
      return res.json(JSend.success());
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'An error occurred while removing all carts'));
    }
  }

module.exports = {
    createCart,
    getCartsByFilter,
    createCart,
    getCart,
    updateCart,
    deleteCart,
    deleteAllCarts
};
