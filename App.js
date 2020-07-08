import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetalleCliente from './views/DetalleCliente';
import BarraSuperior from './components/ui/Barra';

const Stack = createStackNavigator();

//Definir Tema

const theme = {
  ...DefaultTheme,
  colors : {
    ...DefaultTheme.colors,
    primary : '#1774F2',
    accent  : '#0655Bf'
  }
}


const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle : {
              backgroundColor : theme.colors.primary
            },
            headerTintColor : theme.colors.surface,
            headerTitleStyle : {
              fontWeight : 'bold'
            },
            headerTitleAlign : 'center'
          }}
          initialRouteName="Inicio"//inicializa el componente principal
        >
          <Stack.Screen 
            name="Inicio" 
            component={Inicio}
            options={({navigation, route}) => ({
/*               headerLeft : (props) => <BarraSuperior {...props}//pasando los props para la navegacion(route, navigation)
                                    navigation={navigation}
                                    route={route}
                                /> */
            })}
          />
          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{
              title : "Nuevo Cliente"
            }}
          />
          <Stack.Screen
           name="DetalleCliente"
           component={DetalleCliente}
           options={{
             title : "Detalles Cliente"
           }}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})
