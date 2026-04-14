import Order from '../models/Order.js';

const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required.' });
    }

    if (total === undefined || total === null) {
      return res.status(400).json({ message: 'Order total is required.' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required.' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      shippingAddress,
      paymentMethod,
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating order.' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user orders.' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(401).json({ message: 'Not authorized to view this order.' });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order.' });
  }
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
};
