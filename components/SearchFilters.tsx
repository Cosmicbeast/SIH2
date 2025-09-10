import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SearchFilters = () => {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search snapshots, tags, owners..."
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>

        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="regulatory">Regulatory</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="new">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-departments">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-departments">All Departments</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="rolling-stock">Rolling Stock</SelectItem>
            <SelectItem value="civil-engineering">Civil Engineering</SelectItem>
            <SelectItem value="s&t">S&T</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="procurement">Procurement</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="legal">Legal/Compliance</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="iot-data">IoT/Data Analytics</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Switch id="bilingual" defaultChecked />
          <Label htmlFor="bilingual">Bilingual</Label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;