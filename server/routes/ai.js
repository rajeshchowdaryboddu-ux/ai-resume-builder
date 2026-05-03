const router = require("express").Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  try {
    console.log("AI route hit"); // DEBUG

    const { name, skills, education, experience, job } = req.body;

    const prompt = `
You are a professional resume writer. Create a polished, ATS-optimized resume in clean Markdown format.

STRICT FORMATTING RULES:
- Use # (H1) ONLY for the person's full name at the very top
- Use ## (H2) for each section heading: Professional Summary, Skills, Experience, Education
- Use ### (H3) for job titles or degree names
- Use bullet points (- ) for listing skills, achievements, and responsibilities
- Use **bold** for company names, dates, universities
- Use > blockquote for the professional summary paragraph
- Keep it concise, professional, and impactful with action verbs
- Do NOT use any decorative characters, emojis, or ASCII art
- Write 3-5 bullet points per experience entry with quantified achievements

CANDIDATE INFORMATION:
Name: ${name}
Skills: ${skills}
Education: ${education}
Experience: ${experience}
Target Job: ${job}

Generate the resume now in Markdown:
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("AI generation successful!");
    res.json({ result: text });

  } catch (err) {
    console.error(err); // VERY IMPORTANT
    res.status(500).send("AI Error");
  }
});

module.exports = router;