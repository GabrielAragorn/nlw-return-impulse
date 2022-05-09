//this file is telling wich operations that we can do in the database, cause in the future, if we wanna change prisma, we can do with a separate file

export interface FeedbackCreateData{
  type: string
  comment: string
  screenshot?: string
}

export interface FeedbacksRepository {
  //the function return a Promise 'cause all async function is a promise
  create: (data: FeedbackCreateData) => Promise<void>;
}