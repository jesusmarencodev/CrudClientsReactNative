import React from 'react'
import { StyleSheet,  View, Alert } from 'react-native'
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetalleCliente = ({navigation, route}) => {
    const { nombre, telefono, correo, empresa, id } = route.params.item;
    const { setConsultarAPI } = route.params;

    console.log(setConsultarAPI)


    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Deseas Eliminar este Cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                {text : 'Cancelar', style : 'cancel'},
                {text : 'Si Eliminar', onPress : () => eliminarContacto()},
            ]
        )
    }

    const eliminarContacto = async () => {
        console.log('Eliminadno contacto', id)
        const url = `http://192.168.1.68:3000/clientes/${id}`;
        console.log(url)
        try {
            await axios.delete(url);

            //redireccionar
            navigation.navigate('Inicio')

            //Volver a consultar la API
            setConsultarAPI(true);


        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa : <Subheading> {empresa} </Subheading></Text>
            <Text style={styles.texto}>Correo : <Subheading> {correo} </Subheading></Text>
            <Text style={styles.texto}>Telefono : <Subheading> {telefono} </Subheading></Text>

            <Button
                style={styles.boton}
                mode='contain'
                icon='cancel'
                onPress={()=>mostrarConfirmacion()}
            >
                Eliminar Cliente
            </Button>
            <FAB
                icon='pencil'
                style={globalStyles.fa}
                onPress={()=> navigation.navigate('NuevoCliente', {cliente : route.params.item, setConsultarAPI})}
           />
        </View>
    )
}

export default DetalleCliente

const styles = StyleSheet.create({
    texto : {
        marginBottom : 20,
        fontSize : 18
    },
    boton : {
        marginTop : 100,
        backgroundColor : 'red'
    }
})
