import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TextInput,
    View,
    Button,
    Text,
    AsyncStorage
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            mensagem: '',
        }
    }

    efetuaLogin = () => {
        const teste = this.state.usuario
        const uri = "https://instalura-api.herokuapp.com/api/public/login";
        
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,  
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };
        
        fetch(uri, requestInfo)
            .then(response => {
                if (response.ok)
                    return response.text();

                throw new Error('Não foi possível efetuar login');
            })
            .then(token => {
                AsyncStorage.setItem( 'token', token)
                AsyncStorage.setItem( 'usuario', this.state.usuario);
            })
            .catch(error => this.setState({mensagem: error.message}));
    }

    logout() {
        AsyncStorage.removeItem('usuario');
        AsyncStorage.removeItem('token');
        // ir para tela de logout
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input} 
                        autoCapitalize="none"
                        placeholder="Usuário..."
                        onChangeText={texto => this.setState({usuario: texto})}
                        underlineColorAndroid="transparent" />
                    <TextInput style={styles.input} 
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Senha..."
                        onChangeText={texto => this.setState({senha: texto})}
                        underlineColorAndroid="transparent" />

                    <Button title="Login" onPress={this.efetuaLogin}/>
                </View>
                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        width: width * 0.8,
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    input: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 40,
    },
    mensagem: {
        marginTop: 15,
        color: '#e74c3c',
    }

});