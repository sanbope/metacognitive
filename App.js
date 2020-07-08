import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TextInput, Button, ScrollView, Slider, AsyncStorage } from 'react-native';
import Syntactic from './syntactic'
import Pragmatic from './pragmatic'
import Semantic from './semantic'
import Professor from './professor'

var {height, width} = Dimensions.get('window');

var numberVar = "1";

var isSyntactic = true;
var isPragmatic = false;
var isSemantic = false;

let syntacticConst;
let pragmaticConst;
let semanticConst;
let professorConst;

export default class App extends Component {
  constructor()
  {
    super();
    syntacticConst = new Syntactic();
    pragmaticConst = new Pragmatic();
    semanticConst = new Semantic();
    professorConst = new Professor();
    var note = syntacticConst.getNotes()[numberVar-1];
    this.state = {
      started: false,
      number: "1",
      texts_visible: true,
      authors_visible: false,
      hasNotes: false,
      professor_visible: false,
      exercises_visible: false,
      config_visible: false,
      headTable: ['Syntactic', 'Description', 'Examples'],
      customBackground: "#ffffff",

      use: syntacticConst.getUses()[numberVar-1],
      example: syntacticConst.getExamples()[numberVar-1] == "null" ? "" : syntacticConst.getExamples()[numberVar-1],
      correction: syntacticConst.getCorrections()[numberVar-1] == "null" ? "" : syntacticConst.getCorrections()[numberVar-1],
      note: note,
      hasNotes: note !== "null",
    };
  }

