import express from 'express'
import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCases'
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbacksRepository'
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodeMailerMailAdapter'

export const routes = express.Router()

//feedback route
routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodeMailerMailAdapter = new NodeMailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository, nodeMailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type, 
    comment,
    screenshot
  })
  
  //201 is a creation status
  return res.status(201).send()
})