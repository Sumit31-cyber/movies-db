import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { searchMovieTv } from '../services/Services'
import Card from '../components/Card'
import Error from '../components/Error'


const Search = ({ navigation }) => {
    const [text, onChangeText] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [error, setError] = useState()

    const onSubmit = (query) => {
        Promise.all([
            searchMovieTv(query, 'movie'),
            searchMovieTv(query, 'tv')
        ]).then(([movie, tv]) => {
            const data = [...movie, ...tv]
            setSearchResult(data)
        })

    }
    return (
        <React.Fragment>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <TextInput
                            placeholder='Search Movie ot Tv Show'
                            placeholderTextColor={'grey'}
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity
                        onPress={() => { onSubmit(text) }}
                    >
                        <Icon
                            color={'black'}
                            name={'search-outline'}
                            size={30}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchItems}>
                    {/* Searched items results */}
                    {searchResult && searchResult.length > 0 && (
                        <FlatList
                            numColumns={3}
                            data={searchResult}
                            renderItem={({ item }) => (
                                <Card navigation={navigation} item={item} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    )}

                    {/* When searched but no results */}
                    {!searchResult && searchResult.length == 0 && (
                        <View style={styles.noResults}>
                            <Text>No results matching your criteria.</Text>
                            <Text>Try different keywords.</Text>
                        </View>
                    )}

                    {/* When nothing is searched */}
                    {!searchResult && (
                        <View style={styles.empty}>
                            <Text>Type something to start searching</Text>
                        </View>
                    )}

                    {/* Error */}
                    {error && <Error />}
                </View>
            </ScrollView>
        </React.Fragment>
    )
}

export default Search
const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        borderRadius: 15,
        borderWidth: 0.5,
        color: 'black',
        padding: 8,
        margin: 12,
    },
    form: {
        flexBasis: 'auto',
        flexGrow: 1,
    },
    searchItems: {
        padding: 12,
    }, form: {
        flexBasis: 'auto',
        flexGrow: 1,
        paddingRight: 8,
    },

    noResults: {
        paddingTop: 20,
    },

})