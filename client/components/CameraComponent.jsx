import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';

const ServerLink =
  'https://a703-2001-df7-be80-12f8-c52a-9324-a4fc-d541.ngrok-free.app';

const CameraComponent = ({ onClose }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    // if (cameraRef) {
    //   try {
    //     const data = await cameraRef.current.takePictureAsync();
    //     console.log(data);
    //     setImage(data.uri);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
        });

        const formData = new FormData();
        formData.append('image', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await fetch(`${ServerLink}/files`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        // setImage(photo.uri);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  // const aspectRatio = 16 / 9;
  const retakePicture = () => {};

  return (
    <View style={styles.container}>
      <View>{/* <Text>Hello</Text> */}</View>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        ></Camera>
      ) : (
        <Image
          source={{ uri: image }}
          style={styles.camera}
          onPress={retakePicture}
        />
      )}
      <View style={{ position: 'relative' }}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderWidth: 2,
              width: Dimensions.get('window').width,
              backgroundColor: '#f0f0f0',
              position: 'absolute',
            }}
          >
            <Button
              title={'Re-take'}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <Button title={'Save'} icon="check" />
          </View>
        ) : (
          
          <Button
            icon={'camera'}
            onPress={takePicture}
          />
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close Camera</Text>
        </TouchableOpacity>
      </View>

      <StatusBar />
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  camera: {
    // flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    height: Dimensions.get('window').height - 120,
    aspectRatio: 16 / 19,
  },
});
