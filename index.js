require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "",
  token: process.env.SLACK_BOT_TOKEN || "",
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomize(payloadArray) {
  return shuffle(payloadArray);
}

function organize(payload) {
  return payload.split(" ");
}

function validate(payload) {
  if (typeof payload === "string") {
    return payload;
  } else {
    throw new Error("Payload not a space-separated string");
  }
}

function prettify(payloadArray) {
  return `Date: ${Date()}\nNames:\n${payloadArray
    .map((item, index) => `${index + 1}. ${item}\n`)
    .join("")}`;
}

app.command("/daily", async ({ payload, ack, say, respond }) => {
  say(prettify(randomize(organize(validate(payload.text)))));
  ack();
});

(async () => {
  await app.start(process.env.PORT || 8000);
  console.log("⚡️ Bolt app is running!");
})();
