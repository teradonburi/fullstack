/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { createActorContext } from '@xstate/react';
import { gameStateMachine } from './gameStateMachine';
import Scene from './Scene';

export const MachineContext = createActorContext(gameStateMachine);

 
// Create React component standard way
function App() {
  return (
    <MachineContext.Provider>
      <Scene />
    </MachineContext.Provider>
  );
}
 
// Specify eagerness to hydrate component on hover event.
export const ReactApp = qwikify$(App, { eagerness: 'visible' });