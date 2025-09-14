const mongoose = require('mongoose');

const drillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    tags: [{
        type: String,
        required: true
    }],
    questions: [{
        _id: false,
        id: {
            type: String,
            required: true
        },
        prompt: {
            type: String,
            required: true
        },
        keywords: [{
            type: String,
            required: true
        }]
    }]
});

// Create indexes
drillSchema.index({ tags: 1, difficulty: 1 });

module.exports = mongoose.model('Drill', drillSchema);
