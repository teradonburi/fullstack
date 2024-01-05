/** @jsxImportSource react */
import React from 'react'
import { MachineContext } from './ReactApp';

const GameClearScene: React.FC = () => {
  const actorRef = MachineContext.useActorRef();

  return (
    <>
      <h1>ゲームクリア画面</h1>
      <button onClick={() => actorRef.send({ type: 'GOTO_GAMECLEAR_SCENE' })}>
        ゲームタイトル
      </button>
    </>
  )
}

export default GameClearScene
