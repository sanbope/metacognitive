import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TextInput, Button, ScrollView, Slider, Table, Row, Rows, AsyncStorage } from 'react-native';

var {height, width} = Dimensions.get('window');

var numberVar = "1";

var isSyntactic = true;
var isPragmatic = false;
var isSemantic = false;

export default class App extends Component {
  constructor()
  {
    super();
    var note = this.syntacticGetNote(numberVar-1);
    this.state = {
      number: "1",
      texts_visible: true,
      authors_visible: false,
      hasNotes: false,
      professor_visible: false,
      exercises_visible: false,
      config_visible: false,
      headTable: ['Syntactic', 'Description', 'Examples'],
      professorMatrix: this.getProfessorMatrix(),
      customBackground: "#ffffff",

      use: this.syntacticGetUse(numberVar-1),
      example: this.syntacticGetExample(numberVar-1) == "null" ? "" : this.syntacticGetExample(numberVar-1),
      correction: this.syntacticGetCorrection(numberVar-1) == "null" ? "" : this.syntacticGetCorrection(numberVar-1),
      note: note,
      hasNotes: note !== "null",
    };
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
    return (
      <View style={styles.container}>
        <View style={styles.boxNotifications}></View>
        <View style={styles.box}>
          <View style={[styles.boxLeft, {backgroundColor: this.state.customBackground,}]}>
            <TextInput 
              style={{ height: 50, width: 100, borderColor: 'gray', borderWidth: 1, backgroundColor: this.state.customBackground, textAlign: 'center', color: '#000000', fontSize:40}}
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
            <Text style={styles.uses}>{this.state.use}</Text>
          </ScrollView>

          <Text style={styles.titles}>Example:</Text>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.example}>{this.state.example}</Text>
          </ScrollView>
          
          <Text style={styles.titles}>Correction:</Text>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.correction}>{this.state.correction}</Text>
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
          <Text style={styles.exercises} selectable>{this.state.exercises}</Text>
        </ScrollView>
      );
    }else if(this.state.notes_visible)
    {
      return (
        <Text style={styles.notes}>{this.state.note}</Text>
      );
    }else if(this.state.professor_visible)
    {
      return (
        <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
          <Row data={this.state.headTable} style={styles.headStyle} textStyle={styles.tableText}/>
          <Rows data={this.state.professorMatrix} textStyle={styles.tableText}/>
        </Table>
      );
    }else if(this.state.config_visible)
    {
      return (
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            value={this.state.slider}
            onValueChange={(value) => this.sliderValueChange(value)}
          />
          <Text style={{paddingLeft: 10}}>Value: {this.state.customBackground}</Text>
        </View>
      );
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
    //this.setState({slider: value});

    var v = parseInt(value*105);
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
      case "left":
        this.onChangeText(""+(parseInt(this.state.number)-1));
        this.updateChallenge();
        break;
      case "right":
        this.onChangeText(""+(parseInt(this.state.number)+1));
        this.updateChallenge();
        break;
      case "professor":
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

  getProfessorMatrix = () =>
  {
    return [
      ["SC1", "Use of in order to in negative sentences.", "I left home early in order to not to be late for the appointment"],
      ["SC2", 'Use ING like a noun or as part of a "noun', "Smoke is forbiddenSmoking is forbidden. the second step"],
      ["SC3", "", ""],
      ["SC4", "", ""],
      ["SC5", "", ""]
    ];
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

      if(isSyntactic && num >= this.syntacticGetSize())
      {
        text = ""+(this.syntacticGetSize());
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
    })
  }

  syntacticGetUse = (i) =>
  {
    return uses[i];
  }

  syntacticGetExample = (i) =>
  {
    return examples[i];
  }

  syntacticGetCorrection = (i) =>
  {
    return corrections[i];
  }

  syntacticGetNote = (i) =>
  {
    return notes[i];
  }

  syntacticGetSize = () =>
  {
    return uses.length;
  }

  updateChallenge = () =>
  {
    this._storeData();
    if(isSyntactic)
    {
      var note = this.syntacticGetNote(numberVar-1);
      this.setState({
        use: this.syntacticGetUse(numberVar-1),
        example: this.syntacticGetExample(numberVar-1) == "null" ? "" : this.syntacticGetExample(numberVar-1),
        correction: this.syntacticGetCorrection(numberVar-1) == "null" ? "" : this.syntacticGetCorrection(numberVar-1),
        note: note,
        hasNotes: note !== "null",
      });
    }else if(isSemantic)
    {
      Alert.alert("Semantic.");
    }else if(isPragmatic)
    {
      Alert.alert("Pragmatic.");
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
    height: height,
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
    height: height,
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
    height: (height-75)/3-30,
    paddingLeft: 15,
    fontSize: 18,
    //backgroundColor: background,
    width: width-100,
    textDecorationLine: 'line-through',
  },
  correction: {
    height: (height-75)/3-30,
    paddingLeft: 15,
    fontSize: 18,
    //backgroundColor: background,
    width: width-100,
  },
  uses: {
    height: (height-75)/3,
    paddingLeft: 5,
    color: '#ff0000',
    fontSize: 18,
    //backgroundColor: background,
    width: width-100,
  },
  notes: {
    //backgroundColor: '#ffff00',
    height: height-75
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
  headStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  tableText: { 
    margin: 10
  }
});

