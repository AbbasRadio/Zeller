import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

type Customer = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type CustomerListProps = {
  data?: {
    listZellerCustomers?: {
      items?: Customer[];
      nextToken?: string;
    };
  };
  loading?: boolean;
  error?: any;
};

const CustomerList: React.FC<CustomerListProps> = ({data, loading, error}) => {
  if (loading)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  const customers = data?.listZellerCustomers?.items ?? [];

  return (
    <FlatList
      data={customers}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text>{item.role}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No customers found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 3
  },
});

export default CustomerList;
