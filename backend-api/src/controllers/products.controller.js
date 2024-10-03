function createProduct(req, res) {
    return res.status(201).json({ product: {} });
  }
  function getProductsByFilter(req, res) {
    const filters = [];
    const { id, name, brand, category, status, min_price, max_price } = req.query;
  
    if (id) {
      filters.push(`id=${id}`);
    }
    if (name) {
      filters.push(`name=${name}`);
    }
    if (brand) {
      filters.push(`brand=${brand}`);
    }
    if (category) {
      filters.push(`category=${category}`);
    }
    if (status) {
      filters.push(`status=${status}`);
    }
    if (min_price !== undefined && max_price !== undefined) {
      filters.push(`price >= ${min_price} AND price <= ${max_price}`);
    } else if (min_price !== undefined) {
      filters.push(`price >= ${min_price}`);
    } else if (max_price !== undefined) {
      filters.push(`price <= ${max_price}`);
    }
  
    return res.json({ products: [] });
  }
  
  function getProduct(req, res) {
    return res.json({ product: {} });
  }
  function updateProduct(req, res) {
    return res.json({ product: {} });
  }
  function deleteProduct(req, res) {
    return res.json({
      message: "Product deleted",
    });
  }

  function deleteAllProduct(req, res) {
    return res.json({
      message: "All Products deleted",
    });
  }

  
module.exports = {
    createProduct,
    getProductsByFilter,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProduct,
  };
  