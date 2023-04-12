import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'setup-questions' })
export class SetupQuestions {
  @Question({
    message: 'What OMDB token do you want to use?',
    name: 'token',
    validate: (token) => token.length > 0,
  })
  parseToken(val: string) {
    return val;
  }
}
