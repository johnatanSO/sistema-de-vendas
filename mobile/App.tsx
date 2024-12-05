import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Routes } from './src/Routes'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading'
import theme from './src/styles/theme'
import { AlertContextComponent } from './src/contexts/alertContext'

export default function App() {
  const [fontsLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  const createTheme = DefaultTheme
  createTheme.colors.background = theme.COLORS.GRAY_700

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AlertContextComponent>
        <NavigationContainer theme={createTheme}>
          {fontsLoader ? <Routes /> : <Loading />}
        </NavigationContainer>
      </AlertContextComponent>
    </>
  )
}
