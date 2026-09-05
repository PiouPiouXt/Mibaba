import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/Colors';

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  isDestructive = false,
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <View style={styles.menuTextContainer}>
        <Text
          style={[
            styles.menuTitle,
            isDestructive && { color: '#EF4444' },
          ]}
        >
          {title}
        </Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  const userProfile = {
    name: 'Tsilavina Nirina',
    email: 'tsilavina@example.com',
    phone: '+261 34 00 000 00',
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userProfile.name.charAt(0)}
            </Text>
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
          <Text style={styles.userPhone}>{userProfile.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <View style={styles.card}>
            <MenuItem
              icon="👤"
              title="Informations personnelles"
              subtitle="Modifier le nom, téléphone..."
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="📍"
              title="Adresses de livraison"
              subtitle="Gérer vos adresses enregistrées"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="💳"
              title="Moyens de paiement"
              subtitle="Mobile Money, espèces..."
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences & Aide</Text>
          <View style={styles.card}>
            <MenuItem
              icon="🔔"
              title="Notifications"
              subtitle="Offres, suivis de commandes"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="❓"
              title="Centre d'aide / FAQ"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="📄"
              title="Conditions d'utilisation"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.card}>
            <MenuItem
              icon="🚪"
              title="Déconnexion"
              onPress={handleLogout}
              isDestructive
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.background || '#F8F9FA',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors?.border || '#E0E0E0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors?.primary || '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  userEmail: {
    fontSize: 14,
    color: Colors?.textSecondary || '#757575',
    marginTop: 2,
  },
  userPhone: {
    fontSize: 13,
    color: Colors?.textSecondary || '#757575',
    marginTop: 2,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors?.textSecondary || '#757575',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: Colors?.surface || '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors?.textPrimary || '#1F1F1F',
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors?.textSecondary || '#757575',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: Colors?.textSecondary || '#757575',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors?.border || '#E0E0E0',
  },
});

export default ProfileScreen;