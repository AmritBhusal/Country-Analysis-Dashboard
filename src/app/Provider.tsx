'use client';
import "./globals.css"

import { FC, ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/app/apollo-client';
import { CountryProvider } from '@/context/CountryContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <CountryProvider>
        {children}
      </CountryProvider>
    </ApolloProvider>
  );
};

export default Providers;