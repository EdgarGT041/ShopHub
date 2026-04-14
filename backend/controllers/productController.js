import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const perPage = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (currentPage - 1) * perPage;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    const totalPages = total > 0 ? Math.ceil(total / perPage) : 1;

    return res.status(200).json({
      products,
      totalPages,
      currentPage,
      total,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products.' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product.' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock, rating, numReviews } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ message: 'name, description, price and category are required.' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
      stock,
      rating,
      numReviews,
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const allowedFields = [
      'name',
      'description',
      'price',
      'category',
      'images',
      'stock',
      'rating',
      'numReviews',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await product.deleteOne();
    return res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product.' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
