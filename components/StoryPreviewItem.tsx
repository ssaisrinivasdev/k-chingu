import { LinearGradient } from 'expo-linear-gradient';
import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList , NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity  } from 'react-native';
import ExpoFastImage from 'expo-fast-image';

const window = Dimensions.get('window');

const StoryPreviewItem = () => {

  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
            <LinearGradient
                colors={['#A7337E', '#8246AF', '#4265C3']}
                start={{ x: 0.75, y: 0.25 }}
                end={{ x: 0.25, y: 0.75 }}
                style={{
                    width: '100%',
                    height: '100%'
            }}/>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.imageWrapper}>
                    <ExpoFastImage style={styles.image}
                        source={{ uri: "https://i.mydramalist.com/1wmQxQ_2c.jpg" }} />
                </TouchableOpacity>
            </View>
      </View>
      <View style={styles.username}>
                <Text numberOfLines={1} style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#fff'
                }}>@Sai</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 7.5,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    username: {
        position: 'absolute',
        bottom: 0,
        left: (64 - 74) / 2,
        width: 74,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemWrapper: {
        position: 'relative',
        height: 64,
        width: 64,
        overflow: 'hidden',
        borderRadius: 999,
    },
    image: {
        borderRadius: 999,
        width: '100%',
        height: '100%',
    },
    imageWrapper: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        borderRadius: 999
    },
    imageContainer: {
        borderRadius: 999,
        width: 60,
        height: 60,
        padding: 2,
        backgroundColor: '#000',
        top: 2,
        left: 2,
        position: 'absolute'
    },
});

export default StoryPreviewItem;
