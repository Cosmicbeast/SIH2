import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, FileText } from "lucide-react";

interface HeaderProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
}

const Header = ({ selectedDepartment, onDepartmentChange }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <div className="w-5 h-5 bg-primary-foreground rounded-sm"></div>
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              KMRL — Snapshot Portal
            </h1>
          </div>
          
          <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operations">Operations Control</SelectItem>
              <SelectItem value="rolling-stock">Rolling Stock</SelectItem>
              <SelectItem value="civil-engineering">Civil Engineering</SelectItem>
              <SelectItem value="s&t">S&T (Signals & Telecom)</SelectItem>
              <SelectItem value="safety">Safety Department</SelectItem>
              <SelectItem value="procurement">Procurement</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="legal">Legal & Compliance</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="iot-data">IoT & Data Analytics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;