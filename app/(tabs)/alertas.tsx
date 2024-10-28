import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

export default function TodosAlertasScreen({route} :any) {
  const { alertas: initialAlertas } = route.params; // Recebendo os alertas via props
  const [alertas, setAlertas] = useState(initialAlertas); // Estado para os alertas
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  const fetchAlertas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.15.200:5000/alertas'); // Substitua pela URL da sua API
      const data = await response.json();
      setAlertas(data); // Atualiza o estado com os novos alertas
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertas();  // Chamada inicial
    const interval = setInterval(fetchAlertas, 60000); // Atualiza a cada 1 minuto
    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
  }, []);

  const formatDate = (isoDate: any) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>

      {loading ? (
        <View style={styles.containerLoading}><ActivityIndicator style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} size="large" color="#ffffff" /></View>
      ) : (
        <ScrollView style={{ marginTop: 10, backgroundColor: '#305f50', borderRadius: 20, paddingTop: 20}}>
          <DataTable style={styles.containerTable}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title textStyle={styles.celulas}>Código</DataTable.Title>
              <DataTable.Title textStyle={styles.celulas}>Status</DataTable.Title>
              <DataTable.Title textStyle={styles.celulas}>Indicadores</DataTable.Title>
              <DataTable.Title textStyle={styles.celulas}>Data</DataTable.Title>
            </DataTable.Header>
            {alertas.map((alerta:any, index: any) => (
              <DataTable.Row key={`${alerta.idcoletor}-${index}`} style={styles.rowBorders}>
                <DataTable.Cell textStyle={styles.celulas}>{alerta.codigo}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.celulas}>{alerta.status}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.celulas}>{alerta.indicadores}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.celulas}>{formatDate(alerta.dataHora)}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    tableHeader: {
        backgroundColor: '#305F50',
        color: "#F5F5F5",
        borderBottomWidth: 0.2,
    },
  container: {
    flex: 1,
    backgroundColor: '#3CC28A',
    padding: 5,
    justifyContent: 'flex-start',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  celulas: {
    color: "#F5F5F5",
    fontSize: 10,

},
rows: {
    color: "#ffff"
},
rowBorders: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
},
containerLoading: {
    flex: 1,
    backgroundColor: '#3CC28A',
    justifyContent: 'center',
    alignItems: 'center'
},
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 0,
    backgroundColor: '#fff',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  containerTable:{
    backgroundColor: '#305F50',
  }
});
