import React, { PureComponent } from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

const placeHolderImage = require('../assets/images/placeholder.png')

const propTypes = {
    item: PropTypes.object
}

class Card extends PureComponent {
    render() {
        const { navigation, item } = this.props
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => { navigation.navigate('Details', { movieId: item.id }) }}
            >
                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={
                        item.poster_path
                            ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }
                            : placeHolderImage
                    } />
                {!item.poster_path && (<Text style={styles.movieName}>{item.title}</Text>)}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 200,
        marginBottom: 8,
    },
    image: {
        height: 200,
        width: 120,
        borderRadius: 12,
    },
    movieName: {
        position: 'absolute',
        width: 100,
        textAlign: 'center',
        color: '#9A9483',
        top: 150,


    }
})
Card.propTypes = propTypes;

export default Card 