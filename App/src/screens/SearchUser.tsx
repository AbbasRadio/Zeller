import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GET_ZELLER_CUSTOMERS_LIST} from '../../graphql/queries';
import CustomerList from '../components/CustomerList';

type UserRole = 'ADMIN' | 'MANAGER';

const SearchUser = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<UserRole>('ADMIN');

  const {data, loading, error, refetch} = useQuery(GET_ZELLER_CUSTOMERS_LIST, {
    variables: {
      filter: {
        name: {contains: name},
        email: {contains: email},
        role: {eq: role},
      },
      limit: 20,
    },
  });

  const refetchData = async () => {
    try {
      setName('');
      setEmail('');
      await refetch();
      console.log('Data refetched successfully', data);
    } catch (err) {
      console.error('Error refetching data:', err);
    }
  };

  const userTypes = [
    {id: 'ADMIN', label: 'Admin'},
    {id: 'MANAGER', label: 'Manager'},
  ];

  type RadioButtonProps = {
    isSelected: boolean;
    onPress: () => void;
    label: string;
  };

  const RadioButton: React.FC<RadioButtonProps> = ({
    isSelected,
    onPress,
    label,
  }) => (
    <TouchableOpacity
      style={[styles.radioContainer, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.radioButtonWrapper}>
        <View
          style={[
            styles.radioButton,
            isSelected && styles.selectedRadioButton,
          ]}>
          {isSelected && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={[styles.radioLabel, isSelected && styles.selectedLabel]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
      <View style={styles.buttonArrange}>
        <Text style={styles.label}>User Types</Text>
        <View style={styles.radioGroup}>
          {userTypes.map(userType => (
            <RadioButton
              key={userType.id}
              isSelected={role === userType.id}
              onPress={() => setRole(userType.id as UserRole)}
              label={userType.label}
            />
          ))}
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size={'large'} color={'#007bff'} />
      ) : data && data.listZellerCustomers?.items?.length > 0 ? (
        <CustomerList
          data={data}
          error={error}
          loading={loading}
          role={role}
          refetchData={refetchData}
        />
      ) : (
        <Text style={styles.noDataFound}>No Customer Found</Text>
      )}
    </View>
  );
};

export default SearchUser;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'static',
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: '100%',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 0,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    marginLeft: 16,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '48%',
  },
  activeButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
  },
  noDataFound: {
    margin: 15,
    fontSize: 18,
  },
  buttonArrange: {
    alignItems: 'flex-start',
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 15,
  },
  radioGroup: {
    flexDirection: 'column',
    paddingVertical: 5,
    marginLeft: 8,
  },
  radioContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 60,
    justifyContent: 'center',
    width: '100%',
  },
  selectedContainer: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    width: '100%',
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  selectedRadioButton: {
    borderColor: '#3b82f6',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    width: '88%',
  },
  selectedLabel: {
    color: '#1f2937',
    fontWeight: '600',
  },
});
