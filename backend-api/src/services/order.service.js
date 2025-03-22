const knex = require("../database/knex");
const Paginator = require("./paginator");

function orderRepository() {
  return knex("orders");
}

function readOrder(payload) {
  return {
    order_id: payload.order_id,
    customer_id: payload.customer_id,
    order_date: payload.order_date,
    order_total: payload.order_total,
    order_payment_method: payload.order_payment_method,
    order_status: payload.order_status,
    order_note: payload.order_note,
  };
}

async function createOrder(payload) {
  const order = readOrder(payload);
  const [order_id] = await orderRepository().insert(order);
  return { order_id, ...order };
}

async function getOrderById(order_id) {
  return orderRepository().where("order_id", order_id).select("*").first();
}

async function getManyOrders(query) {
  try {
    const {
      order_id,
      customer_id,
      order_date,
      order_payment_method,
      order_status,
      page = 1,
      limit = 5,
    } = query;
    const paginator = new Paginator(page, limit);

    let results = await orderRepository()
      .where((builder) => {
        if (order_id) {
          builder.where("order_id", order_id);
        }
        if (customer_id) {
          builder.where("customer_id", customer_id);
        }
        if (order_date) {
          builder.where("order_date", "like", `%${order_date}%`);
        }
        if (order_payment_method) {
          builder.where(
            "order_payment_method",
            "like",
            `%${order_payment_method}%`
          );
        }
        if (order_status) {
          builder.where("order_status", "like", `%${order_status}%`);
        }
      })
      .select(
        knex.raw("count(order_id) OVER() AS recordCount"),
        "order_id",
        "customer_id",
        "order_date",
        "order_total",
        "order_payment_method",
        "order_status",
        "order_note"
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
      orders: results,
    };
  } catch (error) {
    console.error("Error in getManyOrders:", error);
    //return null;
    throw new ApiError(500, "An error occurred while retrieving orders");
  }
}

async function updateOrder(order_id, payload) {
  const updatedOrder = await orderRepository()
    .where("order_id", order_id)
    .select("*")
    .first();

  if (!updatedOrder) {
    return null;
  }

  const update = readOrder(payload);

  await orderRepository().where("order_id", order_id).update(update);

  return { ...updatedOrder, ...update };
}

async function deleteOrder(order_id) {
  const deletedOrder = await orderRepository()
    .where("order_id", order_id)
    .first();

  if (!deletedOrder) {
    return null;
  }

  await orderRepository().where("order_id", order_id).del();

  return deletedOrder;
}

async function deleteAllOrder() {
  await orderRepository().del();
}

module.exports = {
  getOrderById,
  getManyOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteAllOrder,
};
