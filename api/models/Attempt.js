const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    drillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drill',
        required: true
    },
    answers: [{
        _id: false,
        qid: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }],
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound index
attemptSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Attempt', attemptSchema);
