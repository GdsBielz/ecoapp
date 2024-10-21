import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import MonitorScreen from './monitor';
import MachinesScreen from './maquina';
import EditMachineScreen from './editMaquina';
import TodosAlertasScreen from './alertas';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerStyle: { 
              height: 0, // Altura do cabeçalho
            }
          }}
        />
        <Stack.Screen 
          name="Monitor"
          component={MonitorScreen}
          options={{
            headerStyle: { 
              backgroundColor: '#305f50', // Cor do cabeçalho
              height: 80, // Altura do cabeçalho
            },
            headerTintColor: '#fff', // Cor do texto/ícones do cabeçalho
          }}
          />

        <Stack.Screen 
          name="Maquinas"
          component={MachinesScreen} 
          options={{
            headerStyle: { 
              backgroundColor: '#305f50', // Cor do cabeçalho
              height: 80, // Altura do cabeçalho
            },
            headerTintColor: '#fff', // Cor do texto/ícones do cabeçalho
          }}
        />

        <Stack.Screen 
          name="EditMaquinas"
          component={EditMachineScreen} 
          options={{
            headerStyle: { 
              backgroundColor: '#305f50', // Cor do cabeçalho
              height: 80, // Altura do cabeçalho
            },
            headerTintColor: '#fff', // Cor do texto/ícones do cabeçalho
          }}
        />
                <Stack.Screen 
          name="TodosAlertas"
          component={TodosAlertasScreen} 
          options={{
            headerStyle: { 
              backgroundColor: '#305f50', // Cor do cabeçalho
              height: 80, // Altura do cabeçalho
            },
            headerTintColor: '#fff', // Cor do texto/ícones do cabeçalho
          }}
        />
      </Stack.Navigator>
      
  );
}
