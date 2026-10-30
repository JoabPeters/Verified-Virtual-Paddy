import React, { useState, useMemo } from 'react';
import { NIGERIAN_STATES, NIGERIAN_DISCOS } from '../data/nigeriaData';
import { Search, MapPin, Building2, ExternalLink, Phone, AlertCircle, ArrowLeft, ChevronRight, Zap } from 'lucide-react';

interface DirectoryProps {
  onBackHome?: () => void;
}

export const DirectoryView: React.FC<DirectoryProps> = ({ onBackHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisCoFilter, setSelectedDisCoFilter] = useState('ALL');

  const filteredStates = useMemo(() => {
    return NIGERIAN_STATES.filter(state => {
      const matchesSearch = 
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.lgas.some(lga => lga.toLowerCase().includes(searchQuery.toLowerCase())) ||
        state.primaryDisCos.some(dId => {
          const disco = NIGERIAN_DISCOS[dId];
          return disco && (
            disco.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            disco.shortName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

      const matchesDisCo = 
        selectedDisCoFilter === 'ALL' || 
        state.primaryDisCos.includes(selectedDisCoFilter);

      return matchesSearch && matchesDisCo;
    });
  }, [searchQuery, selectedDisCoFilter]);

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D] min-h-[85vh] py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Aids: Back to Home & Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {onBackHome && (
            <button
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 font-bold text-[#2878C8] hover:text-[#1E62A8] hover:underline transition-colors cursor-pointer py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button 
              onClick={onBackHome} 
              className="hover:text-[#102A43] cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 font-semibold">Directory</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2878C8] font-bold">36 States & DisCos</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold text-[#2878C8] bg-[#EFF6FF] px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-[#2878C8]/25 mb-3.5 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#2878C8]" />
            <span>Complete 36 States + FCT Coverage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#102A43] leading-tight">
            Nigerian Electricity Provider & State Directory
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Search all 36 Nigerian states and the Federal Capital Territory to find operating 
            Electricity Distribution Companies (DisCos), official websites, and customer support channels.
          </p>
        </div>

        {/* Coverage Disclaimer */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-950 font-bold">Important DisCo Boundary Notice:</strong> Electricity concession boundaries in Nigeria 
            do not strictly match state borders in all regions. Concession boundaries may divide cities or border local governments 
            (e.g., Lagos & Ogun border, or Abia ring-fencing under Aba Power). Where exact coverage cannot be verified, 
            please contact the provider directly through their official channels listed below.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 relative">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by state name, capital, LGA, or distribution company..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2878C8] shadow-2xs"
            />
          </div>

          <div>
            <select
              value={selectedDisCoFilter}
              onChange={(e) => setSelectedDisCoFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2878C8] cursor-pointer shadow-2xs"
            >
              <option value="ALL">Filter by All DisCos (12 Total)</option>
              {Object.values(NIGERIAN_DISCOS).map(disco => (
                <option key={disco.id} value={disco.id}>
                  {disco.shortName} ({disco.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* States Count */}
        <div className="text-xs text-slate-600 mb-6 flex items-center justify-between font-medium">
          <span>Showing {filteredStates.length} of {NIGERIAN_STATES.length} territories</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#2878C8] hover:text-[#1E62A8] font-bold cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStates.map((state) => {
            const discos = state.primaryDisCos.map(id => NIGERIAN_DISCOS[id]).filter(Boolean);
            return (
              <div
                key={state.code}
                className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0D9488]" />
                      <h3 className="font-extrabold text-[#102A43] text-base">{state.name} State</h3>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Cap: {state.capital}</span>
                  </div>

                  {/* Primary DisCos */}
                  <div className="mt-3.5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Operating DisCo(s)
                    </div>
                    <div className="space-y-2.5">
                      {discos.map(disco => (
                        <div key={disco.id} className="p-3 rounded-xl bg-[#EFF6FF] border border-[#2878C8]/20 text-xs">
                          <div className="font-bold text-[#102A43] flex items-center justify-between">
                            <span>{disco.name}</span>
                            <span className="text-[10px] bg-white text-[#2878C8] border border-[#2878C8]/25 px-2 py-0.5 rounded-md font-mono font-bold shadow-2xs">
                              {disco.shortName}
                            </span>
                          </div>
                          <div className="mt-1.5 text-slate-600 flex flex-wrap gap-x-3 gap-y-1">
                            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-700">
                              <Phone className="w-3 h-3 text-[#2878C8]" />
                              {disco.customerCarePhone.split('/')[0]}
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-3 pt-2 border-t border-[#2878C8]/15">
                            <a
                              href={disco.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2878C8] hover:underline"
                            >
                              <span>Website</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                            <span className="text-slate-300">·</span>
                            <a
                              href={disco.billPortalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-[#102A43]"
                            >
                              <span>Bill Portal</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coverage Notes */}
                  <p className="mt-3.5 text-xs text-slate-600 leading-relaxed font-normal">
                    {state.coverageNotes}
                  </p>
                </div>

                {/* Sample LGAs */}
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Key LGAs ({state.lgas.length} total): </span>
                  {state.lgas.slice(0, 4).join(', ')}...
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
