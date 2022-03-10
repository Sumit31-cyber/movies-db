import { Pressable, StyleSheet } from 'react-native'
import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export default class PlayButton extends PureComponent {
    render() {
        const { handlePress } = this.props;
        return (
            <Pressable
                onPress={() => { handlePress() }}
                style={styles.button}>
                <Icon
                    color={"white"}
                    name={'caret-forward-outline'}
                    size={30}
                />

            </Pressable>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        alignContent: 'center',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        padding: 10,
        backgroundColor: "#4481FC"
    }
})