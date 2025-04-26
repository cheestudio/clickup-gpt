import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    const prompt = response.taskInfo;
    const currentDate = response.currentDate;
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY as string,
    });
    
    const messageResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      system: `Given the following task description in natural language - "${prompt}": Go step by step, parse the task details and output the details in JSON format. task_title, client_name: Waltz[0], MAC[1], Pivot[2], Chee[3], due_date: day mentioned in task description, assignee: Matt(82265936), Jenica(82266508) or Lars(75419250), and priority: Urgent(1), High(2), Normal (3), Low(4). If no priority is set, set it to Normal. If no Client is set, set it to Chee.  If the keyword "billable" is present, assign the "billable" tag. All dates must be set in the YYYY-MM-DD format. Make sure future dates are set accurately within the current year and month based on the current date of ${currentDate}. Return ONLY JSON FORMAT, no other response. Make sure the JSON format always matches the following example exactly:{ "task_title": "sign up for clickup", "due_date": YYYY-MM-DD, "assignee": { "name": "Lars", "id": 75419250 }, "tags": ["billable"], "priority": { "level": "High", "id": 2 }, "client_name": { "name": "Chee", "id": 3 } }.`,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0,
    });
    console.log(messageResponse);
    return NextResponse.json(messageResponse);
  }
  catch (error) {
    return NextResponse.json(error);
  }
}

