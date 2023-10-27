/**
 * @title cat_or_dog
 * @description a simple experiment for participants to judge whether an image is a cat or a dog
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import ImageKeyboardResponsePlugin from "@jspsych/plugin-image-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";


/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  const jsPsych = initJsPsych();

  const timeline = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
  });

  // Welcome screen
  // timeline.push({
  //   type: HtmlKeyboardResponsePlugin,
  //   stimulus: "<p>Welcome to cat_or_dog!<p/>",
  // });

  var trial1 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>Welcome to cat_or_dog!<p/>",
  }
  timeline.push(trial1);

  // Switch to fullscreen
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });


  var trial3 = {
    type: ImageKeyboardResponsePlugin,
    stimulus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/440px-Cat_November_2010-1a.jpg',
    choices: "NO_KEYS",
    prompt: "<p>Study this cat face for 2 seconds.</p>",
    trial_duration: 2000
  };
  timeline.push(trial3);

  var trial4 = {
    type: ImageKeyboardResponsePlugin,
    stimulus: 'https://i.pinimg.com/564x/9c/a7/ef/9ca7ef81f546b7133267b94e48bf8ab2.jpg',
    choices: "NO_KEYS",
    prompt: "<p>Study this dog face for 2 seconds.</p>",
    trial_duration: 2000
  };
  timeline.push(trial4);

  var trial5 = {
    type: ImageKeyboardResponsePlugin,
    stimulus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/440px-Cat_November_2010-1a.jpg',
    choices: ['c', 'd'],
    prompt: "<p>Is this a cat or a dog? Press 'c' for cat and 'd' for dog.</p>",
  };
  timeline.push(trial5);


  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
