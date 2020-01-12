const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    }
})

NewSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const New = mongoose.model('News', NewSchema)

module.exports = New
