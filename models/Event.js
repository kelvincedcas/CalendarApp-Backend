import {Schema, model} from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

eventSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();

    object.id = _id;
    return object;
});

export const Event = model('Event', eventSchema);