var uses = [
  'Be careful when using in order to plus a negation.',
  'The –ing form can be used like a noun or be part of a “noun phrase”.',
  'You use the verb with –ing after the prepositions in, at, with, of, for, about, also',
  'Agreement: pay attention to the conjugation of the verbs; the object pronouns which replace the subject pronouns are also important.',
  'Spelling problem.',
  'Correct the demonstrative: that (singular-far) / those(plural-far) / this (singular-close) / these (plural-close)',
  'Pay attention to parallel structure.',
  'A semicolon is most commonly used to link (in a single sentence) two independent clauses that are closely related in thought.'+
  'When a semicolon is used to join two or more ideas (parts) in a sentence, those ideas are then given equal position or rank.',
  'The exclamation and question marks are different from Spanish; they always go just at the end of the sentence.',
  'Use indentation in each paragraph. It is an empty space to signal the beginning of a paragraph.',
  'When you do not have a specific pronoun, use it to have a complete and appropriate sentence.',
  'Do not use the definite article THE with general words, names of people, means of transportation, institutions, names of countries in singular, among others.',
  'Use Consists of when something is composed or made up of something else.',
  'Use consist in when explaining how something works.',
  'The thesis statement (also called the central idea or the topic sentence in case of paragraphs) should be expressed in a complete sentence; since it makes a statement, it should not be written as a question.',
  'The conclusion can restate (briefly) the main points discussed in your paragraph or essay. To do so, you can paraphrase. A conclusion should not, however, bring up a new topic.',
  'To cite, follow this pattern: (Last name, year: page).',
  'Look at the correct prepositions used with some verbs. Correct your own verb with the appropriate preposition.',
  'Do not use quotation marks with quoted material that is more than three lines in length; instead, use the colon to introduce a direct quotation that is more than three lines in length. In this situation, leave a blank line above and below the quoted material. Single space the long quotation. Quotation marks are not used. Use Italics.',
  'Use quotations to name something which does not have English translation.',
  'Remember: adjectives are never pluralized.',
  'It does not matter if you have one, two or more than three adjectives in a single sentence; they always go before the noun.  The only thing that matters is that you organize them appropriately. Follow this pattern:'+
  'Opinion: interesting, boring'+
  'Dimension (size): big, small'+
  'Age: new, modern.'+
  'Shape: square, oval.'+
  'Color: blue, green.'+
  'Origin (nationalities): Chinese'+
  'Material: plastic, golden.',
  'Use the verb agree and the noun agreement differently.',
  'The correct expression is: Most of the people/ the majority of people. Most of the cases/ in most cases',
  'After because we use a clause; after because of we use a noun or pronoun.',
  'Be careful with the plural of some nouns.',
  'There is missing a complement.',
  'The word advice is never pluralized.',
  'Avoid exact translation from the Spanish language in regards to expressing possession.',
  'Avoid long sentences. Instead, make use of connectors and punctuation marks to avoid misunderstandings or incoherent sentences.',
  'Uses of commas.'+
  'Use a comma when beginning sentences with introductory words such as well, now, both or yes.'+
  'Use a comma to separate two strong clauses joined by a coordinating conjunction--and, or, but, for, nor. You can omit the comma if the clauses are both short.'+
  'When the information in the clause is not necessary to complete your main idea, insert a comma to separate it from the rest of the sentence.'+
  'Use a comma or commas with transitional expressions (however, therefore, moreover, for example, on the other hand, in fact, so etc.)',
  'Rules to develop a topic sentence. A topic sentence is generally written at the beginning of the paragraph, it should contain a topic and a controlling idea.',
  'Expository texts. The main objective of expository texts is presenting information. We usually do not express our opinion. It should be objective.',
  'Word order. Pay attention to sentence structure. Sometimes, the word is not located in the correct position.',
  'A paragraph consists of several sentences that are grouped together. It should be a unity. Do not leave space between them.',
  'Relative clauses.'+
  'Pay attention to the correct relative clause used in your sentence (who:people / which: things/ whose: to express possession (people)/ that: things and people)',
  'The words somebody (someone), nobody (no one), everybody (everyone), everything, anyone (anybody) are conjugated as in the third person.',
  'Use of synonyms.'+
  'Use a different word so that your paragraph does not seem redundant.',
  'Use of colon'+
  'Use a colon instead of a semicolon between two sentences when the second sentence explains or illustrates the first sentence',
  'Omit some words; they are not necessary in your sentence.',
  'Capitalization'+
  'Capitalize the pronoun I.'+
  'Capitalize the first letter of the first word of each sentence.'+
  'Capitalize the first letter of names of people, organizations, and places.'+
  'Capitalize the first letter of adjectives that are made from the names of people and places.'+
  'Capitalize initials'+
  'Capitalize the first letter of directions only when they are used to designate actual places, not when they point in a direction.'+
  'Capitalize the first letter of the names of months and the days of the week.'+
  "Capitalize the official title of a person (including abbreviations), but only when you use it with the person's name."+
  'Capitalize words used as names or parts of names.'+
  'Capitalize the first letter of important words in a title of a book, magazine, story, essay, etc.'+
  'Capitalize historical events and documents.'+
  'Capitalize the name of languages, races, nationalities, and religions.'+
  'Capitalize acronyms. (An acronym is a word formed by the first, or first few, letters of words in a long name of an organization.)',
  'Use a period [ . ] at the end of a sentence that makes a statement.',
  'There is a missing word in your sentence.',
  'Do not put period to your title.',
  'We use etc. after a list more than 3 elements.',
  'Wrong subject in the dependent clause.',
  'Wrong use of tenses.',
  'When using modals, do not conjugate the verb you use after it.',
  'Use bare infinitives after the modal verbs. (except for HAVE TO, OUGHT TO)',
  'Use of indefinite articles. When using indefinite articles, pay attention to the first letter of the noun you use next. If the noun starts with a vowel, use An; if it starts with a consonant use A.',
  'The difference between the definite and indefinite articles is the difference between talking about a specific apple, or any old apple at all. Take also into account the quantity.',
  'When using the word EXIST, use the word THERE before it.',
];
  
