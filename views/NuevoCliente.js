import React, {useState} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { Provider as PaperProvider, TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const NuevoCliente = ({navigation, route}) => {

    const { setConsultarAPI } = route.params;

    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [alerta, setAlerta] = useState(false)


    const guardarNombre = (texto) => {
        setNombre(texto)
    }
    const guardarTelefono = (texto) => {
        setTelefono(texto)
    }
    const guardarCorreo = (texto) => {
        setCorreo(texto)
    }
    const guardarEmpresa = (texto) => {
        setEmpresa(texto)
    }
    const gurdarCliente = async () => {
        //validar

        if ( nombre === '' || telefono === '' || correo === '' || empresa === '' ) {
            
            setAlerta(true);

            return;
        }

        //generar cliente

        const cliente = {nombre, telefono, empresa, correo};
        console.log(cliente)

        //guardar cliente en la API

        try {
            if(Platform.OS === 'ios' ){
                //la direccion para ios cambia no es esta solo la dejo com ejemplo
                await axios.post('http://10.0.2.2:3000/clientes', cliente)
            }else{
                //la direccion para android es esta
                await axios.post('http://192.168.1.68:3000/clientes', cliente)
                setConsultarAPI(true);
            }
        } catch (error) {
            console.log(error)
        }
        
        //redireccionar

        navigation.navigate('Inicio');

        //limpiar el form (opcional pero lo voy a hacer)
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEmpresa('');
    }

    return (
        <PaperProvider>
            <View style={globalStyles.contenedor}>
                <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
                <TextInput
                    style={styles.input}
                    label = "Nombre"
                    mode ='outlined'
                    onChangeText = {texto=> guardarNombre(texto)}
                    value={nombre}
                    
                />
                <TextInput
                    style={styles.input}
                    label = "Telefono"
                    mode ='outlined'
                    onChangeText = {texto=> guardarTelefono(texto)}
                    value={telefono}
                />
                <TextInput
                    style={styles.input}
                    label = "Correo"
                    mode ='outlined'
                    onChangeText = {texto=> guardarCorreo(texto)}
                    value={correo}
                />
                <TextInput
                    style={styles.input}
                    label = "Empresa"
                    mode ='outlined'
                    onChangeText = {texto=> guardarEmpresa(texto)}
                    value={empresa}
                />
                <Button icon='pencil-circle' mode="contained" onPress={()=>gurdarCliente()}>
                    Guardar Cliente
                </Button>
                <Portal>
                    <Dialog
                        visible={alerta}
                        onDismiss={()=> setAlerta(false)}
                    >
                        <Dialog.Title>Error</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Todos los campos son obligatorios</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=> setAlerta(false)}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    )
}

export default NuevoCliente

const styles = StyleSheet.create({
    input : {
        marginBottom : 20,
        
    }
})
