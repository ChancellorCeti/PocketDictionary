import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

 
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: '',
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: '',
    };
  }
  getWord=(word)=>{
  var searchKeyword = word.toLowerCase();
  var url =
    'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
  return fetch(url)
    .then((data) => {
      if (data.status === 200) {
        return data.json();
      } else {
        return null;
      }
    })
    .then((response) => {
      var responseObject=response;
      if(responseObject){
        var wordData=responseObject.definitions[0]
        var definition=wordData.description
        var lexicalCategory=wordData.wordtype
        this.setState({
          word:this.state.text,
          definition:definition,
          lexicalCategory:lexicalCategory
        })
      }else{
        this.setState({
          word:this.state.text,
          definition:"Not Found"
        })
      }



    });
}
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({
              isSearchPressed: true,
            });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
        <Text style={styles.displayText}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText:{
    textAlign:'center',
    fontSize:30,

  }
});
