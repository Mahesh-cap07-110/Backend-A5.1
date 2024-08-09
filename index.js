const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Custom validation middleware
const validateData = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;
  let isValid = true;
  let notes = [];

  // Validate ID
  if (typeof ID !== 'number') {
    isValid = false;
    notes.push('ID must be a number');
  }

  // Validate Name
  if (typeof Name !== 'string') {
    isValid = false;
    notes.push('Name must be a string');
  }

  // Validate Rating
  if (typeof Rating !== 'number') {
    isValid = false;
    notes.push('Rating must be a number');
  }

  // Validate Description
  if (typeof Description !== 'string') {
    isValid = false;
    notes.push('Description must be a string');
  }

  // Validate Genre
  if (typeof Genre !== 'string') {
    isValid = false;
    notes.push('Genre must be a string');
  }

  // Validate Cast
  if (!Array.isArray(Cast) || !Cast.every(item => typeof item === 'string')) {
    isValid = false;
    notes.push('Cast must be an array of strings');
  }

  if (!isValid) {
    res.status(400).json({
      message: "bad request. some data is incorrect.",
      notes: notes
    });
  } else {
    next();
  }
};

// POST route
app.post('/', validateData, (req, res) => {
  res.status(200).json({ message: "data received" });
});

// Error handling for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ message: "invalid request body." });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});