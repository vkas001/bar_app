import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AppInput from './input'
import { saveApiConfig } from '../shared/storage/async'

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
    const trimmed = apiUrl.trim();
    if (!trimmed) {
      setError("Please enter a valid Api URL");
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setError('URL must start with http:// or https://');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await saveApiConfig({ url: trimmed });
      onApiSaved(); // ← tells the parent to switch to LoginForm
    } catch {
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