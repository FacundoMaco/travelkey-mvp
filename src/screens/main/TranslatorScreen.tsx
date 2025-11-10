// Pantalla de traductor de TravelKey
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TranslatorScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('es');
  const [toLanguage, setToLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'Inglés', flag: '🇺🇸' },
    { code: 'fr', name: 'Francés', flag: '🇫🇷' },
    { code: 'de', name: 'Alemán', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portugués', flag: '🇵🇹' },
    { code: 'ja', name: 'Japonés', flag: '🇯🇵' },
    { code: 'ko', name: 'Coreano', flag: '🇰🇷' },
    { code: 'zh', name: 'Chino', flag: '🇨🇳' },
  ];

  const getLanguageName = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : 'Desconocido';
  };

  const getLanguageFlag = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.flag : '🌐';
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Por favor ingresa texto para traducir');
      return;
    }

    setIsTranslating(true);
    
    // Simular traducción (en la versión real se integraría con ML Kit)
    setTimeout(() => {
      const mockTranslations: { [key: string]: string } = {
        'hola': 'hello',
        'gracias': 'thank you',
        'por favor': 'please',
        'disculpe': 'excuse me',
        '¿dónde está?': 'where is it?',
        '¿cuánto cuesta?': 'how much does it cost?',
        'necesito ayuda': 'i need help',
        'baño': 'bathroom',
        'restaurante': 'restaurant',
        'hotel': 'hotel',
      };

      const lowerInput = inputText.toLowerCase().trim();
      const translation = mockTranslations[lowerInput] || 
        `[Traducción de "${inputText}" a ${getLanguageName(toLanguage)}]`;
      
      setTranslatedText(translation);
      setIsTranslating(false);
    }, 1500);
  };

  const handleSwapLanguages = () => {
    const tempFrom = fromLanguage;
    const tempTo = toLanguage;
    setFromLanguage(tempTo);
    setToLanguage(tempFrom);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
  };

  const quickPhrases = [
    'Hola',
    'Gracias',
    '¿Dónde está el baño?',
    '¿Cuánto cuesta?',
    'Necesito ayuda',
    '¿Hablas inglés?',
    'No entiendo',
    'Disculpe',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Selector de idiomas */}
          <View style={styles.languageSelector}>
            <View style={styles.languageContainer}>
              <Text style={styles.languageLabel}>De</Text>
              <View style={styles.languageButton}>
                <Text style={styles.languageFlag}>{getLanguageFlag(fromLanguage)}</Text>
                <Text style={styles.languageName}>{getLanguageName(fromLanguage)}</Text>
                <Ionicons name="chevron-down" size={16} color="#a0a0a0" />
              </View>
            </View>

            <TouchableOpacity style={styles.swapButton} onPress={handleSwapLanguages}>
              <Ionicons name="swap-horizontal" size={24} color="#0f3460" />
            </TouchableOpacity>

            <View style={styles.languageContainer}>
              <Text style={styles.languageLabel}>A</Text>
              <View style={styles.languageButton}>
                <Text style={styles.languageFlag}>{getLanguageFlag(toLanguage)}</Text>
                <Text style={styles.languageName}>{getLanguageName(toLanguage)}</Text>
                <Ionicons name="chevron-down" size={16} color="#a0a0a0" />
              </View>
            </View>
          </View>

          {/* Área de traducción */}
          <View style={styles.translationArea}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Texto a traducir</Text>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Escribe aquí..."
                placeholderTextColor="#666"
                multiline
                textAlignVertical="top"
              />
              {inputText.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                  <Ionicons name="close-circle" size={20} color="#a0a0a0" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[styles.translateButton, isTranslating && styles.translateButtonDisabled]}
              onPress={handleTranslate}
              disabled={isTranslating}
            >
              <Ionicons 
                name={isTranslating ? "hourglass-outline" : "arrow-down"} 
                size={20} 
                color="#ffffff" 
              />
              <Text style={styles.translateButtonText}>
                {isTranslating ? 'Traduciendo...' : 'Traducir'}
              </Text>
            </TouchableOpacity>

            <View style={styles.outputContainer}>
              <Text style={styles.outputLabel}>Traducción</Text>
              <View style={styles.translatedTextContainer}>
                <Text style={styles.translatedText}>
                  {translatedText || 'La traducción aparecerá aquí...'}
                </Text>
                {translatedText && (
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons name="copy-outline" size={16} color="#0f3460" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Frases rápidas */}
          <View style={styles.quickPhrasesSection}>
            <Text style={styles.quickPhrasesTitle}>Frases Útiles</Text>
            <View style={styles.quickPhrasesContainer}>
              {quickPhrases.map((phrase, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickPhraseButton}
                  onPress={() => setInputText(phrase)}
                >
                  <Text style={styles.quickPhraseText}>{phrase}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Información */}
          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#0f3460" />
            <Text style={styles.infoText}>
              Esta función utiliza traducción offline para mayor privacidad y velocidad.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  languageContainer: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
    gap: 8,
  },
  languageFlag: {
    fontSize: 16,
  },
  languageName: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16213e',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  translationArea: {
    marginBottom: 24,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#0f3460',
    minHeight: 100,
  },
  clearButton: {
    position: 'absolute',
    top: 30,
    right: 12,
  },
  translateButton: {
    backgroundColor: '#0f3460',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  translateButtonDisabled: {
    opacity: 0.6,
  },
  translateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  outputContainer: {
    marginBottom: 16,
  },
  outputLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  translatedTextContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#0f3460',
    position: 'relative',
  },
  translatedText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22,
  },
  copyButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  quickPhrasesSection: {
    marginBottom: 24,
  },
  quickPhrasesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  quickPhrasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickPhraseButton: {
    backgroundColor: '#16213e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  quickPhraseText: {
    fontSize: 14,
    color: '#0f3460',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#a0a0a0',
    flex: 1,
    lineHeight: 20,
  },
});

export default TranslatorScreen;
