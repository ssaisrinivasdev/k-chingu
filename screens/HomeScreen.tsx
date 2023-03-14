import { StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import TrendingDramas from '../components/TrendingDramas';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ImageSlider from '../components/ImageSlider';
import StoryPreviewItem from '../components/StoryPreviewItem';

const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width)
const SCREEN_HEIGHT: number = Math.round(Dimensions.get('window').height)

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const [screenNC,setScreenNC] = useState("following");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        {/* <Image  style={styles.image}  source={{ uri: "https://i.mydramalist.com/1wmQxQ_2c.jpg"}} /> */}
        <View style={styles.storyContainer}>
          <StoryPreviewItem />
          <StoryPreviewItem />
        </View>
        <View style={styles.btnActionWrapper}>
          <TouchableOpacity
              onPress={()=>{setScreenNC("following")}}
              style={screenNC=="following" ? styles.btnActionActive : styles.btnActionInActive}>
              <Text style={{
                  color: '#fff',
                  fontWeight: '600'
              }}>Following
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>{setScreenNC("kdramas")}}
              style={screenNC=="kdramas" ? styles.btnActionActive : styles.btnActionInActive}>
              <Text style={{
                  color: '#fff',
                  fontWeight: '600'
              }}>K Dramas
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>{setScreenNC("kpop")}}
              style={screenNC=="kpop" ? styles.btnActionActive : styles.btnActionInActive}>
              <Text style={{
                  color: '#fff',
                  fontWeight: '600'
              }}>K Pop
                  </Text>
          </TouchableOpacity>
        </View>
        {screenNC == "following" &&
          <TrendingDramas navigation={navigation}/>
        }
        {screenNC == "kdramas" &&
          <TrendingDramas navigation={navigation}/>
        }
        {screenNC == "kpop" &&
          <TrendingDramas navigation={navigation}/>
        }
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginStart: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  storyContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginStart: 10,
    alignContent: "flex-start"
  },
  btnActionActive: {
    flexDirection: 'row',
    height: 35,
    width: (SCREEN_WIDTH - 30 - 30 - 10) / 3,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#C682E5',
    borderWidth: 0
  },
  btnActionInActive: {
    flexDirection: 'row',
    height: 35,
    width: (SCREEN_WIDTH - 30 - 30 - 10) / 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#0000',
    borderWidth: 2,
    borderColor: "#C682E5"
  },
  btnActionWrapper:{
    flexDirection: 'row',
    marginTop: 20,
    marginStart: 10,
    marginEnd: 10
  }
});
