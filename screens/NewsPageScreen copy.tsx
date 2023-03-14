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
import RenderHtml from 'react-native-render-html';

// require('colors');
const Diff = require('diff');
let htmlStr1: string="";
const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width)

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
            return `<h1 style="color: white;"> Error </h1>`;
        }
    }

    const source = {
        html: htmlContent
      };

    const scrapeTrendingDramas = async () =>{
        try{
          const response = await axios.get("https://www.koreaboo.com/news/txt-hueningkai-kep1er-bahiyyih-sister-graduation/");
          const $ = cheerio.load(response.data);
          
          console.log("hi")

        const one = ` <h1>A Story of Adventure</h1>
        <ul>
          <li>Turbo, a little turtle, lived in a big ocean</li>
          <li>He met a friendly dolphin named <em>Dolly</em></li>
          <li>Together, they searched for a treasure guarded by a <strong>fearsome shark</strong></li>
        </ul>
        <table border="1">
          <tr><td>Chapter 1</td><td>Water Adventure Begins</td></tr><tr><td>Chapter 2</td><td>The Friendly Dolphin</td>
        </tr>
        </table>`;
        const other = ` <h2>A Story of Adventure</h2>
        <ul>
          <li>Turbo, a little turtle, lived in a big ocean</li>
          <li>He met a friendly dolphin named <strong>Dolly</strong></li>
          <li>Together, they searched for a treasure guarded by a <em>fearsome shark</em></li>
        </ul>
        <table border="1">
          <tr><td>Chapter 1</td><td>Water Adventure Begins</td></tr>
        </table>`;

        const diff = Diff.diffLines(one, other);

        diff.forEach((part: any) => {
        // green for additions, red for deletions
        // grey for common parts
        const color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
            htmlStr1 += `<span style="color: ${color};">${part.value}</span>`;
        });

        console.log(htmlStr1);
        setHtmlContent(htmlStr1)
        htmlStr1 = "";
        //   console.log(source)

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
    <ScrollView>
      <View style={styles.container}>
        {!isLoading &&  <RenderHtml
        contentWidth={SCREEN_WIDTH}
        source={source}
        />}
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    margin: 50
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
