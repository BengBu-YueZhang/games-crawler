const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
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
    },
    source: {
        type: String,
        required: true
    }
})

const NewsListSchema = new Schema({
    createDate: {
        type: Date,
        default: new Date()
    },
    list: [NewsSchema]
})

NewsSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

NewsListSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const NewsList = mongoose.model('NewsList', NewsListSchema)

module.exports = NewsList
