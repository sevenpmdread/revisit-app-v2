import { Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import Onboarding from 'react-native-onboarding-swiper';
import { SvgUri,SvgCssUri } from 'react-native-svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';


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
        <Image source={require('../../assets/explore0.png')} />

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
                <Image source={require('../../assets/vent0.png')} />

        </>,
        subtitle: 'Vent privately, build a timeline of your thoughts, and publish anonymously!',
        subTitleStyles: { fontFamily:'Intermedium',fontSize:16 }
      },
      {
        backgroundColor: 'white',
        titleStyles:{height:0},
        image: <>
                        <Image source={require('../../assets/contrast0.png')} />

</>,
        title: '',
        subtitle: "Create contrasts of your answers,and thoughts as they evolve over time",
        subTitleStyles: { fontFamily:'Intermedium',fontSize:16 }
      },
      {
        backgroundColor: 'white',
        image:  <>
                                <Image source={require('../../assets/share0.png')} />

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
