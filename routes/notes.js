const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.render('notes-list', { 
      title: 'All Notes',
      notes 
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Failed to load notes');
  }
});

// Show add note form
router.get('/add', (req, res) => {
  res.render('add-note', { 
    title: 'Add New Note' 
  });
});

// Create new note
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).render('add-note', {
        title: 'Add New Note',
        error: 'Title and content are required',
        formData: { title, content }
      });
    }

    const newNote = new Note({
      title: title.trim(),
      content: content.trim()
    });

    await newNote.save();
    res.redirect('/notes');
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Failed to create note');
  }
});

module.exports = router;