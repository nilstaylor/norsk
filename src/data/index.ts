// ============================================================
// All app data — vocabulary + lessons — embedded as static TS
// No backend required: works on GitHub Pages, Netlify, etc.
// ============================================================

export interface VocabWord {
  id: number;
  norwegian: string;
  english: string;
  category: string;
  example: string | null;
  exampleTranslation: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  audioPhonetic: string | null;
}

export type LessonSection =
  | { type: "intro"; text: string }
  | { type: "vocab_list"; words: string[] }
  | { type: "phrase_group"; title: string; phrases: { norwegian: string; english: string; phonetic?: string }[] }
  | { type: "number_table"; numbers: string[][] }
  | { type: "tip"; text: string }
  | { type: "dialogue"; lines: { speaker: string; text: string; translation: string }[] };

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

export interface LessonContent {
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export interface Lesson {
  id: number;
  title: string;
  titleNorwegian: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
  xpReward: number;
  content: LessonContent;
}

// ──────────────────────────────────────────────────────────────
// VOCABULARY (189 words, all 13 categories)
// ──────────────────────────────────────────────────────────────
export const VOCABULARY: VocabWord[] = [
  // ── Greetings (28) ──
  { id: 1, norwegian: "Hei", english: "Hello / Hi", category: "greetings", example: "Hei! Hvordan har du det?", exampleTranslation: "Hi! How are you?", difficulty: "beginner", audioPhonetic: "hay" },
  { id: 2, norwegian: "Hallo", english: "Hello", category: "greetings", example: "Hallo! Er du hjemme?", exampleTranslation: "Hello! Are you home?", difficulty: "beginner", audioPhonetic: "hah-loh" },
  { id: 3, norwegian: "Heisann", english: "Hey (informal)", category: "greetings", example: "Heisann! Lenge siden sist!", exampleTranslation: "Hey! Long time no see!", difficulty: "beginner", audioPhonetic: "hay-sahn" },
  { id: 4, norwegian: "Morn", english: "Morning / Hi (casual)", category: "greetings", example: "Morn! Sov du godt?", exampleTranslation: "Morning! Did you sleep well?", difficulty: "beginner", audioPhonetic: "morn" },
  { id: 5, norwegian: "God morgen", english: "Good morning", category: "greetings", example: "God morgen! Vil du ha kaffe?", exampleTranslation: "Good morning! Do you want coffee?", difficulty: "beginner", audioPhonetic: "goo MOR-en" },
  { id: 6, norwegian: "God dag", english: "Good day", category: "greetings", example: "God dag! Hva kan jeg hjelpe deg med?", exampleTranslation: "Good day! How can I help you?", difficulty: "beginner", audioPhonetic: "goo dahg" },
  { id: 7, norwegian: "God ettermiddag", english: "Good afternoon", category: "greetings", example: "God ettermiddag! Kom inn!", exampleTranslation: "Good afternoon! Come in!", difficulty: "beginner", audioPhonetic: "goo ET-er-mid-ahg" },
  { id: 8, norwegian: "God kveld", english: "Good evening", category: "greetings", example: "God kveld! Vil du spise middag?", exampleTranslation: "Good evening! Do you want to eat dinner?", difficulty: "beginner", audioPhonetic: "goo kvell" },
  { id: 9, norwegian: "Ha det", english: "Bye / Goodbye", category: "greetings", example: "Ha det! Vi sees i morgen.", exampleTranslation: "Bye! See you tomorrow.", difficulty: "beginner", audioPhonetic: "hah day" },
  { id: 10, norwegian: "Ha det bra", english: "Take care / Goodbye", category: "greetings", example: "Ha det bra! Kom tilbake snart.", exampleTranslation: "Take care! Come back soon.", difficulty: "beginner", audioPhonetic: "hah day bra" },
  { id: 11, norwegian: "Vi snakkes", english: "Talk to you later", category: "greetings", example: "Vi snakkes i morgen!", exampleTranslation: "Talk to you tomorrow!", difficulty: "beginner", audioPhonetic: "vee SNAHK-es" },
  { id: 12, norwegian: "Vi sees", english: "See you", category: "greetings", example: "Vi sees på mandag!", exampleTranslation: "See you on Monday!", difficulty: "beginner", audioPhonetic: "vee SEE-es" },
  { id: 13, norwegian: "Sees senere", english: "See you later", category: "greetings", example: "Sees senere! Jeg er opptatt nå.", exampleTranslation: "See you later! I'm busy now.", difficulty: "beginner", audioPhonetic: "SEE-es SEH-neh-reh" },
  { id: 14, norwegian: "Takk", english: "Thank you", category: "greetings", example: "Tusen takk for hjelpen!", exampleTranslation: "Thank you so much for the help!", difficulty: "beginner", audioPhonetic: "tahk" },
  { id: 15, norwegian: "Tusen takk", english: "Thank you very much", category: "greetings", example: "Tusen takk! Det var veldig snilt.", exampleTranslation: "Thank you very much! That was very kind.", difficulty: "beginner", audioPhonetic: "TOO-sen tahk" },
  { id: 16, norwegian: "Bare hyggelig", english: "You're welcome", category: "greetings", example: "Bare hyggelig! Det var ingenting.", exampleTranslation: "You're welcome! It was nothing.", difficulty: "beginner", audioPhonetic: "BAH-reh HYG-eh-lig" },
  { id: 17, norwegian: "Vær så god", english: "You're welcome / Here you go", category: "greetings", example: "Vær så god! Her er menyen.", exampleTranslation: "Here you go! Here is the menu.", difficulty: "beginner", audioPhonetic: "vair saw goo" },
  { id: 18, norwegian: "Ingen årsak", english: "No problem / Don't mention it", category: "greetings", example: "Ingen årsak! Det var en liten ting.", exampleTranslation: "No problem! It was a small thing.", difficulty: "beginner", audioPhonetic: "ING-en AW-sahk" },
  { id: 19, norwegian: "Ikke noe problem", english: "No problem", category: "greetings", example: "Ikke noe problem! Jeg hjelper deg gjerne.", exampleTranslation: "No problem! I'm happy to help you.", difficulty: "beginner", audioPhonetic: "IK-eh noo-eh proh-BLEM" },
  { id: 20, norwegian: "Unnskyld", english: "Excuse me / Sorry", category: "greetings", example: "Unnskyld, kan du hjelpe meg?", exampleTranslation: "Excuse me, can you help me?", difficulty: "beginner", audioPhonetic: "UN-shewl" },
  { id: 21, norwegian: "Vær så snill", english: "Please", category: "greetings", example: "Kan du komme hit, vær så snill?", exampleTranslation: "Can you come here, please?", difficulty: "beginner", audioPhonetic: "vair saw snil" },
  { id: 22, norwegian: "Ja", english: "Yes", category: "greetings", example: "Ja, det er riktig.", exampleTranslation: "Yes, that is correct.", difficulty: "beginner", audioPhonetic: "yah" },
  { id: 23, norwegian: "Nei", english: "No", category: "greetings", example: "Nei, det stemmer ikke.", exampleTranslation: "No, that is not correct.", difficulty: "beginner", audioPhonetic: "nay" },
  { id: 24, norwegian: "Hyggelig å møte deg", english: "Nice to meet you", category: "greetings", example: "Hyggelig å møte deg! Jeg heter Lars.", exampleTranslation: "Nice to meet you! My name is Lars.", difficulty: "beginner", audioPhonetic: "HYG-eh-lig oh MU-teh day" },
  { id: 25, norwegian: "Hvordan går det?", english: "How's it going? (most common)", category: "greetings", example: "Hei! Hvordan går det med deg?", exampleTranslation: "Hi! How is it going with you?", difficulty: "beginner", audioPhonetic: "VOR-dan gor day" },
  { id: 26, norwegian: "Åssen går det?", english: "How's it going? (casual)", category: "greetings", example: "Åssen går det? Har du det bra?", exampleTranslation: "How's it going? Are you doing well?", difficulty: "beginner", audioPhonetic: "AW-sen gor day" },
  { id: 27, norwegian: "Hvordan har du det?", english: "How are you? (personal)", category: "greetings", example: "Hvordan har du det i dag?", exampleTranslation: "How are you today?", difficulty: "beginner", audioPhonetic: "VOR-dan har doo day" },
  { id: 28, norwegian: "Alt bra?", english: "All good? (small talk)", category: "greetings", example: "Hei! Alt bra med deg og familien?", exampleTranslation: "Hi! All good with you and the family?", difficulty: "beginner", audioPhonetic: "ahlt bra" },

  // ── Numbers (12) ──
  { id: 29, norwegian: "En / Et", english: "One", category: "numbers", example: "Jeg vil ha én kopp kaffe.", exampleTranslation: "I would like one cup of coffee.", difficulty: "beginner", audioPhonetic: "en / eht" },
  { id: 30, norwegian: "To", english: "Two", category: "numbers", example: "Jeg har to søsken.", exampleTranslation: "I have two siblings.", difficulty: "beginner", audioPhonetic: "too" },
  { id: 31, norwegian: "Tre", english: "Three", category: "numbers", example: "Det er tre katter.", exampleTranslation: "There are three cats.", difficulty: "beginner", audioPhonetic: "treh" },
  { id: 32, norwegian: "Fire", english: "Four", category: "numbers", example: "Klokken er fire.", exampleTranslation: "It is four o'clock.", difficulty: "beginner", audioPhonetic: "FEER-eh" },
  { id: 33, norwegian: "Fem", english: "Five", category: "numbers", example: "Fem pluss fem er ti.", exampleTranslation: "Five plus five is ten.", difficulty: "beginner", audioPhonetic: "fem" },
  { id: 34, norwegian: "Seks", english: "Six", category: "numbers", example: "Det er seks egg i pakken.", exampleTranslation: "There are six eggs in the pack.", difficulty: "beginner", audioPhonetic: "seks" },
  { id: 35, norwegian: "Sju / Syv", english: "Seven", category: "numbers", example: "Uken har sju dager.", exampleTranslation: "The week has seven days.", difficulty: "beginner", audioPhonetic: "shoo / seev" },
  { id: 36, norwegian: "Åtte", english: "Eight", category: "numbers", example: "Toget går klokken åtte.", exampleTranslation: "The train leaves at eight.", difficulty: "beginner", audioPhonetic: "AW-teh" },
  { id: 37, norwegian: "Ni", english: "Nine", category: "numbers", example: "Butikken stenger klokken ni.", exampleTranslation: "The store closes at nine.", difficulty: "beginner", audioPhonetic: "nee" },
  { id: 38, norwegian: "Ti", english: "Ten", category: "numbers", example: "Fem pluss fem er ti.", exampleTranslation: "Five plus five is ten.", difficulty: "beginner", audioPhonetic: "tee" },
  { id: 39, norwegian: "Tjue", english: "Twenty", category: "numbers", example: "Det koster tjue kroner.", exampleTranslation: "It costs twenty kroner.", difficulty: "beginner", audioPhonetic: "CHOO-eh" },
  { id: 40, norwegian: "Hundre", english: "One hundred", category: "numbers", example: "Det er hundre kroner.", exampleTranslation: "It is one hundred kroner.", difficulty: "intermediate", audioPhonetic: "HUN-dreh" },

  // ── Emotions (9) ──
  { id: 41, norwegian: "Glad / Lykkelig", english: "Happy", category: "emotions", example: "Jeg er veldig glad i dag!", exampleTranslation: "I am very happy today!", difficulty: "beginner", audioPhonetic: "glahd / LIK-eh-lig" },
  { id: 42, norwegian: "Trist", english: "Sad", category: "emotions", example: "Hvorfor er du trist?", exampleTranslation: "Why are you sad?", difficulty: "beginner", audioPhonetic: "trist" },
  { id: 43, norwegian: "Sint / Forbanna", english: "Angry", category: "emotions", example: "Jeg ble sint på ham.", exampleTranslation: "I got angry at him.", difficulty: "beginner", audioPhonetic: "sint / for-BAHN-ah" },
  { id: 44, norwegian: "Redd", english: "Scared / Afraid", category: "emotions", example: "Er du redd for mørket?", exampleTranslation: "Are you afraid of the dark?", difficulty: "beginner", audioPhonetic: "redd" },
  { id: 45, norwegian: "Nervøs", english: "Nervous", category: "emotions", example: "Jeg er nervøs før eksamen.", exampleTranslation: "I am nervous before the exam.", difficulty: "beginner", audioPhonetic: "ner-VØS" },
  { id: 46, norwegian: "Forvirret", english: "Confused", category: "emotions", example: "Jeg er forvirret av spørsmålet.", exampleTranslation: "I am confused by the question.", difficulty: "beginner", audioPhonetic: "for-VIR-ret" },
  { id: 47, norwegian: "Gretten", english: "Grumpy", category: "emotions", example: "Han er alltid gretten om morgenen.", exampleTranslation: "He is always grumpy in the morning.", difficulty: "intermediate", audioPhonetic: "GRET-en" },
  { id: 48, norwegian: "Skuffet", english: "Disappointed", category: "emotions", example: "Jeg er skuffet over resultatet.", exampleTranslation: "I am disappointed with the result.", difficulty: "intermediate", audioPhonetic: "SKUF-et" },
  { id: 49, norwegian: "Utslitt", english: "Exhausted", category: "emotions", example: "Jeg er helt utslitt etter jobben.", exampleTranslation: "I am completely exhausted after work.", difficulty: "intermediate", audioPhonetic: "OOT-slit" },

  // ── Adjectives (17) ──
  { id: 50, norwegian: "Snill", english: "Kind / Nice", category: "adjectives", example: "Hun er veldig snill mot alle.", exampleTranslation: "She is very kind to everyone.", difficulty: "beginner", audioPhonetic: "snil" },
  { id: 51, norwegian: "Bra", english: "Good", category: "adjectives", example: "Det er en bra idé!", exampleTranslation: "That is a good idea!", difficulty: "beginner", audioPhonetic: "bra" },
  { id: 52, norwegian: "Dårlig", english: "Bad", category: "adjectives", example: "Det er dårlig vær i dag.", exampleTranslation: "The weather is bad today.", difficulty: "beginner", audioPhonetic: "DAW-lig" },
  { id: 53, norwegian: "Morsom", english: "Funny", category: "adjectives", example: "Han er veldig morsom!", exampleTranslation: "He is very funny!", difficulty: "beginner", audioPhonetic: "MOR-som" },
  { id: 54, norwegian: "Kjedelig", english: "Boring", category: "adjectives", example: "Filmen var kjedelig.", exampleTranslation: "The film was boring.", difficulty: "beginner", audioPhonetic: "CHEH-de-lig" },
  { id: 55, norwegian: "Liten / Lite / Lita", english: "Small / Little", category: "adjectives", example: "Vi har en liten hund.", exampleTranslation: "We have a small dog.", difficulty: "beginner", audioPhonetic: "LEE-ten" },
  { id: 56, norwegian: "Stor", english: "Big / Large", category: "adjectives", example: "Oslo er en stor by.", exampleTranslation: "Oslo is a big city.", difficulty: "beginner", audioPhonetic: "stoor" },
  { id: 57, norwegian: "Dyr", english: "Expensive", category: "adjectives", example: "Norge er et veldig dyrt land.", exampleTranslation: "Norway is a very expensive country.", difficulty: "beginner", audioPhonetic: "deer" },
  { id: 58, norwegian: "Billig", english: "Cheap", category: "adjectives", example: "Den jakken er ikke billig.", exampleTranslation: "That jacket is not cheap.", difficulty: "beginner", audioPhonetic: "BIL-ig" },
  { id: 59, norwegian: "Vanskelig", english: "Difficult / Hard", category: "adjectives", example: "Norsk er vanskelig å lære.", exampleTranslation: "Norwegian is difficult to learn.", difficulty: "beginner", audioPhonetic: "VAHN-ske-lig" },
  { id: 60, norwegian: "Enkelt / Lett", english: "Simple / Easy", category: "adjectives", example: "Den oppgaven er veldig lett.", exampleTranslation: "That task is very easy.", difficulty: "beginner", audioPhonetic: "EN-kelt / let" },
  { id: 61, norwegian: "Ung", english: "Young", category: "adjectives", example: "Hun er veldig ung.", exampleTranslation: "She is very young.", difficulty: "beginner", audioPhonetic: "oong" },
  { id: 62, norwegian: "Gammel", english: "Old", category: "adjectives", example: "Det er en gammel kirke.", exampleTranslation: "It is an old church.", difficulty: "beginner", audioPhonetic: "GAH-mel" },
  { id: 63, norwegian: "Fattig", english: "Poor / Broke", category: "adjectives", example: "Jeg er fattig denne måneden.", exampleTranslation: "I am broke this month.", difficulty: "intermediate", audioPhonetic: "FAH-tig" },
  { id: 64, norwegian: "Rik", english: "Rich / Wealthy", category: "adjectives", example: "Han er en veldig rik mann.", exampleTranslation: "He is a very rich man.", difficulty: "intermediate", audioPhonetic: "reek" },
  { id: 65, norwegian: "Veldig", english: "Very / Really", category: "adjectives", example: "Det er veldig fint vær i dag.", exampleTranslation: "The weather is very nice today.", difficulty: "beginner", audioPhonetic: "VEL-dig" },
  { id: 66, norwegian: "Kjempefin / Kjempebra", english: "Really great / Fantastic", category: "adjectives", example: "Det er kjempebra!", exampleTranslation: "That is really great!", difficulty: "beginner", audioPhonetic: "CHEM-peh-bra" },

  // ── Verbs (31) ──
  { id: 67, norwegian: "Å skrive", english: "To write", category: "verbs", example: "Jeg skriver en e-post til sjefen.", exampleTranslation: "I am writing an email to the boss.", difficulty: "beginner", audioPhonetic: "oh SKREE-veh" },
  { id: 68, norwegian: "Å lese", english: "To read", category: "verbs", example: "Hun leser en bok hver kveld.", exampleTranslation: "She reads a book every evening.", difficulty: "beginner", audioPhonetic: "oh LEH-seh" },
  { id: 69, norwegian: "Å danse", english: "To dance", category: "verbs", example: "Vi danser på festen.", exampleTranslation: "We are dancing at the party.", difficulty: "beginner", audioPhonetic: "oh DAHN-seh" },
  { id: 70, norwegian: "Å synge", english: "To sing", category: "verbs", example: "Han synger veldig godt.", exampleTranslation: "He sings very well.", difficulty: "beginner", audioPhonetic: "oh SING-eh" },
  { id: 71, norwegian: "Å gråte", english: "To cry", category: "verbs", example: "Barnet gråter fordi det er sulten.", exampleTranslation: "The child is crying because it is hungry.", difficulty: "beginner", audioPhonetic: "oh GRAW-teh" },
  { id: 72, norwegian: "Å klemme", english: "To hug", category: "verbs", example: "Jeg klemmer mamma.", exampleTranslation: "I am hugging mum.", difficulty: "beginner", audioPhonetic: "oh KLEM-eh" },
  { id: 73, norwegian: "Å sove", english: "To sleep", category: "verbs", example: "Jeg sover åtte timer per natt.", exampleTranslation: "I sleep eight hours per night.", difficulty: "beginner", audioPhonetic: "oh SOH-veh" },
  { id: 74, norwegian: "Å kysse", english: "To kiss", category: "verbs", example: "De kysset hverandre.", exampleTranslation: "They kissed each other.", difficulty: "beginner", audioPhonetic: "oh SHISS-eh" },
  { id: 75, norwegian: "Å le", english: "To laugh", category: "verbs", example: "Vi ler av vitsen.", exampleTranslation: "We are laughing at the joke.", difficulty: "beginner", audioPhonetic: "oh leh" },
  { id: 76, norwegian: "Å gå", english: "To walk / go", category: "verbs", example: "Jeg går til jobb hver dag.", exampleTranslation: "I walk to work every day.", difficulty: "beginner", audioPhonetic: "oh go" },
  { id: 77, norwegian: "Å løpe", english: "To run", category: "verbs", example: "Han løper maraton.", exampleTranslation: "He runs a marathon.", difficulty: "beginner", audioPhonetic: "oh LØ-peh" },
  { id: 78, norwegian: "Å hoppe", english: "To jump", category: "verbs", example: "Barna hopper i pølen.", exampleTranslation: "The children are jumping in the puddle.", difficulty: "beginner", audioPhonetic: "oh HOP-eh" },
  { id: 79, norwegian: "Å svømme", english: "To swim", category: "verbs", example: "Vi svømmer i fjorden om sommeren.", exampleTranslation: "We swim in the fjord in summer.", difficulty: "beginner", audioPhonetic: "oh SVUM-eh" },
  { id: 80, norwegian: "Å trene", english: "To exercise / work out", category: "verbs", example: "Hun trener tre ganger i uken.", exampleTranslation: "She exercises three times a week.", difficulty: "beginner", audioPhonetic: "oh TREH-neh" },
  { id: 81, norwegian: "Å kjøre", english: "To drive", category: "verbs", example: "Han kjører til Oslo.", exampleTranslation: "He is driving to Oslo.", difficulty: "beginner", audioPhonetic: "oh SHUR-eh" },
  { id: 82, norwegian: "Å vaske", english: "To clean / wash", category: "verbs", example: "Jeg vasker klærne.", exampleTranslation: "I am washing the clothes.", difficulty: "beginner", audioPhonetic: "oh VAHS-keh" },
  { id: 83, norwegian: "Å lage mat", english: "To cook", category: "verbs", example: "Mamma lager middag.", exampleTranslation: "Mum is cooking dinner.", difficulty: "beginner", audioPhonetic: "oh LAH-geh maht" },
  { id: 84, norwegian: "Å spise", english: "To eat", category: "verbs", example: "Vi spiser frokost klokken åtte.", exampleTranslation: "We eat breakfast at eight o'clock.", difficulty: "beginner", audioPhonetic: "oh SPEE-seh" },
  { id: 85, norwegian: "Å våkne", english: "To wake up", category: "verbs", example: "Jeg våkner klokken sju.", exampleTranslation: "I wake up at seven o'clock.", difficulty: "beginner", audioPhonetic: "oh VAWK-neh" },
  { id: 86, norwegian: "Å stå opp", english: "To get up", category: "verbs", example: "Det er vanskelig å stå opp tidlig.", exampleTranslation: "It is hard to get up early.", difficulty: "beginner", audioPhonetic: "oh sto op" },
  { id: 87, norwegian: "Å dusje", english: "To shower", category: "verbs", example: "Jeg dusjer om morgenen.", exampleTranslation: "I shower in the morning.", difficulty: "beginner", audioPhonetic: "oh DOO-sheh" },
  { id: 88, norwegian: "Å kle på seg", english: "To get dressed", category: "verbs", example: "Han kler på seg raskt.", exampleTranslation: "He gets dressed quickly.", difficulty: "intermediate", audioPhonetic: "oh kleh po say" },
  { id: 89, norwegian: "Å gre håret", english: "To comb/brush hair", category: "verbs", example: "Hun grer håret hver morgen.", exampleTranslation: "She combs her hair every morning.", difficulty: "intermediate", audioPhonetic: "oh greh HOR-et" },
  { id: 90, norwegian: "Å pusse tennene", english: "To brush teeth", category: "verbs", example: "Husk å pusse tennene!", exampleTranslation: "Remember to brush your teeth!", difficulty: "beginner", audioPhonetic: "oh POO-seh TEN-en-eh" },
  { id: 91, norwegian: "Å dra på jobb", english: "To go to work", category: "verbs", example: "Han drar på jobb klokken åtte.", exampleTranslation: "He goes to work at eight o'clock.", difficulty: "beginner", audioPhonetic: "oh dra po yob" },
  { id: 92, norwegian: "Å spise lunsj", english: "To eat lunch", category: "verbs", example: "Vi spiser lunsj klokken tolv.", exampleTranslation: "We eat lunch at twelve.", difficulty: "beginner", audioPhonetic: "oh SPEE-seh loonshy" },
  { id: 93, norwegian: "Å snakke", english: "To talk / speak", category: "verbs", example: "Vi snakker norsk hjemme.", exampleTranslation: "We speak Norwegian at home.", difficulty: "beginner", audioPhonetic: "oh SNAHK-eh" },
  { id: 94, norwegian: "Å høre", english: "To hear / listen", category: "verbs", example: "Jeg hører musikk.", exampleTranslation: "I am listening to music.", difficulty: "beginner", audioPhonetic: "oh HU-reh" },
  { id: 95, norwegian: "Å prøve", english: "To try", category: "verbs", example: "Prøv igjen!", exampleTranslation: "Try again!", difficulty: "beginner", audioPhonetic: "oh PRUH-veh" },
  { id: 96, norwegian: "Å bo", english: "To live (reside)", category: "verbs", example: "Jeg bor i Oslo.", exampleTranslation: "I live in Oslo.", difficulty: "beginner", audioPhonetic: "oh boo" },
  { id: 97, norwegian: "Å smile", english: "To smile", category: "verbs", example: "Hun smiler alltid.", exampleTranslation: "She always smiles.", difficulty: "beginner", audioPhonetic: "oh SMEE-leh" },

  // ── Food (8) ──
  { id: 98, norwegian: "Mat", english: "Food", category: "food", example: "Maten lukter godt.", exampleTranslation: "The food smells good.", difficulty: "beginner", audioPhonetic: "maht" },
  { id: 99, norwegian: "Vann", english: "Water", category: "food", example: "Kan jeg få et glass vann?", exampleTranslation: "Can I have a glass of water?", difficulty: "beginner", audioPhonetic: "vahn" },
  { id: 100, norwegian: "Kaffe", english: "Coffee", category: "food", example: "Vil du ha kaffe?", exampleTranslation: "Would you like coffee?", difficulty: "beginner", audioPhonetic: "KAH-feh" },
  { id: 101, norwegian: "Brød", english: "Bread", category: "food", example: "Jeg spiser brød til frokost.", exampleTranslation: "I eat bread for breakfast.", difficulty: "beginner", audioPhonetic: "bruh" },
  { id: 102, norwegian: "Fisk", english: "Fish", category: "food", example: "Laks er min favorittfisk.", exampleTranslation: "Salmon is my favorite fish.", difficulty: "beginner", audioPhonetic: "fisk" },
  { id: 103, norwegian: "Kjøtt", english: "Meat", category: "food", example: "Spiser du kjøtt?", exampleTranslation: "Do you eat meat?", difficulty: "beginner", audioPhonetic: "khyuht" },
  { id: 104, norwegian: "Ost", english: "Cheese", category: "food", example: "Norsk brunost er veldig god.", exampleTranslation: "Norwegian brown cheese is very good.", difficulty: "beginner", audioPhonetic: "oost" },
  { id: 105, norwegian: "Appelsin", english: "Orange", category: "food", example: "Jeg spiser en appelsin.", exampleTranslation: "I am eating an orange.", difficulty: "beginner", audioPhonetic: "ah-peh-SEEN" },

  // ── Travel (6) ──
  { id: 106, norwegian: "Flyplass", english: "Airport", category: "travel", example: "Jeg er på flyplassen.", exampleTranslation: "I am at the airport.", difficulty: "beginner", audioPhonetic: "FLY-plahs" },
  { id: 107, norwegian: "Tog", english: "Train", category: "travel", example: "Toget avgår klokken åtte.", exampleTranslation: "The train departs at eight o'clock.", difficulty: "beginner", audioPhonetic: "toog" },
  { id: 108, norwegian: "Hotell", english: "Hotel", category: "travel", example: "Hotellet er i sentrum.", exampleTranslation: "The hotel is in the center.", difficulty: "beginner", audioPhonetic: "hoh-TELL" },
  { id: 109, norwegian: "Kart", english: "Map", category: "travel", example: "Har du et kart over byen?", exampleTranslation: "Do you have a map of the city?", difficulty: "beginner", audioPhonetic: "kart" },
  { id: 110, norwegian: "Buss", english: "Bus", category: "travel", example: "Bussen kommer snart.", exampleTranslation: "The bus is coming soon.", difficulty: "beginner", audioPhonetic: "boos" },
  { id: 111, norwegian: "Billett", english: "Ticket", category: "travel", example: "Jeg trenger en billett til Bergen.", exampleTranslation: "I need a ticket to Bergen.", difficulty: "beginner", audioPhonetic: "bih-LETT" },

  // ── Nature (10) ──
  { id: 112, norwegian: "Fjord", english: "Fjord", category: "nature", example: "Norskekysten er kjent for sine fjorder.", exampleTranslation: "The Norwegian coast is known for its fjords.", difficulty: "beginner", audioPhonetic: "fyord" },
  { id: 113, norwegian: "Skog", english: "Forest", category: "nature", example: "Vi gikk en tur i skogen.", exampleTranslation: "We went for a walk in the forest.", difficulty: "beginner", audioPhonetic: "skoog" },
  { id: 114, norwegian: "Fjell", english: "Mountain", category: "nature", example: "Fjellet er dekket av snø.", exampleTranslation: "The mountain is covered with snow.", difficulty: "beginner", audioPhonetic: "fyell" },
  { id: 115, norwegian: "Nordlys", english: "Northern lights", category: "nature", example: "Vi så nordlyset i Tromsø.", exampleTranslation: "We saw the northern lights in Tromsø.", difficulty: "intermediate", audioPhonetic: "NOOR-lees" },
  { id: 116, norwegian: "Snø", english: "Snow", category: "nature", example: "Det snør i dag.", exampleTranslation: "It is snowing today.", difficulty: "beginner", audioPhonetic: "snuh" },
  { id: 117, norwegian: "En blomst", english: "A flower", category: "nature", example: "Hun fikk en blomst til bursdagen.", exampleTranslation: "She got a flower for her birthday.", difficulty: "beginner", audioPhonetic: "en blomst" },
  { id: 118, norwegian: "Ei bie", english: "A bee", category: "nature", example: "Biene lager honning.", exampleTranslation: "Bees make honey.", difficulty: "beginner", audioPhonetic: "ay BEE-eh" },
  { id: 119, norwegian: "En sommerfugl", english: "A butterfly", category: "nature", example: "En sommerfugl landet på blomsten.", exampleTranslation: "A butterfly landed on the flower.", difficulty: "intermediate", audioPhonetic: "en SOM-er-fool" },
  { id: 120, norwegian: "Ei marihøne", english: "A ladybug", category: "nature", example: "Det er ei liten marihøne.", exampleTranslation: "It is a little ladybug.", difficulty: "intermediate", audioPhonetic: "ay mah-ree-HU-neh" },
  { id: 121, norwegian: "Grønt gress", english: "Green grass", category: "nature", example: "Gresset er grønt om sommeren.", exampleTranslation: "The grass is green in summer.", difficulty: "beginner", audioPhonetic: "grunt gress" },

  // ── Time (28) ──
  { id: 122, norwegian: "Mandag", english: "Monday", category: "time", example: "Møtet er på mandag.", exampleTranslation: "The meeting is on Monday.", difficulty: "beginner", audioPhonetic: "MAHN-dag" },
  { id: 123, norwegian: "Tirsdag", english: "Tuesday", category: "time", example: "Jeg har tannlegetime på tirsdag.", exampleTranslation: "I have a dentist appointment on Tuesday.", difficulty: "beginner", audioPhonetic: "TEERS-dag" },
  { id: 124, norwegian: "Onsdag", english: "Wednesday", category: "time", example: "Vi møtes på onsdag.", exampleTranslation: "We meet on Wednesday.", difficulty: "beginner", audioPhonetic: "ONS-dag" },
  { id: 125, norwegian: "Torsdag", english: "Thursday", category: "time", example: "Han jobber sent på torsdag.", exampleTranslation: "He works late on Thursday.", difficulty: "beginner", audioPhonetic: "TORS-dag" },
  { id: 126, norwegian: "Fredag", english: "Friday", category: "time", example: "Fredag er den beste dagen!", exampleTranslation: "Friday is the best day!", difficulty: "beginner", audioPhonetic: "FREH-dag" },
  { id: 127, norwegian: "Lørdag", english: "Saturday", category: "time", example: "Vi drar på hytta på lørdag.", exampleTranslation: "We go to the cabin on Saturday.", difficulty: "beginner", audioPhonetic: "LUR-dag" },
  { id: 128, norwegian: "Søndag", english: "Sunday", category: "time", example: "Søndag er en hviledag.", exampleTranslation: "Sunday is a rest day.", difficulty: "beginner", audioPhonetic: "SUN-dag" },
  { id: 129, norwegian: "Januar", english: "January", category: "time", example: "Januar er den kaldeste måneden.", exampleTranslation: "January is the coldest month.", difficulty: "beginner", audioPhonetic: "yah-NOO-ar" },
  { id: 130, norwegian: "Februar", english: "February", category: "time", example: "Valentinsdagen er i februar.", exampleTranslation: "Valentine's Day is in February.", difficulty: "beginner", audioPhonetic: "FEB-roo-ar" },
  { id: 131, norwegian: "Mars", english: "March", category: "time", example: "Våren begynner i mars.", exampleTranslation: "Spring begins in March.", difficulty: "beginner", audioPhonetic: "mars" },
  { id: 132, norwegian: "April", english: "April", category: "time", example: "Påsken er i april.", exampleTranslation: "Easter is in April.", difficulty: "beginner", audioPhonetic: "ah-PREEL" },
  { id: 133, norwegian: "Mai", english: "May", category: "time", example: "Nasjonaldagen er 17. mai.", exampleTranslation: "National Day is May 17th.", difficulty: "beginner", audioPhonetic: "my" },
  { id: 134, norwegian: "Juni", english: "June", category: "time", example: "Sommeren starter i juni.", exampleTranslation: "Summer starts in June.", difficulty: "beginner", audioPhonetic: "YOO-nee" },
  { id: 135, norwegian: "Juli", english: "July", category: "time", example: "Juli er den varmeste måneden.", exampleTranslation: "July is the warmest month.", difficulty: "beginner", audioPhonetic: "YOO-lee" },
  { id: 136, norwegian: "August", english: "August", category: "time", example: "Skolen begynner i august.", exampleTranslation: "School begins in August.", difficulty: "beginner", audioPhonetic: "AW-goost" },
  { id: 137, norwegian: "September", english: "September", category: "time", example: "Høsten begynner i september.", exampleTranslation: "Autumn begins in September.", difficulty: "beginner", audioPhonetic: "sep-TEM-ber" },
  { id: 138, norwegian: "Oktober", english: "October", category: "time", example: "Halloween er i oktober.", exampleTranslation: "Halloween is in October.", difficulty: "beginner", audioPhonetic: "ok-TOH-ber" },
  { id: 139, norwegian: "November", english: "November", category: "time", example: "Det er mørkt i november.", exampleTranslation: "It is dark in November.", difficulty: "beginner", audioPhonetic: "noh-VEM-ber" },
  { id: 140, norwegian: "Desember", english: "December", category: "time", example: "Jul er i desember.", exampleTranslation: "Christmas is in December.", difficulty: "beginner", audioPhonetic: "deh-SEM-ber" },
  { id: 141, norwegian: "Ei uke", english: "A week", category: "time", example: "Det er sju dager i ei uke.", exampleTranslation: "There are seven days in a week.", difficulty: "beginner", audioPhonetic: "ay OO-keh" },
  { id: 142, norwegian: "En hverdag", english: "A weekday", category: "time", example: "Jeg jobber alle hverdager.", exampleTranslation: "I work all weekdays.", difficulty: "beginner", audioPhonetic: "en HVAIR-dag" },
  { id: 143, norwegian: "Ei helg", english: "A weekend", category: "time", example: "Hva gjør du i helga?", exampleTranslation: "What are you doing this weekend?", difficulty: "beginner", audioPhonetic: "ay helg" },
  { id: 144, norwegian: "I dag", english: "Today", category: "time", example: "I dag er det fint vær.", exampleTranslation: "Today the weather is nice.", difficulty: "beginner", audioPhonetic: "ee dahg" },
  { id: 145, norwegian: "I morgen", english: "Tomorrow", category: "time", example: "Ser deg i morgen!", exampleTranslation: "See you tomorrow!", difficulty: "beginner", audioPhonetic: "ee MOH-rn" },
  { id: 146, norwegian: "I går", english: "Yesterday", category: "time", example: "Jeg var syk i går.", exampleTranslation: "I was sick yesterday.", difficulty: "beginner", audioPhonetic: "ee gor" },
  { id: 147, norwegian: "Vår", english: "Spring", category: "time", example: "Om våren blomstrer trærne.", exampleTranslation: "In spring the trees blossom.", difficulty: "beginner", audioPhonetic: "vor" },
  { id: 148, norwegian: "Sommer", english: "Summer", category: "time", example: "Om sommeren er det lyst hele natten.", exampleTranslation: "In summer it is light all night.", difficulty: "beginner", audioPhonetic: "SOM-er" },
  { id: 149, norwegian: "Høst", english: "Autumn / Fall", category: "time", example: "Om høsten faller bladene.", exampleTranslation: "In autumn the leaves fall.", difficulty: "beginner", audioPhonetic: "hust" },
  { id: 150, norwegian: "Vinter", english: "Winter", category: "time", example: "Om vinteren snør det mye.", exampleTranslation: "In winter it snows a lot.", difficulty: "beginner", audioPhonetic: "VIN-ter" },

  // ── Clothing (12) ──
  { id: 151, norwegian: "En genser", english: "A sweater", category: "clothing", example: "Jeg har på meg en varm genser.", exampleTranslation: "I am wearing a warm sweater.", difficulty: "beginner", audioPhonetic: "en GEN-ser" },
  { id: 152, norwegian: "Ei t-skjorte", english: "A t-shirt", category: "clothing", example: "Han har på seg en hvit t-skjorte.", exampleTranslation: "He is wearing a white t-shirt.", difficulty: "beginner", audioPhonetic: "ay teh-SHUR-teh" },
  { id: 153, norwegian: "Ei jakke", english: "A jacket", category: "clothing", example: "Ta på deg jakken, det er kaldt ute!", exampleTranslation: "Put on your jacket, it is cold outside!", difficulty: "beginner", audioPhonetic: "ay YAK-eh" },
  { id: 154, norwegian: "Ei bukse / Et par bukser", english: "Trousers / A pair of trousers", category: "clothing", example: "Jeg trenger nye bukser.", exampleTranslation: "I need new trousers.", difficulty: "beginner", audioPhonetic: "ay BOOK-seh" },
  { id: 155, norwegian: "En kjole", english: "A dress", category: "clothing", example: "Hun har på seg en fin kjole.", exampleTranslation: "She is wearing a nice dress.", difficulty: "beginner", audioPhonetic: "en SHOO-leh" },
  { id: 156, norwegian: "Et skjørt", english: "A skirt", category: "clothing", example: "Det skjørtet er veldig fint.", exampleTranslation: "That skirt is very nice.", difficulty: "beginner", audioPhonetic: "et shurt" },
  { id: 157, norwegian: "En shorts", english: "Shorts", category: "clothing", example: "Han bruker shorts om sommeren.", exampleTranslation: "He wears shorts in summer.", difficulty: "beginner", audioPhonetic: "en shorts" },
  { id: 158, norwegian: "En sokk / Et par sokker", english: "A sock / A pair of socks", category: "clothing", example: "Hvor er sokkene mine?", exampleTranslation: "Where are my socks?", difficulty: "beginner", audioPhonetic: "en sokk" },
  { id: 159, norwegian: "En sko / Et par sko", english: "A shoe / A pair of shoes", category: "clothing", example: "De skoene er veldig fine.", exampleTranslation: "Those shoes are very nice.", difficulty: "beginner", audioPhonetic: "en skoo" },
  { id: 160, norwegian: "Ei lue", english: "A winter hat / beanie", category: "clothing", example: "Det er kaldt — ta på deg lua!", exampleTranslation: "It is cold — put on your beanie!", difficulty: "beginner", audioPhonetic: "ay LOO-eh" },
  { id: 161, norwegian: "Et skjerf", english: "A scarf", category: "clothing", example: "Hun bruker alltid et skjerf om vinteren.", exampleTranslation: "She always wears a scarf in winter.", difficulty: "beginner", audioPhonetic: "et shairf" },
  { id: 162, norwegian: "En vott / Et par votter", english: "A mitten / A pair of mittens", category: "clothing", example: "Barna trenger votter i snøen.", exampleTranslation: "The children need mittens in the snow.", difficulty: "beginner", audioPhonetic: "en vot" },

  // ── Animals (9) ──
  { id: 163, norwegian: "En hund", english: "A dog", category: "animals", example: "Vi har en stor hund hjemme.", exampleTranslation: "We have a big dog at home.", difficulty: "beginner", audioPhonetic: "en hoond" },
  { id: 164, norwegian: "En katt", english: "A cat", category: "animals", example: "Katten sover på sofaen.", exampleTranslation: "The cat is sleeping on the sofa.", difficulty: "beginner", audioPhonetic: "en kaht" },
  { id: 165, norwegian: "En kanin", english: "A rabbit", category: "animals", example: "Vi har en hvit kanin.", exampleTranslation: "We have a white rabbit.", difficulty: "beginner", audioPhonetic: "en kah-NEEN" },
  { id: 166, norwegian: "En hamster", english: "A hamster", category: "animals", example: "Hamsteret løper i hjulet.", exampleTranslation: "The hamster is running in the wheel.", difficulty: "beginner", audioPhonetic: "en HAHM-ster" },
  { id: 167, norwegian: "En gullfisk", english: "A goldfish", category: "animals", example: "Vi har to gullfisk i akvariet.", exampleTranslation: "We have two goldfish in the aquarium.", difficulty: "beginner", audioPhonetic: "en GOOL-fisk" },
  { id: 168, norwegian: "Ei mus", english: "A mouse", category: "animals", example: "Katten jager musa.", exampleTranslation: "The cat is chasing the mouse.", difficulty: "beginner", audioPhonetic: "ay moos" },
  { id: 169, norwegian: "En hest", english: "A horse", category: "animals", example: "Hun rider på hesten hver dag.", exampleTranslation: "She rides the horse every day.", difficulty: "beginner", audioPhonetic: "en hest" },
  { id: 170, norwegian: "En sau", english: "A sheep", category: "animals", example: "Det er mange sauer på fjellet.", exampleTranslation: "There are many sheep on the mountain.", difficulty: "beginner", audioPhonetic: "en sow" },
  { id: 171, norwegian: "Ei ku", english: "A cow", category: "animals", example: "Kua gir melk.", exampleTranslation: "The cow gives milk.", difficulty: "beginner", audioPhonetic: "ay koo" },

  // ── Professions (9) ──
  { id: 172, norwegian: "En sykepleier", english: "A nurse", category: "professions", example: "Søsteren min er sykepleier.", exampleTranslation: "My sister is a nurse.", difficulty: "intermediate", audioPhonetic: "en SEE-keh-ply-er" },
  { id: 173, norwegian: "En brannkonstabel", english: "A firefighter", category: "professions", example: "Brannkonstabelen reddet barnet.", exampleTranslation: "The firefighter saved the child.", difficulty: "intermediate", audioPhonetic: "en BRAHN-kon-stah-bel" },
  { id: 174, norwegian: "En rørlegger", english: "A plumber", category: "professions", example: "Vi trenger en rørlegger.", exampleTranslation: "We need a plumber.", difficulty: "intermediate", audioPhonetic: "en RUR-leg-er" },
  { id: 175, norwegian: "En tannlege", english: "A dentist", category: "professions", example: "Jeg skal til tannlegen i morgen.", exampleTranslation: "I am going to the dentist tomorrow.", difficulty: "intermediate", audioPhonetic: "en TAHN-leh-geh" },
  { id: 176, norwegian: "En tømrer / snekker", english: "A carpenter", category: "professions", example: "Pappaen min er tømrer.", exampleTranslation: "My dad is a carpenter.", difficulty: "intermediate", audioPhonetic: "en TUM-rer / SNEK-er" },
  { id: 177, norwegian: "En elektriker", english: "An electrician", category: "professions", example: "Elektrikeren reparerte lyset.", exampleTranslation: "The electrician fixed the light.", difficulty: "intermediate", audioPhonetic: "en eh-LEK-tree-ker" },
  { id: 178, norwegian: "En dyrlege / veterinær", english: "A vet", category: "professions", example: "Hunden min er syk — vi skal til dyrlegen.", exampleTranslation: "My dog is sick — we are going to the vet.", difficulty: "intermediate", audioPhonetic: "en DEER-leh-geh" },
  { id: 179, norwegian: "En kokk", english: "A cook / chef", category: "professions", example: "Han jobber som kokk på restaurant.", exampleTranslation: "He works as a chef at a restaurant.", difficulty: "beginner", audioPhonetic: "en kok" },
  { id: 180, norwegian: "En lærer", english: "A teacher", category: "professions", example: "Læreren er veldig flink.", exampleTranslation: "The teacher is very skilled.", difficulty: "beginner", audioPhonetic: "en LARE-er" },

  // ── Phrases (9) ──
  { id: 181, norwegian: "Jeg heter...", english: "My name is...", category: "phrases", example: "Hei! Jeg heter Erik.", exampleTranslation: "Hi! My name is Erik.", difficulty: "beginner", audioPhonetic: "yay HEE-ter" },
  { id: 182, norwegian: "Jeg forstår ikke", english: "I don't understand", category: "phrases", example: "Beklager, jeg forstår ikke.", exampleTranslation: "Sorry, I don't understand.", difficulty: "beginner", audioPhonetic: "yay for-STOR ik-eh" },
  { id: 183, norwegian: "Kan du snakke sakte?", english: "Can you speak slowly?", category: "phrases", example: "Kan du snakke litt saktere?", exampleTranslation: "Can you speak a bit more slowly?", difficulty: "beginner", audioPhonetic: "kahn doo SNAHK-eh SAHK-teh" },
  { id: 184, norwegian: "Hvor er...?", english: "Where is...?", category: "phrases", example: "Hvor er nærmeste butikk?", exampleTranslation: "Where is the nearest store?", difficulty: "beginner", audioPhonetic: "vor air" },
  { id: 185, norwegian: "Hva koster det?", english: "How much does it cost?", category: "phrases", example: "Hva koster denne jakken?", exampleTranslation: "How much does this jacket cost?", difficulty: "beginner", audioPhonetic: "vah KOS-ter day" },
  { id: 186, norwegian: "Jeg vil gjerne...", english: "I would like to...", category: "phrases", example: "Jeg vil gjerne lære norsk.", exampleTranslation: "I would like to learn Norwegian.", difficulty: "beginner", audioPhonetic: "yay vil YAIR-neh" },
  { id: 187, norwegian: "Jeg vil trene mer", english: "I want to exercise more", category: "phrases", example: "Nyttårsforsett: Jeg vil trene mer!", exampleTranslation: "New Year's resolution: I want to exercise more!", difficulty: "intermediate", audioPhonetic: "yay vil TREH-neh mair" },
  { id: 188, norwegian: "Jeg vil lære et nytt språk", english: "I want to learn a new language", category: "phrases", example: "Jeg vil lære et nytt språk i år.", exampleTranslation: "I want to learn a new language this year.", difficulty: "intermediate", audioPhonetic: "yay vil LARE-eh et nit sprawg" },
  { id: 189, norwegian: "Jeg vil reise mer", english: "I want to travel more", category: "phrases", example: "Neste år vil jeg reise mer.", exampleTranslation: "Next year I want to travel more.", difficulty: "intermediate", audioPhonetic: "yay vil RY-seh mair" },
];

// ──────────────────────────────────────────────────────────────
// LESSONS (13)
// ──────────────────────────────────────────────────────────────
export const LESSONS: Lesson[] = [
  {
    id: 1, title: "Greetings & Introductions", titleNorwegian: "Hilsener og presentasjoner",
    description: "Learn how to say hello, introduce yourself, and basic pleasantries in Norwegian.",
    category: "greetings", difficulty: "beginner", order: 1, xpReward: 15,
    content: {
      sections: [
        { type: "intro", text: "Norwegian greetings are warm and friendly. The most common greeting is **Hei** (Hi/Hello), used in all situations — formal and informal. Unlike English, Norwegian has many ways to greet people depending on the time of day." },
        { type: "vocab_list", words: ["Hei", "God morgen", "God kveld", "Ha det bra", "Takk", "Unnskyld", "Ja", "Nei"] },
        { type: "phrase_group", title: "Hvordan si hallo (How to say hello)", phrases: [
          { norwegian: "Hei!", english: "Hi!" }, { norwegian: "Hallo!", english: "Hello!" },
          { norwegian: "Heisann!", english: "Hey!" }, { norwegian: "Morn!", english: "Morning / Hi!" },
          { norwegian: "God morgen!", english: "Good morning!" }, { norwegian: "God dag!", english: "Good day!" },
          { norwegian: "God ettermiddag!", english: "Good afternoon!" }, { norwegian: "God kveld!", english: "Good evening!" },
        ]},
        { type: "phrase_group", title: "Hvordan si ha det (How to say goodbye)", phrases: [
          { norwegian: "Ha det!", english: "Bye!" }, { norwegian: "Ha det bra!", english: "Goodbye / Take care!" },
          { norwegian: "Vi snakkes!", english: "Talk to you later!" }, { norwegian: "Vi sees!", english: "See you!" },
          { norwegian: "Sees senere!", english: "See you later!" },
        ]},
        { type: "phrase_group", title: "Svare på «takk» (Replying to «thank you»)", phrases: [
          { norwegian: "Bare hyggelig!", english: "You're welcome!" }, { norwegian: "Vær så god!", english: "You're welcome / Here you go!" },
          { norwegian: "Ingen årsak!", english: "No problem!" }, { norwegian: "Ikke noe problem!", english: "No problem!" },
          { norwegian: "Det var da så lite!", english: "Don't mention it!" }, { norwegian: "Ikke tenk på det!", english: "Don't worry about it!" },
        ]},
        { type: "phrase_group", title: "Spørre om det går bra (Asking how someone is)", phrases: [
          { norwegian: "Hvordan går det?", english: "How's it going? (most commonly used)" },
          { norwegian: "Åssen går det?", english: "How's it going? (also common, casual)" },
          { norwegian: "Hvordan har du det?", english: "How are you? (more personal)" },
          { norwegian: "Hvordan/åssen står det til?", english: "How are things? (casual small talk)" },
          { norwegian: "Står det bra til?", english: "Is everything OK? (yes/no question)" },
          { norwegian: "Alt bra (med deg/dere)?", english: "All good? (typical small talk)" },
        ]},
        { type: "tip", text: "Norwegians often say **Hei hei** (bye bye) when leaving — just like Italians say 'ciao ciao'! Also note: months and days are **not capitalized** in Norwegian." },
        { type: "dialogue", lines: [
          { speaker: "A", text: "Hei! Jeg heter Sofia. Hva heter du?", translation: "Hi! My name is Sofia. What is your name?" },
          { speaker: "B", text: "Hei Sofia! Jeg heter Magnus. Hyggelig å møte deg!", translation: "Hi Sofia! My name is Magnus. Nice to meet you!" },
          { speaker: "A", text: "Hyggelig å møte deg også! Hvordan går det?", translation: "Nice to meet you too! How's it going?" },
          { speaker: "B", text: "Det går bra, takk! Og med deg?", translation: "It's going well, thanks! And with you?" },
        ]},
      ],
      quiz: [
        { question: "How do you say 'Hello' in Norwegian?", options: ["Hei", "Nei", "Takk", "Ja"], answer: 0 },
        { question: "What does 'Takk' mean?", options: ["Please", "Sorry", "Thank you", "Goodbye"], answer: 2 },
        { question: "How do you say 'Good morning'?", options: ["God kveld", "God morgen", "Ha det bra", "Hei hei"], answer: 1 },
        { question: "What is the most common way to ask 'How are you?' in Norwegian?", options: ["Hva skjer?", "Hvordan går det?", "Er du ok?", "Hva gjør du?"], answer: 1 },
        { question: "How do you say 'You're welcome' (informal) in Norwegian?", options: ["Tusen takk", "Vær så snill", "Bare hyggelig", "Ingen ting"], answer: 2 },
      ],
    },
  },
  {
    id: 2, title: "Numbers 1–20", titleNorwegian: "Tall 1–20",
    description: "Count in Norwegian from one to twenty and use numbers in everyday situations.",
    category: "numbers", difficulty: "beginner", order: 2, xpReward: 15,
    content: {
      sections: [
        { type: "intro", text: "Norwegian numbers follow a logical pattern. Once you learn 1–10 and the teen numbers, the rest falls into place! Note: **en** is used for masculine nouns, **ett** for neuter nouns." },
        { type: "number_table", numbers: [
          ["1 – en/ett", "6 – seks", "11 – elleve", "16 – seksten"],
          ["2 – to", "7 – sju/syv", "12 – tolv", "17 – sytten"],
          ["3 – tre", "8 – åtte", "13 – tretten", "18 – atten"],
          ["4 – fire", "9 – ni", "14 – fjorten", "19 – nitten"],
          ["5 – fem", "10 – ti", "15 – femten", "20 – tjue"],
        ]},
        { type: "tip", text: "**En** is masculine, **ett** is neuter. Use **en** for counting (en, to, tre...) and **ett** for neuter nouns (ett hus = one house). Norway uses **sju** in everyday speech, though **syv** is also correct." },
      ],
      quiz: [
        { question: "How do you say '5' in Norwegian?", options: ["Fire", "Fem", "Seks", "Tre"], answer: 1 },
        { question: "What number is 'Ti'?", options: ["8", "10", "12", "6"], answer: 1 },
        { question: "How do you say '20'?", options: ["Tjue", "Tolv", "Ti", "To"], answer: 0 },
        { question: "What is 'Åtte' in English?", options: ["Six", "Seven", "Eight", "Nine"], answer: 2 },
        { question: "How do you say '3' in Norwegian?", options: ["Tre", "To", "Ti", "Fire"], answer: 0 },
      ],
    },
  },
  {
    id: 3, title: "Emotions", titleNorwegian: "Følelser",
    description: "Express your feelings in Norwegian — happy, sad, scared, excited and more.",
    category: "emotions", difficulty: "beginner", order: 3, xpReward: 15,
    content: {
      sections: [
        { type: "intro", text: "Emotions are called **følelser** in Norwegian. Knowing emotion words helps you express yourself naturally in conversation. Norwegians often add **veldig** (very) or its many synonyms to emphasize feelings." },
        { type: "vocab_list", words: ["Glad / Lykkelig", "Trist", "Sint / Forbanna", "Redd", "Nervøs", "Forvirret", "Gretten", "Skuffet", "Utslitt"] },
        { type: "phrase_group", title: "Si «jeg er veldig glad» på forskjellige måter", phrases: [
          { norwegian: "Jeg er veldig glad.", english: "I am very happy." },
          { norwegian: "Jeg er kjempeglad.", english: "I am super happy." },
          { norwegian: "Jeg er skikkelig glad.", english: "I am really happy." },
          { norwegian: "Jeg er utrolig glad.", english: "I am incredibly happy." },
          { norwegian: "Jeg er så glad.", english: "I am so happy." },
          { norwegian: "Jeg er ganske glad.", english: "I am quite happy." },
        ]},
        { type: "tip", text: "The word **veldig** (very) has many synonyms in Norwegian! You can say: **kjempe-**, **skikkelig**, **utrolig**, **temmelig**, **rimelig**, **innmari**, **svært**, **ganske** — all meaning 'very' with different intensities." },
        { type: "dialogue", lines: [
          { speaker: "A", text: "Hei! Hvordan føler du deg i dag?", translation: "Hi! How do you feel today?" },
          { speaker: "B", text: "Jeg er veldig glad! Jeg fikk jobben!", translation: "I am very happy! I got the job!" },
          { speaker: "A", text: "Det er kjempebra! Jeg er litt nervøs for eksamen.", translation: "That is great! I am a bit nervous about the exam." },
          { speaker: "B", text: "Ikke vær redd, du er veldig flink!", translation: "Don't be scared, you are very smart!" },
        ]},
      ],
      quiz: [
        { question: "What does 'Trist' mean?", options: ["Happy", "Angry", "Sad", "Nervous"], answer: 2 },
        { question: "How do you say 'Scared' in Norwegian?", options: ["Gretten", "Redd", "Skuffet", "Utslitt"], answer: 1 },
        { question: "What does 'Sint' mean?", options: ["Confused", "Disappointed", "Nervous", "Angry"], answer: 3 },
        { question: "Which word means 'Exhausted'?", options: ["Nervøs", "Forvirret", "Utslitt", "Trist"], answer: 2 },
        { question: "How do you say 'I am super happy' using a fun alternative to «veldig»?", options: ["Jeg er dårlig glad", "Jeg er kjempeglad", "Jeg er lite glad", "Jeg er ikke glad"], answer: 1 },
      ],
    },
  },
  {
    id: 4, title: "Common Adjectives", titleNorwegian: "Vanlige adjektiver",
    description: "Describe the world around you with the most common Norwegian adjectives.",
    category: "adjectives", difficulty: "beginner", order: 4, xpReward: 20,
    content: {
      sections: [
        { type: "intro", text: "Adjectives (**adjektiver**) describe nouns. In Norwegian, adjectives change form depending on the gender and number of the noun. This lesson covers the base forms — the most common adjectives you'll use every day." },
        { type: "vocab_list", words: ["Snill", "Bra", "Dårlig", "Morsom", "Kjedelig", "Liten / Lite / Lita", "Stor", "Dyr", "Billig", "Vanskelig", "Enkelt / Lett", "Ung", "Gammel", "Fattig", "Rik"] },
        { type: "tip", text: "Norwegian adjectives agree with the noun's gender: **en stor hund** (a big dog, masculine), **ei stor stjerne** (a big star, feminine), **et stort problem** (a big problem, neuter). The definite form always uses **store**: **den store hunden**, **den store stjerna**, **det store problemet**." },
        { type: "dialogue", lines: [
          { speaker: "A", text: "Syns du norsk er vanskelig?", translation: "Do you think Norwegian is difficult?" },
          { speaker: "B", text: "Litt vanskelig, men egentlig ganske enkelt!", translation: "A bit difficult, but actually quite easy!" },
          { speaker: "A", text: "Det er bra! Er læreren din snill?", translation: "That's good! Is your teacher kind?" },
          { speaker: "B", text: "Ja, hun er veldig morsom og snill.", translation: "Yes, she is very funny and kind." },
        ]},
      ],
      quiz: [
        { question: "What does 'Morsom' mean?", options: ["Beautiful", "Boring", "Funny", "Small"], answer: 2 },
        { question: "How do you say 'Expensive' in Norwegian?", options: ["Billig", "Dyr", "Stor", "Bra"], answer: 1 },
        { question: "What is the opposite of 'Vanskelig'?", options: ["Kjedelig", "Dårlig", "Enkelt/Lett", "Gammel"], answer: 2 },
        { question: "Which adjective means 'Kind'?", options: ["Ung", "Gammel", "Snill", "Dårlig"], answer: 2 },
        { question: "What does 'Stor' mean?", options: ["Old", "Rich", "Big / Large", "Cheap"], answer: 2 },
      ],
    },
  },
  {
    id: 5, title: "Common Actions & Verbs", titleNorwegian: "Vanlige aksjoner og verb",
    description: "Learn the most essential Norwegian verbs for everyday life.",
    category: "verbs", difficulty: "beginner", order: 5, xpReward: 20,
    content: {
      sections: [
        { type: "intro", text: "Norwegian infinitives always start with **å** (to). The verb **skrive** becomes **å skrive** (to write). In present tense, most regular verbs simply add **-r**: **skriver**, **leser**, **danser**." },
        { type: "vocab_list", words: ["Å skrive", "Å lese", "Å danse", "Å synge", "Å gråte", "Å klemme", "Å sove", "Å gå", "Å løpe", "Å hoppe", "Å svømme", "Å trene", "Å lage mat", "Å spise"] },
        { type: "tip", text: "Norwegian verbs in present tense are simple: just add **-r** to the infinitive stem. **å snakke** → **snakker** (speaks/talking). **å lese** → **leser** (reads/reading). No conjugation for person — same form for jeg/du/han/vi/de!" },
        { type: "dialogue", lines: [
          { speaker: "A", text: "Hva liker du å gjøre på fritiden?", translation: "What do you like to do in your free time?" },
          { speaker: "B", text: "Jeg liker å lese og trene. Og du?", translation: "I like to read and exercise. And you?" },
          { speaker: "A", text: "Jeg danser og synger! Jeg er i et kor.", translation: "I dance and sing! I am in a choir." },
          { speaker: "B", text: "Wow! Det høres veldig gøy ut!", translation: "Wow! That sounds very fun!" },
        ]},
      ],
      quiz: [
        { question: "What does 'Å sove' mean?", options: ["To eat", "To sleep", "To swim", "To sing"], answer: 1 },
        { question: "How do you say 'To run' in Norwegian?", options: ["Å gå", "Å hoppe", "Å løpe", "Å trene"], answer: 2 },
        { question: "What is 'Å lage mat' in English?", options: ["To eat food", "To buy food", "To cook", "To clean"], answer: 2 },
        { question: "What is 'Å skrive' in English?", options: ["To read", "To write", "To speak", "To sing"], answer: 1 },
        { question: "How do you say 'To dance' in Norwegian?", options: ["Å synge", "Å klemme", "Å danse", "Å gråte"], answer: 2 },
      ],
    },
  },
  {
    id: 6, title: "Daily Routine", titleNorwegian: "Daglig rutine",
    description: "Describe your morning routine and daily activities in Norwegian.",
    category: "verbs", difficulty: "beginner", order: 6, xpReward: 20,
    content: {
      sections: [
        { type: "intro", text: "Talking about your **daglig rutine** (daily routine) is one of the first things you'll need in Norwegian. These verbs follow the regular pattern — just add **-r** for present tense." },
        { type: "vocab_list", words: ["Å våkne", "Å stå opp", "Å dusje", "Å kle på seg", "Å gre håret", "Å pusse tennene", "Å spise", "Å dra på jobb", "Å spise lunsj"] },
        { type: "phrase_group", title: "En typisk morgen (A typical morning)", phrases: [
          { norwegian: "Jeg våkner klokken sju.", english: "I wake up at seven o'clock." },
          { norwegian: "Jeg står opp og dusjer.", english: "I get up and shower." },
          { norwegian: "Jeg børster håret og kler på meg.", english: "I brush my hair and get dressed." },
          { norwegian: "Jeg spiser frokost.", english: "I eat breakfast." },
          { norwegian: "Jeg pusser tennene.", english: "I brush my teeth." },
          { norwegian: "Jeg drar på jobb.", english: "I go to work." },
        ]},
        { type: "tip", text: "In Norwegian, reflexive verbs like **å kle på seg** (to dress oneself) use **seg** for third person. **Jeg kler på meg**, **du kler på deg**, **han/hun kler på seg**." },
      ],
      quiz: [
        { question: "What does 'Å våkne' mean?", options: ["To sleep", "To wake up", "To get up", "To shower"], answer: 1 },
        { question: "How do you say 'To brush your teeth'?", options: ["Å gre håret", "Å dusje", "Å pusse tennene", "Å kle på seg"], answer: 2 },
        { question: "What does 'Å stå opp' mean?", options: ["To stand still", "To fall asleep", "To get up", "To go to bed"], answer: 2 },
        { question: "How do you say 'To shower' in Norwegian?", options: ["Å vaske", "Å dusje", "Å svømme", "Å pusse"], answer: 1 },
        { question: "What is 'Å dra på jobb' in English?", options: ["To leave work", "To work from home", "To go to work", "To find a job"], answer: 2 },
      ],
    },
  },
  {
    id: 7, title: "Days & Months", titleNorwegian: "Ukedager og måneder",
    description: "Learn the days of the week and months of the year — not capitalized in Norwegian!",
    category: "time", difficulty: "beginner", order: 7, xpReward: 15,
    content: {
      sections: [
        { type: "intro", text: "**Important rule:** In Norwegian, days of the week and months of the year are **not capitalized** — unlike in English. So we write **mandag** (not Mandag) and **januar** (not Januar)." },
        { type: "phrase_group", title: "Ukedager (Days of the week)", phrases: [
          { norwegian: "mandag", english: "Monday" }, { norwegian: "tirsdag", english: "Tuesday" },
          { norwegian: "onsdag", english: "Wednesday" }, { norwegian: "torsdag", english: "Thursday" },
          { norwegian: "fredag", english: "Friday" }, { norwegian: "lørdag", english: "Saturday" },
          { norwegian: "søndag", english: "Sunday" },
        ]},
        { type: "phrase_group", title: "Nyttige ord (Useful time words)", phrases: [
          { norwegian: "ei uke", english: "a week" }, { norwegian: "en hverdag", english: "a weekday (not including weekend)" },
          { norwegian: "ei helg", english: "a weekend" }, { norwegian: "en virkedag", english: "a business day" },
        ]},
        { type: "number_table", numbers: [
          ["januar – January", "februar – February", "mars – March"],
          ["april – April", "mai – May", "juni – June"],
          ["juli – July", "august – August", "september – September"],
          ["oktober – October", "november – November", "desember – December"],
        ]},
        { type: "phrase_group", title: "Årstider (Seasons)", phrases: [
          { norwegian: "vår 🌸", english: "spring (mars, april, mai)" },
          { norwegian: "sommer ☀️", english: "summer (juni, juli, august)" },
          { norwegian: "høst 🍂", english: "autumn/fall (september, oktober, november)" },
          { norwegian: "vinter ❄️", english: "winter (desember, januar, februar)" },
        ]},
        { type: "tip", text: "**Be careful!** Days and months are NOT capitalized in Norwegian. Write **mandag**, **tirsdag**, **januar**, **mai** — lowercase only!" },
      ],
      quiz: [
        { question: "What day is 'Onsdag'?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1 },
        { question: "How is 'Monday' written correctly in Norwegian?", options: ["Mandag", "mandag", "MANDAG", "Måndag"], answer: 1 },
        { question: "Which month is 'mai'?", options: ["March", "April", "May", "June"], answer: 2 },
        { question: "What season is 'høst'?", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 2 },
        { question: "How do you say 'weekend' in Norwegian?", options: ["En hverdag", "En virkedag", "Ei helg", "Ei uke"], answer: 2 },
      ],
    },
  },
  {
    id: 8, title: "Clothing & Winter Gear", titleNorwegian: "Klær og vintervokabular",
    description: "Name clothes and winter gear in Norwegian — essential for Norway's climate.",
    category: "clothing", difficulty: "beginner", order: 8, xpReward: 15,
    content: {
      sections: [
        { type: "intro", text: "Norway has cold winters, so knowing clothing vocabulary is very practical! Notice how Norwegian uses different articles: **en** (masculine), **ei** (feminine), **et** (neuter)." },
        { type: "vocab_list", words: ["En genser", "Ei t-skjorte", "Ei jakke", "Ei bukse / Et par bukser", "En kjole", "Et skjørt", "En shorts", "En sokk / Et par sokker", "En sko / Et par sko"] },
        { type: "phrase_group", title: "Vintervokabular (Winter Vocabulary)", phrases: [
          { norwegian: "ski (skis)", english: "skis" }, { norwegian: "staver/skistaver (poles)", english: "poles / ski poles" },
          { norwegian: "ei lue (a winter hat/beanie)", english: "a beanie / winter hat" }, { norwegian: "en genser (a sweater)", english: "a sweater" },
          { norwegian: "en snømann (a snowman)", english: "a snowman" }, { norwegian: "et snøfnugg (a snowflake)", english: "a snowflake" },
          { norwegian: "et skjerf (a scarf)", english: "a scarf" }, { norwegian: "ei skøyte (an ice skate)", english: "an ice skate" },
          { norwegian: "et snowboard/snøbrett (a snowboard)", english: "a snowboard" }, { norwegian: "en vott/et par votter (mittens)", english: "a mitten / pair of mittens" },
        ]},
        { type: "tip", text: "Norwegian has three genders for nouns: **maskulin** (en hund), **feminin** (ei bok), and **nøytrum** (et hus). Many Norwegians use **en** for both masculine and feminine in everyday speech." },
      ],
      quiz: [
        { question: "What is 'Ei jakke' in English?", options: ["A dress", "A skirt", "A jacket", "A sweater"], answer: 2 },
        { question: "How do you say 'A scarf' in Norwegian?", options: ["En vott", "Ei lue", "Et skjerf", "En genser"], answer: 2 },
        { question: "What does 'En genser' mean?", options: ["A shirt", "A sweater", "A jacket", "A dress"], answer: 1 },
        { question: "What is 'Et skjørt' in English?", options: ["Shorts", "A skirt", "Trousers", "A dress"], answer: 1 },
        { question: "How do you say 'A pair of mittens' in Norwegian?", options: ["Et par skjerf", "Et par sokker", "Et par votter", "Et par støvler"], answer: 2 },
      ],
    },
  },
  {
    id: 9, title: "Animals", titleNorwegian: "Dyr på norsk",
    description: "Learn the Norwegian names for common animals — pets, farm animals and more.",
    category: "animals", difficulty: "beginner", order: 9, xpReward: 15,
    content: {
      sections: [
        { type: "intro", text: "Animals (**dyr**) are a great vocabulary category. Notice how Norwegian uses articles to show gender: **en hund** (masculine dog), **ei ku** (feminine cow), **et esel** (neuter donkey)." },
        { type: "vocab_list", words: ["En hund", "En katt", "En kanin", "En hamster", "En gullfisk", "Ei mus", "En hest", "En sau", "Ei ku"] },
        { type: "phrase_group", title: "Snakke om dyr (Talking about animals)", phrases: [
          { norwegian: "Hva heter dyret ditt?", english: "What is your pet's name?" },
          { norwegian: "Jeg har en hund som heter Max.", english: "I have a dog named Max." },
          { norwegian: "Er du glad i dyr?", english: "Do you like animals?" },
          { norwegian: "Katten min heter Luna.", english: "My cat is named Luna." },
        ]},
        { type: "tip", text: "Norwegian Easter (**påske**) has a special culture: oranges (**appelsiner**), skiing, Easter eggs filled with candy, Easter chicken (**påskekylling**), and Easter bunny (**påskehare**). Norwegians also drink **utepils** — a beer enjoyed outside in spring sunshine!" },
      ],
      quiz: [
        { question: "What is 'En hund' in English?", options: ["A cat", "A rabbit", "A dog", "A horse"], answer: 2 },
        { question: "How do you say 'A horse' in Norwegian?", options: ["En sau", "En hest", "Ei ku", "En kanin"], answer: 1 },
        { question: "What is 'Ei mus' in English?", options: ["A cow", "A cat", "A rat", "A mouse"], answer: 3 },
        { question: "How do you say 'A sheep' in Norwegian?", options: ["En katt", "En hest", "En sau", "En kanin"], answer: 2 },
        { question: "What does 'En gullfisk' mean?", options: ["A gold coin", "A goldfish", "A starfish", "A yellow bird"], answer: 1 },
      ],
    },
  },
  {
    id: 10, title: "Professions", titleNorwegian: "Yrker på norsk",
    description: "Talk about jobs and professions — 'Hva jobber du som?' (What do you work as?)",
    category: "professions", difficulty: "intermediate", order: 10, xpReward: 20,
    content: {
      sections: [
        { type: "intro", text: "To ask someone's profession, say **Hva jobber du som?** (What do you work as?) or **Hva er yrket ditt?** (What is your profession?). Note that professions in Norwegian do NOT change form based on gender — **en lærer** is used for both a male and female teacher." },
        { type: "vocab_list", words: ["En sykepleier", "En brannkonstabel", "En rørlegger", "En tannlege", "En tømrer / snekker", "En elektriker", "En dyrlege / veterinær", "En kokk", "En lærer"] },
        { type: "phrase_group", title: "Snakke om yrke (Talking about profession)", phrases: [
          { norwegian: "Hva jobber du som?", english: "What do you work as?" },
          { norwegian: "Jeg jobber som lærer.", english: "I work as a teacher." },
          { norwegian: "Jeg er sykepleier.", english: "I am a nurse." },
          { norwegian: "Hva er yrket ditt?", english: "What is your profession?" },
          { norwegian: "Jeg studerer fortsatt.", english: "I am still studying." },
        ]},
        { type: "tip", text: "In Norwegian, you say **Jeg er lærer** (I am teacher) — **without an article** before a profession! Unlike English ('I am **a** teacher'), Norwegian drops the article when describing your profession." },
      ],
      quiz: [
        { question: "How do you ask 'What do you work as?' in Norwegian?", options: ["Hva er du?", "Hva jobber du som?", "Hvor jobber du?", "Når jobber du?"], answer: 1 },
        { question: "What is 'En lærer' in English?", options: ["A doctor", "A nurse", "A teacher", "A chef"], answer: 2 },
        { question: "How do you say 'A firefighter' in Norwegian?", options: ["En elektriker", "En brannkonstabel", "En rørlegger", "En tannlege"], answer: 1 },
        { question: "What does 'En kokk' mean?", options: ["A cook / chef", "A plumber", "An electrician", "A dentist"], answer: 0 },
        { question: "How do you say 'I am a nurse' correctly in Norwegian?", options: ["Jeg er en sykepleier", "Jeg er sykepleier", "Jeg jobber som en sykepleier", "Jeg har jobb som sykepleier"], answer: 1 },
      ],
    },
  },
  {
    id: 11, title: "Food & Dining", titleNorwegian: "Mat og restaurantbesøk",
    description: "Order food, ask about dishes, and navigate Norwegian restaurants with confidence.",
    category: "food", difficulty: "beginner", order: 11, xpReward: 20,
    content: {
      sections: [
        { type: "intro", text: "Norwegian food culture is rich and regional. From **brunost** (brown cheese) to fresh **laks** (salmon), knowing food vocabulary unlocks the full culinary experience." },
        { type: "vocab_list", words: ["Mat", "Vann", "Kaffe", "Brød", "Fisk", "Kjøtt", "Ost", "Appelsin"] },
        { type: "dialogue", lines: [
          { speaker: "Kunde", text: "Hei! Kan jeg se menyen?", translation: "Hi! Can I see the menu?" },
          { speaker: "Kelner", text: "Selvfølgelig! Hva vil du drikke?", translation: "Of course! What would you like to drink?" },
          { speaker: "Kunde", text: "Et glass vann, takk. Hva anbefaler du?", translation: "A glass of water, please. What do you recommend?" },
          { speaker: "Kelner", text: "Laksen vår er veldig god i dag!", translation: "Our salmon is very good today!" },
        ]},
        { type: "tip", text: "In Norway, **kaffe** is taken very seriously — Norwegians are among the highest coffee consumers per capita in the world! A typical Norwegian frokost (breakfast) includes bread with **brunost** (brown cheese)." },
      ],
      quiz: [
        { question: "What is 'Fisk' in English?", options: ["Meat", "Fish", "Bread", "Cheese"], answer: 1 },
        { question: "How do you say 'Water' in Norwegian?", options: ["Kaffe", "Brød", "Vann", "Ost"], answer: 2 },
        { question: "What does 'Kjøtt' mean?", options: ["Coffee", "Meat", "Fish", "Food"], answer: 1 },
        { question: "What is Norwegian brown cheese called?", options: ["Laks", "Brunost", "Fisk", "Brød"], answer: 1 },
        { question: "How do you say 'Bread' in Norwegian?", options: ["Ost", "Mat", "Vann", "Brød"], answer: 3 },
      ],
    },
  },
  {
    id: 12, title: "Travel & Getting Around", titleNorwegian: "Reise og transport",
    description: "Navigate Norwegian cities, ask for directions, and handle transportation.",
    category: "travel", difficulty: "beginner", order: 12, xpReward: 20,
    content: {
      sections: [
        { type: "intro", text: "Norway has excellent public transportation. Learning travel vocabulary will help you get around Bergen, Oslo, and beyond — including the stunning Bergen Railway!" },
        { type: "vocab_list", words: ["Flyplass", "Tog", "Hotell", "Kart", "Buss", "Billett"] },
        { type: "dialogue", lines: [
          { speaker: "Turist", text: "Unnskyld, hvor er togstasjonen?", translation: "Excuse me, where is the train station?" },
          { speaker: "Innbygger", text: "Den er rett frem, og så til venstre.", translation: "It's straight ahead, then to the left." },
          { speaker: "Turist", text: "Takk! Og hvor lang tid tar det?", translation: "Thanks! And how long does it take?" },
          { speaker: "Innbygger", text: "Omtrent ti minutter til fots.", translation: "About ten minutes on foot." },
        ]},
        { type: "tip", text: "The **Bergensbanen** (Bergen Railway) is one of the world's most scenic train journeys, passing through the Hardangervidda mountain plateau. Buy a **billett** (ticket) in advance!" },
      ],
      quiz: [
        { question: "What is 'Tog' in English?", options: ["Bus", "Train", "Airport", "Ticket"], answer: 1 },
        { question: "How do you say 'Ticket'?", options: ["Kart", "Buss", "Billett", "Hotell"], answer: 2 },
        { question: "What does 'Flyplass' mean?", options: ["Airport", "Hotel", "Map", "Train"], answer: 0 },
        { question: "How do you ask 'Where is...?'", options: ["Hva koster det?", "Hvor er...?", "Kan du hjelpe?", "Hva heter du?"], answer: 1 },
        { question: "What is 'Kart' in English?", options: ["Card", "Map", "Car", "Cart"], answer: 1 },
      ],
    },
  },
  {
    id: 13, title: "Norwegian Nature & Landscape", titleNorwegian: "Norsk natur og landskap",
    description: "Describe Norway's stunning natural wonders — fjords, mountains, and northern lights.",
    category: "nature", difficulty: "intermediate", order: 13, xpReward: 25,
    content: {
      sections: [
        { type: "intro", text: "Norway's nature is legendary — from **fjorder** carved by glaciers to **nordlys** dancing in Arctic skies. This vocabulary also covers spring nature words that Norwegians love." },
        { type: "vocab_list", words: ["Fjord", "Skog", "Fjell", "Nordlys", "Snø", "En blomst", "Ei bie", "En sommerfugl", "Ei marihøne", "Grønt gress"] },
        { type: "dialogue", lines: [
          { speaker: "A", text: "Har du sett nordlyset?", translation: "Have you seen the northern lights?" },
          { speaker: "B", text: "Ja! Vi så dem i Tromsø i januar. Det var magisk.", translation: "Yes! We saw them in Tromsø in January. It was magical." },
          { speaker: "A", text: "Jeg vil gjerne se fjordene en dag.", translation: "I would love to see the fjords one day." },
          { speaker: "B", text: "Du må dra til Geirangerfjorden — den er utrolig vakker.", translation: "You must go to the Geirangerfjord — it is incredibly beautiful." },
        ]},
        { type: "tip", text: "**Allemannsretten** (the right to roam) gives everyone the right to freely access and camp in Norwegian wilderness — a unique cultural treasure! Also: **å gå tur** means to go for a walk in nature, while **å gå på tur** means to go hiking/on a trip." },
      ],
      quiz: [
        { question: "What is 'Fjell' in English?", options: ["Forest", "Fjord", "Mountain", "Snow"], answer: 2 },
        { question: "How do you say 'Northern lights'?", options: ["Fjord", "Nordlys", "Skog", "Snø"], answer: 1 },
        { question: "What does 'Skog' mean?", options: ["Snow", "Mountain", "Fjord", "Forest"], answer: 3 },
        { question: "What is 'En blomst'?", options: ["A bee", "A butterfly", "A flower", "Grass"], answer: 2 },
        { question: "The right to roam in Norway is called?", options: ["Friluftsliv", "Allemannsretten", "Folkehøgskole", "Dugnad"], answer: 1 },
      ],
    },
  },
  // ── Lesson 14: Sentence Structure & Word Order ──────────────────────────
  {
    id: 14,
    title: "Sentence Structure & Word Order",
    titleNorwegian: "Setningsstruktur og ordstilling",
    description: "Master how Norwegian sentences are built — SVO order, V2 rule, questions, negation, and subordinate clauses.",
    category: "grammar",
    difficulty: "intermediate",
    order: 14,
    xpReward: 30,
    content: {
      sections: [
        {
          type: "intro",
          text: "Norwegian word order is one of the most important — and most learnable — aspects of the language. Once you understand the core rules, you can build an enormous range of sentences confidently. The good news: Norwegian follows many of the same patterns as English, with a few crucial twists.",
        },
        {
          type: "tip",
          text: "**The Golden Rule:** In Norwegian, the **verb always comes second** in a main clause — no matter what. This is called the V2 (verb-second) rule. If any word or phrase other than the subject starts the sentence, the subject and verb swap places (inversion).",
        },
        {
          type: "phrase_group",
          title: "Rule 1 — Basic SVO Order (Subject · Verb · Object)",
          phrases: [
            { norwegian: "Jeg spiser et eple.", english: "I eat an apple.", phonetic: "yay SPEE-ser et EP-leh" },
            { norwegian: "Hun leser en bok.", english: "She reads a book.", phonetic: "hoon LEH-ser en book" },
            { norwegian: "Vi bor i Oslo.", english: "We live in Oslo.", phonetic: "vee boor ee OSH-loh" },
            { norwegian: "De liker musikk.", english: "They like music.", phonetic: "dee LEE-ker moo-SIK" },
            { norwegian: "Han kjøper mat.", english: "He buys food.", phonetic: "hahn SHOH-per maht" },
          ],
        },
        {
          type: "tip",
          text: "**Inversion (V2 rule in action):** When a time word, place, or adverb starts the sentence, the verb still stays second — so the subject moves to third position. This is called **inversion** (omvendt rekkefølge). Example: *I dag spiser jeg et eple.* (Today I eat an apple.) The verb 'spiser' stays in position 2.",
        },
        {
          type: "phrase_group",
          title: "Rule 2 — Inversion: Time/Place First → Verb Second",
          phrases: [
            { norwegian: "I dag jobber jeg hjemme.", english: "Today I work from home.", phonetic: "ee dahg YOB-er yay YEM-eh" },
            { norwegian: "I morgen reiser vi til Bergen.", english: "Tomorrow we travel to Bergen.", phonetic: "ee MOR-en RAY-ser vee" },
            { norwegian: "Nå leser han avisen.", english: "Now he is reading the newspaper.", phonetic: "noh LEH-ser hahn AH-vee-sen" },
            { norwegian: "Her bor hun alene.", english: "Here she lives alone.", phonetic: "hair boor hoon ah-LEH-neh" },
            { norwegian: "Derfor drikker vi kaffe.", english: "Therefore we drink coffee.", phonetic: "DAIR-for DRIK-er vee KAF-eh" },
          ],
        },
        {
          type: "phrase_group",
          title: "Rule 3 — Yes/No Questions: Verb First",
          phrases: [
            { norwegian: "Spiser du frokost?", english: "Do you eat breakfast?", phonetic: "SPEE-ser doo FROH-kost" },
            { norwegian: "Liker du kaffe?", english: "Do you like coffee?", phonetic: "LEE-ker doo KAF-eh" },
            { norwegian: "Er hun norsk?", english: "Is she Norwegian?", phonetic: "air hoon norsk" },
            { norwegian: "Har de barn?", english: "Do they have children?", phonetic: "har dee barn" },
            { norwegian: "Kan du hjelpe meg?", english: "Can you help me?", phonetic: "kan doo YEL-peh may" },
          ],
        },
        {
          type: "phrase_group",
          title: "Rule 4 — Wh-Questions: Question Word · Verb · Subject",
          phrases: [
            { norwegian: "Hva spiser du?", english: "What do you eat?", phonetic: "vah SPEE-ser doo" },
            { norwegian: "Hvor bor du?", english: "Where do you live?", phonetic: "vor boor doo" },
            { norwegian: "Hvem er hun?", english: "Who is she?", phonetic: "vem air hoon" },
            { norwegian: "Når kommer toget?", english: "When does the train come?", phonetic: "nor KOM-er TOO-geh" },
            { norwegian: "Hvorfor gråter han?", english: "Why is he crying?", phonetic: "VOR-for GROH-ter hahn" },
            { norwegian: "Hvordan lager du det?", english: "How do you make it?", phonetic: "VOR-dan LAH-ger doo day" },
          ],
        },
        {
          type: "tip",
          text: "**Negation:** Place **ikke** (not) directly after the verb in main clauses: *Jeg spiser ikke kjøtt.* (I do not eat meat.) In subordinate clauses, **ikke** comes BEFORE the verb: *Jeg vet at han ikke spiser kjøtt.* (I know that he does not eat meat.) This is one of the most common mistakes — memorize both positions.",
        },
        {
          type: "phrase_group",
          title: "Rule 5 — Negation with 'ikke' (not)",
          phrases: [
            { norwegian: "Jeg spiser ikke kjøtt.", english: "I do not eat meat.", phonetic: "yay SPEE-ser IK-eh shoot" },
            { norwegian: "Hun liker ikke regn.", english: "She does not like rain.", phonetic: "hoon LEE-ker IK-eh rayn" },
            { norwegian: "Vi er ikke trøtte.", english: "We are not tired.", phonetic: "vee air IK-eh TRUT-eh" },
            { norwegian: "Han kommer ikke i dag.", english: "He is not coming today.", phonetic: "hahn KOM-er IK-eh ee dahg" },
            { norwegian: "De snakker ikke norsk.", english: "They do not speak Norwegian.", phonetic: "dee SNAK-er IK-eh norsk" },
          ],
        },
        {
          type: "tip",
          text: "**Subordinate Clauses (leddsetninger):** When a clause is introduced by a conjunction like *at* (that), *fordi* (because), *hvis* (if), *når* (when), *selv om* (even though) — the verb goes to the END and **ikke** moves BEFORE the verb. Pattern: **Conjunction + Subject + [ikke] + Verb**: *fordi hun ikke snakker norsk* (because she does not speak Norwegian).",
        },
        {
          type: "phrase_group",
          title: "Rule 6 — Subordinate Clauses",
          phrases: [
            { norwegian: "Jeg vet at han er her.", english: "I know that he is here.", phonetic: "yay veht at hahn air hair" },
            { norwegian: "Hun sier at hun ikke kan komme.", english: "She says that she cannot come.", phonetic: "hoon SEE-er at hoon IK-eh kan KOM-eh" },
            { norwegian: "Jeg lærer norsk fordi jeg elsker Norge.", english: "I learn Norwegian because I love Norway.", phonetic: "yay LAIR-er norsk FOR-dee yay EL-sker NOR-geh" },
            { norwegian: "Hvis det regner, blir vi hjemme.", english: "If it rains, we will stay home.", phonetic: "viss day RAYN-er bleer vee YEM-eh" },
            { norwegian: "Han leser selv om han er trøtt.", english: "He reads even though he is tired.", phonetic: "hahn LEH-ser selvm om hahn air trut" },
          ],
        },
        {
          type: "dialogue",
          lines: [
            { speaker: "A", text: "Hva gjør du i dag?", translation: "What are you doing today?" },
            { speaker: "B", text: "I dag studerer jeg norsk hjemme.", translation: "Today I am studying Norwegian at home." },
            { speaker: "A", text: "Snakker du ikke norsk allerede?", translation: "Don't you speak Norwegian already?" },
            { speaker: "B", text: "Nei, ikke ennå. Men jeg øver hver dag.", translation: "No, not yet. But I practice every day." },
            { speaker: "A", text: "Hvorfor liker du norsk?", translation: "Why do you like Norwegian?" },
            { speaker: "B", text: "Fordi det er et vakkert språk, og jeg vil bo i Norge.", translation: "Because it is a beautiful language, and I want to live in Norway." },
          ],
        },
        {
          type: "tip",
          text: "**Time–Manner–Place order:** Norwegian prefers this sequence for adverbials: WHEN → HOW → WHERE. Example: *Jeg reiser i morgen med tog til Oslo.* (I travel tomorrow by train to Oslo.) You don't have to be perfect, but this order sounds most natural.",
        },
      ],
      quiz: [
        {
          question: "Which word order is correct for a basic Norwegian statement?",
          options: ["Object · Subject · Verb", "Verb · Subject · Object", "Subject · Verb · Object", "Subject · Object · Verb"],
          answer: 2,
        },
        {
          question: "You want to say 'Today I eat lunch.' Which sentence uses correct V2 inversion?",
          options: [
            "Jeg spiser i dag lunsj.",
            "I dag jeg spiser lunsj.",
            "I dag spiser jeg lunsj.",
            "Spiser jeg lunsj i dag.",
          ],
          answer: 2,
        },
        {
          question: "Where does 'ikke' (not) go in a main clause?",
          options: [
            "Before the subject",
            "After the verb",
            "At the end of the sentence",
            "Before the object",
          ],
          answer: 1,
        },
        {
          question: "How do you form a yes/no question in Norwegian?",
          options: [
            "Add 'er' at the end",
            "Put the verb first",
            "Put the subject first with rising intonation",
            "Use 'ikke' before the verb",
          ],
          answer: 1,
        },
        {
          question: "Which is the correct wh-question for 'Where do you live?'",
          options: ["Du bor hvor?", "Hvor du bor?", "Bor du hvor?", "Hvor bor du?"],
          answer: 3,
        },
        {
          question: "In a subordinate clause starting with 'fordi' (because), where does 'ikke' go?",
          options: [
            "After the verb",
            "Before the verb",
            "At the very end",
            "Before the conjunction",
          ],
          answer: 1,
        },
        {
          question: "Which sentence correctly says 'She says that she cannot come'?",
          options: [
            "Hun sier at hun kan ikke komme.",
            "Hun sier at hun ikke kan komme.",
            "Hun ikke sier at hun kan komme.",
            "Hun sier ikke at hun kan komme.",
          ],
          answer: 1,
        },
        {
          question: "'Hver dag leser han avisen.' What rule does this sentence demonstrate?",
          options: [
            "Verb-first questions",
            "SVO basic order",
            "V2 inversion — time phrase first, verb second",
            "Subordinate clause structure",
          ],
          answer: 2,
        },
        {
          question: "What is the correct preferred order for adverbials in Norwegian?",
          options: [
            "Place · Time · Manner",
            "Manner · Place · Time",
            "Time · Place · Manner",
            "Time · Manner · Place",
          ],
          answer: 3,
        },
        {
          question: "Which sentence correctly translates 'I learn Norwegian because I love Norway'?",
          options: [
            "Jeg lærer norsk fordi jeg elsker Norge.",
            "Fordi jeg elsker Norge, norsk lærer jeg.",
            "Jeg lærer norsk, fordi elsker jeg Norge.",
            "Norsk fordi jeg lærer elsker jeg Norge.",
          ],
          answer: 0,
        },
      ],
    },
  },
];

// ──────────────────────────────────────────────────────────────
// DERIVED HELPERS
// ──────────────────────────────────────────────────────────────
export const CATEGORIES = [...new Set(VOCABULARY.map((v) => v.category))];

export function getVocabByCategory(cat: string): VocabWord[] {
  return VOCABULARY.filter((v) => v.category === cat);
}

export function getLessonVocab(lesson: Lesson): VocabWord[] {
  // Collect all norwegian words referenced in vocab_list sections, then find matching vocab
  const referenced = new Set<string>();
  for (const s of lesson.content.sections) {
    if (s.type === "vocab_list") {
      for (const w of s.words) referenced.add(w);
    }
  }
  return VOCABULARY.filter((v) => referenced.has(v.norwegian) || v.category === lesson.category);
}
