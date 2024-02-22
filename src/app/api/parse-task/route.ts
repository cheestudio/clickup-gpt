import { NextResponse, NextRequest } from "next/server";
import moment from 'moment-timezone';

export async function POST(request: NextRequest) {
  try {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = moment().tz(userTimeZone).format('YYYY-MM-DD');
    const prompt = await request.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Given the following task description in natural language - "${prompt.taskDescription}": output the details in JSON format: Task description, client name: Waltz[0], MAC[1], Pivot[2], Chee[3], due_date in YYYY-MM-DD format, assignee: Matt(82265936), Jenica(82266508) or Lars(75419250), and priority: Urgent(1), High(2), Normal (3), Low(4). For properly setting the date, today's date is ${currentDate}. Make sure the JSON format always matches the following example:{ "task_description": "sign up for clickup", "due_date": "2024-02-29", "assignee": { "name": "Lars", "id": 75419250 }, "priority": { "level": "High", "id": 2 }"client_name": { "name": "MAC", "id": 1 } }.`
          },
          {
            role: "user",
            content: prompt.taskDescription
          }
        ],
        max_tokens: 100,
      })
    });

    const data = await response.json();
    return NextResponse.json(data);

  }
  catch (error) {
    return NextResponse.json(error);
  }
}

