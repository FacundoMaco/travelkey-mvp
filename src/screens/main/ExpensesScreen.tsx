// Pantalla de gestor de gastos de TravelKey
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../../types';

const ExpensesScreen: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    concept: '',
    amount: '',
    category: 'other' as Expense['category'],
    location: '',
  });

  const categories = [
    { value: 'accommodation', label: 'Hospedaje', icon: 'bed-outline', color: '#0f3460' },
    { value: 'food', label: 'Comida', icon: 'restaurant-outline', color: '#e74c3c' },
    { value: 'transport', label: 'Transporte', icon: 'car-outline', color: '#f39c12' },
    { value: 'entertainment', label: 'Entretenimiento', icon: 'game-controller-outline', color: '#9b59b6' },
    { value: 'shopping', label: 'Compras', icon: 'bag-outline', color: '#2ecc71' },
    { value: 'other', label: 'Otros', icon: 'ellipsis-horizontal-outline', color: '#95a5a6' },
  ];

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('user_expenses');
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const saveExpenses = async (expensesToSave: Expense[]) => {
    try {
      await AsyncStorage.setItem('user_expenses', JSON.stringify(expensesToSave));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const addExpense = () => {
    if (!newExpense.concept.trim() || !newExpense.amount.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      concept: newExpense.concept.trim(),
      amount: amount,
      category: newExpense.category,
      date: new Date().toISOString(),
      location: newExpense.location.trim() || undefined,
    };

    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    
    setNewExpense({ concept: '', amount: '', category: 'other', location: '' });
    setShowAddModal(false);
  };

  const deleteExpense = (id: string) => {
    Alert.alert(
      'Eliminar Gasto',
      '¿Estás seguro de que quieres eliminar este gasto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            setExpenses(updatedExpenses);
            saveExpenses(updatedExpenses);
          },
        },
      ]
    );
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getCategoryInfo = (category: Expense['category']) => {
    return categories.find(cat => cat.value === category) || categories[categories.length - 1];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => {
    const categoryInfo = getCategoryInfo(item.category);
    
    return (
      <View style={styles.expenseCard}>
        <View style={styles.expenseHeader}>
          <View style={styles.expenseCategory}>
            <Ionicons name={categoryInfo.icon as any} size={20} color={categoryInfo.color} />
            <Text style={styles.expenseCategoryText}>{categoryInfo.label}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteExpense(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#e74c3c" />
          </TouchableOpacity>
        </View>

        <Text style={styles.expenseConcept}>{item.concept}</Text>
        <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
        
        <View style={styles.expenseFooter}>
          <Text style={styles.expenseDate}>{formatDate(item.date)}</Text>
          {item.location && (
            <View style={styles.expenseLocation}>
              <Ionicons name="location-outline" size={14} color="#a0a0a0" />
              <Text style={styles.expenseLocationText}>{item.location}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con total */}
      <View style={styles.header}>
        <Text style={styles.title}>Gestor de Gastos</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Gastado</Text>
          <Text style={styles.totalAmount}>${getTotalExpenses().toFixed(2)}</Text>
        </View>
      </View>

      {/* Lista de gastos */}
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.expensesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#a0a0a0" />
            <Text style={styles.emptyTitle}>No hay gastos registrados</Text>
            <Text style={styles.emptySubtitle}>
              Comienza agregando tus gastos de viaje
            </Text>
          </View>
        }
      />

      {/* Botón flotante para agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Modal para agregar gasto */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nuevo Gasto</Text>
            <TouchableOpacity onPress={addExpense}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Concepto *</Text>
              <TextInput
                style={styles.input}
                value={newExpense.concept}
                onChangeText={(text) => setNewExpense(prev => ({ ...prev, concept: text }))}
                placeholder="¿En qué gastaste?"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Monto *</Text>
              <TextInput
                style={styles.input}
                value={newExpense.amount}
                onChangeText={(text) => setNewExpense(prev => ({ ...prev, amount: text }))}
                placeholder="0.00"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Categoría</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.value}
                    style={[
                      styles.categoryButton,
                      newExpense.category === category.value && styles.categoryButtonActive
                    ]}
                    onPress={() => setNewExpense(prev => ({ ...prev, category: category.value as Expense['category'] }))}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={20}
                      color={newExpense.category === category.value ? '#ffffff' : category.color}
                    />
                    <Text style={[
                      styles.categoryButtonText,
                      newExpense.category === category.value && styles.categoryButtonTextActive
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ubicación (opcional)</Text>
              <TextInput
                style={styles.input}
                value={newExpense.location}
                onChangeText={(text) => setNewExpense(prev => ({ ...prev, location: text }))}
                placeholder="¿Dónde fue el gasto?"
                placeholderTextColor="#666"
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    backgroundColor: '#16213e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  totalContainer: {
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f3460',
  },
  expensesList: {
    padding: 20,
  },
  expenseCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expenseCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expenseCategoryText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 4,
  },
  expenseConcept: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f3460',
    marginBottom: 8,
  },
  expenseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseDate: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  expenseLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expenseLocationText: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  cancelButton: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveButton: {
    fontSize: 16,
    color: '#0f3460',
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0f3460',
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#0f3460',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#0f3460',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
});

export default ExpensesScreen;
