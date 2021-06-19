/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {login} from '../Utils/Firebase/auth';

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Welcome from '../Pages/Welcome';

import HomePage from '../Pages/Home/HomePage';
import Search from '../Pages/Home/Search';
import SegmentedList from '../Pages/Home/SegmentedList';
import DetailItem from '../Pages/Home/DetailItem';
import Cart from '../Pages/Home/Cart';

import Account from '../Pages/Account/Account';

const ACTIVE_TAB_COLOR = '#82d2ee';
// const INACTIVE_TAB_COLOR = '#2d1b6b';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      tabBarOptions={{
        labelStyle: {fontSize: 14},
        activeTintColor: '#0f4c75',
        safeAreaInsets: {bottom: 10},
      }}>
      <Tab.Screen
        name="Home"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}>
        {props2 => <HomePage {...props2} data={props.data} />}
      </Tab.Screen>
      <Tab.Screen
        name="Account"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}>
        {props2 => (
          <Account {...props2} data={props.data} logout={props.logout} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const Route = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authAsync = async () => {
      setIsLoading(true);
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('UserLogin');
        const userData = JSON.parse(userToken);
        if (userData !== null) {
          setData(userData);
          setIsLogin(true);
        } else {
          setIsLogin(false);
          setData([]);
        }
      } catch (e) {
        // Restoring token failed
      }
      setIsLoading(false);
    };
    authAsync();
  }, []);

  const handleLogin = async (nip, password) => {
    setIsLoading(true);
    const loginData = await login(nip, password);
    if (loginData.error) {
      Alert.alert('Login Error', loginData.msg);
    } else {
      AsyncStorage.setItem('UserLogin', JSON.stringify(loginData.data));
      setData(loginData.data);
      setIsLogin(true);
    }
    setIsLoading(false);
  };

  const handleLogOut = () => {
    AsyncStorage.removeItem('UserLogin');
    setIsLogin(false);
    setData([]);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin ? (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={'welcome'}>
                {props => <Welcome {...props} loading={isLoading} />}
              </Stack.Screen>
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  headerTitle: 'Login',
                  headerTintColor: ACTIVE_TAB_COLOR,
                }}
                name={'login'}>
                {props => (
                  <Login {...props} loading={isLoading} login={handleLogin} />
                )}
              </Stack.Screen>
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  headerTitle: 'Register',
                  headerTintColor: ACTIVE_TAB_COLOR,
                }}
                name={'register'}>
                {props => <Register {...props} loading={isLoading} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen options={{headerShown: false}} name={'Jadwal'}>
                {props => (
                  <BottomTab {...props} data={data} logout={handleLogOut} />
                )}
              </Stack.Screen>
              <Stack.Screen options={{headerShown: false}} name={'Search'}>
                {props => <Search {...props} />}
              </Stack.Screen>
              <Stack.Screen
                options={{headerShown: false}}
                name={'SegmentedList'}>
                {props => <SegmentedList {...props} />}
              </Stack.Screen>
              <Stack.Screen name={'DetailItem'}>
                {props => <DetailItem {...props} />}
              </Stack.Screen>
              <Stack.Screen name={'Cart'}>
                {props => <Cart {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Route;
