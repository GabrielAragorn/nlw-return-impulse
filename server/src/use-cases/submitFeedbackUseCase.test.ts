// test('sum 2 + 2', () => {
//   expect(2 + 2).toBe(4)
// })
import { SubmitFeedbackUseCase } from "./submitFeedbackUseCases"

//creating spy functions with jest to verify if the sendEmail function and createFeedback is being called
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  //the dependeces of feddback (database and send email) are mocked, 'cause we don't want to test them, just the use case, the function 
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example commment',
      screenshot: 'data:image/png;base64,8128128128281dsadsadas',
      //below we expect that this use case doesn't bring an error
    })).resolves.not.toThrow()

    //expecting that the functions are being called
    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })
})

it('should not be able to submit a feedback without a type', async () => {
  await expect(submitFeedback.execute({
    type: '',
    comment: 'example commment',
    screenshot: 'data:image/png;base64,8128128128281dsadsadas',
    //below we expect that this use case doesn't bring an error
  })).rejects.toThrow()
})

it('should not be able to submit a feedback without a comment', async () => {
  await expect(submitFeedback.execute({
    type: 'OTHER',
    comment: '',
    screenshot: 'data:image/png;base64,8128128128281dsadsadas',
    //below we expect that this use case doesn't bring an error
  })).rejects.toThrow()
})

it('should not be able to submit a feedback with an invalid screenshot', async () => {
  await expect(submitFeedback.execute({
    type: 'OTHER',
    comment: 'Keep going on',
    screenshot: 'img.png',
    //below we expect that this use case doesn't bring an error
  })).rejects.toThrow()
})