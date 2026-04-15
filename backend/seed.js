import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Product from './models/Product.js';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomRating = () => Number((Math.random() * 2 + 3).toFixed(1));

const baseProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Comfortable over-ear headphones with active noise cancellation and clear audio for work, travel, and daily music sessions.',
    price: 129.99,
    category: 'Electronics',
  },
  {
    name: '4K Smart TV 55 inch',
    description: 'Ultra HD television with vibrant color reproduction, built-in streaming apps, and smooth refresh rate for movies and gaming nights.',
    price: 699.99,
    category: 'Electronics',
  },
  {
    name: 'Laptop Gaming RGB Keyboard',
    description: 'Mechanical-feel keyboard with customizable RGB lighting, anti-ghosting keys, and durable switches designed for fast gameplay.',
    price: 89.99,
    category: 'Electronics',
  },
  {
    name: 'Smartphone Fast Charger',
    description: 'Compact fast charger with intelligent power delivery and overheat protection, ideal for quickly topping up modern smartphones.',
    price: 24.99,
    category: 'Electronics',
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank with dual USB outputs and safe charging circuitry for long trips, commuting, and emergency backup.',
    price: 54.99,
    category: 'Electronics',
  },
  {
    name: "Men's Cotton T-Shirt",
    description: 'Soft breathable cotton T-shirt with modern fit and reinforced stitching, suitable for casual wear and warm-weather comfort.',
    price: 19.99,
    category: 'Clothing',
  },
  {
    name: "Women's Denim Jeans",
    description: 'Classic mid-rise denim jeans with stretch comfort, durable fabric, and timeless style for daily outfits across seasons.',
    price: 49.99,
    category: 'Clothing',
  },
  {
    name: 'Unisex Hoodie',
    description: 'Fleece-lined hoodie featuring a relaxed silhouette, roomy pocket, and cozy interior for chilly evenings and streetwear looks.',
    price: 39.99,
    category: 'Clothing',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable upper mesh to support training sessions and long walks.',
    price: 79.99,
    category: 'Clothing',
  },
  {
    name: 'Winter Jacket',
    description: 'Insulated winter jacket with wind-resistant shell, adjustable hood, and practical pockets to stay warm during cold days.',
    price: 149.99,
    category: 'Clothing',
  },
  {
    name: 'JavaScript The Definitive Guide',
    description: 'Comprehensive programming reference that explains core JavaScript concepts, practical patterns, and modern language features clearly.',
    price: 44.99,
    category: 'Books',
  },
  {
    name: 'Clean Code by Robert Martin',
    description: 'Software craftsmanship classic with actionable principles for writing maintainable, readable, and testable code in teams.',
    price: 37.99,
    category: 'Books',
  },
  {
    name: 'The Pragmatic Programmer',
    description: 'Timeless development guide offering practical advice, career wisdom, and robust engineering habits for modern programmers.',
    price: 34.99,
    category: 'Books',
  },
  {
    name: 'Electric Coffee Maker',
    description: 'Programmable coffee machine with reusable filter and keep-warm plate, delivering rich flavor for your morning routine.',
    price: 89.99,
    category: 'Home',
  },
  {
    name: 'Air Purifier HEPA Filter',
    description: 'Quiet air purifier with true HEPA filtration that helps reduce dust, pollen, and odors in bedrooms or office spaces.',
    price: 159.99,
    category: 'Home',
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels and eye-care lighting mode for reading, studying, and remote work.',
    price: 29.99,
    category: 'Home',
  },
  {
    name: 'Non stick Cookware Set',
    description: 'Versatile cookware set with non-stick coating and heat-resistant handles, perfect for everyday home cooking tasks.',
    price: 199.99,
    category: 'Home',
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Thick premium yoga mat with non-slip texture and cushioned support for yoga, pilates, stretching, and bodyweight training.',
    price: 35.99,
    category: 'Sports',
  },
  {
    name: 'Adjustable Dumbbells Set',
    description: 'Space-saving dumbbell set with quick weight adjustment, sturdy grip, and balanced design for efficient home workouts.',
    price: 299.99,
    category: 'Sports',
  },
  {
    name: 'Resistance Bands Kit',
    description: 'Portable resistance band kit including multiple tension levels and accessories, ideal for strength, rehab, and mobility.',
    price: 27.99,
    category: 'Sports',
  },
];

const outOfStockProducts = new Set([
  '4K Smart TV 55 inch',
  'Winter Jacket',
  'Air Purifier HEPA Filter',
]);

const mapProductForInsert = (product) => {
  const stock = outOfStockProducts.has(product.name) ? 0 : randomInt(1, 100);

  return {
    ...product,
    images: [
      `https://placehold.co/400x400/png?text=${encodeURIComponent(product.name)}`,
    ],
    stock,
    rating: randomRating(),
    numReviews: randomInt(5, 200),
  };
};

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});

    const productsToInsert = baseProducts.map(mapProductForInsert);
    const insertedProducts = await Product.insertMany(productsToInsert);

    console.log(`✅ Seed completed: ${insertedProducts.length} products inserted`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
};

seedProducts();
