import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import AppInput from "../../components/input";
import { getApiBaseUrl, saveApiBaseUrl } from "@/shared/api/config";

interface SetupFormProps {
  onSetupComplete: () => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onSetupComplete }) => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getApiBaseUrl().then((baseUrl) => {
      setUrl(baseUrl);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setError("");
    if (!url.trim()) {
      setError("Please enter the API base URL");
      return;
    }
    setSaving(true);
    try {
      await saveApiBaseUrl(url);
      onSetupComplete();
    } catch (e: any) {
      setError(`Save failed: ${e?.message || "unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View
      className="p-4 rounded-3xl border border-black/20"
      style={{ width: "95%", alignSelf: "center", backgroundColor: "black" }}
    >
      <Text className="text-white text-lg font-semibold text-center mb-6">
        Env Setup
      </Text>

      <AppInput
        label="API Base URL"
        value={url}
        onChangeText={setUrl}
        placeholder="https://api.example.com/api"
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        inputTextClassName="text-sm"
        labelClassName="text-lg"
      />

      {error ? (
        <Text className="text-red-500 text-center mb-2">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.85}
        className="bg-yellow rounded-lg py-3 items-center mb-8"
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-xl">
            Save
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-white text-xs text-center">
        {loading ? "Loading..." : "Secure access to Vintage Bar POS"}
      </Text>
    </View>
  );
};

export default SetupForm;