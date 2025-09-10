import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import SnapshotsList from "@/components/SnapshotsList";
import SnapshotDetail from "@/components/SnapshotDetail";

const Index = () => {
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>("1");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("operations");

  // Reset selected snapshot when department changes
  useEffect(() => {
    setSelectedSnapshot(null);
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
      />
      <SearchFilters />
      <div className="flex h-[calc(100vh-140px)]">
        <SnapshotsList 
          selectedSnapshot={selectedSnapshot}
          onSelectSnapshot={setSelectedSnapshot}
          selectedDepartment={selectedDepartment}
        />
        <SnapshotDetail snapshotId={selectedSnapshot} />
      </div>
    </div>
  );
};

export default Index;