import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CategoryPage = () => {

    const [category, setCategory] = useState(0);

    return(
        <View >
            <Text>
                    PAgina de categoria {category}
            </Text>
            <TouchableOpacity onPress={ () => setCategory(category+1)} style={{backgroundColor: 'blue'}}>
                <Text>
                    clique aq
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default CategoryPage;