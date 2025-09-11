const { v4: uuidv4 } = require('uuid');

class Snapshot {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.risk = data.risk; // 'high', 'medium', 'low'
    this.departments = data.departments || [];
    this.tags = data.tags || [];
    this.dueDate = data.dueDate;
    this.location = data.location || null;
    this.owner = data.owner;
    this.confidence = data.confidence;
    this.summary = data.summary;
    this.bilingualSummary = data.bilingualSummary || null;
    this.actionItems = data.actionItems || [];
    this.evidence = data.evidence || [];
    this.traceability = data.traceability || [];
    this.status = data.status || 'new'; // 'new', 'in-progress', 'completed'
    this.priority = data.priority || this.calculatePriority();
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.createdBy = data.createdBy || 'system';
    this.assignedTo = data.assignedTo || [];
  }

  calculatePriority() {
    const riskWeights = { high: 3, medium: 2, low: 1 };
    const baseScore = riskWeights[this.risk] || 1;
    
    // Increase priority for regulatory items
    const isRegulatory = this.tags.some(tag => 
      tag.toLowerCase().includes('regulatory') || 
      tag.toLowerCase().includes('cmrs') ||
      tag.toLowerCase().includes('mohua')
    );
    
    return isRegulatory ? baseScore + 1 : baseScore;
  }

  update(data) {
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date().toISOString();
    this.priority = this.calculatePriority();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      risk: this.risk,
      departments: this.departments,
      tags: this.tags,
      dueDate: this.dueDate,
      location: this.location,
      owner: this.owner,
      confidence: this.confidence,
      summary: this.summary,
      bilingualSummary: this.bilingualSummary,
      actionItems: this.actionItems,
      evidence: this.evidence,
      traceability: this.traceability,
      status: this.status,
      priority: this.priority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      assignedTo: this.assignedTo
    };
  }

  static validate(data) {
    const errors = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (!data.risk || !['high', 'medium', 'low'].includes(data.risk)) {
      errors.push('Risk must be one of: high, medium, low');
    }

    if (!data.departments || !Array.isArray(data.departments) || data.departments.length === 0) {
      errors.push('At least one department is required');
    }

    if (!data.dueDate) {
      errors.push('Due date is required');
    } else {
      const dueDate = new Date(data.dueDate);
      if (isNaN(dueDate.getTime())) {
        errors.push('Due date must be a valid date');
      }
    }

    if (!data.owner || data.owner.trim().length === 0) {
      errors.push('Owner is required');
    }

    if (!data.summary || data.summary.trim().length === 0) {
      errors.push('Summary is required');
    }

    return errors;
  }
}

module.exports = Snapshot;