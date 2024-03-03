// components/BottomBar.js

import React from 'react';
import { View, TouchableOpacity, Image , StyleSheet  } from 'react-native';


const BottomBar = ({ onPressHome, onPressConfig }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '110%', height: 60, backgroundColor: '#a78bfa', borderRadius: 5, position: 'absolute', bottom: 0 }}>
      {/* Botão de Home */}
      <TouchableOpacity style={{ marginLeft: 90, marginTop: 15 }} onPress={onPressHome}>
        <Image
          source={require('../../src/assets/Home.png')}
        />
      </TouchableOpacity>


      {/* Botão de Config */}
      <TouchableOpacity style={{ marginTop: 15, marginRight: 120 }} onPress={onPressConfig}>
      <Image 
          source={require('../../src/assets/Setting.png')}
        />
      </TouchableOpacity>
    </View>
  );
};


export default BottomBar;
