const mongoose = require('mongoose');

// Define the Idea Schema
const ideaSchema = new mongoose.Schema({
    gameTitle: {
        type: String,
        required: true,
        trim: true
    },
    gameDescription: {
        type: String,
        required: true,
        maxlength: 500
    },
    gameGenre: {
        type: String,
        required: true,
        enum: ['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Puzzle', 'Other']
    },
    targetAudience: {
        type: String,
        required: true,
        enum: ['Kids', 'Teens', 'Adults', 'All Ages']
    },
    estimatedBudget: {
        type: Number,
        required: true,
        min: 0
    },
    conceptArt: {
        type: String, // Stores the URL or path to the uploaded image
        default: ''
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
});

// Update the User Schema to include the ideas array
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    phno: { 
        type: String, 
        required: true,
        trim: true
    },
    gender: { 
        type: String, 
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    password: { 
        type: String, 
        required: true 
    },
    ideas: [ideaSchema] // Embedding the Idea Schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;