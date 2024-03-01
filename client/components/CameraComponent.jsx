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
import ImagePickerComponent from './ImagePickerComponent';

const ServerLink = process.env.SERVER_LINK

const CameraComponent = ({ onClose }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const photo = await cameraRef.current.takePictureAsync();

        // Save the image to the gallery
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);

        setImage(photo.uri); // Save the image URI
        console.log('Image saved to gallery:', photo.uri);

        console.log(photo.uri);
        const formData = new FormData();
        formData.append('file', {
          uri: photo.uri,
          type: 'image/jpg',
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

        // setData(responseData.extracted_text);
        // setLoading(false);

        // setImage(photo.uri);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const onSelectImage = (uri) => {
    console.log(uri);
    if (uri) {
      postImage(uri);
    }
  };

  const postImage = async (uri) => {
    try {
      setLoading(true);
      // const photo = await cameraRef.current.takePictureAsync();

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpg',
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

      setLoading(false);

      // setImage(photo.uri);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const aspectRatio = 16 / 9;
  const retakePicture = () => {};

  return (
    <View style={styles.container}>
      {/* {loading ? (
        <View>
          <Text>Processing image...</Text>
        </View>
      ) : (
      )} */}

      <View>
        {data ? (
          <View>
            <Text>{data}</Text>
            <Button
              onPress={() => {
                setData(null);
              }}
              title={'Close'}
            ></Button>
          </View>
        ) : (
          <View>
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
            <View style={{ position: 'relative'}}>
              {image ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 2,
                    width: Dimensions.get('window').width,
                    backgroundColor: '#f0f0f0',
                    marginBottom:40
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
                <View style={styles.imageOptions}>
                  <Button icon={'camera'} onPress={takePicture} style={styles.cameraIcon}/>
                  {/* Image picker component */}
                  <ImagePickerComponent
                  onSelectImage={onSelectImage}
                  loading={loading}
                />
                </View>
              )}
              

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Button icon={'cross'} title={"exit"}>Close Camera</Button>
              </TouchableOpacity>
            </View>
          </View>
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
  data_container: {
    height: Dimensions.get('window').height - 120,
    backgroundColor: '#edd4c0',
  },
  cameraIcon: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    padding:3,
    height: 65,
    width: 65,
  },
  imageOptions:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    padding:40,
    marginLeft: 60,
  },
  closeButton:{
    position: 'absolute',
    bottom: 0,
    color: 'red',
  }
});
