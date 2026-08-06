import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    route:{type:String, unique:true},
    type: { type: String, enum: ['internal', 'external'], required: true },
    subtitle:{type:String},
    url:{type:String},
    icon:{type:String},
    color:{type:String},
    order:{type:Number, default:0},
    active:{type:Boolean, default:true}
})

export const Section = mongoose.model('Section',sectionSchema)