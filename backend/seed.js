const sequelize = require('./db');
const Lesson = require('./models/Lesson');
const Vocabulary = require('./models/Vocabulary');
const Exercise = require('./models/Exercise');

const seedDatabase = async () => {
  try {
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // SPANISH Lessons
    const spanishGreetings = await Lesson.create({
      language: 'spanish',
      title: 'Greetings',
      description: 'Learn basic Spanish greetings',
      level: 'beginner',
      orderIndex: 1,
    });

    const spanishGreetingsVocab = await Vocabulary.bulkCreate([
      {
        lessonId: spanishGreetings.id,
        word: 'Hola',
        translation: 'Hello',
        pronunciation: 'OH-lah',
        exampleSentence: 'Hola, ¿cómo estás?',
        partOfSpeech: 'interjection',
      },
      {
        lessonId: spanishGreetings.id,
        word: 'Buenos días',
        translation: 'Good morning',
        pronunciation: 'BWE-nos DEE-ahs',
        exampleSentence: 'Buenos días, ¿cómo te va?',
        partOfSpeech: 'phrase',
      },
      {
        lessonId: spanishGreetings.id,
        word: 'Buenas noches',
        translation: 'Good night',
        pronunciation: 'BWE-nas NO-ches',
        exampleSentence: 'Buenas noches, que descanses.',
        partOfSpeech: 'phrase',
      },
    ]);

    await Exercise.bulkCreate([
      {
        lessonId: spanishGreetings.id,
        type: 'multiple_choice',
        question: 'What does "Hola" mean?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctAnswer: 'Hello',
        orderIndex: 1,
      },
      {
        lessonId: spanishGreetings.id,
        type: 'fill_blank',
        question: 'Complete: "_____ días" (Good morning)',
        options: ['Buenos', 'Buenas', 'Buen', 'Bueno'],
        correctAnswer: 'Buenos',
        orderIndex: 2,
      },
    ]);

    // SPANISH Numbers
    const spanishNumbers = await Lesson.create({
      language: 'spanish',
      title: 'Numbers 1-10',
      description: 'Learn basic Spanish numbers',
      level: 'beginner',
      orderIndex: 2,
    });

    const spanishNumbersVocab = await Vocabulary.bulkCreate([
      {
        lessonId: spanishNumbers.id,
        word: 'Uno',
        translation: 'One',
        pronunciation: 'OO-no',
        exampleSentence: 'Tengo uno gato.',
        partOfSpeech: 'number',
      },
      {
        lessonId: spanishNumbers.id,
        word: 'Dos',
        translation: 'Two',
        pronunciation: 'DOS',
        exampleSentence: 'Dos y dos son cuatro.',
        partOfSpeech: 'number',
      },
      {
        lessonId: spanishNumbers.id,
        word: 'Tres',
        translation: 'Three',
        pronunciation: 'TRES',
        exampleSentence: 'Tengo tres hermanos.',
        partOfSpeech: 'number',
      },
      {
        lessonId: spanishNumbers.id,
        word: 'Diez',
        translation: 'Ten',
        pronunciation: 'dee-ES',
        exampleSentence: 'Tengo diez dedos.',
        partOfSpeech: 'number',
      },
    ]);

    // FRENCH Lessons
    const frenchGreetings = await Lesson.create({
      language: 'french',
      title: 'Greetings',
      description: 'Learn basic French greetings',
      level: 'beginner',
      orderIndex: 1,
    });

    const frenchGreetingsVocab = await Vocabulary.bulkCreate([
      {
        lessonId: frenchGreetings.id,
        word: 'Bonjour',
        translation: 'Hello (daytime)',
        pronunciation: 'bon-ZHOOR',
        exampleSentence: 'Bonjour, comment allez-vous?',
        partOfSpeech: 'interjection',
      },
      {
        lessonId: frenchGreetings.id,
        word: 'Bonsoir',
        translation: 'Good evening',
        pronunciation: 'bon-SWAHR',
        exampleSentence: 'Bonsoir, comment ça va?',
        partOfSpeech: 'interjection',
      },
      {
        lessonId: frenchGreetings.id,
        word: 'Au revoir',
        translation: 'Goodbye',
        pronunciation: 'oh ruh-VWAHR',
        exampleSentence: 'Au revoir, à bientôt!',
        partOfSpeech: 'phrase',
      },
    ]);

    // ITALIAN Lessons
    const italianGreetings = await Lesson.create({
      language: 'italian',
      title: 'Greetings',
      description: 'Learn basic Italian greetings',
      level: 'beginner',
      orderIndex: 1,
    });

    const italianGreetingsVocab = await Vocabulary.bulkCreate([
      {
        lessonId: italianGreetings.id,
        word: 'Ciao',
        translation: 'Hello/Goodbye',
        pronunciation: 'CHOW',
        exampleSentence: 'Ciao, come stai?',
        partOfSpeech: 'interjection',
      },
      {
        lessonId: italianGreetings.id,
        word: 'Buongiorno',
        translation: 'Good morning',
        pronunciation: 'bwon-JOR-no',
        exampleSentence: 'Buongiorno, come va?',
        partOfSpeech: 'phrase',
      },
      {
        lessonId: italianGreetings.id,
        word: 'Arrivederci',
        translation: 'Goodbye (formal)',
        pronunciation: 'ar-ree-vuh-DER-chee',
        exampleSentence: 'Arrivederci, a presto!',
        partOfSpeech: 'interjection',
      },
    ]);

    // JAMAICAN PATOIS Lessons
    const patoisGreetings = await Lesson.create({
      language: 'jamaican patois',
      title: 'Greetings',
      description: 'Learn basic Jamaican Patois greetings',
      level: 'beginner',
      orderIndex: 1,
    });

    const patoisGreetingsVocab = await Vocabulary.bulkCreate([
      {
        lessonId: patoisGreetings.id,
        word: 'Wah yuh a seh?',
        translation: 'What are you saying? (How are you?)',
        pronunciation: 'wah yuh ah say',
        exampleSentence: 'Wah yuh a seh, mi breda?',
        partOfSpeech: 'phrase',
      },
      {
        lessonId: patoisGreetings.id,
        word: 'Mi deh yah',
        translation: "I'm here",
        pronunciation: 'mee deh yah',
        exampleSentence: 'Mi deh yah, good good.',
        partOfSpeech: 'phrase',
      },
      {
        lessonId: patoisGreetings.id,
        word: 'Bye bye',
        translation: 'Goodbye',
        pronunciation: 'bye bye',
        exampleSentence: 'Bye bye, lata.',
        partOfSpeech: 'interjection',
      },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
