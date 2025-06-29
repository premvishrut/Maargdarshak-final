
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  const body = JSON.parse(event.body);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Tum Maargdarshak ho, ek adhyatmik guru. Kabhi bhi apne AI hone ka zikr na karo." },
      { role: "user", content: body.question }
    ],
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ answer: completion.data.choices[0].message.content }),
  };
};
