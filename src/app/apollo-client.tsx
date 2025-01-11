"use client";

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { JSX } from 'react';
import { 
  ApolloProvider as ApolloProviderComponent 
} from '@apollo/client/react';

export const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache(),
});

export function ApolloWrapper({ 
  children 
}: { 
  children: JSX.Element | JSX.Element[] 
}): JSX.Element {
  return (
    <ApolloProviderComponent client={client}>
      {children}
    </ApolloProviderComponent>
  );
}