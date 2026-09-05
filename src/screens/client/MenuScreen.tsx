import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { Product } from '../../models/types';
import { useCart } from '../../context/CartContext';

const CATEGORIES = [
  { id: 'all', name: 'Toutes', icon: '🍽️' },
  { id: 'Pizza', name: 'Pizza', icon: '🍕' },
  { id: 'Burger', name: 'Burger', icon: '🍔' },
  { id: 'Boissons', name: 'Boissons', icon: '🥤' },
  { id: 'Desserts', name: 'Desserts', icon: '🍰' },
];

const MENU_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Sauce tomate, mozzarella, basilic fraîchement coupé',
    price: 8000,
    category: 'Pizza',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
  },
  {
    id: '2',
    name: 'Burger Classique',
    description: 'Steak haché pur bœuf, fromage fondant, sauce spéciale',
    price: 7000,
    category: 'Burger',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Coca-Cola 50cl',
    description: 'Boisson gazeuse rafraîchissante glacée',
    price: 3000,
    category: 'Boissons',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Tarte au Citron',
    description: 'Pâte sablée, crème citron acidulée et meringue',
    price: 5000,
    category: 'Desserts',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Pizza 4 Fromages',
    description: 'Mozzarella, gorgonzola, parmesan et chèvre',
    price: 10000,
    category: 'Pizza',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Burger Double Cheese',
    description: 'Double steak haché, double cheddar, oignons grillés',
    price: 9500,
    category: 'Burger',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
  },
];

export const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    Alert.alert('Ajouté !', `${product.name} a été ajouté à votre panier.`);
  };

  const filteredProducts = MENU_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Notre Carte 📜</Text>
          <Text style={styles.subGreeting}>Découvrez tous nos plats disponibles</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Rechercher un plat, une boisson..."
            style={styles.searchInput}
            placeholderTextColor={Colors?.textSecondary || '#757575'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Catégories</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Plats disponibles</Text>
          <TouchableOpacity onPress={() => setSelectedCategory('all')}>
            <Text style={{ color: Colors?.primary || '#FF6B00', fontWeight: 'bold' }}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsList}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <View key={item.id} style={styles.listCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.listCardImage}
                />
                <View style={styles.listCardDetails}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.priceAndAction}>
                    <Text style={styles.cardPrice}>
                      {item.price.toLocaleString()} Ar
                    </Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text style={styles.addButtonText}>+ Ajouter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>Aucun plat trouvé dans cette catégorie</Text>
          )}
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
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: { fontSize: 14, color: Colors?.textPrimary || '#1F1F1F' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors?.textPrimary || '#1F1F1F' },
  horizontalList: { paddingLeft: 20, marginBottom: 15 },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors?.surface || '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors?.border || '#E0E0E0',
  },
  categoryCardActive: {
    backgroundColor: Colors?.primary || '#FF6B00',
    borderColor: Colors?.primary || '#FF6B00',
  },
  categoryIcon: { marginRight: 6, fontSize: 16 },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  categoryTextActive: { color: Colors?.surface || '#FFFFFF' },
  productsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  listCardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  listCardDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  cardDescription: {
    fontSize: 12,
    color: Colors?.textSecondary || '#757575',
    marginTop: 2,
  },
  priceAndAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardPrice: {
    color: Colors?.primary || '#FF6B00',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addButton: {
    backgroundColor: Colors?.primary || '#FF6B00',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  noResults: {
    color: Colors?.textSecondary || '#757575',
    fontStyle: 'italic',
    paddingVertical: 20,
    textAlign: 'center',
  },
});

export default MenuScreen;