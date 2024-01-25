import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function generateImage() {
  try {
    const response = await openai.createImage({
      prompt:
        "A beautiful, landscape during the day with partly cloudy weather conditions. The scene features twinkling lights from cozy cottages, a pond with people watching the fish, and beautiful trees.",
      n: 1,
      size: "1024x1024",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
