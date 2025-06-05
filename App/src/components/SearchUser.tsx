import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GET_ZELLER_CUSTOMER,
  GET_ZELLER_CUSTOMERS_LIST,
} from '../../graphql/queries';
import CustomerList from './CustomerList';
import SelectDropdown from 'react-native-select-dropdown';

type UserRole = 'ADMIN' | 'MANAGER';

const SearchUser = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<UserRole>('ADMIN');

  const {data, loading, error} = useQuery(GET_ZELLER_CUSTOMERS_LIST, {
    variables: {
      filter: {
        name: {contains: name},
        email: {contains: email},
        role: {eq: role},
      },
      limit: 20,
    },
  });
  console.log('LOGGING : ', data, error);
  return (
    <View style={styles.MainContainer}>
      <View style={styles.row}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          style={styles.input}
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.buttonRow}>
        {['ADMIN', 'MANAGER'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.toggleButton, role === item && styles.activeButton]}
            onPress={() => setRole(item as 'ADMIN' | 'MANAGER')}>
            <Text
              style={[styles.buttonText, role === item && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : data && data.listZellerCustomers?.items?.length > 0 ? (
        <CustomerList data={data} error={error} loading={loading} />
      ) : (
        <Text style={{marginHorizontal: 15}}>No Data Found</Text>
      )}
    </View>
  );
};

export default SearchUser;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'static'
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginLeft: 10,
  },
  resetText: {
    color: '#000',
    fontWeight: '500',
  },
});
