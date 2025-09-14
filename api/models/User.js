const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ''
    },
    providers: [{
        _id: false,
        provider: {
            type: String,
            required: true
        },
        providerId: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create indexes
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
