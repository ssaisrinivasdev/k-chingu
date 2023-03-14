import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import { INewsPosts } from '../interfaces/INewsPosts';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

// import puppeteer from 'puppeteer';
const cheerio = require("cheerio");
import axios from 'axios';
import NewsPost from './NewsPostProps';

let TrendingDramasList: INewsPosts[] = [];

interface TrendingDramasProps{
  navigation: any,
}

export default function TrendingDramas(navigation: TrendingDramasProps) {  
    const [isLoading, setIsLoading] = useState(true);

    const addContent = (post: INewsPosts) => {
      TrendingDramasList.push(post);
    };

    const scrapeTrendingDramas = async () =>{
        try{
          const response = await axios.get("https://mydramalist.com");
          const $ = cheerio.load(response.data);
          
          $("#articles-list-popular > div.list-item.article-item").each((index: number,element: string)=>{
            const imgLink = $('img',$(element).html()).attr('src');
            const link = $('a',$(element).html()).attr('href');
            const title = $('a:nth-child(1)',$(element).html()).text();
            const description = $('p',$(element).html()).text();
            const category =  $('div.category-name',$(element).html()).text();
            const time =  $('div.pub-date',$(element).html()).text();

            if(imgLink){
              addContent({
                imageLink: imgLink,
                title: title,
                postLink: link,
                category: category,
                time: time,
                description: description,
              });
            }
          })

          setIsLoading(false);
          //console.log(TrendingDramasList)

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        console.log("HI")
        scrapeTrendingDramas();
    },[])

  return (
    <View>
      <View style={styles.helpContainer}>
        {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
          {TrendingDramasList.map((content, index) => (
          <NewsPost navigation = {navigation} key={index} image= {content.imageLink} title={content.title} description={content.description} time={content.time} postLink={content.postLink}/>
          ))}
          </ScrollView>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
