import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedTeam: string;
  onTeamChange: (value: string) => void;
  categories: string[];
  teams: string[];
}

export const FilterControls = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTeam,
  onTeamChange,
  categories,
  teams,
}: FilterControlsProps) => {
  return (
    <div className="bg-card rounded-xl shadow-card border p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search participants, teams, or programs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg border-border focus:ring-primary"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="min-w-[200px]">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-12 border-border">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="All Categories" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[200px]">
            <Select value={selectedTeam} onValueChange={onTeamChange}>
              <SelectTrigger className="h-12 border-border">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="All Teams" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};