import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { default as Icon, default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const AnimatedImage = Animated.createAnimatedComponent(Image);

interface NewsPostProps {
  navigation: any,
  image: string;
  title: string;
  description: string;
  time: string;
  postLink: string;
  category: string;
}

const window = Dimensions.get('window');


const NewsPost = ({ navigation, image, title, description, time: date, postLink, category }: NewsPostProps) => {

  const scale = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const [likePost, setLikePost] = useState(false)

  let lastTap: any = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
        setLikePost(true)
        scale.value = withSpring(1, undefined, (isFinished) => {
          if (isFinished) {
            scale.value = withDelay(300, withSpring(0));
          }
        });
    } else {
        lastTap = now;        
    }
  }

  const navigateScreenTo = (screen:string)=>{
    console.log(postLink)
    navigation.navigation.navigate(screen, {
      postLink: postLink
    });
  }

  return (
    <View style={styles.container}>
       <View style={styles.postHeader}>
                <TouchableOpacity
                    style={styles.infoWrapper}>
                    <Image style={styles.avatar}
                        source={{ uri: `https://yt3.googleusercontent.com/ytc/AL5GRJWKnQfI9e9ySsmv-73Gu34qV0b7r5Dy8Z9W6dij=s900-c-k-c0x00ffffff-no-rj` }} />
                    <Text style={{
                        color: '#fff',
                        fontWeight: '600'
                    }}>MyDramaList     🔹</Text>
                    <Text style={{color: '#0078D7'}}>{category}</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icons name="dots-vertical" size={24} color='#fff'/>
                </TouchableOpacity>
            </View>
      <View>
      <TouchableOpacity
        onPress={handleDoubleTap} 
        activeOpacity={1}>
        <ImageBackground style={styles.image} source={{ uri: image }} resizeMode={"contain"} >
          <LinearGradient
                    colors={['#0000','#0000', '#0000', '#000']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        width: '100%',
                        height: '100%'
                }}>
            <Animated.View style={{
                        width: '100%',
                        height: '100%'
                }}>
              <View style={{position: 'absolute', top: 0, left: 0, bottom: 30, right: 0, justifyContent: 'center', alignItems: 'center'}}>
                <AnimatedImage 
                  source={require('./assets/icons/heart.png')} 
                  style={[
                    {
                      shadowOffset: { width: 0, height: 20 },
                      shadowOpacity: 0.35,
                      shadowRadius: 35,
                      height: 100, 
                      width: 100
                    },
                    rStyle,
                  ]}></AnimatedImage>
              </View>         
            </Animated.View>
            <View style={{position: 'absolute', top: 0, left: 0, bottom: 10, justifyContent: 'flex-end', alignItems: 'center'}}>
              <Text style={{marginStart:10, fontWeight:"bold", fontSize:20, color:'#fff'}}>{title.trim()}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        </TouchableOpacity>
        {/* <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View> */}
      </View>
      <View style={styles.reactions}>
          <View style={styles.lReactions}>
              <TouchableOpacity 
                onPress={()=>{setLikePost(!likePost)}}>
                <Image
                  style={{
                      height: 24,
                      width: 24,
                      margin: 7
                  }}
                  source={ likePost ? require('./assets/icons/heart.png') : require('./assets/icons/heart-outlined.png')} />
              </TouchableOpacity>
              <TouchableOpacity >
                <View style={{margin: 7}}>
                  <Icon name="comment-outline" size={24} color="#dedede"/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                      height: 22,
                      width: 22,
                      margin: 7
                  }}
                  source={require('./assets/icons/send.png')} />
              </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={{margin: 7}}
            activeOpacity={0.7}
            onPress={()=>{navigateScreenTo("NewsPage")}}
            >
            <Text
              style={{
                  color:"#00b0f0"
              }}
              >Read More</Text>
          </TouchableOpacity>

      </View>
      <View style={{marginBottom: 40, marginStart:10, marginEnd:10,}}>
          <Text>
            <Text style={{
                      fontWeight: "600",
                      marginVertical: 5,
                      color: "#fff"
                  }}>MyDramaList</Text>
            <Text style={{
                fontWeight: "300",
                color: "#fff"
            }}> {description}</Text>
          </Text>
          <Text style={{
                fontWeight: "800",
                color: "#666666",
                marginTop: 5
            }}>{date}</Text>
          
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: window.width,
    backgroundColor: '#000'
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
},
infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
},
avatar: {
  borderColor: '#eee',
  borderWidth: 0.3,
  height: 36,
  width: 36,
  borderRadius: 36,
  marginRight: 10,
},
  image: {
    width:'100%',
    maxWidth: window.width,
    maxHeight: window.width,
    aspectRatio: 16/9,
    
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
  reactionsWrapper: {
      padding: 10
  },
  reactions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginStart:10,
      marginEnd:10,
      marginBottom:5
  },
  lReactions: {
    flexDirection: 'row',
    width: 24.3 * 3 + 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default NewsPost;


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}