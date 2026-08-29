import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, User, Briefcase, CheckSquare, Sparkles, ChevronRight } from 'lucide-react';
import { searchService, GlobalSearchResultItem } from '../services/searchService';
import { Badge, Button, Input } from '../components/ui';
import { AbstractVectorArt } from '../components/common/AbstractVectorArt';

export const GlobalSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputQuery, setInputQuery] = useState(query);
  const [results, setResults] = useState<GlobalSearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const execute = async () => {
      setLoading(true);
      const res = await searchService.searchAll(query);
      setResults(res);
      setLoading(false);
    };
    execute();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: inputQuery });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#F4F5F8]/95 dark:bg-[#07080A]/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 lg:px-8 py-4 select-none shrink-0 relative overflow-hidden">
        <AbstractVectorArt variant="briefing-ribbon" opacity="opacity-35 dark:opacity-20" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-1 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <Search className="w-11 h-11 text-[#8A6D3B] dark:text-[#d4c5a9] shrink-0 stroke-[1.75]" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 type-eyebrow text-[#8A6D3B] dark:text-[#d4c5a9] leading-none">
                <span>Unified Intelligence Index</span>
                <span className="opacity-30">•</span>
                <span>Deterministic Full-Text Search</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-1 leading-tight">
                Global Search Hub
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6 w-full">

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search anything across your local hiring database..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button type="submit" size="md">
          Search
        </Button>
      </form>

      {/* Results List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 shadow-2xs text-xs">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Searching database...</div>
        ) : results.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            {query ? 'No matching records found.' : 'Type a query above to search your entire local workspace.'}
          </div>
        ) : (
          results.map((r) => (
            <div
              key={r.id}
              onClick={() => navigate(r.route)}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                {r.type === 'candidate' && <User className="w-5 h-5 text-blue-500" />}
                {r.type === 'job' && <Briefcase className="w-5 h-5 text-indigo-500" />}
                {r.type === 'task' && <CheckSquare className="w-5 h-5 text-emerald-500" />}
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{r.title}</div>
                  <div className="text-[11px] text-slate-500">{r.subtitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {r.badge && <Badge variant="secondary">{r.badge}</Badge>}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
};
