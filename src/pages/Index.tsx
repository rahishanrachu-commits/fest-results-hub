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
  // Default URL - using the provided Google Apps Script URL
  const [webappUrl, setWebappUrl] = useState('https://script.google.com/macros/s/AKfycbzYuQKwLM-z4iT8qemGv3r2HLGjDK-fiH6Hs04JbUkhrXsVAi4hB30VjTHml68FNFj6aA/exec');
  const [isConfigured, setIsConfigured] = useState(true);
  
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.1) 0%, transparent 50%)
            `,
            backgroundSize: '100px 100px, 150px 150px'
          }}
        />
      </div>

      <div className="relative container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-glass animate-glow">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text mb-4 animate-slide-up">
            Fest Results
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Live competition results with real-time updates from Google Sheets
          </p>
          
          {/* Stats */}
          {data.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-scale-in">
              <Badge variant="secondary" className="px-6 py-3 text-base font-semibold bg-gradient-secondary border-0 shadow-lg">
                🏆 {Object.keys(groupedData).length} Programs
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-semibold bg-gradient-secondary border-0 shadow-lg">
                📊 {filteredData.length} Results
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base font-semibold bg-gradient-secondary border-0 shadow-lg">
                👥 {teams.length} Teams
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
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                {Object.entries(groupedData).map(([programCode, entries], index) => {
                  const programInfo = entries[0];
                  return (
                    <div 
                      key={programCode}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ResultCard
                        programCode={programCode}
                        programName={programInfo.programName}
                        programSection={programInfo.programSection}
                        entries={entries}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-secondary rounded-full mb-6 shadow-lg">
                  <Trophy className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No results found</h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search terms or filters to find the results you're looking for
                </p>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-secondary rounded-full mb-6 shadow-lg">
              <Trophy className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No data available</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
              Check your Google Apps Script URL and ensure it returns valid CSV data
            </p>
            <Button 
              onClick={() => setIsConfigured(false)} 
              variant="outline"
              className="glass-morphism hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Settings className="h-4 w-4 mr-2" />
              Reconfigure Data Source
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-12 mt-20 border-t border-border/50 glass-morphism">
        <p className="text-base text-muted-foreground">
          © 2025 Fest Results Showcase. 
          <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent ml-1">
            Powered by Google Sheets
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
