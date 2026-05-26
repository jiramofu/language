const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Lesson = require('./Lesson');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lessonId: {
    type: DataTypes.INTEGER,
    references: { model: Lesson, key: 'id' },
  },
  type: {
    type: DataTypes.ENUM('multiple_choice', 'fill_blank', 'listening', 'speaking', 'matching'),
    allowNull: false,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hint: {
    type: DataTypes.TEXT,
  },
  orderIndex: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: true,
  underscored: true,
});

Exercise.belongsTo(Lesson, { foreignKey: 'lessonId' });

module.exports = Exercise;
