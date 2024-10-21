import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

export default function HomeScreen() {
interface Alerta {
    idcoletor: number;
    codigo: string;
    status: string;
    indicadores: string;
    dataHora: string;
}

const [alertas, setAlertas] = useState<Alerta[]>([]);
const [loading, setLoading] = useState(true);

const fetchAlertas = async () => {
    try {
      const response = await fetch('http://192.168.15.201:5000/alertas');
      const data = await response.json();
      setAlertas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate: any) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  type RootStackParamList = {
    Home: undefined;
    Monitor: undefined;
    Maquinas: undefined;
    TodosAlertas: { alertas: Alerta[] };
  };
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

// useEffect para atualizar os alertas a cada minuto
useEffect(() => {
    fetchAlertas();  // Chamada inicial
    const interval = setInterval(fetchAlertas, 10000); // Atualiza a cada 1 minuto
    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Ecoloop_Branco.png')} style={styles.imageEco} />
      <Text style={styles.text}>MONITORAMENTO</Text>
    
    
      <View style={styles.containerInfo}>
        <View style={styles.divText}>
            <Icon style={{top: 10, marginRight: 15, fontSize: 25}} name="warning" size={30} color="#FBB901" />
            <Text style={styles.containerInfoText}>ALERTAS</Text>
            <Icon style={{top: 10, marginLeft: 15, fontSize: 25}} name="warning" size={30} color="#FBB901" />
        </View>

        {loading ? (
            <View style={styles.containerLoading}><ActivityIndicator style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} size="large" color="#ffffff" /></View>
        ) : alertas.length === 0 ? (
            <Text style={styles.semAlertas}>Sem novos alertas no momento.</Text>
        ) : (
            <ScrollView style={{marginTop: 10}}>

                <DataTable style={styles.containerTable}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title textStyle={styles.celulas}>Código</DataTable.Title>
                        <DataTable.Title textStyle={styles.celulas}>Status</DataTable.Title>
                        <DataTable.Title textStyle={styles.celulas}>Indicadores</DataTable.Title>
                        <DataTable.Title textStyle={styles.celulas}>Data</DataTable.Title>
                    </DataTable.Header>
                    {alertas.map((alerta) => (
                    <DataTable.Row key={alerta.idcoletor} style={styles.rowBorders}>
                        <DataTable.Cell textStyle={styles.celulas}>{alerta.codigo}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.celulas}>{alerta.status}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.celulas}>{alerta.indicadores}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.celulas}>{formatDate(alerta.dataHora)}</DataTable.Cell>
                    </DataTable.Row>
                    ))}
                </DataTable>
                
                {alertas.length > 5 && (
                    <TouchableOpacity onPress={() => navigation.navigate('TodosAlertas', { alertas })}>
                        <Text style={styles.verMais}>Ver mais</Text>
                    </TouchableOpacity>
                )}  
            </ScrollView>
        )}

        </View>




      <TouchableOpacity style={styles.btnMonitor} onPress={() => navigation.navigate('Monitor')}>
        <Text style={styles.btnMonitorText}>MONITOR</Text>
        <Icon name="desktop" size={30} color="#305F50" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnColetores} onPress={() => navigation.navigate('Maquinas')}>
        <Text style={styles.btnColetoresText}>MÁQUINAS</Text>

        <Icon name="wrench" size={30} color="#305F50" />
      </TouchableOpacity>


    </View>



    
  );
}

const styles = StyleSheet.create({
    containerTable: {
        borderColor: "#0000",
        padding: 5
        
    },
    tableHeader: {
        backgroundColor: '#305F50',
        color: "#F5F5F5",
        borderBottomWidth: 0.2,
    },
    rows: {
        color: "#ffff"
    },
    celulas: {
        color: "#F5F5F5",
        fontSize: 10,

    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowBorders: {
        borderBottomWidth: 0.2,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
    },
    cellSmall: {
        flex: 1,
        maxWidth: 50,
    },
  container: {
    flex: 1,
    backgroundColor: '#3CC28A',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerInfo: {
    width: 370,
    maxHeight: 450,
    flex: 1,
    backgroundColor: '#305F50',
    justifyContent: 'center',
    borderRadius: 40,
    
  },
  containerInfoText: {
    color: '#fff',
    fontSize: 20,
    top:10
  },

  divText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    position:'absolute',
    top:150
  },
  imageEco:{
    width: 650,
    height: 210,
    transform: [{ scale: 0.4 }],
    position:'absolute',
    top:0
  },
  btnMonitor:{
    flex:1,
    width: 180,
    height: 120,
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    position:'absolute',
    bottom:50,
    left:20,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Sombra para Android
    elevation: 10,
    justifyContent: 'center',
  },

  btnMonitorText: {
    color: '#305F50',
    fontSize: 25,
  },

  btnColetores:{
    flex:1,
    width: 180,
    height: 120,
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    position:'absolute',
    bottom:50,
    right:20,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Sombra para Android
    elevation: 10,
    justifyContent: 'center',
  },

  btnColetoresText: {
    color: '#305F50',
    fontSize: 25,
  },
  semAlertas: {
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    fontSize: 30
  },
  verMais: {
    color: '#FBB901',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  
});
