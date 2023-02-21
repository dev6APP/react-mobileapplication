import { View, Text, FlatList } from 'react-native';

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Fetching from '../../layout/message_fetching';

// queries
import { useState, useEffect } from "react";

// Boundaries
import GetBoundary from './boundaries';

export default function FieldDetailsScreen({ route, navigation }) {
    // Styling
    const style = useThemedStyles(styles);

    const { field } = route.params;

    useEffect(() => {
        console.log(field)
    })
    
    if(!field) return <Fetching message="No field"/>

    return (
        <View style={style.body}>
            <Text style={[style.text, style.name]}>{field.name}</Text>
            <GetBoundary/>
        </View>
    );
};