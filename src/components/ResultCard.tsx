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
    <Card className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-border/50 backdrop-blur-sm bg-card/80">
      <CardHeader className="bg-gradient-card text-primary-foreground p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold tracking-wide truncate">{programName}</h2>
            <p className="text-primary-foreground/90 text-sm font-medium">
              {programCode} • {programSection}
            </p>
          </div>
          <div className="status-indicator">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {entries.length} Results
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm relative">
            <thead className="bg-gradient-to-r from-muted/30 to-muted/50 border-b border-border/50 backdrop-blur-sm">
              <tr>
                <th className="px-4 py-4 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Pos</th>
                <th className="px-4 py-4 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Chest No</th>
                <th className="px-4 py-4 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Candidate</th>
                <th className="px-4 py-4 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider">Team</th>
                <th className="px-4 py-4 text-right font-semibold text-muted-foreground text-xs uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr 
                  key={`${entry.chestNo}-${index}`}
                  className="border-b border-border/30 last:border-b-0 hover:bg-gradient-to-r hover:from-muted/20 hover:to-transparent transition-all duration-300 group"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {getPositionIcon(entry.position)}
                      <span className="font-bold text-lg text-primary group-hover:scale-110 transition-transform duration-200">
                        {entry.position || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground font-medium font-mono text-sm">
                    {entry.chestNo}
                  </td>
                  <td className="px-4 py-4 font-semibold text-foreground">
                    {entry.candidateName}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground font-medium">
                    {entry.teamCode}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {entry.grade && (
                      <Badge 
                        variant="outline"
                        className={`font-semibold transition-all duration-200 hover:scale-110 ${getGradeColor(entry.grade)}`}
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