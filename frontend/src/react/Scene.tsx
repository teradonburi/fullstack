/** @jsxImportSource react */
import TitleScene from "./TitleScene";
import GameClearScene from "./GameClearScene";
import GameScene from "./GameScene";
import { MachineContext } from "./ReactApp";

export default function Scene() {
  const state = MachineContext.useSelector((state) => state);
  switch (state.value) {
    case 'titleScene':
      return <TitleScene />
    case 'gameScene':
      return <GameScene />
    case 'gameClearScene':
      return <GameClearScene />
    default:
      return null
  }
}