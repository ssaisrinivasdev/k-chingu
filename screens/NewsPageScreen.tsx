import { StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import TrendingDramas from '../components/TrendingDramas';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import ImageSlider from '../components/ImageSlider';
import StoryPreviewItem from '../components/StoryPreviewItem';
import { RouteProp } from '@react-navigation/native';

const cheerio = require("cheerio");
import axios from 'axios';
import { INewsPageContent } from '../interfaces/INewsPageContent';
import { WebView } from 'react-native-webview';

const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width)
const styling = `<style>
body {
  margin: 0;
  padding: 0;
}
</style><body>`

interface INewsPageScreen{
    navigation : RootStackScreenProps<'NewsPage'>,
    route: RouteProp<{ params: { postLink:string } }>
}

export default function NewsPageScreen({navigation, route}: any ) {

    const [isLoading, setIsLoading] = useState(true);
    const [htmlContent, setHtmlContent] = useState<any>();
  
    let newsPageContent : INewsPageContent;

    const darkMode = (htmlStr: any)=> {
        if(htmlStr!=null){
            let html: string = htmlStr.toString();
            const aTag = '<a style="color: white;" ';
            const spanTag = '<span style="color: white;" ';
            const pTag = '<p style="color: white;" ';
            const headerTag = '<header style="color: white;" ';
            const h1 = '<h1 style="color: white;" ';
            const h2 = '<h2 style="color: white;" ';
            const h3 = '<h3 style="color: white;" ';
            const h4 = '<h4 style="color: white;" ';
            const h5 = '<h5 style="color: white;" ';
            const h6 = '<h6 style="color: white;" ';

            html = html.replace(/<a/g, aTag);
            html = html.replace(/<span/g, spanTag);
            html = html.replace(/<p/g, pTag);
            html = html.replace(/<header/g, headerTag);
            html = html.replace(/<h1/g, h1);
            html = html.replace(/<h2/g, h2);
            html = html.replace(/<h3/g, h3);
            html = html.replace(/<h4/g, h4);
            html = html.replace(/<h5/g, h5);
            html = html.replace(/<h6/g, h6);
            return html;
        }else{
            return `<h1 style="color: white;" >Error</h1>`
        }
    }

    const source = {
        html: darkMode(htmlContent.replace(/<figure(.*?)<\/figure>/g, ''))
      };

    const scrapeTrendingDramas = async () =>{
        try{
          const response = await axios.get("https://www.koreaboo.com/news/txt-hueningkai-kep1er-bahiyyih-sister-graduation/");
          const $ = cheerio.load(response.data);
          
          console.log("hi")
          setHtmlContent($('div.entry-content').html())



          console.log(source.html.split('<div class="kba-container">')[0]);
          console.log(source.html.split('<div class="kba-container">')[1]);
          setIsLoading(false);

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        console.log("HI")
        scrapeTrendingDramas();
    },[])


  return (
    <>{!isLoading &&
        <WebView
          originWhitelist={['*']}
          source={{html: styling+source.html+'</body>'}}
          style={styles.video}
          scalesPageToFit={false}
          setBuiltInZoomControls={false}
          automaticallyAdjustContentInsets={false}
        />
    }
    </>    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
  video: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#000'
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
