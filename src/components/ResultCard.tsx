import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Award } from "lucide-react";

interface ResultEntry {
  position: string;
  chestNo: string;
  candidateName: string;
  teamCode: string;
  grade: string;
  programCode: string;
  programName: string;
  programSection: string;
}

interface ResultCardProps {
  programCode: string;
  programName: string;
  programSection: string;
  entries: ResultEntry[];
}

const getGradeBadgeVariant = (grade: string): "default" | "secondary" | "destructive" => {
  switch (grade.toUpperCase()) {
    case 'A': return "default";
    case 'B': return "secondary"; 
    case 'C': return "destructive";
    default: return "secondary";
  }
};

const getGradeColor = (grade: string): string => {
  switch (grade.toUpperCase()) {
    case 'A': return "bg-grade-a/10 text-grade-a border-grade-a/20";
    case 'B': return "bg-grade-b/10 text-grade-b border-grade-b/20";
    case 'C': return "bg-grade-c/10 text-grade-c border-grade-c/20";
    default: return "bg-grade-default/10 text-grade-default border-grade-default/20";
  }
};

const getPositionIcon = (position: string) => {
  switch (position) {
    case '1': return <Trophy className="h-5 w-5 text-yellow-500" />;
    case '2': return <Award className="h-5 w-5 text-gray-400" />;
    case '3': return <Award className="h-5 w-5 text-amber-600" />;
    default: return null;
  }
};

export const ResultCard = ({ programCode, programName, programSection, entries }: ResultCardProps) => {
  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-modern transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm animate-scale-in">
      <CardHeader className="bg-gradient-primary text-primary-foreground p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wide">{programName}</h2>
            <p className="text-primary-foreground/90 text-sm font-medium">
              {programCode} • {programSection}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 bg-gradient-to-b from-card to-card/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border/50 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">Position</th>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">Chest No</th>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">Candidate</th>
                <th className="px-6 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">Team</th>
                <th className="px-6 py-4 text-right font-semibold text-muted-foreground uppercase tracking-wide text-xs">Grade</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr 
                  key={`${entry.chestNo}-${index}`}
                  className="border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-all duration-300 group/row"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="group-hover/row:scale-110 transition-transform duration-200">
                        {getPositionIcon(entry.position)}
                      </div>
                      <span className="font-bold text-xl text-primary group-hover/row:text-accent transition-colors duration-200">
                        {entry.position || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium text-base">
                    {entry.chestNo}
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground text-base group-hover/row:text-primary transition-colors duration-200">
                    {entry.candidateName}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium text-base">
                    {entry.teamCode}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {entry.grade && (
                      <Badge 
                        variant="outline" 
                        className={`font-bold text-sm px-3 py-1 rounded-full border-2 transition-all duration-200 hover:scale-105 ${getGradeColor(entry.grade)}`}
                      >
                        {entry.grade}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};