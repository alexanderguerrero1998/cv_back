import { Router } from 'express'
import { Education } from '../models/education.js' 
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const api = Router()



api.get('/',async function (request,response,next){
    try {
        const educations = await Education.find()
        if(educations.length === 0){
            response.status(400).json({message:"No person found"})
        } else {
            response.status(200).json(educations)
        }
    }catch (error){
        next(error)
    }
}) 

api.get('/:id',async function(request, response, next){
    try{
        const education = await Education.findById(request.params.id)
        if(!education){
            response.status(404).json({message:'Not found education with id'})
            return
        } 
        response.status(200).json(education)
        
    } catch(error){
        next(e)
    }
})

api.post('/', isAuthenticated, async function(request, response, next) {
    try {
        const education = new Education(request.body)
        const saved = await education.save()
        response.status(201).json(saved)
    } catch (e) {
        next(e)
    }

})

api.put('/:id',isAuthenticated, async function (request, response, next) {
    try {
        const education = await Education.findByIdAndUpdate(
            request.params.id,
            request.body,
            {returnDocument: 'after'})

        if (!education) {
            response.status(404).json({message: 'Education not found'})
            return
        }
        response.json(education)

    } catch (e) {
        next(e)
    }
})

api.delete('/:id',isAuthenticated, async function (request, response,next) {
    try {
        const education = await Education.findByIdAndDelete(request.params.id)
        if(!education) {
            response.status(404).json({message: 'Person deleted' })
            return
        }
        response.json({ message: 'Person deleted' })

    } catch (e) {
        next(e)
    }
})


api.use(function (request,response,next){
    response.status(404).json({message:'Resource no found education!'})
})

export {api}