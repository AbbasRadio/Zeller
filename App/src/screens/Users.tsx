import {useQuery} from '@apollo/client';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  GET_ZELLER_CUSTOMER,
  GET_ZELLER_CUSTOMERS_LIST,
} from '../../graphql/queries';
import CustomerList from '../components/CustomerList';

const Users = () => {
  // const {data, loading, error} = useQuery(GET_ZELLER_CUSTOMER, {
  //   variables: {id: '1'},
  // });
  const {data, loading, error, refetch} = useQuery(GET_ZELLER_CUSTOMERS_LIST, {
    variables: {
      filter: null,
      limit: 100,
      nextToken: null,
    },
  });

  const refetchData = async () => {
    try {
      console.log('Data refetched successfully', data);
      await refetch();
    } catch (err) {
      console.error('Error refetching data:', err);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <Text>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#007bff'} />
        ) : data ? (
          <CustomerList
            data={data}
            error={error}
            loading={loading}
            refetchData={refetchData}
          />
        ) : (
          <Text style={{margin: 15, fontSize: 18}}>No Customer Found</Text>
        )}
      </Text>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 16,
  },
});
