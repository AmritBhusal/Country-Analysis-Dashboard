'use client';
import { FC, useState, useMemo } from 'react';
import { useCountryData } from '@/context/CountryContext';
import { ChevronUp, ChevronDown, Search, Menu, X, Eye } from 'lucide-react';
import './TableStyles.css';
import CountryDetail from './CountryDetail';

interface Country {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
}

interface Filters {
  country: string;
  language: string;
  continent: string;
}

const TableData: FC = () => {
  const { loading, error, data } = useCountryData();
  
  // Integrated state management
  const [filters, setFilters] = useState<Filters>({
    country: '',
    language: '',
    continent: ''
  });
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Memoized values
  const continents = useMemo(() => {
    if (!data?.countries) return [];
    return Array.from(new Set(data.countries.map(country => country.continent.name))).sort();
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    if (!data?.countries) return [];

    return data.countries
      .filter(country => {
        const matchesCountry = country.name.toLowerCase().includes(filters.country.toLowerCase());
        const matchesLanguage = filters.language === '' || country.languages.some(
          lang => lang.name.toLowerCase().includes(filters.language.toLowerCase())
        );
        const matchesContinent = filters.continent === '' || country.continent.name === filters.continent;

        return matchesCountry && matchesLanguage && matchesContinent;
      })
      .sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [data, filters, sortDirection]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewDetails = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="error-message">No data available</div>;
  }

  return (
    <div className="table-container" suppressHydrationWarning>
      {/* Hamburger Menu */}
      <button className="hamburger-menu" onClick={toggleSidebar}>
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      />

      {/* Filter Sidebar */}
      <div className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="filter-section">
          <h3 className="filter-title">Filters</h3>
          <div className="filter-group">
            <label className="filter-label">Country Name</label>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search countries..."
                className="search-input"
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
              />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Language</label>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search languages..."
                className="search-input"
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
              />
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Continent</label>
            <select
              className="select-dropdown"
              value={filters.continent}
              onChange={(e) => setFilters(prev => ({ ...prev, continent: e.target.value }))}
            >
              <option value="">All Continents</option>
              {continents.map(continent => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="filter-section">
          <h3 className="filter-title">Sort</h3>
          <button
            className="sort-button"
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            Alphabetical
            {sortDirection === 'asc' ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="card">
          <div className="table-header">
            Showing {filteredAndSortedData.length} of {data.countries.length} countries
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Country Name</th>
                  <th>Code</th>
                  <th>Capital</th>
                  <th>Continent</th>
                  <th>Languages</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((country: Country) => (
                  <tr key={country.code} onClick={() => handleViewDetails(country.code)}>
                    <td>{country.name}</td>
                    <td>{country.code}</td>
                    <td>{country.capital}</td>
                    <td>{country.continent.name}</td>
                    <td>{country.languages.map(lang => lang.name).join(', ')}</td>
                    <td>
                      <button 
                        className="view_details"
                        onClick={() => handleViewDetails(country.code)}
                      >
                        <Eye /> 
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CountryDetail
        countryCode={selectedCountry || ''}
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
};

export default TableData;