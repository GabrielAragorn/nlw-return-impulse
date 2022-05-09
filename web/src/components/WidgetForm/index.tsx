import { useState } from "react";

import bugImageUrl from '../../assets/images/bug.svg'
import ideaImageUrl from '../../assets/images/idea.svg'
import thoughtImageUrl from '../../assets/images/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSucessStep";


export const feedbackTypes = {
  BUG: {
    title: 'Bug',
    image: {
      source: bugImageUrl,
      alt: 'Image of a insect/bug'
    }
  },
  IDEA: {
    title: 'Idea',
    image: {
      source: ideaImageUrl,
      alt: 'Image of a lamp'
    }
  },
  OTHER: {
    title: 'Other',
    image: {
      source: thoughtImageUrl,
      alt: 'Image of a thought ballon'
    }
  }
}

//selecting one of the keys of feedback Types, like 'BUG',
//'IDEA' and 'OTHER'
export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  //states
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {/* if feedback has been sent, show success, if not, proceed with flow*/}
      { feedbackSent ? (
        <FeedbackSuccessStep 
          onFeedbackRestartRequested={handleRestartFeedback} 
        />
      ) : (
        <>
          {/* if feedback is not selected, show the form, if yes, show the content to select the type of form that will be sent */} 
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )} 
        </>
      ) } 

      <footer className="text-xs text-neutral-400">
        Made with ♥ by <a className="underline underline-offset-2" target='_blank' href="https://github.com/GabrielAragorn">GabrielAragorn</a>
      </footer>
    </div>
  )
}