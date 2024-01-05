/** @jsxImportSource react */
import React from 'react'
import { MachineContext } from './ReactApp';

const TitleScene: React.FC = () => {
  const actorRef = MachineContext.useActorRef();

  return (
    <>
      <h1>タイトル画面</h1>
      <button onClick={() => actorRef.send({ type: 'GOTO_GAME_SCENE' })}>
        ゲーム開始
      </button>
    </>
  )
}

export default TitleScene
