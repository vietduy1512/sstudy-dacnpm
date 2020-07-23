import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {PARENT_ID} from 'constants/async-storage';
import axios from 'axios';

export default function Index() {
  const [list, setList] = useState([]);
  const [battery, setBattery] = useState(0);

  const getChildDeviceInfo = async () => {
    try {
      let parentId = parseInt(await AsyncStorage.getItem(PARENT_ID), 10);
      let info = await axios.get('/users/device-info', {
        params: {
          parentId,
        },
      });
      if (!!info) {
        setBattery(info.data.battery);

        let {apps} = info.data;
        setList(
          apps.map(app => {
            return {id: app, name: app};
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChildDeviceInfo();
  }, []);

  const renderRow = (title, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowTitle}>{title}:</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#a26',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 15}}>{index + 1}</Text>
        </View>
        <View style={{marginLeft: 10}}>
          {renderRow('Name', item.name)}
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <FlatList
        style={{flex: 1}}
        keyExtractor={item => item.id}
        data={list}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty()}
      />
    );
  };

  return (
    <ImageBackground
      imageStyle={styles.imgStyle}
      source={require('assets/images/bg-4.jpg')}
      style={styles.bg}>
      {renderRow('Batery', battery + ' %')}
      <Text style={{fontSize: 18, marginTop: 15, marginLeft: 20}}>
        Child's device applications
      </Text>
      {renderBody()}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgStyle: {opacity: 0.8},
  bg: {
    flex: 1,
    backgroundColor: '#A5A5A5',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  row: {flexDirection: 'row', marginHorizontal: 20, alignItems: "center"},
  rowTitle: {fontWeight: 'bold', fontSize: 17},
  rowValue: {fontSize: 17, marginLeft: 10},
});
