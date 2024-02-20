import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import CounterScreen from '../screens/CounterScreen';
import Login from '../screens/Login';
// import Home from '../screens/Home';

// import CartScreen from '../screens/CartScreen';
import {useSelector} from 'react-redux';
import SingleProduct from '../screens/SingleProduct';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  // const userData = false;
  const {userData} = useSelector(state => state.auth);
  console.log(
    '🚀 ~ file: AppNavigation.js:17 ~ AppNavigation ~ userData:',
    userData,
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userData ? (
          <Stack.Group>
            <Stack.Screen name="root" component={TabNavigation} />
            <Stack.Screen name="SingleProduct" component={SingleProduct} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="CounterScreen" component={CounterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});