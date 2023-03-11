import React, {Component} from 'react';
import {ActivityIndicator, Image, Modal, StyleSheet, Text, View} from 'react-native';
import loadingImg from '../images/loadingImg.png'

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: this.props.isLoading
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            isLoading: nextProps.isLoading
        };
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.state.isLoading}
                style={{zIndex: 1100}}
                onRequestClose={() => {
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>

                        {/* If you want to image set source here */}
                        <Image
                            source={loadingImg}
                            style={{height: 80, width: 80}}
                            resizeMode="contain"
                            resizeMethod="resize"
                        />
                        <ActivityIndicator animating={this.state.isLoading} color="black"/>
                    </View>
                    <Text>Please Wait page is loading</Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        zIndex: 1000
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
});

export default Loader
