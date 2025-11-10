import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';
import React, { useCallback, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { translateText, getAvailableLanguages } from '../../lib/services/translationService';
import { ErrorHandler } from '../../lib/services/errorHandler';

const LANGUAGES = getAvailableLanguages();
const MAX_TRANSLATION_LENGTH = 5000;

// Función helper para códigos de idioma (fuera del componente para mejor rendimiento)
const getLanguageCodeForSpeech = (language: string): string => {
  const codes: Record<string, string> = {
    'Español': 'es',
    'Inglés': 'en',
    'Francés': 'fr',
    'Alemán': 'de',
    'Italiano': 'it',
    'Portugués': 'pt',
  };
  return codes[language] || 'es';
};

export default function TranslatorScreen() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Español');
  const [targetLanguage, setTargetLanguage] = useState('Inglés');
  const [loading, setLoading] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) {
      Alert.alert('Error', 'Por favor, ingresa un texto para traducir');
      return;
    }

    if (sourceText.length > MAX_TRANSLATION_LENGTH) {
      Alert.alert('Error', `El texto no puede exceder ${MAX_TRANSLATION_LENGTH} caracteres`);
      return;
    }

    if (sourceLanguage === targetLanguage) {
      Alert.alert('Error', 'Los idiomas de origen y destino deben ser diferentes');
      return;
    }

    setLoading(true);
    try {
      const result = await translateText(sourceText, sourceLanguage, targetLanguage);
      setTranslatedText(result.translatedText);
    } catch (error: any) {
      const appError = ErrorHandler.formatTranslationError(error);
      ErrorHandler.log(appError);
      Alert.alert(appError.message, appError.details);
    } finally {
      setLoading(false);
    }
  }, [sourceText, sourceLanguage, targetLanguage]);

  const handleSwapLanguages = useCallback(() => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    // También intercambiar textos si hay traducción
    if (translatedText) {
      const tempText = sourceText;
      setSourceText(translatedText);
      setTranslatedText(tempText);
    }
  }, [sourceLanguage, targetLanguage, sourceText, translatedText]);

  const handleCopy = useCallback(async () => {
    if (translatedText) {
      await Clipboard.setStringAsync(translatedText);
      Alert.alert('Éxito', 'Texto copiado al portapapeles');
    }
  }, [translatedText]);

  const handleSpeak = useCallback(() => {
    if (!translatedText) {
      Alert.alert('Error', 'No hay texto traducido para leer');
      return;
    }

    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(translatedText, {
        language: getLanguageCodeForSpeech(targetLanguage),
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => {
          setIsSpeaking(false);
          Alert.alert('Error', 'No se pudo leer el texto');
        },
      });
    }
  }, [translatedText, targetLanguage, isSpeaking]);

  const handlePhraseSelect = useCallback((phrase: string) => {
    setSourceText(phrase);
  }, []);

  const LanguageModal = React.memo(({ visible, onClose, onSelect, currentLanguage }: {
    visible: boolean;
    onClose: () => void;
    onSelect: (lang: string) => void;
    currentLanguage: string;
  }) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Idioma</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.modalOption,
                  currentLanguage === lang && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  onSelect(lang);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    currentLanguage === lang && styles.modalOptionTextSelected,
                  ]}
                >
                  {lang}
                </Text>
                {currentLanguage === lang && (
                  <MaterialCommunityIcons name="check" size={20} color={Colors.blue} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Traductor</Text>
          <Text style={styles.subtitle}>Comunícate sin barreras de idioma</Text>
        </View>

        {/* Language Selection */}
        <View style={styles.languageSection}>
          <View style={styles.languageSelector}>
            <Text style={styles.labelLanguage}>De:</Text>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setShowSourceModal(true)}
            >
              <Text style={styles.languageButtonText}>{sourceLanguage}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={Colors.blue} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.swapButton} onPress={handleSwapLanguages}>
            <MaterialCommunityIcons name="swap-horizontal" size={24} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.languageSelector}>
            <Text style={styles.labelLanguage}>A:</Text>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => setShowTargetModal(true)}
            >
              <Text style={styles.languageButtonText}>{targetLanguage}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={Colors.blue} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Text Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Texto a Traducir</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe o pega el texto aquí..."
            placeholderTextColor={Colors.textSecondary}
            value={sourceText}
            onChangeText={setSourceText}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Translate Button */}
        <TouchableOpacity
          style={[styles.translateButton, loading && styles.translateButtonDisabled]}
          onPress={handleTranslate}
          disabled={loading}
        >
          {loading ? (
            <>
              <ActivityIndicator color={Colors.white} size="small" />
              <Text style={styles.translateButtonText}>Traduciendo...</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="translate" size={20} color={Colors.white} />
              <Text style={styles.translateButtonText}>Traducir</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Translation Result */}
        {translatedText && (
          <View style={styles.section}>
            <View style={styles.translationHeader}>
              <Text style={styles.sectionTitle}>Traducción</Text>
              <View style={styles.translationActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                  <MaterialCommunityIcons name="content-copy" size={18} color={Colors.blue} />
                  <Text style={styles.actionButtonText}>Copiar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleSpeak}>
                  <MaterialCommunityIcons
                    name={isSpeaking ? 'stop' : 'volume-high'}
                    size={18}
                    color={isSpeaking ? Colors.error : Colors.green}
                  />
                  <Text style={styles.actionButtonText}>{isSpeaking ? 'Detener' : 'Leer'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.translationBox}>
              <Text style={styles.translationText}>{translatedText}</Text>
            </View>
          </View>
        )}

        {/* Common Phrases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frases Comunes en Perú</Text>
          <View style={styles.phrasesList}>
            {['Hola', '¿Cuánto cuesta?', 'Ceviche, por favor', '¿Dónde está la plaza?', 'Gracias', 'De nada', 'Adiós', '¡Ojo!'].map(
              (phrase) => (
                <TouchableOpacity
                  key={phrase}
                  style={styles.phraseButton}
                  onPress={() => handlePhraseSelect(phrase)}
                >
                  <Text style={styles.phraseText}>{phrase}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </ScrollView>

      {/* Language Selection Modals */}
      <LanguageModal
        visible={showSourceModal}
        onClose={() => setShowSourceModal(false)}
        onSelect={setSourceLanguage}
        currentLanguage={sourceLanguage}
      />
      <LanguageModal
        visible={showTargetModal}
        onClose={() => setShowTargetModal(false)}
        onSelect={setTargetLanguage}
        currentLanguage={targetLanguage}
      />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  languageSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
  },
  languageSelector: {
    flex: 1,
  },
  labelLanguage: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  languageButton: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageButtonText: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.blue,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: Colors.backgroundSecondary,
    color: Colors.textPrimary,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 120,
    fontSize: 14,
  },
  translateButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.blue,
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.blueDark,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  translateButtonDisabled: {
    opacity: 0.6,
  },
  translateButtonText: {
    color: Colors.white,
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  translationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  translationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  actionButtonText: {
    color: Colors.blue,
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 12,
  },
  translationBox: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  translationText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  phrasesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  phraseButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.blueDark,
  },
  phraseText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalOptionSelected: {
    backgroundColor: Colors.backgroundSecondary,
  },
  modalOptionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  modalOptionTextSelected: {
    color: Colors.blue,
    fontWeight: '600',
  },
});