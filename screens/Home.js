import { StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getPopularMovie, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentry } from '../services/Services';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen')
const Home = ({ navigation }) => {
    const [movieImages, setMovieImages] = useState([]);
    const [popularTv, setPopularTv] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [familyMovies, setFamilyMovies] = useState([]);
    const [documentry, setDocumentry] = useState([]);

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovie(),
            getPopularTv(),
            getFamilyMovies(),
            getDocumentry(),
        ]);
    }

    useEffect(() => {
        getData()
            .then(
                ([
                    upcomingMoviesData,
                    popularMoviesData,
                    popularTvData,
                    familyMoviesData,
                    documentaryMoviesData,
                ]) => {
                    const moviesImagesArray = [];
                    upcomingMoviesData.forEach(movie => {
                        moviesImagesArray.push(
                            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
                        );
                    });

                    setMovieImages(moviesImagesArray);
                    setPopularMovies(popularMoviesData);
                    setPopularTv(popularTvData);
                    setFamilyMovies(familyMoviesData);
                    setDocumentry(documentaryMoviesData);
                    setLoaded(true);
                },
            )
            .catch(() => {
                setError(true);
            }).finally(() => {
                setLoaded(true)
            })
    }, []);

    return (
        <React.Fragment>
            {loaded && !error && (<ScrollView
                showsVerticalScrollIndicator={false}
            >
                {movieImages && (
                    <View style={styles.sliderContainer}>
                        <SliderBox
                            images={movieImages}
                            dotStyle={styles.sliderStyle}
                            sliderBoxHeight={dimensions.height / 1.5}
                            autoplay={true}
                            circleLoop={true}
                        />
                    </View>
                )}
                {/* Popular Movies */}
                {popularMovies && (
                    <View style={styles.carousel}>
                        <List
                            navigation={navigation}

                            title={'Popular Movies'} content={popularMovies} />
                    </View>
                )}
                {/* Popular TV Shows */}
                {popularTv && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title={'Popular TV Shows'} content={popularTv} />
                    </View>
                )}
                {/* Family Movies */}
                {familyMovies && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title={'Family Movies'} content={familyMovies} />
                    </View>
                )}
                {/* Documentary Movies */}
                {documentry && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title={'Documentary Movies'} content={documentry} />
                    </View>
                )}
            </ScrollView>)}
            {!loaded && (<ActivityIndicator style={{ flex: 1 }} size={'large'} color='#C5D8A4' />)}
            {error && <Error />}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        color: 'black',
    },

    sliderStyle: {
        height: 0
    },
    carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Home