var examples = [
  'I left home early in order to not to be late for the appointment.',
  ' Smoke is forbidden. Speak to an audience is always stressful.',
  'After to hang out with my friends, I went to my house.'+
  'She is here for plan the party.',
  'the invention of perfection create lots of stereotypes.'+
  'children should talk to her parents',
  'beggining',
  'This customs are very remarkable.',
  'I like swimming, studying and to listen to music.',
  'Some people write with a word processor, others write with a pen or pencil.',
  '¿are you happy? (Spanish)'+
  '¡I’m tired! (Spanish)',
  'null',
  'consists on doing a nice job',
  'the life is too short.',
  'the story consists in six parts.',
  'Meditation consists of attentive watchfulness.',
  'My fear of the dark.',
  'an essay about the most interesting places to visit in Mexico could conclude as follows: there are, of course, many more things to visit while you are in Mexico, but the beach at Progreso, the Aztec ruin, and the famous monument represent some of the more significant and beautiful sights to see. When you go to Mexico, visit these sights and you will be guaranteed a fond memory after you go home.',
  '(A. Burges 2007: 45).',
  'null',
  'The author of Touched, Jane Straus, wrote in the first chapter:'+
  'Georgia went back to her bed and stared at the intricate patterns of burned moth wings in the translucent glass of the overhead light. Her father was in “hyper mode” again where nothing could calm him down.	 He’d been talking nonstop for a week about remodeling projects, following her around the house as she tried to escape his chatter. He was just about to crash, she knew.',
  'When I was in Tolima, I used to eat tamales all the time.',
  'the girls are beautifuls.'+
  'they are very differents.',
  'I have a blue plastic old car.',
  'I am agree with you.',
  'the most of the people are taking on line classes.',
  'The river overflowed its banks because it rained.',
  'cats have seven lifes.',
  'there are three easy steps to lose.',
  'I have lots of advices to tell you.',
  'this is the life of my son.',
  'null',
  'Yes I do need that report.'+
  "Well I never thought I'd live to see the day."+
  'I have painted the entire house but he is still working on sanding the doors. I paint and he writes.'+
  'She cannot meet on Friday because of schedule conflicts and deadlines.'+
  'On the one hand Odysseus loves Penelope and wants to return to her.'+
  'His love of fame and adventure however overshadows his love for his wife.',
  'Drinking coffee   could be hazardous for health.',
  'null',
  'I yesterday wrote a letter.',
  'My hometown is famous for several amazing natural features.'+
  'First, it is noted for the Wheaton River, which is very wide and beautiful.'+
  'Also, on the other side of the town is Wheaton Hill, which is unusual because it is very steep.',
  'I told you about the woman who lives next door.'+
  'Do you see the shoe which is on the roof?'+
  'Do you know the boy whose mother is a nurse?'+
  'I don’t like the table that stands in the kitchen.',
  'nobody wants coffee.'+
  'Everybody is invited.',
  'null',
  'my biggest dream: having a nice wife.',
  'in making mistakes is a huge disadvantage',
  'Learning to capitalize correctly will improve your writing. That will make your paragraph readable.'+
  'John went on a trip to Tokyo, Japan for his company, General Motors Corporation.'+
  'I like Mexican food.'+
  "My brother's favorite author is H.G. Wells."+
  'When we visited the Southwest, we actually had to drive north.'+
  'My birthday will be on a Friday next June.'+
  'Did Clarissa recommend Dr. Montoya to you?'+
  'Did Uncle George call my mom to tell her our grandmother is with Dad?'+
  "I enjoyed Mark's essay, The Truth About Being a Good Student."+
  'The Emancipation Proclamation was issued during the Civil War.'+
  'I learned in Spanish class that several Hispanics are Catholic.'+
  'CARE is the Cooperative for American Relief Everywhere.',
  'null',
  'you must the next steps.',
  'Types of students.',
  'I like eating pizza, hamburger, etc.',
  'When a person has eating disorders, it may suffer a lot of problems.',
  'We generally take the first product we found on the shelf.',
  'We could bought more food later.',
  'A tiger can to run as fast as a car.',
  'Give me a apple.',
  'Give me an apples.',
  'Exist many types of friends.',
];
  
