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


  const trial1 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>Welcome to cat_or_dog!<p/>",
  }
  timeline.push(trial1);

  // Switch to fullscreen
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });


  const trial3 = {
    type: ImageKeyboardResponsePlugin,
    stimulus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/440px-Cat_November_2010-1a.jpg',
    choices: "NO_KEYS",
    prompt: "<p>Study this cat face for 1 second.</p>",
    trial_duration: 1000
  };
  timeline.push(trial3);

  const trial4 = {
    type: ImageKeyboardResponsePlugin,
    stimulus: 'https://i.pinimg.com/564x/9c/a7/ef/9ca7ef81f546b7133267b94e48bf8ab2.jpg',
    choices: "NO_KEYS",
    prompt: "<p>Study this dog face for 1 second.</p>",
    trial_duration: 1000
  };
  timeline.push(trial4);

  const stimulusUrls = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/440px-Cat_November_2010-1a.jpg',
    'https://i.pinimg.com/564x/9c/a7/ef/9ca7ef81f546b7133267b94e48bf8ab2.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/440px-Cat_November_2010-1a.jpg',
    // Add more stimulus URLs as needed
  ];
  const correctAnswer = ['c','d','c',]


  let consecutive_not_responding = 0;
  let correctCount = 0;
  const on_finish_function = function(data) {
    if (data.rt == null) {
      consecutive_not_responding++;
      alert('You did not respond within 1 second.');

      if (consecutive_not_responding >= 2) {
        jsPsych.endExperiment('Participant did not respond for two consecutive trials.');
      }
    } else {
      consecutive_not_responding = 0;
    }

  };

  for (let i = 0; i < stimulusUrls.length; i++) {
    const trial = {
      type: ImageKeyboardResponsePlugin,
      stimulus: stimulusUrls[i],
      choices: ['c', 'd'],
      data: {
        correct_answer: correctAnswer[i]
      },
      prompt: "<p>Is this a cat or a dog? Press 'c' for cat and 'd' for dog.</p>",
      trial_duration: 5000,
      on_finish: function(data) {
        let lastTrialData = jsPsych.data.get().last(1).values()[0];
        let userResponse = lastTrialData.response;
        if (userResponse === correctAnswer[i]) {
          correctCount++;
        }
        on_finish_function(data);
      },

    };
    timeline.push(trial);
  }


// End of experiment screen
  const end_screen = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>  End of experiment. Exporting data...</p> ",

  };

  timeline.push(end_screen);

  await jsPsych.run(timeline);

  // if you handle results yourself, be it here or in `on_finish()`)
  console.log(correctCount);
  return jsPsych;
}