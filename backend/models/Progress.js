const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Lesson = require('./Lesson');

const Progress = sequelize.define('Progress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
  lessonId: {
    type: DataTypes.INTEGER,
    references: { model: Lesson, key: 'id' },
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  completedAt: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  underscored: true,
});

Progress.belongsTo(User, { foreignKey: 'userId' });
Progress.belongsTo(Lesson, { foreignKey: 'lessonId' });

module.exports = Progress;
