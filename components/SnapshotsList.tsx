import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

interface Snapshot {
  id: string;
  title: string;
  description: string;
  risk: "high" | "medium" | "low";
  departments: string[];
  tags: string[];
  dueDate: string;
  location?: string;
}

const snapshots: Snapshot[] = [
  {
    id: "1",
    title: "CMRS Safety Directive - Emergency Braking System Check",
    description: "Commissioner Metro Rail Safety mandates immediate inspection of emergency braking systems across all rolling stock. Compliance deadline: 72 hours.",
    risk: "high",
    departments: ["Operations", "Rolling Stock", "Safety"],
    tags: ["Regulatory", "CMRS", "Emergency"],
    dueDate: "9/11/2025",
    location: "All Depots"
  },
  {
    id: "2",
    title: "Spare Parts Procurement - Traction Motor Components",
    description: "Engineering flagged design change for Series 4 trains. Procurement team unaware, continuing with old specifications.",
    risk: "high", 
    departments: ["Procurement", "Engineering", "Rolling Stock"],
    tags: ["Procurement", "Design Change", "Coordination"],
    dueDate: "9/15/2025"
  },
  {
    id: "3",
    title: "Night Maintenance Window - Track Possession Request",
    description: "Civil Engineering requests 4-hour possession for rail grinding. Operations needs revised timetable and passenger communication.",
    risk: "medium",
    departments: ["Civil Engineering", "Operations", "Commercial"],
    tags: ["Maintenance", "Possession", "Passenger Impact"],
    dueDate: "9/12/2025",
    location: "Aluva-Palarivattom"
  },
  {
    id: "4", 
    title: "MoHUA Environmental Compliance Report",
    description: "Ministry directive on noise pollution monitoring. Multiple departments need coordinated response for upcoming audit.",
    risk: "medium",
    departments: ["Environment", "Operations", "Legal"],
    tags: ["MoHUA", "Environmental", "Audit"],
    dueDate: "9/20/2025"
  },
  {
    id: "5",
    title: "IoT Sensor Data - Bearing Temperature Alert",
    description: "UNS data stream indicates elevated bearing temperatures on Car 4023. Immediate inspection required before next service.",
    risk: "high",
    departments: ["IoT/Data", "Rolling Stock", "Operations"],
    tags: ["IoT", "Predictive", "Safety"],
    dueDate: "9/10/2025",
    location: "Car 4023"
  },
  {
    id: "6",
    title: "HR Training Schedule Conflict Resolution",
    description: "Safety refresher training scheduled during peak operations. Station Controllers unavailable, affecting passenger service.",
    risk: "medium",
    departments: ["HR", "Operations", "Safety"],
    tags: ["Training", "Scheduling", "Service Impact"],
    dueDate: "9/14/2025"
  },
  {
    id: "7",
    title: "Vendor Invoice Dispute - Platform Door Maintenance",
    description: "Finance flagged invoice discrepancy. Engineering verification needed to confirm work completion before payment approval.",
    risk: "low",
    departments: ["Finance", "Engineering", "Procurement"],
    tags: ["Invoice", "Verification", "Platform Doors"],
    dueDate: "9/18/2025"
  },
  {
    id: "8",
    title: "Knowledge Transfer - Retiring Chief Engineer Documentation",
    description: "Senior engineer retiring next month. Critical design decisions and vendor relationships need documentation for knowledge preservation.",
    risk: "medium",
    departments: ["Engineering", "HR", "Knowledge Management"],
    tags: ["Knowledge Transfer", "Retirement", "Documentation"],
    dueDate: "9/30/2025"
  },
  {
    id: "9",
    title: "Finance - Vendor Payment Approval Backlog",
    description: "Multiple contractor invoices pending approval. Cash flow impact and vendor relationship concerns.",
    risk: "medium",
    departments: ["Finance", "Procurement"],
    tags: ["Payment", "Cash Flow", "Vendor Relations"],
    dueDate: "9/16/2025"
  },
  {
    id: "10",
    title: "HR - Critical Skills Gap Assessment",
    description: "Analysis shows shortage of certified S&T technicians. Recruitment and training program needed urgently.",
    risk: "high",
    departments: ["HR", "S&T"],
    tags: ["Skills Gap", "Recruitment", "Training"],
    dueDate: "9/25/2025"
  }
];

