// import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import CameraComponent from './components/CameraComponent';

export default function App() {
  const [showCamera, setShowCamera] = useState(false);

  const handleButtonClick = () => {
    setShowCamera(true);
  };
  return (
    <View style={styles.app__container}>
      {!showCamera && (
        <View style={styles.header__container}>
          <Header />
        </View>
      )}
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {!showCamera ? (
              <TouchableOpacity onPress={handleButtonClick}>
                <Text>Open Camera</Text>
              </TouchableOpacity>
            ) : (
              <CameraComponent onClose={() => setShowCamera(false)} />
            )}
          </View>
        </SafeAreaView>
      </View>
      {/* <StatusBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  app__container: {
    position: 'relative',
    flex: 1,
  },
  header__container: {
    // height: 500,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
