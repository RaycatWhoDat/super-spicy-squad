import { prologueScene } from './prologue';
import { titleScene } from './title';
import { puzzleScene } from './puzzle';
import { dialogueScene } from './dialogue';

const allScenes = {
  prologueScene,
  titleScene,
  puzzleScene,
  dialogueScene
};

export const registerScenes = () => Object.keys(allScenes).forEach(sceneName => allScenes[sceneName]());

export default allScenes;
