import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../../components/BottomBar';

const ScreenTwo = ({ navigation }) => {
  
  const [focusTime, setFocusTime] = useState('25');
  const [pauseTime, setPauseTime] = useState('5');

  useEffect(() => {
    AsyncStorage.getItem('focusTime').then(value => {
      if (value) {
        setFocusTime(value);
      }
    });

    AsyncStorage.getItem('pauseTime').then(value => {
      if (value) {
        setPauseTime(value);
      }
    });
  }, []);


  const handleSave = () => {
    // Verifique se os campos de entrada estão vazios e, se estiverem, defina os valores padrão
    const focus = focusTime.trim() === '' ? '25' : focusTime;
    const pause = pauseTime.trim() === '' ? '5' : pauseTime;
  
    // Salvar os valores corrigidos em AsyncStorage convertendo para string
    AsyncStorage.setItem('focusTime', focus.toString());
    AsyncStorage.setItem('pauseTime', pause.toString());
    
    // Navegar para a tela do temporizador
    navigation.navigate('ScreenOne', {
      focusTime: parseInt(focus) * 60,
      pauseTime: parseInt(pause) * 60,
    });
  };
  
  const handleRefreshButtonPress = () => {
    // Limpa o valor do TextInput
    setFocusTime('25'); // Definir para '25' em vez de '0'
    setPauseTime('5'); // Definir para '5' em vez de '0'
  };

  
  return (
    <View style={styles.container}>
      
      <Text style={styles.pomodoroText}>POMODORO</Text>

      <BottomBar onPressConfig={() => navigation.navigate('ScreenTwo')} onPressHome={() => navigation.navigate('ScreenOne')} />

      <View style={styles.frameContainer}>
        {/* Conteúdo dentro do frame */}
        <View style={styles.Line}></View>
        <Text style={styles.TextConfig}>Configuraçöes</Text>
        <Text style={styles.TextMinutes}>(MINUTOS)</Text>
        <Text style={styles.TextTemp}>Foco</Text>
        <Text style={styles.TextTemp}>Pausa</Text>

        <View style={styles.rectangle2}>
          <TextInput
            style={styles.input1}
            keyboardType="numeric"
            maxLength={2}
            value={focusTime}
            onChangeText={text => setFocusTime(text.replace(/[^0-9]/g, ''))}
          />
        </View>

        <View style={styles.rectangle3}>
          <TextInput
            style={styles.input1}
            keyboardType="numeric"
            maxLength={2}
            value={pauseTime}
            onChangeText={text => setPauseTime(text.replace(/[^0-9]/g, ''))}
          />
        </View>

        <TouchableOpacity style={styles.ButtonSave} onPress={handleSave}>
          
          <Image source={require('../../../src/assets/CORRETO.png')} style={styles.imagemDoBotao} />
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.BottomRefresh} onPress={() => handleRefreshButtonPress(setFocusTime, setPauseTime)}>
        <Image source={require('../../../src/assets/Refresh.png')} style={styles.imagemDoBotao} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  pomodoroText: {
    fontSize: 24,
    marginTop: "15%",
    marginLeft:"5%",
    letterSpacing: 0.05,
    color: '#a78bfa',
    lineHeight: 36,
  },
  frameContainer: {
    width: "75%",
    height: "38%",
    marginLeft: "12%",
    marginRight: "12%",
    marginTop: "37%",
    borderRadius: 50, // Ajuste conforme necessário
    backgroundColor: "#a78bfa", // Define a cor de fundo como transparente
    shadowColor: '#000', // Cor da sombra
  },
  TextConfig: {
    color: "#FFF",
    fontSize: 20,
    marginTop: "-15%",
    marginLeft: "15%",
    fontWeight: 'bold'
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFF", // Pode ajustar a cor conforme necessário
    marginVertical: 10, // Ajusta o espaçamento vertical conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  TextMinutes: {
    color: "#FFF",
    fontSize: 20,
    marginLeft: "33%",
    marginTop: "5%"
  },
  TextTemp: {
    color: "#FFF",
    fontSize: 17,
    marginLeft: "20%",
    marginTop: "10%",
  },
  rectangle2: {
    width: 120,
    height: 45,
    marginLeft: 180,
    marginTop: "-28%",
    marginLeft: "50%",
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Branco com opacidade baixa (0.5)
    // Se quiser adicionar um background da imagem, utilize a propriedade 'backgroundImage'
    // backgroundImage: require('@drawable/rectangle_2'),
  },
  rectangle3: {
    width: 120,
    height: 45,
    marginLeft: 180,
    marginTop: "3%",
    marginLeft: "50%",
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Branco com opacidade baixa (0.5)
    // Se quiser adicionar um background da imagem, utilize a propriedade 'backgroundImage'
    // backgroundImage: require('@drawable/rectangle_2'),
  },
  input1: {
    height: 40,
    paddingLeft: 10,
    marginTop: "2%",
    color: "#FFFFFF"
  },
  ButtonSave: {
    width: 80, // Diâmetro do segundo círculo
    height: 80,
    borderRadius: 75, // Metade do diâmetro para torná-lo um círculo
    backgroundColor: "#a78bfa", // Cor do segundo círculo
    position: 'absolute',
    top: '75%', // Posiciona o topo do segundo círculo abaixo do círculo central
    left: '50%', // Posiciona a esquerda do segundo círculo no centro horizontal do contêiner
    marginTop: 120, // Ajusta para centralizar completamente o segundo círculo verticalmente
    marginLeft: -40, // Ajusta para centralizar completamente o segundo círculo horizontalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do círculo
    justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do círculo
  },
  imageStyle: {
    marginLeft: "80%"
  },
  BottomRefresh: {
    marginLeft: "85%",
    marginTop: "-130%",
    color: "#FFF",
  }
});

export default ScreenTwo;
