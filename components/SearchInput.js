import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default class SearchInput extends React.Component{
    constructor(props) {
        super()
        this.state = {
          text: '',
        }
       // this.handleTextChange = this.handleTextChange.bind(this)
       // this.onSubmitEditing = this.onSubmitEditing.bind(this)
    }

    handleTextChange = (text) => {
        this.setState({
            text: text
        })
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;
        if (!text) return;
        onSubmit(text);
        this.setState({ text: '' });
    };



    render(){

        const { placeholder } = this.props
        const { text } = this.state
        return(
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    value = {text}
                    placeholder={placeholder}
                    style={styles.textInput}
                    clearButtonMode={"always"}
                    onChangeText={this.handleTextChange}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white',
        width: 300
    },
})