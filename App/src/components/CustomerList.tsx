import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';

type Customer = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type CustomerListProps = {
  data: {
    listZellerCustomers?: {
      items?: Customer[];
      nextToken?: string;
    };
  };
  loading?: boolean;
  error?: any;
  role?: string;
  refetchData?: () => void;
};

const CustomerList: React.FC<CustomerListProps> = ({
  data,
  loading,
  error,
  role,
  refetchData,
}) => {
  if (loading)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#007bff" />
    );
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  if (role) {
    role == 'ADMIN' ? (role = 'Admin') : (role = 'Manager');
  }

  const customers = data?.listZellerCustomers?.items ?? [];

  const UserItem: React.FC<{user: Customer; isLast: boolean}> = ({
    user,
    isLast,
  }) => (
    <View style={[styles.userItem, isLast && styles.lastUserItem]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name[0]}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {role ? <Text style={styles.title}>{role} Users</Text> : null}
      <View style={styles.usersList}>
        <FlatList
          data={customers}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <UserItem user={item} isLast={index === customers.length - 1} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No Customers Found
            </Text>
          }
          onRefresh={() => refetchData && refetchData()}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    paddingTop: 15,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  usersList: {
    flexDirection: 'column',
    gap: '16px',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: '8px',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#e8f4fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  userInfo: {
    flexDirection: 'column',
    gap: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a1a1a',
    lineHeight: 25,
  },
  userRole: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '400',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  lastUserItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 30,
  },
});
export default CustomerList;
