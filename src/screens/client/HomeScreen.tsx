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
import { Product } from '../../models/types';
import { useCart } from '../../context/CartContext';

interface ExtendedProduct extends Product {
  isPromo?: boolean;
  oldPrice?: number;
  isMostOrdered?: boolean;
  ordersCount?: number;
}

const FEATURED_PRODUCTS: ExtendedProduct[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Sauce tomate, mozzarella, basilic frais',
    price: 8000,
    oldPrice: 10000,
    category: 'Pizza',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
    isPromo: true,
    isMostOrdered: true,
    ordersCount: 342,
  },
  {
    id: '3',
    name: 'Coca-Cola 50cl',
    description: 'Boisson gazeuse rafraîchissante',
    price: 3000,
    oldPrice: 3500,
    category: 'Boissons',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    isPromo: true,
  },
  {
    id: '4',
    name: 'Tarte au Citron',
    description: 'Meringuée et acidulée',
    price: 5000,
    category: 'Desserts',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    isPromo: true,
  },
];

export const HomeScreen = ({ navigation }: any) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    Alert.alert('Ajouté !', `${product.name} a été ajouté à votre panier.`);
  };

  const mostOrderedProduct = FEATURED_PRODUCTS.find((p) => p.isMostOrdered) || FEATURED_PRODUCTS[0];
  const promoProducts = FEATURED_PRODUCTS.filter((p) => p.isPromo);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.subGreeting}>Qu'est-ce qui vous ferait plaisir aujourd'hui ?</Text>
        </View>

        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={() => navigation.navigate('Menu')}
          activeOpacity={0.9}
        >
          <Text style={styles.searchPlaceholder}>Rechercher un plat, une boisson...</Text>
        </TouchableOpacity>

        {mostOrderedProduct && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏆 Le plus commandé</Text>
            </View>
            <View style={styles.featuredCard}>
              <Image
                source={{ uri: mostOrderedProduct.imageUrl }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredInfo}>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>Populaire ({mostOrderedProduct.ordersCount} commandes)</Text>
                </View>
                <Text style={styles.featuredTitle}>{mostOrderedProduct.name}</Text>
                <Text style={styles.featuredDesc} numberOfLines={2}>
                  {mostOrderedProduct.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.cardPrice}>
                    {mostOrderedProduct.price.toLocaleString()} Ar
                  </Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(mostOrderedProduct)}
                  >
                    <Text style={styles.addButtonText}>+ Ajouter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {promoProducts.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Promos du moment</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            >
              {promoProducts.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.promoBadge}>
                    <Text style={styles.promoBadgeText}>PROMO</Text>
                  </View>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.cardPrice}>
                      {item.price.toLocaleString()} Ar
                    </Text>
                    {item.oldPrice && (
                      <Text style={styles.oldPrice}>
                        {item.oldPrice.toLocaleString()} Ar
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Text style={styles.addButtonText}>+ Ajouter</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.exploreBanner}>
          <Text style={styles.exploreTitle}>Envie de découvrir toute notre carte ?</Text>
          <Text style={styles.exploreSubtitle}>Pizzas, burgers, desserts et bien plus encore t'attendent.</Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.exploreButtonText}>Voir le Menu complet 🍽️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors?.background || '#F8F9FA' },
  header: { paddingHorizontal: 20, paddingTop: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: Colors?.textPrimary || '#1F1F1F' },
  subGreeting: { fontSize: 14, color: Colors?.textSecondary || '#757575', marginTop: 4 },
  searchContainer: {
    margin: 20,
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchPlaceholder: { fontSize: 14, color: Colors?.textSecondary || '#757575' },
  sectionContainer: { marginTop: 10, marginBottom: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors?.textPrimary || '#1F1F1F' },
  horizontalList: { paddingLeft: 20, marginBottom: 15 },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: Colors?.surface || '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  featuredImage: {
    width: 100,
    height: '100%',
    minHeight: 110,
    borderRadius: 12,
  },
  featuredInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D97706',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
    marginTop: 4,
  },
  featuredDesc: {
    fontSize: 12,
    color: Colors?.textSecondary || '#757575',
    marginVertical: 2,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  card: {
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginRight: 15,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  promoBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },
  promoBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardImage: { width: '100%', height: 100, borderRadius: 12 },
  cardTitle: { fontWeight: 'bold', marginTop: 8, color: Colors?.textPrimary || '#1F1F1F' },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardPrice: { color: Colors?.primary || '#FF6B00', fontWeight: 'bold', fontSize: 14 },
  oldPrice: {
    fontSize: 11,
    color: Colors?.textSecondary || '#757575',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  addButton: {
    backgroundColor: Colors?.primary || '#FF6B00',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  exploreBanner: {
    backgroundColor: Colors?.surface || '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors?.border || '#E0E0E0',
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
    textAlign: 'center',
  },
  exploreSubtitle: {
    fontSize: 12,
    color: Colors?.textSecondary || '#757575',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: Colors?.primary || '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;