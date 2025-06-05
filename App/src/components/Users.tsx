import {useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  GET_ZELLER_CUSTOMER,
  GET_ZELLER_CUSTOMERS_LIST,
} from '../../graphql/queries';
import CustomerList from './CustomerList';

const Users = () => {
  // const {data, loading, error} = useQuery(GET_ZELLER_CUSTOMER, {
  //   variables: {id: '1'},
  // });
  const {data, loading, error} = useQuery(GET_ZELLER_CUSTOMERS_LIST, {
    variables: {
      filter: null,
      limit: 100,
      nextToken: null,
    },
  });
  //   const {data, loading, error} = useQuery(GET_ZELLER_CUSTOMERS_LIST);
  console.log('DATA : ', data);
  return (
    <View style={styles.MainContainer}>
      <Text>
        {loading ? (
          'Loading...'
        ) : data ? (
          <CustomerList data={data} error={error} loading={loading} />
        ) : (
          'No Data'
        )}
      </Text>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
