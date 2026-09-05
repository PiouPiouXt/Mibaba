import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../../constants/Colors';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'en_attente' | 'en_cours' | 'livree' | 'annulee';
  total: number;
  items: OrderItem[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'CMD-1024',
    date: '01 Sept. 2026 - 19:30',
    status: 'en_cours',
    total: 23000,
    items: [
      { id: '1', name: 'Pizza Margherita', quantity: 1, price: 8000 },
      { id: '2', name: 'Burger Classique', quantity: 1, price: 7000 },
      { id: '3', name: 'Pizza Margherita', quantity: 1, price: 8000 },
    ],
  },
  {
    id: 'CMD-1019',
    date: '28 Août 2026 - 12:15',
    status: 'livree',
    total: 16000,
    items: [
      { id: '1', name: 'Burger Classique', quantity: 2, price: 7000 },
      { id: '3', name: 'Coca-Cola 50cl', quantity: 1, price: 3000 },
    ],
  },
  {
    id: 'CMD-1005',
    date: '20 Août 2026 - 20:45',
    status: 'annulee',
    total: 5000,
    items: [
      { id: '4', name: 'Tarte au Citron', quantity: 1, price: 5000 },
    ],
  },
];

export const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === 'current') {
      return order.status === 'en_attente' || order.status === 'en_cours';
    }
    return order.status === 'livree' || order.status === 'annulee';
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'en_cours':
        return { label: 'En préparation', color: '#10B981', bg: '#D1FAE5' };
      case 'en_attente':
        return { label: 'En attente', color: '#F59E0B', bg: '#FEF3C7' };
      case 'livree':
        return { label: 'Livrée', color: '#3B82F6', bg: '#DBEAFE' };
      case 'annulee':
        return { label: 'Annulée', color: '#EF4444', bg: '#FEE2E2' };
      default:
        return { label: status, color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Commandes 📜</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'current' && styles.activeTabButton]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
            En cours
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Historique
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'current'
                ? 'Aucune commande en cours pour le moment.'
                : "Vous n'avez pas encore de commandes terminées."}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const badge = getStatusBadge(item.status);

          return (
            <View style={styles.orderCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderId}>{item.id}</Text>
                  <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.badgeText, { color: badge.color }]}>
                    {badge.label}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.itemsContainer}>
                {item.items.map((subItem, index) => (
                  <Text key={index} style={styles.itemText}>
                    {subItem.quantity}x {subItem.name}
                  </Text>
                ))}
              </View>

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <Text style={styles.totalLabel}>Total :</Text>
                <Text style={styles.totalPrice}>
                  {item.total.toLocaleString()} Ar
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.background || '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors?.border || '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: Colors?.primary || '#FF6B00',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors?.textSecondary || '#757575',
  },
  activeTabText: {
    color: Colors?.surface || '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  orderDate: {
    fontSize: 12,
    color: Colors?.textSecondary || '#757575',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors?.border || '#E0E0E0',
    marginVertical: 12,
  },
  itemsContainer: {
    paddingVertical: 2,
  },
  itemText: {
    fontSize: 14,
    color: Colors?.textPrimary || '#1F1F1F',
    marginVertical: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: Colors?.textSecondary || '#757575',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.primary || '#FF6B00',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: Colors?.textSecondary || '#757575',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default OrdersScreen;