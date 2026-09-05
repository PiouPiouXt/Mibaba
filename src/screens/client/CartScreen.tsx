import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useCart } from '../../context/CartContext';

export const CartScreen = ({ navigation }: any) => {
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Panier vide', 'Ajoutez des articles avant de passer commande.');
      return;
    }

    Alert.alert(
      'Commande validée ! 🎉',
      `Votre commande d'un montant de ${getTotalPrice().toLocaleString()} Ar a été enregistrée avec succès.`,
      [
        {
          text: 'Voir mes commandes',
          onPress: () => {
            clearCart();
            navigation.navigate('Orders');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Panier 🛒</Text>
        {cart.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Vider</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptySubtitle}>
            Découvrez notre carte et ajoutez de délicieux plats pour commencer.
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.exploreButtonText}>Voir le Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.cartList}>
            {cart.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {(item.price * item.quantity).toLocaleString()} Ar
                  </Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total</Text>
              <Text style={styles.summaryValue}>
                {getTotalPrice().toLocaleString()} Ar
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frais de livraison</Text>
              <Text style={styles.summaryValue}>2 000 Ar</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total à payer</Text>
              <Text style={styles.totalValue}>
                {(getTotalPrice() + 2000).toLocaleString()} Ar
              </Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Commander maintenant</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.background || '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  clearText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  cartList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  itemPrice: {
    fontSize: 14,
    color: Colors?.primary || '#FF6B00',
    fontWeight: 'bold',
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    backgroundColor: Colors?.border || '#E0E0E0',
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors?.textSecondary || '#757575',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: Colors?.primary || '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    backgroundColor: Colors?.surface || '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors?.textSecondary || '#757575',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  divider: {
    height: 1,
    backgroundColor: Colors?.border || '#E0E0E0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors?.primary || '#FF6B00',
  },
  checkoutButton: {
    backgroundColor: Colors?.primary || '#FF6B00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;