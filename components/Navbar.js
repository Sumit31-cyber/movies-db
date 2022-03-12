import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import Colors from '../theme/Colors'

const propTypes = {
    main: PropTypes.bool,
}

const defaultProps = {
    main: false
}

export default class Navbar extends PureComponent {
    render() {
        const {
            navigation,
            main
        } = this.props
        return (
            <View style={{ backgroundColor: 'black', justifyContent: 'center', }}>

                {main ? (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 12 }}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/movie.png')}
                    />
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Search') }}>
                        <Icon
                            color={Colors.white}
                            name={'search-outline'}
                            size={30}
                        ></Icon>
                    </TouchableOpacity>
                </View>)
                    :
                    (<View style={{ padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}>
                            <Icon

                                color={'#fff'}
                                name={'chevron-back'}
                                size={25}
                            ></Icon>
                        </TouchableOpacity>
                    </View>)}

            </View>

        )
    }
}
Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
    }
})