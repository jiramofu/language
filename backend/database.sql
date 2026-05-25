-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Languages table
CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  language_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50),
  order_index INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Vocabulary table
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  lesson_id INT NOT NULL,
  word VARCHAR(255) NOT NULL,
  translation VARCHAR(255) NOT NULL,
  pronunciation VARCHAR(255),
  example_sentence TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Exercises table
CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  lesson_id INT NOT NULL,
  type VARCHAR(50),
  question TEXT NOT NULL,
  options JSON,
  correct_answer VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- User progress table
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  vocabulary_id INT,
  exercise_id INT,
  completed BOOLEAN DEFAULT FALSE,
  score INT,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id),
  FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Insert default languages
INSERT INTO languages (name, code) VALUES
('Spanish', 'es'),
('French', 'fr'),
('Jamaican Patois', 'jam'),
('Italian', 'it');
