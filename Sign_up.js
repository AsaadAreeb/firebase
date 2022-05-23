import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Sign_up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [psd, setPsd] = useState('');
    const [isloading, setisLoading] = useState(false);


    const create_account = async () => {
        setisLoading(true);
        try {
            await auth()
                .createUserWithEmailAndPassword(email, psd)
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }
                    if (error.code === 'auth/weak-password') {
                        console.log('the password is not strong enough!')
                    }
                    setisLoading(false);
                })
                .then(() => {
                    firestore()
                        .collection('Users')
                        // .doc(email)
                        .add({
                            name: name,
                            email: email,
                            contact: contact,
                            password: psd,
                        })
                        .then(() => {
                            console.log('User Info saved.')
                        })
                        .catch(error => {
                            console.error(error);
                        })
                })
                .catch(error => {
                    console.error(error);
                })
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            <Modal
                // onDismiss={!isloading}
                transparent={true}
                animationType={'none'}
                visible={isloading}
                onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={isloading} />
                    </View>
                </View>
            </Modal>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={setName}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Contact"
                    onChangeText={setContact}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPsd}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity onPress={() => { create_account() }}
            >
                <View style={styles.log_btn}>
                    <Text style={styles.input}>Sign Up</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Sign_up

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    log_btn: {
        marginHorizontal: 130,
        borderRadius: 10
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})