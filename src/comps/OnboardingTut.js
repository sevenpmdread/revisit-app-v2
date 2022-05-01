import { Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import Onboarding from 'react-native-onboarding-swiper';
import { SvgUri,SvgCssUri } from 'react-native-svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const test0 = require('../../assets/explore0.svg');
const test = require('../../assets/explore.svg');
const test2 = require('../../assets/explore2.svg');
const test3 = require('../../assets/explore3.svg')
const testvent = require('../../assets/vent.svg')
const ventwords = require('../../assets/ventfont.svg')
const contrastquestion = require('../../assets/contrastquestion.svg')
const testcontrast = require('../../assets/contrast.svg')
const contrastword = require('../../assets/contrastword.svg')
const share = require('../../assets/share.svg')
const sharetitle = require('../../assets/sharetitle.svg')
const sharesvg = resolveAssetSource(share)
const sharetit = resolveAssetSource(sharetitle)
const ventword = resolveAssetSource(ventwords)
const contrasttitle = resolveAssetSource(contrastword)
const contrasttop = resolveAssetSource(contrastquestion)
const ventsvg = resolveAssetSource(testvent)
const contrastsvg = resolveAssetSource(testcontrast)
const svg0 = resolveAssetSource(test0);
const svg = resolveAssetSource(test);
const svg2 = resolveAssetSource(test2)
const svg3= resolveAssetSource(test3)

const Done = ({navigation}) => (

  <Button
    title={'Done'}
    titleStyle={{color:'black',fontFamiy:'InterRegular'}}
    buttonStyle={{
      backgroundColor: 'transparent',
      borderWidth:0,
      borderColor:'#5D51D1',
      marginHorizontal:0,
      borderRadius:12,
      width: 100,
      marginBottom:0,
    }}
    containerViewStyle={{
      marginVertical: 2,
      width: 120,
      marginHorizontal:20,
      backgroundColor: 'black',
    }}
    textStyle={{ color: '#5D484' }}
    onPress={()=>navigation.navigate('HomeTabs')}
  />
);

const OnboardingTut = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return(
  <Onboarding
  showSkip ={false}
  bottomBarColor = 'white'
  showNext ={false}
  titleStyles={{ fontFamily:'Intermedium',marginTop:0,paddingTop:0 }}
  DoneButtonComponent={()=><Done navigation={navigation}/>}
    onDone={() => navigation.navigate('HomeTabs')}
    pages={[
      {
        backgroundColor: 'white',
        titleStyles:{height:0},
        image:  <>
        <SvgCssUri uri={svg0.uri}  />
        <SvgCssUri uri={svg.uri} style={{marginVertical:20}}/>
        <SvgCssUri uri={svg2.uri} />
        <SvgCssUri uri={svg3.uri} />
        </>,
        title: '',
        subtitle: 'Find questions that help you understand yourself better',
        subTitleStyles: { fontFamily:'Intermedium',fontSize:16,marginTop:0 }
      },
      {
        backgroundColor: 'white',
        title: '',
        titleStyles:{height:0},
        image:  <>
                <SvgCssUri uri={ventword.uri} style={{marginBottom:24}} />
        <SvgCssUri uri={ventsvg.uri}  />
        </>,
        subtitle: 'Vent privately, build a timeline of your thoughts, and publish anonymously!',
        subTitleStyles: { fontFamily:'Intermedium',fontSize:16 }
      },
      {
        backgroundColor: 'white',
        titleStyles:{height:0},
        image: <>
                        <SvgCssUri uri={contrasttitle.uri}style={{marginBottom:32}}  />
                <SvgCssUri uri={contrasttop.uri}style={{marginBottom:20}}  />
        <SvgCssUri uri={contrastsvg.uri} />
</>,
        title: '',
        subtitle: "Create contrasts of your answers,and thoughts as they evolve over time",
        subTitleStyles: { fontFamily:'Intermedium',fontSize:16 }
      },
      {
        backgroundColor: 'white',
        image:  <>
                <SvgCssUri uri={sharetit.uri}style={{marginBottom:42}}  />
        <SvgCssUri uri={sharesvg.uri}/>
</>,
        title: '',
        titleStyles:{height:0},
        subtitle: "You can share posts from the app,and customise the design!",
        subTitleStyles: { fontFamily:'Intermedium',fontSize:16 }
      },
    ]}
  />)



    }  ;

export default OnboardingTut;
