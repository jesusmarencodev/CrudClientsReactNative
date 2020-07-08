import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';

const BarraSuperior = ({navigation, route}) => {

    const handlePress = () => {
        navigation.navigate('NuevoCliente')
    }

    return (
        <Button icon="plus-circle" color='#FFF' onPress={()=> handlePress()}>
           Cliente
        </Button>
    )
}

export default BarraSuperior

const styles = StyleSheet.create({})
