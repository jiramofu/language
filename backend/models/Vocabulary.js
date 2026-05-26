const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Lesson = require('./Lesson');

const Vocabulary = sequelize.define('Vocabulary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lessonId: {
    type: DataTypes.INTEGER,
    references: { model: Lesson, key: 'id' },
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  translation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pronunciation: {
    type: DataTypes.STRING,
  },
  exampleSentence: {
    type: DataTypes.TEXT,
  },
  partOfSpeech: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
  underscored: true,
});

Vocabulary.belongsTo(Lesson, { foreignKey: 'lessonId' });

module.exports = Vocabulary;
