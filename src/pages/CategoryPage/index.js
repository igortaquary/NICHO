import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CategoryPage = ({navigation}) => {

    const [category, setCategory] = useState(0);

    return(
        <View >
            <Text>
                Teste de state {category}
            </Text>
            <TouchableOpacity onPress={ () => setCategory(category+1)}>
                <Text>
                    Add
                </Text>
            </TouchableOpacity>
            <Text onPress={ () => navigation.navigate("ProductPage")}>
                Ir pra pagina solta aleatória
            </Text>
        </View>
    )
};

export default CategoryPage;