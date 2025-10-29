import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LANGUAGES = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués'];

export default function TranslatorScreen() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Español');
  const [targetLanguage, setTargetLanguage] = useState('Inglés');

  const handleTranslate = () => {
    // TODO: Call translation API
    // For now, show a placeholder
    setTranslatedText('Traducción será aquí (integrando Google Translate o similar)');
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Traductor Offline</Text>
        <Text style={styles.subtitle}>Comunícate sin barreras de idioma</Text>
      </View>

      {/* Language Selection */}
      <View style={styles.languageSection}>
        <View style={styles.languageSelector}>
          <Text style={styles.labelLanguage}>De:</Text>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageButtonText}>{sourceLanguage}</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#00d4ff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.swapButton} onPress={handleSwapLanguages}>
          <MaterialCommunityIcons name="swap-horizontal" size={24} color="#00d4ff" />
        </TouchableOpacity>

        <View style={styles.languageSelector}>
          <Text style={styles.labelLanguage}>A:</Text>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageButtonText}>{targetLanguage}</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#00d4ff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Text Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Texto a Traducir</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe o pega el texto aquí..."
          placeholderTextColor="#a0a0a0"
          value={sourceText}
          onChangeText={setSourceText}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Translate Button */}
      <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
        <MaterialCommunityIcons name="translate" size={20} color="#fff" />
        <Text style={styles.translateButtonText}>Traducir</Text>
      </TouchableOpacity>

      {/* Translation Result */}
      {translatedText && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traducción</Text>
          <View style={styles.translationBox}>
            <Text style={styles.translationText}>{translatedText}</Text>
            <TouchableOpacity style={styles.copyButton}>
              <MaterialCommunityIcons name="content-copy" size={18} color="#00d4ff" />
              <Text style={styles.copyButtonText}>Copiar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Common Phrases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frases Comunes en Perú</Text>
        <View style={styles.phrasesList}>
          {['Hola', '¿Cuánto cuesta?', 'Ceviche, por favor', '¿Dónde la plaza?', 'Gracias', 'De nada', 'Adiós', '¡Ojo!'].map(
            (phrase) => (
              <TouchableOpacity key={phrase} style={styles.phraseButton}>
                <Text style={styles.phraseText}>{phrase}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  languageSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  languageSelector: {
    flex: 1,
  },
  labelLanguage: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 6,
  },
  languageButton: {
    backgroundColor: '#16213e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00d4ff',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
    height: 120,
    fontSize: 14,
  },
  translateButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#0f3460',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  translateButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  translationBox: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  translationText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  copyButtonText: {
    color: '#00d4ff',
    marginLeft: 6,
    fontWeight: '500',
    fontSize: 12,
  },
  phrasesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  phraseButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  phraseText: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: '500',
  },
});
