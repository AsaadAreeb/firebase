import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import Log_in from './Log_in'
import Sign_up from './Sign_up'
import Home from './Home'
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    console.log("user", user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log("initi", initializing)

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          {user ? (
            
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) :
            (
              <>
                <Stack.Screen name="LOG IN" component={Log_in} />
                <Stack.Screen name="Sign Up" component={Sign_up} />
              </>
            )
          }
        </>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})