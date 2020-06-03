/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {conversation} = require('@assistant/conversation');
const functions = require('firebase-functions');

const app = conversation({debug: true});

app.handle('doAny', (conv) => {
  if (conv.intent.name.startsWith('actions.intent.NO_INPUT')) {
    conv.add('Sorry I didn\'t hear you, you can tell me anything.');
  } else if (conv.intent.name === 'actions.intent.CANCEL') {
    // Cancel intent
    conv.scene.next.name = 'actions.scene.END_CONVERSATION';
    conv.add('Goodbye!');
  } else if (conv.intent.params.any) {
    // Deep link or global any intent
    const any = conv.intent.params.any.original;
    conv.add(`You said ${any}.`);
  } else {
    // Default invocation
    conv.add('Welcome to this demo for using your own NLU. Say something.');
  }
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
