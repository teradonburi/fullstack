import { createMachine } from 'xstate'

export const gameStateMachine = createMachine({
  id: 'gameStateMachine',
  context: {},
  initial: 'titleScene',
  states: {
    titleScene: {
      on: {
        GOTO_GAME_SCENE: 'gameScene',
      },
    },
    gameScene: {
      after: {
        3000: { target: 'titleScene' },
      },
      on: {
        GOTO_GAMECLEAR_SCENE: 'gameClearScene',
      },
    },
    gameClearScene: {
      on: {
        GOTO_GAMECLEAR_SCENE: 'titleScene',
      },
    },
  },
})
