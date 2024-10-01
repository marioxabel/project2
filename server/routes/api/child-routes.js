import express from 'express';
import Child from '../../models/child.js';

const router = express.Router();

// GET /childs - Get all childs
router.get('/', async (_req, res) => {
  try {
    const childs = await Child.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(childs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /childs/:id - Get a child by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const child = await Child.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (child) {
      res.json(child);
    } else {
      res.status(404).json({ message: 'Child not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET /childs/:id/parent - Get parent of a specific child
router.get('/:id/parent', async (req, res) => {
  const { id } = req.params;
  try {
      const child = await Child.findByPk(id);
      if (!child) {
          return res.status(404).json({ message: 'Child not found' });
      }
      
      // Get children of child
      const parent = await child.getParent(); // This method is automatically generated by Sequelize
      res.json(parent);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// POST /childs - Create a new child
router.post('/', async (req, res) => {
  const { first_name, last_name, email, password, parent_id } = req.body;
  try {
    const newChild = await Child.create({ first_name, last_name, email, password, parent_id });
    res.status(201).json(newChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /childs/:id - Update a child by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, password } = req.body;
  try {
    const child = await Child.findByPk(id);
    if (child) {
      child.first_name = first_name;
      child.last_name = last_name;
      child.password = password;
      await child.save();
      res.json(child);
    } else {
      res.status(404).json({ message: 'Child not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /childs/:id - Delete a child by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const child = await Child.findByPk(id);
    if (child) {
      await child.destroy();
      res.json({ message: 'Child deleted' });
    } else {
      res.status(404).json({ message: 'Child not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as childRouter };
