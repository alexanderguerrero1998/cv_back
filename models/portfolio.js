/*
* Portfolio:
* name                 (text,obligate),
* category             (text,obligate),
* shortDescription     (text,obligate),
* generalDescription   (text,obligate),
* technologies         (text,obligate),
* linkRepository       (text,obligate),
* icon                 (text,no obligate),
* linkVideo            (text,obligate),
* date                 (date,obligate),
* */

/*
* Dev Links
* Category: Bookmark Manager
* It's an application that allows you to register a link from all
* my learnings with web developers, has with:
* - CRUD option for categories according to the type of link, for example, if the link
* associated is about a frontend programming theme, a category is created for that link
* - Option to filter by categories
**
* This application uses technologies such as:
* - Express to create the application server
* - Render for hosting and deploying the server
* - GitHub Pages for hosting the frontend
* - MongoDB for data persistence
* link_de_repositorio
* */

import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true },
    category:{type:String,  enum:['Frontend','Backend','Fullstack','Mobile'],required:true},
    shortDescription:{type:String, required:true},
    generalDescription:{type:String, required:true},
    technologies:[{type:String}],
    linkRepository:{type:String, required:true},
    icon:{type:String},
    linkVideo:{type:String}
},{timestamps:true})

const Portfolio = mongoose.model('Portfolio',portfolioSchema)
export {Portfolio}
