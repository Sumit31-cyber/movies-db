import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import Card from "./Card";
import PropTypes from 'prop-types'


const propTypes = {
    title: PropTypes.string,
    content: PropTypes.object,
}

class List extends PureComponent {
    render() {
        const { navigation, title, content } = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View >
                    <FlatList
                        horizontal
                        data={content}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.container}>
                                    <Card
                                        navigation={navigation}
                                        item={item} />
                                </View>
                            );
                        }}
                    /></View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    list: {
        paddingTop: 25,
    },

    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 15,
        color: 'black',
    }

})
List.prototype = propTypes;

export default List;