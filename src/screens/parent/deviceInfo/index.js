import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';

const data = [
  {id: '1', name: 'An'},
  {id: '2', name: 'An'},
  {id: '3', name: 'An'},
];

export default function Index() {
  const [list, setList] = useState(data);

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
        <Text>No devce connect</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginTop: 10,
          marginHorizontal: 10,
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
          <Text style={{color: '#fff', fontSize: 20}}>{index}</Text>
        </View>
        <View style={{marginLeft: 10}}>
          {renderRow('Name', item.name)}
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
      {renderRow('Batery', '16%')}
      <Text style={{fontSize: 18, marginTop: 15}}>List device's apps:</Text>
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
  },
  row: {flexDirection: 'row'},
  rowTitle: {fontWeight: 'bold', fontSize: 20},
  rowValue: {fontSize: 20, marginLeft: 10},
});
