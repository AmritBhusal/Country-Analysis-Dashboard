'use client'

import React, { useState } from 'react';
import { useCountryData } from '@/context/CountryContext';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import './charts.css';

const processDataForCharts = (data, selectedContinent) => {
  const countriesByContinent = data.countries.reduce((acc, country) => {
    const continent = country.continent.name;
    if (!acc[continent]) {
      acc[continent] = [];
    }
    acc[continent].push(country);
    return acc;
  }, {});

  const continentData = Object.entries(countriesByContinent).map(([name, countries]) => ({
    name,
    y: countries.length,
  }));

  const selectedCountries = selectedContinent === 'all'
    ? data.countries
    : countriesByContinent[selectedContinent] || [];

  return { continentData, selectedCountries };
};

const ChartData = () => {
  const { loading, error, data } = useCountryData();
  const [selectedContinent, setSelectedContinent] = useState('all');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="error-message">
        {error ? error.message : 'No data available'}
      </div>
    );
  }

  const { continentData, selectedCountries } = processDataForCharts(data, selectedContinent);
  const continents = ['all', ...new Set(data.countries.map(country => country.continent.name))];

  const pieChartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      spacing: [20, 20, 20, 20],
      reflow: true,
      height: '400px'
    },
    title: {
      text: 'Countries by Continent',
      style: { fontSize: '20px', fontWeight: 'bold' },
      margin: 20
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: 20,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          style: { 
            fontSize: '12px',
            textOutline: 'none'
          }
        },
        showInLegend: true,
        size: '80%',
        center: ['40%', '50%']
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Countries',
      colorByPoint: true,
      data: continentData
    }],
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemMarginTop: 10,
      itemMarginBottom: 10,
      x: 0,
      y: 0,
      floating: false,
      backgroundColor: 'transparent',
      itemStyle: {
        fontSize: '12px',
        fontWeight: 'normal'
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          plotOptions: {
            pie: {
              center: ['50%', '50%']
            }
          }
        }
      }]
    }
  };

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 600,
      backgroundColor: 'transparent'
    },
    title: {
      text: `Countries in ${selectedContinent === 'all' ? 'All Continents' : selectedContinent}`,
      style: { fontSize: '20px', fontWeight: 'bold' }
    },
    xAxis: {
      categories: selectedCountries.map(country => country.name),
      labels: {
        style: { fontSize: '10px' }
      }
    },
    yAxis: {
      title: {
        text: 'Number of Languages'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Languages',
      data: selectedCountries.map(country => country.languages.length)
    }]
  };

  return (
    <div className="chart-container">
      <div className="select-wrapper">
        <Select value={selectedContinent} onValueChange={setSelectedContinent}>
          <SelectTrigger className="select-trigger">
            <SelectValue placeholder="Select a continent" />
          </SelectTrigger>
          <SelectContent className="select-content">
            {continents.map((continent) => (
              <SelectItem
                key={continent}
                value={continent}
                className="select-item"
              >
                {continent === 'all' ? 'All Continents' : continent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>

        <div className="chart-card">
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        </div>

        <div className="countries-section">
          <h2 className="countries-title">
            {selectedContinent === 'all' ? 'All Countries' : `Countries in ${selectedContinent}`}
            <span className="countries-count">({selectedCountries.length})</span>
          </h2>
          <div className="countries-grid">
            {selectedCountries.map(country => (
              <div key={country.code} className="country-card">
                <span className="country-name">{country.name}</span>
                <div className="country-details">
                  <span>Capital: {country.capital || 'N/A'}</span>
                  <span>Code: {country.code}</span>
                  <span>Languages: {country.languages.map(lang => lang.name).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartData;