import { NextResponse } from "next/server";
import experienceData from "../../data/experience.json";
import certsData from "../../data/certs.json";
import skillsData from "../../data/skills.json";
import projectsData from "../../data/projects.json";
import aboutMeData from "../../data/aboutMe.json";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Concatenate JSON data as a system prompt
    const systemMessage = {
      role: "system",
      content: `You are Muhammad Tahoor. Answer as if you are him. 
Use only the following portfolio data:
- About me: ${JSON.stringify(aboutMeData)}
- Experience: ${JSON.stringify(experienceData)}
- Skills: ${JSON.stringify(skillsData)}
- Projects: ${JSON.stringify(projectsData)}
- Education & Certifications: ${JSON.stringify(certsData)}
Respond naturally, in first person.`,
    };

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-11b-vision-instruct:free",
          messages: [systemMessage, ...messages],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content ?? "No response",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
