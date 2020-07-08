import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native'
import axios from 'axios';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {

    const [clientes, setClientes] = useState([])
    const [consultarAPI, setConsultarAPI] = useState(true)

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                if(Platform.OS === 'ios' ){
                    //la direccion para ios cambia no es esta solo la dejo com ejemplo
                    const resultado =  await axios.get('http://10.0.2.2:3000/clientes')
                    
                }else{
                    //la direccion para android es esta
                    const resultado =  await axios.get('http://192.168.1.68:3000/clientes')
                    setClientes(resultado.data)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        if(setConsultarAPI){
            obtenerClientes()
            setConsultarAPI(false)
        } 
    }, [consultarAPI])

    console.log(consultarAPI)

    return (
        <View style={globalStyles.contenedor}>
            <Button icon='plus-circle' onPress={()=> navigation.navigate('NuevoCliente', {setConsultarAPI})}>
                Nuevo Cliente
            </Button>
            <Headline style={globalStyles.titulo}>{clientes.length > 0 ? "Clientes" :  "Aun no hay clientes"}</Headline>
           <FlatList
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={ ({item})=>(
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress={()=> navigation.navigate('DetalleCliente', {item, setConsultarAPI})}
                        setConsultarAPI
                    />
                )}
           />
           <FAB
                icon='plus'
                style={globalStyles.fa}
                onPress={()=> navigation.navigate('NuevoCliente', {setConsultarAPI})}
           />

        </View>
    )
}

export default Inicio

const styles = StyleSheet.create({

})
