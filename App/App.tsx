import {ApolloProvider} from '@apollo/client';
import React from 'react';
import client from './graphql/apolloClient';
import MainNavigation from './src/navigation/MainNavigation';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <MainNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
