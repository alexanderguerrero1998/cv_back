/*
* Person:
* name       (Text,obligate,unique),
* lastName   (Text,obligate),
* biography  (Text,obligate),
* linkImg   (Text,obligate),
* date       (Date,obligate),
*/

/*
* Edison Alexander Guerrero Du tan
*
* Soy Engineer in Technology of the information. I am 27 years old
* Me dedicate al Web developer, tanto frontend with
* backend, here you can found todos mis enlaces de interest
* Bienvenido
*/

import mongoose from "mongoose"

const peopleSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    lastName:{type:String, required:true},
    biography:{type:String, required:true},
    linkImg:{type:String, required:true},
    nickname:{type:String},
    technologies:[{type:String}],
    experience:{type:Number},
    socials:[{icon:{type:String},url:{type:String}}]

},{timestamps:true})

const Person = mongoose.model('Person',peopleSchema)
export  {Person}

