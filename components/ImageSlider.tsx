import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList , NativeSyntheticEvent, NativeScrollEvent  } from 'react-native';

const images = [
    { id: 1, uri: 'https://i.mydramalist.com/1wmQxQ_2c.jpg' },
    { id: 2, uri: 'https://i.mydramalist.com/1wmQxQ_2c.jpg' },
    { id: 3, uri: 'https://i.mydramalist.com/1wmQxQ_2c.jpg' },
    { id: 4, uri: 'https://i.mydramalist.com/1wmQxQ_2c.jpg' },
    { id: 5, uri: 'https://i.mydramalist.com/1wmQxQ_2c.jpg' },
    { id: 6, uri: 'https://i.mydramalist.com/1wmQxQ_2c.jpg' },
  ];
const window = Dimensions.get('window');

const ImageSlider = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(selectedIndex);
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Image style={styles.image} source={{ uri: item.uri}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: window.width,
    height: 310,
  },
  image: {
    width: window.width-10,
    height: 300,
    borderRadius: 8,
    margin: 5
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default ImageSlider;
