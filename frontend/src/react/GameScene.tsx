/** @jsxImportSource react */
import React from 'react'
import { MachineContext } from './ReactApp';

const GameScene: React.FC = () => {
  const actorRef = MachineContext.useActorRef();

  return (
    <>
      <h1>ゲーム画面</h1>
      <button onClick={() => actorRef.send({ type: 'GOTO_GAMECLEAR_SCENE' })}>
        ゲームクリア
      </button>
    </>
  )
}

export default GameScene
