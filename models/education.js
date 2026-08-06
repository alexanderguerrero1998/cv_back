/*
* Education:
* name            (text, obligate),
* degree          (text, obligate),
* duration        (text, obligate),
* educationType            (text, obligate),
* Description     (text, obligate),
* icon            (text,no obligate),
* linkDownload    (text, obligate),
* date            (date, obligate),
* */

/*
* University National de Chimborazo
* Engineer en technologies de la information
* 20xx - 20xxx | University
* Studied this carrier en Ecuador during 4 years
* I came engineer en technologies og the information, I get
* los fundamentals para el develop de applications web y en general,
* linkDownload
* */

import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    name:{type:String, unique:true, required:true},
    degree:{type:String, required:true},
    duration:{type:String, required:true},
    educationType:{type:String, required:true},
    description:{type:String, required:true},
    icon:{type:String},
    linkDownload:{type:String, required:true}
},{timestamps:true})

const Education = mongoose.model("Education",educationSchema)
export {Education}
