getUse = (i) =>
{
    return uses[i];
}

getExample = (i) =>
{
    return examples[i];
}

getCorrection = (i) =>
{
    return corrections[i];
}

getNote = (i) =>
{
    return notes[i];
}

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