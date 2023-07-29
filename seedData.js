const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/my_database';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const sampleUsers = [
  {
    username: 'user1',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
  },
];

const sampleThoughts = [
  {
    thoughtText: '',
    username: 'user1',
  },
  {
    thoughtText: '',
    username: 'user2',
  },
];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Thought.deleteMany();

    const createdUsers = await User.create(sampleUsers);
    const createdThoughts = await Thought.create(sampleThoughts);

    for (const thought of createdThoughts) {
      const user = createdUsers.find((user) => user.username === thought.username);
      user.thoughts.push(thought._id);
      await user.save();
    }

    console.log('Sample data seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
};

seedData();
