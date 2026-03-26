const generateOutfit = async () => {
  setLoadingAI(true);

  try {
    const history = JSON.parse(localStorage.getItem("taste")) || [];

    // 🔹 1. Generate outfit TEXT
    const textRes = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `
Return ONLY JSON:

{
  "outfit": "",
  "image_prompt": ""
}

Product: ${product.name}
Category: ${product.category || "fashion"}
User taste: ${history.join(", ")}

Make image_prompt detailed for AI image generation.
          `,
        },
      ],
    });

    const text = textRes.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    // 🔹 2. Generate IMAGE
    const imageRes = await client.images.generate({
      model: "gpt-image-1",
      prompt: parsed.image_prompt,
      size: "512x512",
    });

    const imageUrl = imageRes.data[0].url;

    // 🔹 3. Save both
    setOutfit({
      text: parsed.outfit,
      image: imageUrl,
    });

  } catch (err) {
    console.error(err);
    alert("AI failed 😢");
  } finally {
    setLoadingAI(false);
  }
};