import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Calendar,
  CheckCircle,
  UserPlus,
  FileText,
  Eye,
  ExternalLink,
  Globe
} from "lucide-react";

interface SnapshotDetailProps {
  snapshotId: string | null;
}

const SnapshotDetail = ({ snapshotId }: SnapshotDetailProps) => {
  if (!snapshotId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Snapshot</h3>
          <p className="text-muted-foreground">Choose a snapshot from the list to view details</p>
        </div>
      </div>
    );
  }

  // Dynamic data based on selected snapshot
  const getSnapshotData = (id: string) => {
    const baseData = {
      "1": {
        title: "CMRS Safety Directive - Emergency Braking System Check (All Depots)",
        risk: "high",
        owner: "Chief Safety Officer",
        dueDate: "9/11/2025",
        departments: ["Operations", "Rolling Stock", "Safety"],
        tags: ["Regulatory", "CMRS", "Emergency"],
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
          },
          {
            responsible: "Safety Officer",
            task: "Submit compliance report to CMRS with inspection certificates",
            deadline: "by 9/12/2025"
          }
        ],
        evidence: [
          {
            type: "pdf",
            name: "CMRS Directive 2025/092",
            viewable: true
          },
          {
            type: "email", 
            name: "Safety Department Circular",
            viewable: true
          },
          {
            type: "checklist",
            name: "Emergency Brake Inspection Protocol",
            viewable: true
          }
        ],
        traceability: [
          {
            source: "CMRS Official Communication",
            reference: "Ref: CMRS/KOC/2025/092",
            timestamp: "9/10/2025, 08:30:15 AM"
          },
          {
            source: "Internal Safety Alert System",
            reference: "Alert ID: SA-2025-045",
            timestamp: "9/10/2025, 09:15:22 AM"
          }
        ]
      },
      "2": {
        title: "Spare Parts Procurement - Traction Motor Components (Design Change Alert)",
        risk: "high",
        owner: "Chief Procurement Officer",
        dueDate: "9/15/2025",
        departments: ["Procurement", "Engineering", "Rolling Stock"],
        tags: ["Procurement", "Design Change", "Coordination"],
        confidence: "Engineering Verified",
        summary: "Engineering identified critical design change for Series 4 traction motors. Procurement continuing with obsolete specifications. Immediate coordination required to prevent ₹2.3Cr inventory loss.",
        bilingualSummary: "[ML] സീരീസ് 4 ട്രാക്ഷൻ മോട്ടോറുകൾക്കായി എഞ്ചിനീയറിംഗ് ഡിസൈൻ മാറ്റം കണ്ടെത്തി. പ്രൊക്യൂർമെന്റ് പഴയ സ്പെസിഫിക്കേഷൻ തുടരുന്നു.",
        actionItems: [
          {
            responsible: "Chief Engineer - Rolling Stock",
            task: "Share updated technical specifications with Procurement immediately",
            deadline: "by 9/11/2025"
          },
          {
            responsible: "Procurement Manager",
            task: "Halt current RFQ process and revise technical requirements",
            deadline: "by 9/12/2025"
          },
          {
            responsible: "Stores Officer",
            task: "Assess impact on existing inventory and warranty implications",
            deadline: "by 9/13/2025"
          }
        ],
        evidence: [
          {
            type: "technical",
            name: "Design Change Notice DCN-2025-034",
            viewable: true
          },
          {
            type: "procurement",
            name: "Active RFQ Document",
            viewable: true
          }
        ],
        traceability: [
          {
            source: "Engineering Change Management System",
            reference: "DCN-2025-034",
            timestamp: "9/08/2025, 14:22:18 PM"
          },
          {
            source: "Procurement Portal",
            reference: "RFQ/KMRL/2025/087",
            timestamp: "9/09/2025, 10:45:33 AM"
          }
        ]
      }
    };
    
    return baseData[id as keyof typeof baseData] || baseData["1"];
  };

  const snapshotData = getSnapshotData(snapshotId);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-destructive text-destructive-foreground">New</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              EN ⇄ ML
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            {snapshotData.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Risk</div>
              <Badge className="bg-destructive text-destructive-foreground">
                <AlertTriangle className="w-3 h-3 mr-1" />
                High
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Owner</div>
              <div className="text-sm font-medium">{snapshotData.owner}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Due</div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-3 h-3" />
                {snapshotData.dueDate}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Confidence</div>
              <div className="text-sm font-medium text-success">{snapshotData.confidence}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Departments</div>
              <div className="flex gap-2">
                {snapshotData.departments.map((dept) => (
                  <Badge key={dept} variant="outline">{dept}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Tags</div>
              <div className="flex gap-2">
                {snapshotData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">One-sentence summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">{snapshotData.summary}</p>
            <p className="text-sm text-muted-foreground">{snapshotData.bilingualSummary}</p>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Action items</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Acknowledge
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <UserPlus className="w-4 h-4" />
                  Assign
                </Button>
                <Button size="sm" className="gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {snapshotData.actionItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.responsible}:</div>
                    <div className="text-sm text-muted-foreground mb-1">{item.task}</div>
                    <div className="text-xs text-muted-foreground">— {item.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evidence */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Evidence</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                <ExternalLink className="w-4 h-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {snapshotData.evidence.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traceability */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Traceability to source</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                <ExternalLink className="w-4 h-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {snapshotData.traceability.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{item.source}</span>
                  <span className="text-sm text-muted-foreground">{item.reference}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SnapshotDetail;