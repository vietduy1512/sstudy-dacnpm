import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Text, View, Button} from 'react-native';

const HomeScreen = () => {
  const [title, setTitle] = useState(null);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios.get('/data').then(res => {
      setTitle(res.data.title);
      setDataList(res.data.data);
    });
  }, []);

  let refresh = () => {
    axios
      .get('/data')
      .then(res => {
        setTitle(res.data.title);
        setDataList(res.data.data);
      })
      .catch(() => {
        setTitle(null);
        setDataList([]);
      });
  };

  return (
    <View className="text-center">
      <View>
        <Button title="Refresh" onPress={refresh} />
      </View>
      <Text>{title}</Text>
      {dataList.map(data => (
        <Text>{data}</Text>
      ))}
    </View>
  );
};

export default HomeScreen;
