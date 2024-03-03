import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import BottomBar from '../../components/BottomBar';
import { Audio } from 'expo-av';

const ScreenOne = ({ navigation, route }) => {
  // Extrai os parâmetros de rota ou define valores padrão
  const { focusTime = 1500, pauseTime = 300 } = route.params || {};

  // Estado para controlar o tempo restante
  const [timeLeft, setTimeLeft] = useState(focusTime);
  // Estado para controlar se o temporizador está em execução
  const [isRunning, setIsRunning] = useState(false);
  // Estado para controlar o som
  const [sound, setSound] = useState(null);
  // Estado para controlar a imagem de play/pausa
  const [playPauseImage, setPlayPauseImage] = useState(require('../../../src/assets/BottonPlay.png'));

  // Efeito para atualizar o tempo restante quando o foco é alterado
  useFocusEffect(
    useCallback(() => {
      setTimeLeft(focusTime);
    }, [focusTime])
  );

  // Efeito para controlar o tempo e executar ações quando o temporizador está em execução
  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0  ) {
      setIsRunning(false);
      if (focusTime > 0) {
        setTimeLeft(pauseTime);
        playSound(); // Chama a função para reproduzir o som
      } else {
        setTimeLeft(focusTime);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, focusTime, pauseTime]);

  // Função assíncrona para reproduzir o som
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../../src/assets/sounds/alarme.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  // Função para alternar entre iniciar/pausar o temporizador
  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setPlayPauseImage(require('../../../src/assets/BottonPlay.png')); // Troca para a imagem de Play
    } else if (timeLeft > 0) {
      setIsRunning(true);
      setPlayPauseImage(require('../../../src/assets/BottonPause.png')); // Troca para a imagem de Pause
      if (sound) {
        sound.stopAsync(); // Pare a reprodução do som se estiver tocando
      }
    }
  };
  
  // Efeito para verificar se o tempo restante chegou a zero e alterar a imagem de play/pausa
  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setPlayPauseImage(require('../../../src/assets/BottonPlay.png')); // Troca para a imagem de Play
    }
  }, [timeLeft]);

  // Função para redefinir o temporizador
  const resetTimer = () => {
    setTimeLeft(focusTime);
    setIsRunning(false);
    setPlayPauseImage(require('../../../src/assets/BottonPlay.png')); // Garante que a imagem do botão é definida como Play ao resetar o temporizador
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pomodoroText}>POMODORO</Text>
      <BottomBar
        onPressHome={() => navigation.navigate('ScreenOne')}
        onPressConfig={() => navigation.navigate('ScreenTwo')}
      />

      <View style={styles.circle}>
        <Text style={styles.timeText}>
          {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.smallCircle}
        onPress={toggleTimer}
      >
        <Image
          source={playPauseImage}
          style={[styles.imagemDoBotao, playPauseImage === require('../../../src/assets/BottonPause.png') && styles.pauseButtonImage]} 
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.BottomRefresh}
        onPress={resetTimer}
      >
        <Image
          source={require('../../../src/assets/Refresh.png')}
          style={styles.imagemDoBotao}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 10,
    position: 'relative',
  },
  pomodoroText: {
    fontSize: 24,
    marginTop: "8%",
    marginLeft:"5%",
    letterSpacing: 0.05,
    color: '#a78bfa',
    lineHeight: 36,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#a78bfa",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -100,
    marginLeft: -100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 40,
    color: '#fff',
  },
  smallCircle: {
    width: 80,
    height: 80,
    borderRadius: 75,
    backgroundColor: "#a78bfa",
    position: 'absolute',
    top: '75%',
    left: '50%',
    marginTop: -40,
    marginLeft: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomRefresh: {
    marginLeft: "80%",
    marginTop: "-10%",
    color: "#ca8a04",
  },
  pauseButtonImage: {
    width: 50,
    height:50,
    tintColor: 'white', 
  },
});

export default ScreenOne;
