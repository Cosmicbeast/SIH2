const express = require('express');
const router = express.Router();

// Department configuration
const departments = [
  {
    id: 'operations',
    name: 'Operations Control',
    description: 'Train operations, scheduling, and passenger services',
    head: 'Chief Operations Manager',
    contact: 'operations@kmrl.co.in'
  },
  {
    id: 'rolling-stock',
    name: 'Rolling Stock',
    description: 'Train maintenance, fleet management, and technical services',
    head: 'Chief Rolling Stock Engineer',
    contact: 'rollingstock@kmrl.co.in'
  },
  {
    id: 'civil-engineering',
    name: 'Civil Engineering',
    description: 'Infrastructure maintenance, track work, and civil structures',
    head: 'Chief Civil Engineer',
    contact: 'civil@kmrl.co.in'
  },
  {
    id: 's&t',
    name: 'S&T (Signals & Telecom)',
    description: 'Signaling systems, telecommunications, and automation',
    head: 'Chief Signal & Telecom Engineer',
    contact: 'signaltelecom@kmrl.co.in'
  },
  {
    id: 'safety',
    name: 'Safety Department',
    description: 'Safety protocols, compliance, and risk management',
    head: 'Chief Safety Officer',
    contact: 'safety@kmrl.co.in'
  },
  {
    id: 'procurement',
    name: 'Procurement',
    description: 'Vendor management, purchasing, and contract administration',
    head: 'Chief Procurement Officer',
    contact: 'procurement@kmrl.co.in'
  },
  {
    id: 'hr',
    name: 'Human Resources',
    description: 'Staff management, training, and organizational development',
    head: 'Chief Human Resources Officer',
    contact: 'hr@kmrl.co.in'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial management, budgeting, and accounting',
    head: 'Chief Financial Officer',
    contact: 'finance@kmrl.co.in'
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'Legal affairs, regulatory compliance, and governance',
    head: 'Chief Legal Officer',
    contact: 'legal@kmrl.co.in'
  },
  {
    id: 'environment',
    name: 'Environment',
    description: 'Environmental compliance, sustainability, and green initiatives',
    head: 'Chief Environmental Officer',
    contact: 'environment@kmrl.co.in'
  },
  {
    id: 'iot-data',
    name: 'IoT & Data Analytics',
    description: 'Data management, IoT systems, and predictive analytics',
    head: 'Chief Technology Officer',
    contact: 'technology@kmrl.co.in'
  }
];

// GET /api/v1/departments - Get all departments
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: departments,
      count: departments.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve departments',
      message: error.message
    });
  }
});

// GET /api/v1/departments/:id - Get a specific department
router.get('/:id', (req, res) => {
  try {
    const department = departments.find(dept => dept.id === req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
        message: `No department found with ID: ${req.params.id}`
      });
    }

    res.json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve department',
      message: error.message
    });
  }
});

module.exports = router;