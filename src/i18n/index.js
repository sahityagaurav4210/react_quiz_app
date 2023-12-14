const $TXT = Object.freeze({
  EN: Object.freeze({
    HEADING: Object.freeze({
      APP: 'Setup Quiz',
      CONGRATS: 'congrats!',
      RESLUTS: 'You answered %age of the questions correctly'
    }),
    FORM: Object.freeze({
      LABLES: Object.freeze({
        QUESTIONS: 'number of questions',
        DIFFICULTY: 'select difficulty',
        CATEGORY: 'category'
      }),
      INPUTS: Object.freeze({
        QUESTIONS: 'Ex: 10'
      }),
      SELECTS: Object.freeze({
        DIFFICULTY: Object.freeze({
          EASY: 'easy',
          MEDIUM: 'medium',
          HARD: 'hard'
        }),
        CATEGORY: Object.freeze({
          SPORTS: 'sports',
          HISTORY: 'history',
          POLITICS: 'politics'
        })
      }),
      BUTTONS: Object.freeze({
        START: 'Start',
        NEXT: 'Next Question',
        PLAY: 'Play Again'
      })
    }),
    ERRORS: Object.freeze({
      FORM: Object.freeze({
        API: `Can't Generate Questions, Please Try Different Options`
      })
    })
  })
});

export default $TXT;