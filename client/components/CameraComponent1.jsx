// CameraComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import axios from 'axios';

const CameraComponent = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const takePicture = async ({ camera }) => {
    if (camera) {
      const photo = await camera.takePhoto({
        quality: '0.5',
        base64: true,
      });

      setCapturedImage(photo.base64);
    }
  };

  const uploadImage = async () => {
    try {
      if (capturedImage) {
        // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
        const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
          image: capturedImage,
        });

        console.log('Image uploaded successfully:', response.data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        cameraConfig={{ cameraId: 'back' }}
        frameProcessor={takePicture}
      />
      {capturedImage ? (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text>Image Captured!</Text>
          <TouchableOpacity onPress={uploadImage}>
            <Text>Upload Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={takePicture}
          style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
        >
          <Text>Capture Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CameraComponent;
