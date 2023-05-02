import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Clipboard,
  Alert,
  Text,
  StyleSheet
} from "react-native";
import CryptoJS from "react-native-crypto-js";

export default function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const encryptMessage = () => {
    const ciphertext = CryptoJS.AES.encrypt(message, key).toString();
    setEncryptedMessage(ciphertext);
  };

  const decryptMessage = () => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedMessage(plaintext);
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert(
      "Copiado al portapapeles",
      `Se ha copiado el texto "${text}" en el portapapeles.`
    );
  };

  const clearAll = () => {
    setMessage("");
    setKey("");
    setEncryptedMessage("");
    setDecryptedMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CryptMsg</Text>
      <Text style={styles.instructions}>
        Introduce el mensaje y la clave para cifrar y descifrar
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Introduce el mensaje"
        />
        <TextInput
          style={styles.input}
          onChangeText={setKey}
          value={key}
          placeholder="Introduce la clave"
        />
        <Button
          title="Cifrar mensaje"
          onPress={encryptMessage}
          color="#2196F3"
        />
        <TextInput
          style={styles.input}
          value={encryptedMessage}
          placeholder="Mensaje cifrado"
          editable={false}
        />
        <View style={styles.buttonRow}>
          <Button
            title="Copiar"
            onPress={() => copyToClipboard(encryptedMessage)}
            disabled={!encryptedMessage}
            color="#4CAF50"
          />
          <Button
            title="Descifrar mensaje"
            onPress={decryptMessage}
            color="#F44336"
          />
        </View>
        <TextInput
          style={styles.inputLarge}
          value={decryptedMessage}
          placeholder="Mensaje descifrado"
          editable={false}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
        <View style={styles.buttonRow}>
          <Button
            title="Copiar"
            onPress={() => copyToClipboard(decryptedMessage)}
            disabled={!decryptedMessage}
            color="#4CAF50"
          />
          <Button title="Limpiar todo" onPress={clearAll} color="#FF9800" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20
  },
  inputSection: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#9E9E9E",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  inputLarge: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  }
});
