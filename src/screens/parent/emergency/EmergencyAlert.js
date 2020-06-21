import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const ChildNotificationScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    var alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      alarm.setVolume(1);
      alarm.play();
    });
    return () => {
      alarm.stop();
      alarm.release();
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('assets/images/sos-icon.jpg')}
          style={styles.image}
        />
      </View>
      <Text style={styles.messageText}>Your child is in danger</Text>
      <View style={styles.gobackBtn}>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default ChildNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    width: 300,
    marginBottom: 30,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  messageText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
  gobackBtn: {
    marginTop: 30,
    width: 100,
  },
});
