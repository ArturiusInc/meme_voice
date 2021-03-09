import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import Bars from './components/svgs/bars';
import HomeScreen from './screens/HomeScreen';
import AddNewScreen from './screens/AddNewScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screensHeaderOprions = {
  headerStyle: {
    backgroundColor: '#39ab49',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => (
    <Image style={styles.logo} source={require('./assets/logo.png')} />
  ),
};

const customHeaderElements = (navigation) => ({
  headerRight: () => (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => navigation.openDrawer()}>
      <Bars />
    </TouchableOpacity>
  ),
});

const StackNavigatorHome = ({ navigation }) => (
  <Stack.Navigator screenOptions={screensHeaderOprions}>
    <Stack.Screen
      name="Meme voice"
      component={HomeScreen}
      options={customHeaderElements(navigation)}
    />
    <Stack.Screen
      name="Add new"
      component={AddNewScreen}
      options={customHeaderElements(navigation)}
    />
  </Stack.Navigator>
);

const StackNavigatorAdd = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName="AddNewScreen"
    screenOptions={screensHeaderOprions}>
    <Stack.Screen
      name="Add new"
      component={AddNewScreen}
      options={customHeaderElements(navigation)}
    />
  </Stack.Navigator>
);

export default function App(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="Meme voice" component={StackNavigatorHome} />
        <Drawer.Screen name="Add new" component={StackNavigatorAdd} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
