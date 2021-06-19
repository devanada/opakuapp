/* eslint-disable prettier/prettier */ /* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

const CustomLoading = ({text, visible}) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      source={require('../../assets/Jsons/loading_circle.json')}
      animationStyle={{width: 100, height: 100}}
      speed={1}>
      <Text style={{color: '#bfbfbf', fontSize: 17}}>{text}</Text>
    </AnimatedLoader>
  );
};

export {CustomLoading};
