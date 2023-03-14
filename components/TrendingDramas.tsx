import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, LayoutChangeEvent } from 'react-native';

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
interface ScrollViewNativeEvent {
  layoutMeasurement: {
    height: number;
    width: number;
  };
  contentOffset: {
    x: number;
    y: number;
  };
  contentSize: {
    height: number;
    width: number;
  };
}

export default function TrendingDramas(navigation: TrendingDramasProps) {  
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

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

    const isCloseToBottom = (event: {
      layoutMeasurement: { height: number; width: number };
      contentOffset: { x: number; y: number };
      contentSize: { height: number; width: number };
    }) => {
      const {
        layoutMeasurement,
        contentOffset,
        contentSize,
      } = event;
      const paddingToBottom = 20;
      console.log("height = "+layoutMeasurement.height)
      console.log("contentOffset y  = "+contentOffset.y)
      console.log("contentSize.height = "+contentSize.height)
      console.log("paddingToBottom = "+paddingToBottom)
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

  return (
    <View>
      <View style={styles.helpContainer}>
        {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                console.log("End")
                setPage(page + 1);
              }
            }}
            scrollEventThrottle={400}
          >
          {TrendingDramasList.map((content, index) => (
          <NewsPost navigation = {navigation} key={index} image= {content.imageLink} title={content.title} description={content.description} time={content.time} postLink={content.postLink} category={content.category}/>
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
