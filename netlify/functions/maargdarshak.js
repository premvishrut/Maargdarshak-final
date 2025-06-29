const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const question = body.question;

  if (!question) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No question provided" }),
    };
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    console.error("OpenAI error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
