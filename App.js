import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TextInput, Button, ScrollView } from 'react-native';

var {height, width} = Dimensions.get('window');

var numberVar = "1";

var isSyntactic = true;
var isPragmatic = false;
var isSemantic = false;

export default class App extends Component {
  constructor()
  {
    super();
    this.state = {
      number: "1",
      texts_visible: true,
      authors_visible: false,
    };
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
              onEndEditing = {() => this.updateChallenge()}
            />
            <View style={styles.boxLeftArrows}>
              <View style={styles.boxArrowLeft}>
                <Button
                  onPress={() => this.buttonActionPerformed("left")}
                  title="<"
                  color="#841584"
                  accessibilityLabel="Professor Button"
                />
              </View>
              <View style={styles.boxArrowRight}>
                <Button
                  onPress={() => this.buttonActionPerformed("right")}
                  title=">"
                  color="#841584"
                  accessibilityLabel="Professor Button"
                />
              </View>
            </View>
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
            {this._texts()}
          </View>
        </View>
      </View>
    );
  }

  _texts()
  {
    if(this.state.texts_visible)
    {
      return (
        <View>
          <Text style={styles.uses}>{this.state.use}</Text>
          <Text style={styles.titles}>Example:</Text>
          <Text style={styles.texts}>{this.state.example}</Text>
          <Text style={styles.titles}>Correction:</Text>
          <Text style={styles.texts}>{this.state.correction}</Text>
        </View>
      );
    }else if(this.state.authors_visible)
    {
      return (
        <Text style={styles.authors}>{this.state.authors}</Text>
      );
    }else
    {
      return (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.exercises} selectable>{this.state.exercises}</Text>
        </ScrollView>
      );
    }
  }

  buttonActionPerformed = button =>
  {
    this.cleanVisibleStates();
    switch(button)
    {
      case "left":
        this.onChangeText(""+(parseInt(this.state.number)-1));
        this.updateChallenge();
        break;
      case "right":
        this.onChangeText(""+(parseInt(this.state.number)+1));
        this.updateChallenge();
        break;
      case "right":
        break;
      case "professor":
        this.setState({number: "1"});
        this.setState({use: "Use indentation in each paragraph. This is important as a visual aid so as the reader knows where the paragraphs begin."})
        this.setState({example: "One day when I was at home, my parents began to cry."});
        this.setState({correction: "https://www.google.com"})
        break;
      case "authors":
        var authors = "Autoras: Jacqueline García Botero\n"+
                      "Margarita Alexandra Botero Restrepo\n"+
                      "Larissa Tatiana Rico Buitragos\n\n"+
                      "Programador: Santiago Botero Peláez\n"+
                      "Armenia, Quindio, Colombia (2020)";
        this.setState({authors: authors});
        this.setState({texts_visible : false});
        this.setState({authors_visible : true});
        break;
      case "exercises":
        var exercises = "ejercicios\n\n"+

                        "ejercicios de gramática (mixed):\n"+
                        "http://www.really-learn-english.com/easy-english-grammar.html\n"+
                        "http://www.perfect-english-grammar.com/grammar-explanations.html\n"+
                        "http://speakspeak.com/english-grammar-exercises\n"+
                        "http://www.examenglish.com/grammar/b1_grammar.html\n\n"+
                        
                        "ejercicios de tiempos verbales:\n"+
                        "http://www.agendaweb.org/verbs/mixed_tenses-exercises.html\n"+
                        "http://www.agendaweb.org/verbs/all-tenses-in-english.html\n"+
                        "http://www.formadocenti.it/download/test_inglese.pdf\n"+
                        "http://esl.fis.edu/grammar/q7m/1.htm\n"+
                        "http://www.english-4u.de/tenses_ex2.htm\n\n"+
                        
                        "ejercicios sobre gerunds vs infinitives:\n"+
                        "https://www.usingenglish.com/quizzes/420.html\n"+
                        "https://www.allthingsgrammar.com/uploads/2/3/2/9/23290220/atg-quiz-gerundsinfin-2.pdf\n"+
                        "https://www.allthingsgrammar.com/uploads/2/3/2/9/23290220/atg-quiz-gerinfinrevised.pdf\n"+
                        "http://a4esl.org/q/h/9801/el-to-ing.html\n"+
                        "https://www.e-grammar.org/infinitive-gerund/test1-exercise2/\n"+
                        "https://agendaweb.org/verbs/infinitives-gerunds-english.html\n"+
                        "http://www.focus.olsztyn.pl/en-exercises-gerund.html\n\n"+
                        
                        "ejercicios sobre phrasal verbs:\n"+
                        "https://agendaweb.org/verbs/phrasal_verbs2-exercises.html\n"+
                        "http://www.phrasalverbexercises.com/pv_1.html\n"+
                        "http://www.english-grammar.at/online_exercises/phrasal_verbs/phrasal_verbs_index.htm\n"+
                        "https://www.learnenglishfeelgood.com/mixed-phrasal-verbs1.html\n\n"+
                        
                        "ejercicios sobre prepositions +-ing\n"+
                        "http://www.grammar-quizzes.com/verbs_prep.html\n"+
                        "https://www.englisch-hilfen.de/en/exercises/structures/gerund_prepositions.htm\n"+
                        "https://www.tolearnenglish.com/exercises/exercise-english-2/exercise-english-82507.php";

        this.setState({
          exercises: exercises,
          exercises_visible: true,
          texts_visible : false
        })
        break;
      case "syntactic":
        this.setState({
          number: "1",
        });
        numberVar = "1";
        isSyntactic = true;
        isSemantic = false;
        isPragmatic = false;
        this.updateChallenge();
        break;
      case "semantic":
        this.setState({
          number: "1",
        });
        numberVar = "1";
        isSyntactic = false;
        isSemantic = true;
        isPragmatic = false;
        this.updateChallenge();
        break;
      case "pragmatic":
        this.setState({
          number: "1",
        });
        numberVar = "1";
        isSyntactic = false;
        isSemantic = false;
        isPragmatic = true;
        this.updateChallenge();
        break;
    }
  }

  onChangeText = text =>
  {
    this.cleanVisibleStates();
    if(isNumber(text))
    {
      var num = parseInt(text);
      
      if(num < 1)
      {
        text = "1";
      }
    }
    
    numberVar = text;
    this.setState({number: text})
  }

  cleanVisibleStates = () =>
  {
    this.setState({
      texts_visible: true,
      authors_visible: false
    })
  }

  updateChallenge = () =>
  {
    if(isSyntactic)
    {
      Alert.alert("Syntactic.");
    }else if(isSemantic)
    {
      Alert.alert("Semantic.");
    }else
    {
      Alert.alert("Pragmatic.");
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
    height: 25,
    width: width,
    flexDirection: 'column',
    backgroundColor: '#aaaaaa'
  },
  contentBox: {
    backgroundColor: '#ffff00',
    height: height-85,
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
  boxLeftArrows: {
    flexDirection: 'row',
    width: 100,
    padding: 10,
  },
  boxArrowLeft: {
    width: 40,
    paddingRight: 5
  },
  boxArrowRight: {
    width: 40,
    paddingLeft: 5
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