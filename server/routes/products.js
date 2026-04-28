import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import Product from '../models/Product.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product (Admin only)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, featured, specifications } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'saraswati_agro/products',
        resource_type: 'auto',
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Image upload failed' });
        }

        try {
          const product = new Product({
            name,
            description,
            category,
            price: parseFloat(price),
            featured: featured === 'true',
            specifications: specifications ? JSON.parse(specifications) : [],
            imageUrl: result.secure_url,
            imagePublicId: result.public_id,
          });

          const savedProduct = await product.save();
          res.status(201).json(savedProduct);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, featured, specifications } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price ? parseFloat(price) : product.price;
    product.featured = featured !== undefined ? featured === 'true' : product.featured;
    product.specifications = specifications ? JSON.parse(specifications) : product.specifications;

    if (req.file) {
      // Delete old image from Cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // Upload new image
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'saraswati_agro/products',
          resource_type: 'auto',
        },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: 'Image upload failed' });
          }

          product.imageUrl = result.secure_url;
          product.imagePublicId = result.public_id;

          const updatedProduct = await product.save();
          res.json(updatedProduct);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    } else {
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product (admin only)
router.post('/', auth, upload.single('image'), [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('category').notEmpty(),
  body('price').isNumeric(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const result = await cloudinary.uploader.upload_stream({ folder: 'products' }, async (error, result) => {
      if (error) return res.status(500).json({ message: 'Image upload failed' });

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: result.secure_url,
      });

      const newProduct = await product.save();
      res.status(201).json(newProduct);
    });

    req.file.stream.pipe(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product (admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    let updateData = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
        if (error) throw error;
        updateData.image = result.secure_url;
      });
      req.file.stream.pipe(result);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;