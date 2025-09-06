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
    <div className="glass-morphism rounded-2xl shadow-glass border p-6 mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search participants, teams, or programs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-lg border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm rounded-xl"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="min-w-[220px]">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-14 border-border bg-background/50 backdrop-blur-sm rounded-xl transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3">
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

          <div className="min-w-[220px]">
            <Select value={selectedTeam} onValueChange={onTeamChange}>
              <SelectTrigger className="h-14 border-border bg-background/50 backdrop-blur-sm rounded-xl transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3">
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