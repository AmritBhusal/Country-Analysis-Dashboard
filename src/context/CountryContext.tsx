'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@apollo/client';

import { CountriesData } from '@/types/types';
import { GET_COUNTRIES } from '@/graphql/queries';


interface CountryContextType {
  loading: boolean;
  error?: any;
  data?: CountriesData;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

  return (
    <CountryContext.Provider value={{ loading, error, data }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryData = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountryData must be used within a CountryProvider');
  }
  return context;
};


