const productsService = require('../services/product.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');



async function createProduct(req, res, next) {
  try {
    // Validate required fields
    if (!req.body?.product_name) {
      return next(new ApiError(400, "Product name is required"));
    }

    // Convert price to number if provided
    if (req.body.product_price) {
      req.body.product_price = Number(req.body.product_price);
      if (isNaN(req.body.product_price)) {
        return next(new ApiError(400, "Invalid product price"));
      }
    }

    // Process uploaded files
    let product_image = [];
    if (req.files && req.files.length > 0) {
      product_image = req.files.map(
        (file) => `/public/uploads/${file.filename}`
      );
    }

    // Create product object
    const productData = {
      ...req.body,
      product_image: JSON.stringify(product_image), // Store as JSON string
    };

    const product = await productsService.createProduct(productData);

    return res
      .status(201)
      .set({ Location: `${req.baseUrl}/${product.product_id}` })
      .json(JSend.success({ product }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while creating the product")
    );
  }
}







async function getProductsByFilter(req, res, next) {
  let result = {
    metadata: {
    products: [],
    totalRecords: 0,
    firstPage: 1,
    lastPage: 1,
    page: 1,
    limit: 5,
    }
  };
  try {
    result = await productsService.getManyProducts(req.query);
    
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'An error occurred while retrieving products'));
  }

   return res.json(
    JSend.success({
      products: result.products,
      metadata: result.metadata,
    })
  );
}
  
async function getProduct(req, res, next) {
  const { product_id } = req.params;

  try {
    const product = await productsService.getProductById(product_id); 
    if (!product) {
      return next(new ApiError(404, "Product not found")); 
    }
    return res.json(JSend.success({ product })); 
  } catch (error) {
    console.error(error); 
    return next(new ApiError(500, `Error retrieving product with product_id=${product_id}`)); // Trả về lỗi 500
  }
}

  
async function updateProduct(req, res, next) {
  try {
    const { product_id } = req.params;

    if (
      Object.keys(req.body).length === 0 &&
      (!req.files || req.files.length === 0)
    ) {
      return next(new ApiError(400, "No data provided for update"));
    }

    // Get current product
    const currentProduct = await productsService.getProductById(product_id);
    if (!currentProduct) {
      return next(new ApiError(404, "Product not found"));
    }

    // Process uploaded files
    let product_image;
    if (req.files && req.files.length > 0) {
      // New files uploaded - replace old images
      product_image = JSON.stringify(
        req.files.map((file) => `/public/uploads/${file.filename}`)
      );
    }

    // Convert price to number if provided
    if (req.body.product_price) {
      req.body.product_price = Number(req.body.product_price);
      if (isNaN(req.body.product_price)) {
        return next(new ApiError(400, "Invalid product price"));
      }
    }

    // Update product data
    const updateData = {
      ...req.body,
    };

    // Only include product_image if new files were uploaded
    if (product_image) {
      updateData.product_image = product_image;
    }

    const updatedProduct = await productsService.updateProduct(
      product_id,
      updateData
    );

    return res.json(JSend.success({ product: updatedProduct }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, `Error updating product with id=${product_id}`)
    );
  }
}
  

  async function deleteProduct(req, res, next) {
    const { product_id } = req.params; 
  
    try {
      const deleted = await productsService.deleteProduct(product_id); 
  
      if (!deleted) {
        return next(new ApiError(404, 'Product not found')); 
      }
  
      return res.json(JSend.success()); 
    } catch (error) {
      console.log(error); 
      return next(new ApiError(500, `Could not delete product with product_id=${product_id}`)); 
    }
  }
  

 
  async function deleteAllProduct(req, res, next) {
    try {
      await productsService.deleteAllProduct();
      return res.json(JSend.success());
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, 'An error occurred while removing all products'));
    }
  }
  
module.exports = {
    createProduct,
    getProductsByFilter,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProduct,
  };
  