import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { saveApiConfig } from '../shared/storage/async';
import AppInput from './input';

interface ApiSetupProps {
  onApiSaved: () => void;
}

export default function ApiSetup({
  onApiSaved
}: ApiSetupProps) {

  const [apiUrl, setApiUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    // console.log('[ApiSetup] handleSave called');
    const trimmed = apiUrl.trim();
    // console.log('[ApiSetup] API URL trimmed:', trimmed);
    
    if (!trimmed) {
      // console.warn('[ApiSetup] Validation failed: Empty URL');
      setError("Please enter a valid Api URL");
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      // console.warn('[ApiSetup] Validation failed: Invalid protocol');
      setError('URL must start with http:// or https://');
      return;
    }
    
    // console.log('[ApiSetup] Validation passed, proceeding to save');
    setError('');
    setLoading(true);
    try {
      // console.log('[ApiSetup] Saving API config with URL:', trimmed);
      await saveApiConfig({ url: trimmed });
      // console.log('[ApiSetup] API config saved successfully');
      onApiSaved();
    } catch (error) {
      // console.error('[ApiSetup] Error saving API config:', error);
      setError('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <View
      className=" p-6 rounded-3xl border border-black/20"
      style={{ width: "90%", alignSelf: "center", backgroundColor: "black" }}
    >
      <Text className="text-white text-lg font-semibold text-center mb-6">
        API Setup
      </Text>


      <AppInput
        label="API URL"
        value={apiUrl}
        onChangeText={(v: string) => {
          setApiUrl(v);
          setError('');
        }}
        placeholder="https://api.vintageBar.com"
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        inputTextClassName="text-lg"
        labelClassName="text-lg"
        containerClassName="mb-4"
      />

      {error ? (
        <Text className="text-red-500 text-center text-sm mb-4">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.85}
        disabled={loading}
        className="bg-yellow rounded-lg py-4 items-center mb-8 mt-8"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-base">
            Save API Settings
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-white text-xs text-center" >
        Secure access to Vintage Bar POS
      </Text>
    </View>
  )
}