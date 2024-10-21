import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';

export default function EditMachineScreen({ route, navigation }: any) {
    const { maquina } = route.params; // Recebe os dados da máquina
    const [idCliente, setIdCliente] = useState(String(maquina.idCliente));
    const [idIntegrador, setIdIntegrador] = useState(String(maquina.idIntegrador));
    const [serial, setSerial] = useState(String(maquina.serial)); 
    const [layout, setLayout] = useState(String(maquina.layout)); 
    const [model, setModel] = useState(String(maquina.model)); 
    const [codigo, setCodigo] = useState(String(maquina.codigo)); 
    const [senhaConfig, setSenhaConfig] = useState(String(maquina.senha));
    const [senhaLimpeza, setSenhaLimpeza] = useState(String(maquina.senhaLimpeza));
    const [localizacao, setLocalizacao] = useState(String(maquina.localizacao)); 
    const [coordenadas, setCoordenadas] = useState(String(maquina.coordenadas)); 
    const [config, setConfig] = useState(String(maquina.config)); 
    const [email, setEmail] = useState(String(maquina.email)); 
    const [sshKey, setSshKey] = useState(String(maquina.sshKey)); 
    const [iotKey, setIotKey] = useState(String(maquina.iotKey)); 
    const [redeWiFi, setRedeWiFi] = useState(String(maquina.redeWiFi)); 
    const [rede4G, setRede4G] = useState(String(maquina.rede4G)); 
    const [notas, setNotas] = useState(String(maquina.notas)); 
    const [status, setStatus] = useState(String(maquina.status));
    const [metaContenedor, setMetaContenedor] = useState(String(maquina.metaContenedor));
    const [contenedor, setContenedor] = useState(String(maquina.contenedor));
    const [lgpd, setLgpd] = useState(String(maquina.lgpd));
    const [modelType, setModelType] = useState(String(maquina.modelType));
    

    const handleSave = () => {
        const updatedMachine = {
            idColetor: maquina.idcoletor, // Id do coletor que está sendo atualizado
            idCliente,
            idIntegrador,
            serial,
            layout,
            model,
            codigo,
            senhaConfig,
            senhaLimpeza,
            localizacao,
            coordenadas,
            config,
            email,
            sshKey,
            iotKey,
            redeWiFi,
            rede4G,
            notas,
            status,
            metaContenedor,
            contenedor,
            lgpd,
            modelType,
        };
    
        fetch(`http://192.168.15.201:5000/maquinas`, { // Ajuste a URL da API
            method: 'PUT', // Usando PUT para atualizar
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMachine),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar máquina');
                }
                return response.json();
            })
            .then((result) => {
                Alert.alert('Sucesso', 'Máquina atualizada com sucesso!');
                navigation.goBack(); // Volta para a tela anterior
            })
            .catch((error) => {
                Alert.alert('Erro', error.message);
            });
    };
    

    return (
        <ScrollView style={styles.container}>
            <Text>ID Coletor: {maquina.idcoletor}</Text>
            <TextInput
                placeholder="ID Cliente"
                value={idCliente}
                onChangeText={setIdCliente}
                style={styles.input}
            />
            <TextInput
                placeholder="ID Integrador"
                value={idIntegrador}
                onChangeText={setIdIntegrador}
                style={styles.input}
            />
            <TextInput
                placeholder="Serial"
                value={serial}
                onChangeText={setSerial}
                style={styles.input}
            />
            <TextInput
                placeholder="Layout"
                value={layout}
                onChangeText={setLayout}
                style={styles.input}
            />
            <TextInput
                placeholder="Modelo"
                value={model}
                onChangeText={setModel}
                style={styles.input}
            />

            <TextInput
                placeholder="Código"
                value={codigo}
                onChangeText={setCodigo}
                style={styles.input}
            />

            <TextInput
                placeholder="Senha de Config"
                value={senhaConfig}
                onChangeText={setSenhaConfig}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha de Limpeza"
                value={senhaLimpeza}
                onChangeText={setSenhaLimpeza}
                style={styles.input}
            />
            <TextInput
                placeholder="Localização"
                value={localizacao}
                onChangeText={setLocalizacao}
                style={styles.input}
            />
            <TextInput
                placeholder="Coordenadas"
                value={coordenadas}
                onChangeText={setCoordenadas}
                style={styles.input}
            />
            <TextInput
                placeholder="Config"
                value={config}
                onChangeText={setConfig}
                style={styles.input}
            />
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="CHAVE SSH"
                value={sshKey}
                onChangeText={setSshKey}
                style={styles.input}
            />
            <TextInput
                placeholder="CHAVE IOT"
                value={iotKey}
                onChangeText={setIotKey}
                style={styles.input}
            />
            <TextInput
                placeholder="Rede WIFI"
                value={redeWiFi}
                onChangeText={setRedeWiFi}
                style={styles.input}
            />
            <TextInput
                placeholder="Rede 4G"
                value={rede4G}
                onChangeText={setRede4G}
                style={styles.input}
            />
            <TextInput
                placeholder="Status"
                value={status}
                onChangeText={setStatus}
                style={styles.input}
            />
            <TextInput
                placeholder="Meta do Contenedor"
                value={metaContenedor}
                onChangeText={setMetaContenedor}
                style={styles.input}
            />
            <TextInput
                placeholder="Contenedor"
                value={contenedor}
                onChangeText={setContenedor}
                style={styles.input}
            />
            <TextInput
                placeholder="Notas"
                value={notas}
                onChangeText={setNotas}
                style={styles.input}
            />
            <TextInput
                placeholder="LGPD"
                value={lgpd}
                onChangeText={setLgpd}
                style={styles.input}
            />
            <TextInput
                placeholder="Model Type"
                value={modelType}
                onChangeText={setModelType}
                style={styles.input}
            />
            <TouchableOpacity style={styles.btnSalvar} onPress={handleSave} ><Text>SALVAR</Text></TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#3CC28A",
        height: 100
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    btnSalvar:{
        marginBottom: 50,
        flex:1,
        width: 180,
        height: 80,
        backgroundColor: '#ffff',
        padding: 5,
        alignSelf: "center",
        borderRadius: 20,
        alignItems: 'center',
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // Sombra para Android
        elevation: 10,
        justifyContent: 'center',
      },
});
