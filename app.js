const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3333;


const mongoURL = "mongodb://127.0.0.1:27017/my_database";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  { id: 1, username: 'user1', email: 'user1@example.com', thoughts: [], friends: [] },
  { id: 2, username: 'user2', email: 'user2@example.com', thoughts: [], friends: [] },
];

const thoughts = [
  { id: 1, thoughtText: 'Thought 1', createdAt: new Date(), username: 'user1', reactions: [] },
  { id: 2, thoughtText: 'Thought 2', createdAt: new Date(), username: 'user2', reactions: [] },
];

app.get('/api/users', (req, res) => {
    res.json(users);
  });
  
  
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
  
    if (user) {
      const updatedUser = { ...user, ...req.body };
      users[userId - 1] = updatedUser;
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
  
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

app.get('/api/thoughts', (req, res) => {
    res.json(thoughts);
  });
  
app.get('/api/thoughts/:id', (req, res) => {
    const thoughtId = parseInt(req.params.id);
    const thought = thoughts.find((thought) => thought.id === thoughtId);
  
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  });
  
app.post('/api/thoughts', (req, res) => {
    const newThought = { id: thoughts.length + 1, ...req.body, createdAt: new Date() };
    thoughts.push(newThought);
    res.status(201).json(newThought);
  });
  

app.put('/api/thoughts/:id', (req, res) => {
    const thoughtId = parseInt(req.params.id);
    const thought = thoughts.find((thought) => thought.id === thoughtId);
  
    if (thought) {
      const updatedThought = { ...thought, ...req.body };
      thoughts[thoughtId - 1] = updatedThought;
      res.json(updatedThought);
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  });
  

app.delete('/api/thoughts/:id', (req, res) => {
    const thoughtId = parseInt(req.params.id);
    const thoughtIndex = thoughts.findIndex((thought) => thought.id === thoughtId);
  
    if (thoughtIndex !== -1) {
      thoughts.splice(thoughtIndex, 1);
      res.json({ message: 'Thought deleted successfully' });
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  });