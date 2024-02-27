import { NextResponse, NextRequest } from "next/server";
import moment from 'moment-timezone';

export async function POST(request: NextRequest) {
  try {
    
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = moment().tz(userTimeZone).format('YYYY-MM-DD');

    const prompt = await request.json();
    console.log('prompt',prompt);

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
            content: `Given the following task description in natural language - "${prompt}": Go step by step, parse the task details and output the details in JSON format. task_title, client_name: Waltz[0], MAC[1], Pivot[2], Chee[3], due_date: day mentioned in task description, assignee: Matt(82265936), Jenica(82266508) or Lars(75419250), and priority: Urgent(1), High(2), Normal (3), Low(4). If no priority is set, set it to Normal. If no Client is set, set it to Chee.  If the keyword "billable" is present, assign the "billable" tag. All dates must be set in the YYYY-MM-DD format. Make sure future dates are set accurately within the current year and month based on the current date of ${currentDate}. Make sure the JSON format always matches the following example exactly:{ "task_title": "sign up for clickup", "due_date": YYYY-MM-DD, "assignee": { "name": "Lars", "id": 75419250 }, "tags": ["billable"], "priority": { "level": "High", "id": 2 }, "client_name": { "name": "Chee", "id": 3 } }.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0
      })
    });
    const data = await response.json();
    console.log('GPT Data', data.choices[0].message.content);
    return NextResponse.json(data);

  }
  catch (error) {
    return NextResponse.json(error);
  }
}

