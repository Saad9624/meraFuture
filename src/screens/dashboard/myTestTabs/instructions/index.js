import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Toolbar from '../../../../components/toolbar'
export class Instructions extends Component {
    render() {
        return (
            <View>
                <Toolbar header="Test Type"/>
                <Text> Instructions </Text>
            </View>
        )
    }
}

export default Instructions
 