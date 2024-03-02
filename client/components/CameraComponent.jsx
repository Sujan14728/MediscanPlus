import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import Header from './Header';

mock = {
  drug_name: 'Omee Capsule Omeprazole',
  is_drug_found: true,
  side_effects: 'Diarrhea Flatulence Headache Nausea Vomiting Abdominal pain',
  uses: 'Treatment of HeartburnTreatment of Gastroesophageal reflux disease (Acid reflux)Treatment of Peptic ulcer diseaseTreatment of Zollinger-Ellison syndrome',
};

const CameraComponent = ({ onClose }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(Camera.Constants.FlashMode.on);

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
        const photo = await cameraRef.current.takePictureAsync();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', {
          uri: photo.uri,
          type: 'image/jpg',
          name: 'photo.jpg',
        });

        const response = await fetch(`${process.env.SERVER_ADDRESS}/files`, {
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

        setData([responseData.uses, responseData.side_effects]);
        setLoading(false);
        console.log(loading);

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
      // const photo = await cameraRef.current.takePictureAsync();
      setLoading(true);

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpg',
        name: 'photo.jpg',
      });

      const response = await fetch(`${process.env.SERVER_ADDRESS}/files`, {
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
      setData(responseData.extracted_text);
      setLoading(false);

      // setImage(photo.uri);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const aspectRatio = 16 / 9;
  const retakePicture = () => {};

  const toggleFlashMode = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.torch);
    } else {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };
  // console.log(flash);
  const toggleCameraFace = () => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
    } else {
      setType(Camera.Constants.Type.back);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View style={styles.header__container}>
            <Header />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={'#000'} />
          </View>
        </View>
      ) : (
        <View>
          {data ? (
            <View>
              <View style={styles.header__container}>
                <Header />
              </View>
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
              <View style={styles.topSection}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity>
                    <Button
                      icon={'flash'}
                      color={
                        flash === Camera.Constants.FlashMode.torch
                          ? '#fff'
                          : '#272626'
                      }
                      onPress={toggleFlashMode}
                    ></Button>
                  </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', right: 10 }}>
                  <TouchableOpacity>
                    <Button
                      icon={'cross'}
                      color={'#fff'}
                      onPress={onClose}
                    ></Button>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cameraContainer}>
                {!image ? (
                  <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                  >
                    <View></View>
                    <View style={styles.bottomSection}>
                      {image ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderWidth: 2,
                            width: Dimensions.get('window').width,
                            backgroundColor: '#f0f0f0',
                            marginBottom: 40,
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
                          {/* Image picker component */}
                          <ImagePickerComponent
                            onSelectImage={onSelectImage}
                            loading={loading}
                          />
                          <Button
                            // icon={'camera'}
                            onPress={takePicture}
                            style={styles.cameraIcon}
                          />
                          <Button
                            icon={'cycle'}
                            onPress={toggleCameraFace}
                            color={'#fff'}
                            // style={styles.cameraIcon}
                          />
                        </View>
                      )}
                    </View>
                  </Camera>
                ) : (
                  <Image
                    source={{ uri: image }}
                    style={styles.camera}
                    onPress={retakePicture}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      )}

      <StatusBar />
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  header__container: {
    backgroundColor: '#A61E51',
    padding: 15,
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  cameraContainer: {
    // position: 'absolute',
    // height: 0,
    // justifyContent: 'center',
    // height: Dimensions.get('window').height,
    flexDirection: 'column',
  },
  camera: {
    // flex: 1,
    // height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
    aspectRatio: 13 / 19,
    justifyContent: 'space-between',
    // alignSelf: 'center',
    // borderColor: '#ff0000',
    // borderWidth: 8,
  },
  topSection: {
    // flex: 1,
    height: 50,
    // position: 'relative',
    flexDirection: 'row',
    gap: 30,
    backgroundColor: '#000',
    // marginTop: 40,
  },
  bottomSection: {
    backgroundColor: '#00000040',
    height: 120,
  },
  data_container: {
    height: Dimensions.get('window').height - 120,
    backgroundColor: '#edd4c0',
  },
  cameraIcon: {
    // borderColor: 'black',
    // borderWidth: 2,
    borderRadius: 100,
    padding: 3,
    height: 80,
    width: 80,
    backgroundColor: '#fff',
  },
  imageOptions: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 40,
    paddingHorizontal: 80,
  },
});
