const Snapshot = require('../models/Snapshot');

// In-memory storage (replace with database in production)
class SnapshotStore {
  constructor() {
    this.snapshots = new Map();
    this.initializeDefaultData();
  }

  initializeDefaultData() {
    const defaultSnapshots = [
      {
        id: "1",
        title: "CMRS Safety Directive - Emergency Braking System Check",
        description: "Commissioner Metro Rail Safety mandates immediate inspection of emergency braking systems across all rolling stock. Compliance deadline: 72 hours.",
        risk: "high",
        departments: ["Operations", "Rolling Stock", "Safety"],
        tags: ["Regulatory", "CMRS", "Emergency"],
        dueDate: "2025-09-11",
        location: "All Depots",
        owner: "Chief Safety Officer",
        confidence: "Regulatory Mandate",
        summary: "Commissioner Metro Rail Safety requires immediate inspection of emergency braking systems across all rolling stock within 72 hours. Affects train availability and maintenance schedules.",
        bilingualSummary: "[ML] കമ്മിഷണർ മെട്രോ റെയിൽ സേഫ്റ്റി 72 മണിക്കൂറിനുള്ളിൽ എമർജൻസി ബ്രേക്കിംഗ് സിസ്റ്റം പരിശോധന ആവശ്യപ്പെടുന്നു.",
        actionItems: [
          {
            responsible: "Rolling Stock Superintendent",
            task: "Schedule emergency brake inspections for all 25 trainsets",
            deadline: "by 9/11/2025 18:00"
          },
          {
            responsible: "Operations Controller",
            task: "Prepare revised service schedule with reduced fleet availability",
            deadline: "by 9/11/2025 12:00"
          }
        ],
        evidence: [
          {
            type: "pdf",
            name: "CMRS Directive 2025/092",
            viewable: true
          }
        ],
        traceability: [
          {
            source: "CMRS Official Communication",
            reference: "Ref: CMRS/KOC/2025/092",
            timestamp: "9/10/2025, 08:30:15 AM"
          }
        ]
      },
      {
        id: "2",
        title: "Spare Parts Procurement - Traction Motor Components",
        description: "Engineering flagged design change for Series 4 trains. Procurement team unaware, continuing with old specifications.",
        risk: "high",
        departments: ["Procurement", "Engineering", "Rolling Stock"],
        tags: ["Procurement", "Design Change", "Coordination"],
        dueDate: "2025-09-15",
        owner: "Chief Procurement Officer",
        confidence: "Engineering Verified",
        summary: "Engineering identified critical design change for Series 4 traction motors. Procurement continuing with obsolete specifications. Immediate coordination required to prevent ₹2.3Cr inventory loss.",
        bilingualSummary: "[ML] സീരീസ് 4 ട്രാക്ഷൻ മോട്ടോറുകൾക്കായി എഞ്ചിനീയറിംഗ് ഡിസൈൻ മാറ്റം കണ്ടെത്തി. പ്രൊക്യൂർമെന്റ് പഴയ സ്പെസിഫിക്കേഷൻ തുടരുന്നു.",
        actionItems: [
          {
            responsible: "Chief Engineer - Rolling Stock",
            task: "Share updated technical specifications with Procurement immediately",
            deadline: "by 9/11/2025"
          }
        ],
        evidence: [
          {
            type: "technical",
            name: "Design Change Notice DCN-2025-034",
            viewable: true
          }
        ],
        traceability: [
          {
            source: "Engineering Change Management System",
            reference: "DCN-2025-034",
            timestamp: "9/08/2025, 14:22:18 PM"
          }
        ]
      }
    ];

    defaultSnapshots.forEach(data => {
      const snapshot = new Snapshot(data);
      this.snapshots.set(snapshot.id, snapshot);
    });
  }

  create(data) {
    const snapshot = new Snapshot(data);
    this.snapshots.set(snapshot.id, snapshot);
    return snapshot;
  }

  findById(id) {
    return this.snapshots.get(id) || null;
  }

  findAll(filters = {}) {
    let results = Array.from(this.snapshots.values());

    // Apply filters
    if (filters.department) {
      results = results.filter(snapshot => 
        snapshot.departments.some(dept => 
          dept.toLowerCase().includes(filters.department.toLowerCase())
        )
      );
    }

    if (filters.risk) {
      results = results.filter(snapshot => snapshot.risk === filters.risk);
    }

    if (filters.status) {
      results = results.filter(snapshot => snapshot.status === filters.status);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(snapshot => 
        snapshot.title.toLowerCase().includes(searchTerm) ||
        snapshot.description.toLowerCase().includes(searchTerm) ||
        snapshot.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by priority (high to low) and then by creation date (newest first)
    results.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return results;
  }

  update(id, data) {
    const snapshot = this.snapshots.get(id);
    if (!snapshot) {
      return null;
    }

    snapshot.update(data);
    return snapshot;
  }

  delete(id) {
    return this.snapshots.delete(id);
  }

  getStats() {
    const snapshots = Array.from(this.snapshots.values());
    
    return {
      total: snapshots.length,
      byRisk: {
        high: snapshots.filter(s => s.risk === 'high').length,
        medium: snapshots.filter(s => s.risk === 'medium').length,
        low: snapshots.filter(s => s.risk === 'low').length
      },
      byStatus: {
        new: snapshots.filter(s => s.status === 'new').length,
        inProgress: snapshots.filter(s => s.status === 'in-progress').length,
        completed: snapshots.filter(s => s.status === 'completed').length
      },
      byDepartment: this.getDepartmentStats(snapshots)
    };
  }

  getDepartmentStats(snapshots) {
    const deptStats = {};
    snapshots.forEach(snapshot => {
      snapshot.departments.forEach(dept => {
        deptStats[dept] = (deptStats[dept] || 0) + 1;
      });
    });
    return deptStats;
  }
}

module.exports = new SnapshotStore();