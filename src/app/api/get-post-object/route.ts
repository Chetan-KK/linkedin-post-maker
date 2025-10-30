import { NextRequest, NextResponse } from "next/server";

// Mock response generator
function generateMockResponse(topic: string): string {
  const mockPost = {
    title: `Mastering ${topic}: A Professional Guide`,
    description: `🚀 ${topic} is becoming increasingly important in today's professional landscape. Here are key insights and practical tips to help you excel in this area and advance your career.`,
    hashtags: [
      `#${topic.replace(/\s+/g, '')}`,
      "#ProfessionalDevelopment",
      "#CareerGrowth",
      "#Skills",
      "#Learning",
      "#Technology",
      "#Innovation",
      "#Success"
    ],
    content: [
      {
        name: `Getting Started with ${topic}`,
        description: `📈 Understanding the fundamentals of ${topic} is crucial for building expertise. Start with the basics and gradually work your way up to more advanced concepts.`,
        codeLang: "",
        code: ""
      },
      {
        name: `Best Practices and Tips`,
        description: `💡 Apply these proven strategies to improve your skills in ${topic}. Focus on practical implementation and real-world applications.`,
        codeLang: "",
        code: ""
      },
      {
        name: `Advanced Techniques`,
        description: `🎯 Once you've mastered the basics, explore these advanced approaches to ${topic}. These techniques will help differentiate you from others in your field.`,
        codeLang: "",
        code: ""
      }
    ]
  };
  
  return JSON.stringify(mockPost, null, 2);
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // For now, return a mock response based on the topic to ensure functionality
    const mockResponse = generateMockResponse(topic);

    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(new TextEncoder().encode(mockResponse));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}