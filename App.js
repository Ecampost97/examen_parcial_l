import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Pressable, 
  TextInput, 
  Switch, 
  Alert, 
  SafeAreaView 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// A. Arreglo local con los cuatro cursos obligatorios
const cursosData = [
  { id: '1', nombre: 'React Native', horas: 20, descripcion: 'Desarrollo de aplicaciones móviles.' },
  { id: '2', nombre: 'Diseño Web', horas: 18, descripcion: 'Creación de interfaces para sitios web.' },
  { id: '3', nombre: 'Ofimática', horas: 16, descripcion: 'Uso de documentos, presentaciones y hojas de cálculo.' },
  { id: '4', nombre: 'Marketing Digital', horas: 12, descripcion: 'Estrategias de comunicación digital.' },
];

const Stack = createNativeStackNavigator();

// Pantalla Inicio (FlatList y Pressable)
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Catálogo de Cursos</Text>
      <FlatList
        data={cursosData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.courseItem}
            onPress={() => navigation.navigate('Detalle', { curso: item })}
          >
            <View>
              <Text style={styles.courseText}>
                {item.nombre} · {item.horas} horas
              </Text>
            </View>
            <Text style={styles.arrow}>&gt;</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

// Pantalla Detalle (Formulario, Estado, Validaciones y Confirmación)
function DetailScreen({ route }) {
  const { curso } = route.params;
  
  // C. Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaCondiciones, setAceptaCondiciones] = useState(false);

  const handleConfirmarInteres = () => {
    // D. Validaciones solicitadas
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío ni contener solo espacios.');
      return;
    }

    if (!correo.trim() || !correo.includes('@')) {
      Alert.alert('Error', 'Debe ingresar un correo electrónico válido que contenga el carácter "@".');
      return;
    }

    if (!aceptaCondiciones) {
      Alert.alert('Atención', 'Debe aceptar las condiciones para continuar.');
      return;
    }

    // Al cumplirse las validaciones, mostrar Alert de confirmación
    Alert.alert(
      'Registro Exitoso',
      `Nombre: ${nombre}\nCurso seleccionado: ${curso.nombre}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{curso.nombre}</Text>
        <Text style={styles.detailHoras}>{curso.horas} horas</Text>
        <Text style={styles.detailDesc}>{curso.descripcion}</Text>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Acepto condiciones:</Text>
          <Switch
            value={aceptaCondiciones}
            onValueChange={setAceptaCondiciones}
          />
        </View>

        <Pressable style={styles.button} onPress={handleConfirmarInteres}>
          <Text style={styles.buttonText}>Confirmar interés</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Configuración principal con React Navigation (Stack)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={{ title: 'Catálogo de Cursos' }} 
        />
        <Stack.Screen 
          name="Detalle" 
          component={DetailScreen} 
          options={{ title: 'Detalle del Curso' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// E. Estilos utilizando StyleSheet, padding, margin y Flexbox
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#2f3640',
  },
  courseItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  courseText: {
    fontSize: 16,
    color: '#2f3640',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 18,
    color: '#718093',
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2f3640',
  },
  detailHoras: {
    fontSize: 16,
    color: '#718093',
    marginVertical: 4,
    fontWeight: '600',
  },
  detailDesc: {
    fontSize: 14,
    color: '#353b48',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3640',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#2f3640',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#0097e6',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0097e6',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});