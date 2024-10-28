import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { useNavigation, useFocusEffect, NavigationProp } from '@react-navigation/native'; // Importe useFocusEffect

export default function MachinesScreen() {
    interface Maquina {
        idcoletor: string;
        idCliente: string;
        serial: string;
        codigo: string;
    }
    const [maquinas, setMaquinas] = useState<Maquina[]>([]);
    const [loading, setLoading] = useState(true);

    type RootStackParamList = {
        Home: undefined;
        Monitor: undefined;
        Maquinas: undefined;
        EditMaquinas: { maquina: Maquina };
      };
      
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // Função para buscar máquinas
    const fetchMachines = () => {
        setLoading(true); // Define loading como true antes de fazer a requisição
        fetch('http://192.168.15.200:5000/maquinas')  // Substitua pela sua URL da API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro de conexão com a API.');
                }
                return response.json();
            })
            .then(result => {
                setMaquinas(Array.isArray(result) ? result : []); // Garante que 'maquinas' seja um array
            })
            .catch(error => {
                //console.error(error);
                setMaquinas([]); // Define como array vazio em caso de erro
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Usando useFocusEffect para carregar dados ao voltar para a tela
    useFocusEffect(
        React.useCallback(() => {
            fetchMachines();
        }, [])
    );

    if (loading) {
        return <View style={styles.containerLoading}><ActivityIndicator style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} size="large" color="#ffffff" /></View>;
    }

    if (maquinas.length === 0) {
        return <Text>Sem máquinas.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <DataTable style={styles.containerTable}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title style={styles.cellSmall} textStyle={styles.celulas}>idColet</DataTable.Title>
                    <DataTable.Title style={styles.cellSmall} textStyle={styles.celulas}>idClient</DataTable.Title>
                    <DataTable.Title textStyle={styles.celulas}>Serial</DataTable.Title>
                    <DataTable.Title textStyle={styles.celulas}>Codigo</DataTable.Title>
                </DataTable.Header>
                {maquinas.map((maquina) => (
                    <TouchableOpacity
                        key={maquina.idcoletor}
                        onPress={() => navigation.navigate('EditMaquinas', { maquina })}
                    >
                        <DataTable.Row style={[styles.rows, styles.rowBorders]}>
                            <DataTable.Cell textStyle={styles.celulas} style={styles.cellSmall}>{maquina.idcoletor}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.celulas} style={styles.cellSmall}>{maquina.idCliente}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.celulas}>{maquina.serial}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.celulas}>{maquina.codigo}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))}
            </DataTable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: "#3CC28A",
    },
    containerTable: {
        borderColor: "#0000"
    },
    tableHeader: {
        backgroundColor: '#305F50',
        color: "#F5F5F5"
    },
    rows: {
        backgroundColor: "#3CC28A",
        color: "#ffff"
    },
    celulas: {
        color: "#F5F5F5"
    },
    containerLoading: {
        flex: 1,
        backgroundColor: '#3CC28A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowBorders: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
    },
    cellSmall: {
        flex: 1,
        maxWidth: 50,
    },
});
