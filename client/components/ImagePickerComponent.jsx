import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const ImagePickerComponent = ({ onSelectImage, loading }) => {
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      // console.log(result.assets[0].uri);

      if (!result.canceled) {
        onSelectImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.disabledButton]}
      onPress={pickImage}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Loading Image...' : 'Select Image'}
      </Text>
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
