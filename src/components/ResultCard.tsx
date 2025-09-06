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
    <Card className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border">
      <CardHeader className="bg-gradient-primary text-primary-foreground p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-wide">{programName}</h2>
            <p className="text-primary-foreground/80 text-sm">
              {programCode} • {programSection}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Pos</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Chest No</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Candidate</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Team</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Grade</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr 
                  key={`${entry.chestNo}-${index}`}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-200"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getPositionIcon(entry.position)}
                      <span className="font-bold text-lg text-primary">
                        {entry.position || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-medium">
                    {entry.chestNo}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {entry.candidateName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {entry.teamCode}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {entry.grade && (
                      <Badge 
                        variant="outline" 
                        className={`font-semibold ${getGradeColor(entry.grade)}`}
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