import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TextInput, Button } from 'react-native';

var {height, width} = Dimensions.get('window');

export default class App extends Component {
  constructor()
  {
    super();
    this.state = {};
  }
  
  render()
  {
    return (
      <View style={styles.container}>
        <View style={styles.boxNotifications}></View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <TextInput 
              style={{ height: 50, width: 100, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', textAlign: 'center', color: '#000000', fontSize:40}}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.number}
              keyboardType = 'number-pad'
            />
            <Button
              onPress={() => this.buttonActionPerformed("professor")}
              title="professor"
              color="#841584"
              accessibilityLabel="Professor Button"
            />
            <Button
              onPress={() => this.buttonActionPerformed("authors")}
              title="authors"
              color="#841584"
              accessibilityLabel="Authors Button"
            />
            <Button 
              onPress={() => this.buttonActionPerformed("exercises")}
              title="exercises"
              color="#841584"
              accessibilityLabel="exercises Button"
            />
          </View>
          <View style={styles.boxRight}>
            <View style={styles.boxTop}>
              <View style={styles.topButtons}>
                <Button
                  onPress={() => this.buttonActionPerformed("syntactic")}
                  title="syntactic challenges"
                  style={styles.topButtons}
                  color="#3C8515"
                  accessibilityLabel="exercises Button"
                />
              </View>
              <View style={styles.topButtons}>
                <Button
                  onPress={() => this.buttonActionPerformed("pragmatic")}
                  title="pragmatic challenges"
                  style={styles.topButtons}
                  color="#3C8515"
                  accessibilityLabel="exercises Button"
                />
              </View>
              <View style={styles.topButtons}>
                <Button
                  onPress={() => this.buttonActionPerformed("semantic")}
                  title="semantic\n challenges"
                  style={styles.topButtons}
                  color="#3C8515"
                  accessibilityLabel="exercises Button"
                />
              </View>
            </View>
            <Text style={styles.uses}>{this.state.use}</Text>
            <Text style={styles.titles}>Example:</Text>
            <Text style={styles.texts}>{this.state.example}</Text>
            <Text style={styles.titles}>Correction:</Text>
            <Text style={styles.texts}>{this.state.correction}</Text>
          </View>
        </View>
      </View>
    );
  }

  buttonActionPerformed = button =>
  {
    switch(button)
    {
      case "professor":
        this.setState({number: "1"});
        this.setState({use: "Use indentation in each paragraph. This is important as a visual aid so as the reader knows where the paragraphs begin."})
        this.setState({example: "One day when I was at home, my parents began to cry."});
        this.setState({correction: "This is the correction."})
        break;
    }
  }

  onChangeText = text =>
  {
    if(isNumber(text))
    {
      var num = parseInt(text);
      
      if(num < 1)
      {
        num = 1;
      }

      this.setState({number: num})
    }else
    {
      this.setState({number: 1})
    }
  }
}

function isNumber(text)
{
  return /^-{0,1}\d+$/.test(text);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxNotifications: {
    height: 40,
    width: width,
    flexDirection: 'column',
    backgroundColor: '#2196F3'
  },
  contentBox: {
    backgroundColor: '#204010',
    height: height-90,
    width: width-50
  },
  box: {
    flexDirection: 'row',
  },
  boxLeft: {
    flexDirection: 'column',
    height: height,
    width: 100,
    backgroundColor: '#ffffff'
  },
  boxRight: {
    flexDirection: 'column',
    height: height,
    width: width-100,
    backgroundColor: '#ffffff'
  },
  titles: {
    height: 30,
    paddingLeft: 5,
    color: '#0000ff',
    fontSize: 20,
    backgroundColor: '#ffffff',
    width: width-100,
  },
  texts: {
    height: (height-90)/3-30,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: '#ffffff',
    width: width-100,
  },
  uses: {
    height: (height-90)/3,
    paddingLeft: 5,
    color: '#ff0000',
    fontSize: 18,
    backgroundColor: '#ffffff',
    width: width-100,
  },
  boxTop: {
    flexDirection: 'row',
    height: 50,
    width: width-100,
    justifyContent: 'flex-start',
    backgroundColor: '#e3aa1a'
  },
  topButtons: {
    width: (width-100)/3,
    height: 40,
  },
});