interface SnapshotsListProps {
  selectedSnapshot: string | null;
  onSelectSnapshot: (id: string) => void;
  selectedDepartment: string;
}

const SnapshotsList = ({ selectedSnapshot, onSelectSnapshot, selectedDepartment }: SnapshotsListProps) => {
  // Map department keys to department names for filtering
  const departmentMap: { [key: string]: string[] } = {
    "operations": ["Operations", "Commercial"],
    "rolling-stock": ["Rolling Stock", "IoT/Data"],
    "civil-engineering": ["Civil Engineering", "Engineering"],
    "s&t": ["S&T"],
    "safety": ["Safety"],
    "procurement": ["Procurement"],
    "hr": ["HR", "Knowledge Management"],
    "finance": ["Finance"],
    "legal": ["Legal", "Environment"],
    "environment": ["Environment"],
    "iot-data": ["IoT/Data"]
  };

  // Filter snapshots based on selected department
  const filteredSnapshots = snapshots.filter(snapshot => {
    const relevantDepts = departmentMap[selectedDepartment] || [];
    return relevantDepts.some(dept => 
      snapshot.departments.some(snapshotDept => 
        snapshotDept.toLowerCase().includes(dept.toLowerCase()) || 
        dept.toLowerCase().includes(snapshotDept.toLowerCase())
      )
    );
  });

  // Auto-select first snapshot when available and none selected
  React.useEffect(() => {
    if (filteredSnapshots.length > 0 && !selectedSnapshot) {
      onSelectSnapshot(filteredSnapshots[0].id);
    }
  }, [filteredSnapshots, selectedSnapshot, onSelectSnapshot]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="w-96 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Incoming Snapshots</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {selectedDepartment === "operations" && "Operations Control & Commercial"}
          {selectedDepartment === "rolling-stock" && "Rolling Stock & IoT Data"}
          {selectedDepartment === "civil-engineering" && "Civil Engineering"}
          {selectedDepartment === "s&t" && "Signals & Telecommunications"}
          {selectedDepartment === "safety" && "Safety Department"}
          {selectedDepartment === "procurement" && "Procurement"}
          {selectedDepartment === "hr" && "Human Resources"}
          {selectedDepartment === "finance" && "Finance"}
          {selectedDepartment === "legal" && "Legal & Compliance"}
          {selectedDepartment === "environment" && "Environment"}
          {selectedDepartment === "iot-data" && "IoT & Data Analytics"}
        </p>
      </div>
      
      {filteredSnapshots.length === 0 ? (
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Active Snapshots</h3>
          <p className="text-muted-foreground text-sm">
            No incoming snapshots require attention from your department at this time.
          </p>
        </div>
      ) : (
        <div className="space-y-2 p-2">
        {filteredSnapshots.map((snapshot) => (
          <div
            key={snapshot.id}
            onClick={() => onSelectSnapshot(snapshot.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedSnapshot === snapshot.id ? "bg-muted border-primary" : "bg-card border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className={`w-4 h-4 ${
                  snapshot.risk === "high" ? "text-destructive" : 
                  snapshot.risk === "medium" ? "text-warning" : "text-success"
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getRiskColor(snapshot.risk)} text-xs`}>
                    {snapshot.risk}
                  </Badge>
                  {snapshot.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {snapshot.location}
                    </div>
                  )}
                </div>
                
                <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                  {snapshot.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {snapshot.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {snapshot.departments.map((dept) => (
                    <Badge key={dept} variant="outline" className="text-xs">
                      {dept}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {snapshot.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Due {snapshot.dueDate}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default SnapshotsList;