import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Header</Text> */}

      <Image
        style={{
          height: 70,
          width: 210,
          objectFit: 'cover',
          borderRadius: 8,
          //   borderWidth: 2,
          //   borderColor: 'black',
        }}
        source={require('../assets/mediscan.png')}
      />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A61E51',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