var corrections = [
  'I left home early in order not to be late for the appointment.',
  'Smoking is forbidden. Speaking to an audience is always stressful.',
  'After hanging out with my friends, I went to my house.'+
  'She is here for planning the party.',
  'the invention of perfection creates lots of stereotypes.'+
  'children should talk to their parents.',
  'beginning',
  'These customs are very remarkable.',
  'I like swimming, studying and listening to music.',
  'Some people write with a word processor; others write with a pen or pencil.',
  'are you happy? (English)'+
  'I’m tired! (English)',
  'null',
  'It consists on doing a nice job.',
  'life is too short.',
  'the story consists of six parts.',
  'Meditation consists in attentive watchfulness.',
  'My fear of the dark has made my life miserable.',
  'null',
  '(Burges, 2007: 45).',
  'null',
  'null',
  'When I was in Tolima, I used to eat “tamales” all the time.',
  'The girls are beautiful.'+
  'they are very different.',
  'I have an old blue plastic car.',
  'I am in agreement with you OR I agree with you.',
  'most of the people are taking on line classes.',
  'The river overflowed its banks because of the rain.',
  'cats have seven lives.',
  'there are three easy steps to lose weight; to lose money.',
  'I have lots of advice to tell you.',
  'this is my son’s life.',
  'null',
  'Yes, I do need that report.'+
  "Well, I never thought I'd live to see the day."+
  'I have painted the entire house, but he is still working on sanding the doors. I paint and he writes.'+
  'She cannot meet on Friday, because of schedule conflicts and deadlines.'+
  'On the one hand, Odysseus loves Penelope and wants to return to her.'+
  'His love of fame and adventure, however, overshadows his love for his wife.',
  'null',
  'null',
  'I wrote a letter yesterday.',
  'My hometown is famous for several amazing natural features.  First, it is noted for the Wheaton River, which is very wide and beautiful. Also, on the other side of the town is Wheaton Hill, which is unusual because it is very steep.',
  'null',
  'null',
  'null',
  'null',
  'making mistakes is a huge disadvantage',
  'null',
  'null',
  'you must follow the next steps.',
  'Types of students.',
  'I like eating pizza, hamburger, hotdog, etc.',
  'When a person has eating disorders, he/she may suffer a lot of problems.',
  'We generally take the first product we find on the shelf.',
  'We could buy more food later.',
  'A tiger can run as fast as a car.',
  'Give me an apple.',
  'Give me some apples.',
  'There exist many types of friends.',
];
  
var notes = [
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'some ways to conclude a paragraph or an essay include:'+
  'End with a call to action; that is to say, asking the reader to do something.'+
  'End with a final point: it ties together all the ideas in your essay; it provides the reader with the sense that the entire essay has been leading up to this final point.'+
  'End with a question: by ending with a question, you leave the reader with a final problem that you wish him or her to think about.',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
  'null',
];