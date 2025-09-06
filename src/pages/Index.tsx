import { useState, useMemo } from 'react';
import { useResultsData, ResultEntry } from '@/hooks/useResultsData';
import { FilterControls } from '@/components/FilterControls';
import { ResultCard } from '@/components/ResultCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Settings, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  // Default URL - replace with your Google Apps Script URL
  const [webappUrl, setWebappUrl] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  
  const { data, loading, error, refetch } = useResultsData({ 
    webappUrl: isConfigured ? webappUrl : '' 
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');

  // Extract unique categories and teams from data
  const { categories, teams } = useMemo(() => {
    const categorySet = new Set<string>();
    const teamSet = new Set<string>();
    
    data.forEach(entry => {
      if (entry.programCode) categorySet.add(entry.programCode);
      if (entry.teamCode) teamSet.add(entry.teamCode);
    });
    
    return {
      categories: Array.from(categorySet).sort(),
      teams: Array.from(teamSet).sort(),
    };
  }, [data]);

  // Filter and search data
  const filteredData = useMemo(() => {
    return data.filter(entry => {
      const matchesSearch = !searchTerm || 
        entry.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.teamCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.programCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || entry.programCode === selectedCategory;
      const matchesTeam = selectedTeam === 'all' || entry.teamCode === selectedTeam;
      
      return matchesSearch && matchesCategory && matchesTeam;
    });
  }, [data, searchTerm, selectedCategory, selectedTeam]);

  // Group filtered data by program
  const groupedData = useMemo(() => {
    const groups: Record<string, ResultEntry[]> = {};
    
    filteredData.forEach(entry => {
      const key = entry.programCode;
      if (!key) return;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(entry);
    });
    
    return groups;
  }, [filteredData]);

  const handleConfigure = () => {
    if (webappUrl.trim()) {
      setIsConfigured(true);
    }
  };

  // Configuration screen
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="container mx-auto max-w-2xl pt-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Fest Results Showcase
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect your Google Sheets to display live competition results
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configure Data Source
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Google Apps Script URL</label>
                <Input
                  placeholder="https://script.google.com/macros/s/..."
                  value={webappUrl}
                  onChange={(e) => setWebappUrl(e.target.value)}
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Enter your Google Apps Script web app URL that returns CSV data
                </p>
              </div>
              
              <Button 
                onClick={handleConfigure}
                disabled={!webappUrl.trim()}
                className="w-full h-12 bg-gradient-primary hover:opacity-90"
              >
                Connect & Load Results
              </Button>
              
              <div className="text-center">
                <a 
                  href="https://developers.google.com/apps-script/guides/web" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Learn about Google Apps Script
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main application
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Pattern overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(238, 75%, 59%, 0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Fest Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Live competition results from Google Sheets
          </p>
          
          {/* Stats */}
          {data.length > 0 && (
            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {Object.keys(groupedData).length} Programs
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {filteredData.length} Results
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {teams.length} Teams
              </Badge>
            </div>
          )}
        </header>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {/* Main Content */}
        {!loading && !error && data.length > 0 && (
          <>
            {/* Filter Controls */}
            <FilterControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTeam={selectedTeam}
              onTeamChange={setSelectedTeam}
              categories={categories}
              teams={teams}
            />

            {/* Results Grid */}
            {Object.keys(groupedData).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(groupedData).map(([programCode, entries]) => {
                  const programInfo = entries[0];
                  return (
                    <ResultCard
                      key={programCode}
                      programCode={programCode}
                      programName={programInfo.programName}
                      programSection={programInfo.programSection}
                      entries={entries}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No data available</h3>
            <p className="text-muted-foreground mb-4">
              Check your Google Apps Script URL and ensure it returns valid CSV data
            </p>
            <Button onClick={() => setIsConfigured(false)} variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Reconfigure Data Source
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-16 border-t border-border bg-card/50">
        <p className="text-sm text-muted-foreground">
          © 2025 Fest Results Showcase. Powered by Google Sheets.
        </p>
      </footer>
    </div>
  );
};

export default Index;
