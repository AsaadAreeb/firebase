import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Log_in = () => {
    const navigation = useNavigation();
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psd, setPsd] = useState('');
    const [isloading, setisLoading] = useState(false);

    const open_account = async () => {
        setisLoading(true);
        try {
            await auth()
                .signInWithEmailAndPassword(email, psd)
                .then(() => {
                    console.log('User account signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is not valid!');
                    }
                    if (error.code === 'auth/user-not-found') {
                        console.log('there is no user corresponding to the given email!');
                    }
                    if (error.code === 'auth/wrong-password') {
                        console.log('the password is invalid!')
                    }
                    console.error(error);
                    setisLoading(false);
                    console.log('loading is set to false!')
                });
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            {/* <View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={setName}
                />
            </View> */}
            <Modal
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
                    placeholder="Email"
                    onChangeText={setEmail}
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
            <TouchableOpacity onPress={() => {
                open_account()
            }}
            >
                <View style={styles.log_btn}>
                    <Text style={styles.input}>Log In</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Sign Up') }}
            >
                <View style={styles.log_btn}>
                    <Text style={styles.input}>Sign Up</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Log_in

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