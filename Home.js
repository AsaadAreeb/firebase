import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
    const [list_data, set_list_data] = useState([]);

    function onResult(QuerySnapshot) {
        console.log('Got Users collection result.');
        console.log("Total users", QuerySnapshot.size);
        let list = [];
        QuerySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            // set_list_data(documentSnapshot.data())
            // console.log('list data',list_data)
            list.push(documentSnapshot.data());
        })
        // console.log('list data',list_data)
        set_list_data(list);
        console.log('data list', list)
        console.log('flat data', list_data)
    }

    function onError(error) {
        console.error(error);
    }
    useEffect(() => {
        firestore()
            .collection('Users')
            .where('email', '==', auth().currentUser.email)
            .onSnapshot(onResult, onError);
    }, [])

    const Sign_out = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const Item = ({ name, email, contact }) => (
        <View style={styles.data}>
            <Text style={styles.text}>
                Name: {name}
            </Text>
            <Text style={styles.text}>
                Email: {email}
            </Text>
            <Text style={styles.text}>
                Contact: {contact}
            </Text>
        </View>
    )
    const renderItem = ({ item }) => (
        <Item name={item.name} email={item.email} contact={item.contact} />
    )
    return (
        <View>
            <FlatList
                data={list_data}
                renderItem={renderItem}
            >
            </FlatList>
            <Button
                style={styles.button}
                title='Sign out'
                onPress={() => { Sign_out() }}
            >
            </Button>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20
    },
    text: {
        fontSize:15,
        paddingBottom:20,
        fontStyle:'italic',
        // fontStyle:'italic'
    },
    data:{
        padding:10,
    }
})