import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Lessons.css';

function Lessons() {
  const { language } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);

  // Placeholder lessons
  const lessons = [
    {
      id: 1,
      title: 'Greetings',
      vocabulary: [
        { word: 'Hola', translation: 'Hello', pronunciation: 'OH-lah' },
        { word: 'Buenos días', translation: 'Good morning', pronunciation: 'BWE-nos DEE-ahs' },
      ]
    },
    {
      id: 2,
      title: 'Numbers 1-10',
      vocabulary: [
        { word: 'Uno', translation: 'One', pronunciation: 'OO-no' },
        { word: 'Dos', translation: 'Two', pronunciation: 'dos' },
      ]
    },
  ];

  const lesson = lessons[currentLesson];

  return (
    <div className="lessons">
      <header className="lessons-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>{language.charAt(0).toUpperCase() + language.slice(1)} Lessons</h1>
      </header>

      <div className="container">
        <div className="lesson-content">
          <h2>{lesson.title}</h2>
          
          <div className="vocabulary-list">
            {lesson.vocabulary.map((word, idx) => (
              <div key={idx} className="vocab-item">
                <div className="vocab-word">{word.word}</div>
                <div className="vocab-translation">{word.translation}</div>
                <div className="vocab-pronunciation">({word.pronunciation})</div>
                <button className="speak-btn">🔊 Hear</button>
              </div>
            ))}
          </div>

          <div className="lesson-nav">
            <button 
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson(currentLesson - 1)}
            >
              Previous
            </button>
            <span>{currentLesson + 1} / {lessons.length}</span>
            <button 
              disabled={currentLesson === lessons.length - 1}
              onClick={() => setCurrentLesson(currentLesson + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons;