  getStartMessage = () => {
    return "METACOGNITIVE CHALLENGES TO CORRECT YOUR PARAGRAPHS AND ESSAYS\n"+
    "Based on the following explanations, please correct your own mistakes.\n"+
    "We want you to enhance your understanding and awareness about English rules\n"+
    "to contribute with the development of good writing skills.";
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'background',
        this.state.customBackground,
      );
    } catch (error) {
      Alert.alert(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('background');
      if (value !== null) {
        Alert.alert(value);
        return value;
      }else
      {
        this._storeData();
      }
    } catch (error) {
      Alert.alert(error);
      this._storeData();
    }
  };
  
  render()
  {
    if(!this.state.started)
    {
      return (
        <Text
          onPress={() => this.buttonActionPerformed("started")}
          style={styles.startedButton}
          accessibilityLabel="Started Button"
        >{this.getStartMessage()}</Text>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.boxNotifications}></View>
        <View style={styles.box}>
          <View style={[styles.boxLeft, {backgroundColor: this.state.customBackground,}]}>
            <TextInput 
              style={{ height: 50, width: 100, borderColor: 'black', borderBottomWidth: 2, backgroundColor: this.state.customBackground, textAlign: 'center', color: '#000000', fontSize:30}}
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
              accessibilityLabel="Exercises Button"
            />
            <Button 
              onPress={() => this.buttonActionPerformed("config")}
              title="config"
              color="#841580"
              accessibilityLabel="Config Button"
            />
            { this._noteButton() }
          </View>
          <View style={[styles.boxRight, {backgroundColor: this.state.customBackground,}]}>
            <View style={styles.boxTop}>
              <View style={styles.topButtons}>
                <Button
                  onPress={() => this.buttonActionPerformed("syntactic")}
                  title={"syntactic\nchallenges"}
                  style={styles.topButtons}
                  color="#3C8515"
                  accessibilityLabel="Syntactic Button"
                />
              </View>
              <View style={styles.topButtons}>
                <Button
                  onPress={() => this.buttonActionPerformed("pragmatic")}
                  title={"pragmatic\nchallenges"}
                  style={styles.topButtons}
                  color="#3C8515"
                  accessibilityLabel="Pragmatic Button"
                />
              </View>
              <View style={styles.topButtons}>
                <Button
                  onPress={() => this.buttonActionPerformed("semantic")}
                  title={"semantic\nchallenges"}
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

  _noteButton()
  {
    if(this.state.hasNotes == true)
    {
      return (
        <Button 
          onPress={() => this.buttonActionPerformed("note")}
          title="note"
          color="#841584"
          accessibilityLabel="Note Button"
        />
      );
    }
  }

  _texts()
  {
    if(this.state.texts_visible)
    {
      return (
        <View>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.uses} selectable>{this.state.use}</Text>
          </ScrollView>

          <Text style={styles.titles}>Example:</Text>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.example} selectable>{this.state.example}</Text>
          </ScrollView>
          
          <Text style={styles.titles}>Correction:</Text>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.correction} selectable>{this.state.correction}</Text>
          </ScrollView>
        </View>
      );
    }else if(this.state.authors_visible)
    {
      return (
        <Text style={styles.authors}>{this.state.authors}</Text>
      );
    }else if(this.state.exercises_visible)
    {
      return (
        <ScrollView style={styles.scrollView}>
          <Text style={{fontSize: 13}} selectable>{this.state.exercises}</Text>
        </ScrollView>
      );
    }else if(this.state.notes_visible)
    {
      return (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.notes} selectable>{this.state.note}</Text>
        </ScrollView>
      );
    }else if(this.state.professor_visible)
    {
      let returnValue = professorConst.getMatrix().map(eachItem =>
        <View style={{flexDirection: 'row'}}>
            <Text onPress={() => this.goToChallenge(eachItem[0])} selectable style={this.getProfessorStyle(eachItem[1])}>
              {eachItem[0]}
            </Text>
            <Text onPress={() => this.goToChallenge(eachItem[0])} selectable style={this.getProfessorStyle(eachItem[1])}>
              {eachItem[1]}
            </Text>
        </View>
      );
      return (
        <ScrollView>
          {returnValue}
        </ScrollView>
      );
    }else if(this.state.config_visible)
    {
      return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            value={this.state.slider}
            onValueChange={(value) => this.sliderValueChange(value)}
          />
          <Text style={{paddingLeft: 10}}>Ajustar fondo amarillo: {this.state.customBackground}</Text>
        </View>
      );
    }
  }

  goToChallenge = (item) =>
  {
    if(item.includes("#"))
    {
      var type = item.split("#")[0];
      var n = item.split("#")[1];

      this.buttonActionPerformed(type == "SY" ? "syntactic" : type == "P" ? "pragmatic" : "semantic");
      this.setState({number: n});
      numberVar = n;
      this.updateChallenge();
    }
  }

  getProfessorStyle = (item) =>
  {
    if(item == 'DESCRIPTION')
    {
      return styles.professorTitle;
    }else
    {
      return styles.professor;
    }
  }

  getSliderValue = () =>
  {
    var hex = this.state.customBackground;
    var num = hex.substring(hex.length-2, hex.length);

    if(!isNumber(num))
    {
      switch(num)
      {
        case "aa":
          num = "100";
          break;
        case 101:
          num = "101";
          break;
        case 102:
          num = "102";
          break;
        case 103:
          num = "103";
          break;
        case 104:
          num = "104";
          break;
        default:
          num = "105";
          break;
      }
    }
    
    return parseFloat(parseInt(num)/105);
  }

  sliderValueChange = (value) =>
  {
    var v = parseInt(value*(105));
    var hex = "#ffff";

    if(v >= 100)
    {
      switch(v)
      {
        case 100:
          hex += "aa";
          break;
        case 101:
          hex += "bb";
          break;
        case 102:
          hex += "cc";
          break;
        case 103:
          hex += "dd";
          break;
        case 104:
          hex += "ee";
          break;
        default:
          hex += "ff";
          break;
      }
    }else
    {
      if(v < 10)
      {
        hex += "0"+v;
      }else
      {
        hex += ""+v;
      }
    }
    this.setState({slider: hex});

    this.setState({customBackground: hex});
  }

  buttonActionPerformed = button =>
  {
    this.cleanVisibleStates();
    switch(button)
    {
      case "started":
        this.setState({
          started: true,
        });
        break;
      case "left":
        this.onChangeText(""+(parseInt(this.state.number)-1));
        this.updateChallenge();
        break;
      case "right":
        this.onChangeText(""+(parseInt(this.state.number)+1));
        this.updateChallenge();
        break;
      case "professor":
        this.setState({
          texts_visible: false,
          professor_visible: true
        });
        break;
      case "config":
        this.setState({
          config_visible: true,
          texts_visible: false,
          slider: this.getSliderValue(),
        });
        break;
      case "authors":
        var authors = "Autoras: Jacqueline García Botero\n"+
                      "Larissa Tatiana Rico Buitragos\n"+
                      "Margarita Alexandra Botero Restrepo\n\n"+
                      "Programador: Santiago Botero Peláez\n"+
                      "Armenia, Quindio, Colombia (2020)";
        this.setState({authors: authors});
        this.setState({texts_visible : false});
        this.setState({authors_visible : true});
        break;
      case "exercises":
        var exercises = "exercises:\n\n"+

                        "Exercises about grammar (mixed):\n"+
                        "http://www.really-learn-english.com/easy-english-grammar.html\n"+
                        "http://www.perfect-english-grammar.com/grammar-explanations.html\n"+
                        "http://speakspeak.com/english-grammar-exercises\n"+
                        "http://www.examenglish.com/grammar/b1_grammar.html\n\n"+
                        
                        "Exercises about verb tenses:\n"+
                        "http://www.agendaweb.org/verbs/mixed_tenses-exercises.html\n"+
                        "http://www.agendaweb.org/verbs/all-tenses-in-english.html\n"+
                        "http://www.formadocenti.it/download/test_inglese.pdf\n"+
                        "http://esl.fis.edu/grammar/q7m/1.htm\n"+
                        "http://www.english-4u.de/tenses_ex2.htm\n\n"+
                        
                        "Exercises about gerunds vs infinitives:\n"+
                        "https://www.usingenglish.com/quizzes/420.html\n"+
                        "https://www.allthingsgrammar.com/uploads/2/3/2/9/23290220/atg-quiz-gerundsinfin-2.pdf\n"+
                        "https://www.allthingsgrammar.com/uploads/2/3/2/9/23290220/atg-quiz-gerinfinrevised.pdf\n"+
                        "http://a4esl.org/q/h/9801/el-to-ing.html\n"+
                        "https://www.e-grammar.org/infinitive-gerund/test1-exercise2/\n"+
                        "https://agendaweb.org/verbs/infinitives-gerunds-english.html\n"+
                        "http://www.focus.olsztyn.pl/en-exercises-gerund.html\n\n"+
                        
                        "Exercises about phrasal verbs:\n"+
                        "https://agendaweb.org/verbs/phrasal_verbs2-exercises.html\n"+
                        "http://www.phrasalverbexercises.com/pv_1.html\n"+
                        "http://www.english-grammar.at/online_exercises/phrasal_verbs/phrasal_verbs_index.htm\n"+
                        "https://www.learnenglishfeelgood.com/mixed-phrasal-verbs1.html\n\n"+
                        
                        "Exercises about prepositions +-ing\n"+
                        "http://www.grammar-quizzes.com/verbs_prep.html\n"+
                        "https://www.englisch-hilfen.de/en/exercises/structures/gerund_prepositions.htm\n"+
                        "https://www.tolearnenglish.com/exercises/exercise-english-2/exercise-english-82507.php";

        this.setState({
          exercises: exercises,
          exercises_visible: true,
          texts_visible : false
        })
        break;
      case "note":
        this.setState({
          notes_visible: true,
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

      if(isSyntactic && num >= syntacticConst.getSize())
      {
        text = ""+syntacticConst.getSize();
      }else if(isPragmatic && num >= pragmaticConst.getSize())
      {
        text = ""+pragmaticConst.getSize();
      }else if(isSemantic && num >= semanticConst.getSize())
      {
        text = ""+semanticConst.getSize();
      }
    }
    
    numberVar = text;
    this.setState({number: text})
  }

  cleanVisibleStates = () =>
  {
    this.setState({
      texts_visible: true,
      authors_visible: false,
      exercises_visible: false,
      notes_visible: false,
      config_visible: false,
      professor_visible: false
    })
  }

  updateChallenge = () =>
  {
    this._storeData();
    if(isSyntactic)
    {
      var note = syntacticConst.getNotes()[numberVar-1];
      this.setState({
        use: syntacticConst.getUses()[numberVar-1],
        example: syntacticConst.getExamples()[numberVar-1] == "null" ? "" : syntacticConst.getExamples()[numberVar-1],
        correction: syntacticConst.getCorrections()[numberVar-1] == "null" ? "" : syntacticConst.getCorrections()[numberVar-1],
        note: note,
        hasNotes: note !== "null",
      });
    }else if(isSemantic)
    {
      var note = semanticConst.getNotes()[numberVar-1];
      this.setState({
        use: semanticConst.getUses()[numberVar-1],
        example: semanticConst.getExamples()[numberVar-1] == "null" ? "" : semanticConst.getExamples()[numberVar-1],
        correction: semanticConst.getCorrections()[numberVar-1] == "null" ? "" : semanticConst.getCorrections()[numberVar-1],
        note: note,
        hasNotes: note !== "null",
      });
    }else if(isPragmatic)
    {
      var note = pragmaticConst.getNotes()[numberVar-1];
      this.setState({
        use: pragmaticConst.getUses()[numberVar-1],
        example: pragmaticConst.getExamples()[numberVar-1] == "null" ? "" : pragmaticConst.getExamples()[numberVar-1],
        correction: pragmaticConst.getCorrections()[numberVar-1] == "null" ? "" : pragmaticConst.getCorrections()[numberVar-1],
        note: note,
        hasNotes: note !== "null",
      });
    }
  }
}// Fin class

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
    height: height-75,
    width: width-50
  },
  box: {
    flexDirection: 'row',
  },
  boxLeft: {
    flexDirection: 'column',
    height: height-75,
    width: 100,
    //backgroundColor: background,
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
    height: height-25,
    width: width-100,
    //backgroundColor: background
  },
  titles: {
    height: 30,
    paddingLeft: 5,
    color: '#0000ff',
    fontSize: 20,
    //backgroundColor: background,
    fontWeight: 'bold',
    width: width-100,
  },
  example: {
    height: (height-75-60)/3,
    paddingLeft: 15,
    fontSize: 18,
    //backgroundColor: background,
    width: width-100,
    textDecorationLine: 'line-through',
  },
  correction: {
    height: (height-75-60)/3,
    paddingLeft: 15,
    fontSize: 18,
    //backgroundColor: background,
    width: width-100,
  },
  uses: {
    height: (height-75-60)/3,
    paddingLeft: 5,
    color: '#ff0000',
    fontSize: 18,
    //backgroundColor: background,
    width: width-100,
  },
  notes: {
    //backgroundColor: '#ffff00',
    height: height-75,
  },
  authors: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: height-75
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
  startedButton: {
    height: height,
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000000",
    backgroundColor: "#eeeeee",
  },
  headStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  professor: {
    width: (width-100)/2,
    height: 35,
    fontSize: 13,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  professorTitle: {
    width: (width-100)/2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 2,
    backgroundColor: '#5ff',
    borderColor: '#000000',
  }
});
