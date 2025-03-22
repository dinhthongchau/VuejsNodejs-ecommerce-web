const knex = require('../database/knex');
const Paginator = require('./paginator');

function cartRepository() {
    return knex('cart');
}

function readCart(payload) {
    return {
        cart_id: payload.cart_id,
        customer_id: payload.customer_id,
        product_id: payload.product_id,
        quantity: payload.quantity
    }
}

async function createCart(payload) {
  const cart = readCart(payload); // Gọi hàm readCart để lấy dữ liệu sản phẩm
  const [cart_id] = await cartRepository().insert(cart); // Chèn sản phẩm vào cơ sở dữ liệu và lấy ID
  return { cart_id, ...cart }; // Trả về ID cùng với thông tin sản phẩm
}

async function getCartById(cart_id) {
  return cartRepository().where('cart_id', cart_id).select('*').first();
}

async function getManyCarts(query) {
  try {
    const { cart_id, customer_id, product_id, quantity, page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);

    let results = await cartRepository()
      .where((builder) => {
        if (cart_id) {
          builder.where('cart_id', cart_id);
        }
        if (customer_id) {
          builder.where('customer_id', customer_id);
        }
        if (product_id) {
          builder.where('product_id', 'like', `%${product_id}%`);
        }
        if (quantity) {
          builder.where('quantity', 'like', `%${quantity}%`);
        }
      })
      .select(
        knex.raw('count(cart_id) OVER() AS recordCount'),
        'cart_id',
        'customer_id',
        'product_id',
        'quantity'
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
      carts: results,
    };
  } catch (error) {
    console.error('Error in getManyCarts:', error);
    
    throw new ApiError(500, 'An error occurred while retrieving carts');
  }
}


async function updateCart(cart_id, payload) {
  const updatedCart = await cartRepository()
    .where("cart_id", cart_id)
    .select("*")
    .first();

  if (!updatedCart) {
    return null; 
  }

  const update = readCart(payload); 


  await cartRepository().where("cart_id", cart_id).update(update);

  return { ...updatedCart, ...update }; 
}


async function deleteCart(cart_id) {
  const deletedCart = await cartRepository()
    .where('cart_id', cart_id)
    .first();
    
  if (!deletedCart) {
    return null; 
  }

  await cartRepository().where('cart_id', cart_id).del();


  return deletedCart; 
}

async function deleteAllCart() {
  
  await cartRepository().del();
}

module.exports = {
    getCartById,
    getManyCarts,
    createCart,
    updateCart,
    deleteCart,
    deleteAllCart
};