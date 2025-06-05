// // apolloClient.ts
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://localhost:9002/graphql',
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import awsconfig from './aws-exports'; // adjust if needed

const httpLink = createHttpLink({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
});

const authLink = setContext((_, {headers}) => ({
  headers: {
    ...headers,
    'x-api-key': awsconfig.aws_appsync_apiKey,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;