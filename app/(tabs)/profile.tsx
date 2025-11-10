import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../lib/AuthContext';
import { auth } from '../../lib/firebase';

const INTERESTS = ['Arqueología', 'Gastronomía Peruana', 'Aventura', 'Naturaleza', 'Artesanía', 'Cultura Local'];
const BUDGETS = [
  { label: 'Presupuesto Bajo (S/. < 100/día)', value: 'low' },
  { label: 'Presupuesto Medio (S/. 100-300/día)', value: 'medium' },
  { label: 'Presupuesto Alto (S/. > 300/día)', value: 'high' },
];

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [age, setAge] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<'low' | 'medium' | 'high' | ''>('');
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSaveProfile = async () => {
    if (!age || selectedInterests.length === 0 || !selectedBudget) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      // TODO: Save profile to Firestore
      Alert.alert('Éxito', 'Perfil guardado correctamente.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/welcome');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mi Perfil</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Age Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu edad"
            placeholderTextColor={Colors.textSecondary}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
          />
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intereses (Selecciona al menos uno)</Text>
          <View style={styles.interestsGrid}>
            {INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestButton,
                  selectedInterests.includes(interest) && styles.interestButtonActive,
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest) && styles.interestTextActive,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presupuesto Diario</Text>
          {BUDGETS.map((budget) => (
            <TouchableOpacity
              key={budget.value}
              style={styles.budgetOption}
              onPress={() => setSelectedBudget(budget.value as 'low' | 'medium' | 'high')}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedBudget === budget.value && styles.radioButtonSelected,
                ]}
              />
              <Text style={styles.budgetLabel}>{budget.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Guardar Perfil</Text>
          )}
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue,
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.backgroundSecondary,
    color: Colors.textPrimary,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 14,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  interestButtonActive: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blueDark,
  },
  interestText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  interestTextActive: {
    color: Colors.white,
  },
  budgetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
  },
  radioButtonSelected: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  budgetLabel: {
    color: Colors.textPrimary,
    fontSize: 14,
  },
  saveButton: {
    margin: 20,
    backgroundColor: Colors.blue,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 20,
    marginTop: 0,
    backgroundColor: Colors.error,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
