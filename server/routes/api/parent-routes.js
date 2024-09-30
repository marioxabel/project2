import express from 'express';
import Parent from '../../models/parent.js';

const router = express.Router();

// GET /parents - Get all parents
router.get('/', async (_req, res) => {
  try {
    const parents = await Parent.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /parents/:id - Get a parent by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parent.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (parent) {
      res.json(parent);
    } else {
      res.status(404).json({ message: 'Parent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /parents - Create a new parent
router.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const newParent = await Parent.create({ first_name, last_name, email, password });
    res.status(201).json(newParent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /parents/:id - Update a parent by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, password } = req.body;
  try {
    const parent = await Parent.findByPk(id);
    if (parent) {
      parent.first_name = first_name;
      parent.last_name = last_name;
      parent.password = password;
      await parent.save();
      res.json(parent);
    } else {
      res.status(404).json({ message: 'Parent not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /parents/:id - Delete a parent by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parent.findByPk(id);
    if (parent) {
      await parent.destroy();
      res.json({ message: 'Parent deleted' });
    } else {
      res.status(404).json({ message: 'Parent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as parentRouter };
