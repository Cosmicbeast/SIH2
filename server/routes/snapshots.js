const express = require('express');
const Joi = require('joi');
const Snapshot = require('../models/Snapshot');
const snapshotStore = require('../data/snapshotStore');

const router = express.Router();

// Validation schemas
const createSnapshotSchema = Joi.object({
  title: Joi.string().required().min(1).max(500),
  description: Joi.string().required().min(1).max(2000),
  risk: Joi.string().valid('high', 'medium', 'low').required(),
  departments: Joi.array().items(Joi.string()).min(1).required(),
  tags: Joi.array().items(Joi.string()).default([]),
  dueDate: Joi.date().iso().required(),
  location: Joi.string().allow('', null),
  owner: Joi.string().required().min(1).max(200),
  confidence: Joi.string().required().min(1).max(200),
  summary: Joi.string().required().min(1).max(1000),
  bilingualSummary: Joi.string().allow('', null).max(1000),
  actionItems: Joi.array().items(Joi.object({
    responsible: Joi.string().required(),
    task: Joi.string().required(),
    deadline: Joi.string().required()
  })).default([]),
  evidence: Joi.array().items(Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    viewable: Joi.boolean().default(true)
  })).default([]),
  traceability: Joi.array().items(Joi.object({
    source: Joi.string().required(),
    reference: Joi.string().required(),
    timestamp: Joi.string().required()
  })).default([]),
  status: Joi.string().valid('new', 'in-progress', 'completed').default('new'),
  createdBy: Joi.string().default('system'),
  assignedTo: Joi.array().items(Joi.string()).default([])
});

const updateSnapshotSchema = createSnapshotSchema.fork(
  ['title', 'description', 'risk', 'departments', 'dueDate', 'owner', 'confidence', 'summary'],
  (schema) => schema.optional()
);

// GET /api/v1/snapshots - Get all snapshots with optional filtering
router.get('/', (req, res) => {
  try {
    const filters = {
      department: req.query.department,
      risk: req.query.risk,
      status: req.query.status,
      search: req.query.search
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const snapshots = snapshotStore.findAll(filters);
    
    res.json({
      success: true,
      data: snapshots.map(snapshot => snapshot.toJSON()),
      count: snapshots.length,
      filters: filters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve snapshots',
      message: error.message
    });
  }
});

// GET /api/v1/snapshots/stats - Get snapshot statistics
router.get('/stats', (req, res) => {
  try {
    const stats = snapshotStore.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve statistics',
      message: error.message
    });
  }
});

// GET /api/v1/snapshots/:id - Get a specific snapshot
router.get('/:id', (req, res) => {
  try {
    const snapshot = snapshotStore.findById(req.params.id);
    
    if (!snapshot) {
      return res.status(404).json({
        success: false,
        error: 'Snapshot not found',
        message: `No snapshot found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      data: snapshot.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve snapshot',
      message: error.message
    });
  }
});

// POST /api/v1/snapshots - Create a new snapshot
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = createSnapshotSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: error.details[0].message,
        details: error.details
      });
    }

    // Additional model-level validation
    const validationErrors = Snapshot.validate(value);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid snapshot data',
        details: validationErrors
      });
    }

    // Create snapshot
    const snapshot = snapshotStore.create(value);

    res.status(201).json({
      success: true,
      message: 'Snapshot created successfully',
      data: snapshot.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create snapshot',
      message: error.message
    });
  }
});

// PUT /api/v1/snapshots/:id - Update a snapshot
router.put('/:id', (req, res) => {
  try {
    // Validate request body
    const { error, value } = updateSnapshotSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: error.details[0].message,
        details: error.details
      });
    }

    // Update snapshot
    const snapshot = snapshotStore.update(req.params.id, value);
    
    if (!snapshot) {
      return res.status(404).json({
        success: false,
        error: 'Snapshot not found',
        message: `No snapshot found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      message: 'Snapshot updated successfully',
      data: snapshot.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update snapshot',
      message: error.message
    });
  }
});

// DELETE /api/v1/snapshots/:id - Delete a snapshot
router.delete('/:id', (req, res) => {
  try {
    const deleted = snapshotStore.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Snapshot not found',
        message: `No snapshot found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      message: 'Snapshot deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete snapshot',
      message: error.message
    });
  }
});

// PATCH /api/v1/snapshots/:id/status - Update snapshot status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['new', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
        message: 'Status must be one of: new, in-progress, completed'
      });
    }

    const snapshot = snapshotStore.update(req.params.id, { status });
    
    if (!snapshot) {
      return res.status(404).json({
        success: false,
        error: 'Snapshot not found',
        message: `No snapshot found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      message: 'Snapshot status updated successfully',
      data: snapshot.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update snapshot status',
      message: error.message
    });
  }
});

module.exports = router;