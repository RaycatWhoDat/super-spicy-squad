import { prologueScene } from './prologue';
import { titleScene } from './title';
import { puzzleScene } from './puzzle';
import { dialogueScene } from './dialogue';
import { creditsScene } from './credits';
import { episodeCardScene } from './episode-card';

const allScenes = {
  prologueScene,
  titleScene,
  puzzleScene,
  dialogueScene,
  creditsScene,
  episodeCardScene
};

export const registerScenes = () => Object.keys(allScenes).forEach(sceneName => allScenes[sceneName]());

export default allScenes;
