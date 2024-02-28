import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';

const CameraComponent = () => {
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
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
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
          onClick={retakePicture}
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
            title={'Take a picture'}
            icon={'camera'}
            onPress={takePicture}
          />
        )}
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
