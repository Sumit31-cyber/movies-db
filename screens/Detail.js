import { Image, ScrollView, StyleSheet, Modal, Text, View, Dimensions, ActivityIndicator, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getMovie } from '../services/Services';
import StarRating from 'react-native-star-rating';

import dateFormat from 'dateformat'
import PlayButton from '../components/PlayButton';


const placeHolderImage = require('../assets/images/placeholder.png')
const height = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId;

    const [movieDetail, setMovieDetail] = useState();
    const [loaded, setLoaded] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const videoShown = () => {
        setModalVisible(!modalVisible);
    }

    useEffect(() => {
        getMovie(movieId).then((movieData) => {
            setMovieDetail(movieData);
            setLoaded(true);
        })
    }, [movieId])
    return (
        <React.Fragment>
            {loaded && (
                <View>
                    <ScrollView>
                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={
                                movieDetail.poster_path
                                    ? { uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path }
                                    : placeHolderImage
                            } />
                        <View style={styles.container}>
                            <View style={styles.playButton}>

                                <PlayButton
                                    handlePress={videoShown}
                                />

                            </View>
                            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                            {movieDetail.genres && (
                                <View style={styles.genreContainer}>
                                    {movieDetail.genres.map(genre => {
                                        return (
                                            <Text key={genre.id} style={styles.genreText}>{genre.name}</Text>
                                        )
                                    })}
                                </View>)}
                            <StarRating
                                disabled={true}
                                fullStarColor='gold'
                                starSize={30}
                                maxStars={5}
                                rating={movieDetail.vote_average / 2}
                            />
                            <Text style={styles.overview}>{movieDetail.overview}</Text>
                            <Text style={styles.release}>Release Date : {dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}</Text>
                        </View>
                    </ScrollView>
                    <Modal
                        animationType='slide'
                        visible={modalVisible}
                    >
                        <View style={styles.videoModal}>
                            <Pressable
                                onPress={() => videoShown()}
                            >
                                <Text>Feature Coming Soon..</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            )
            }
            {!loaded && <ActivityIndicator size={'large'} style={{ flex: 1 }} />}
        </React.Fragment >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: height / 2,
    },
    movieTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        paddingBottom: 10,
        color: 'black'
    },
    genreContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    genreText: {
        fontSize: 14,
        alignSelf: 'center',
        color: '#3E497A',
        margin: 8,
    },
    overview: {
        paddingHorizontal: 25,
        paddingVertical: 12,
        textAlign: 'center'
    },
    release: {
        fontWeight: 'bold',
        color: 'black'
    },
    playButton: {
        position: 'absolute',
        top: -25,
        right: 20,
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Detail
