import { NextResponse, NextRequest } from "next/server";
import moment from 'moment-timezone';

export async function POST(request: NextRequest) {

  const data = await request.json();

  function convertDateToUnixTimestamp(dateString:string, timezone:string = 'UTC') {
    return moment.tz(dateString, "YYYY-MM-DD", timezone).valueOf();
  }

  try {
    let assignee;
    const listId = data.taskResponse.listId;
    if(listId === '901413637846'){
      assignee = 75419250;      
    }
    else {
      assignee = 82265936;
    }
    const due_date = data.taskResponse.due_date;
    const userTimeZone = data.taskResponse.userTimeZone;
    const billable = data.taskResponse.tags;
    const description = data.taskResponse.description;
    const client = data.taskResponse.client_name ? data.taskResponse.client_name.id : 3;
    const priority = data.taskResponse.priority ? data.taskResponse.priority.id : 2;
    const title = data.taskResponse.task_title;
    const clickupResponse = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.CLICKUP_KEY}`
      },
      body: JSON.stringify({
        name: title,
        description: description,
        due_date: convertDateToUnixTimestamp(due_date, userTimeZone),
        priority: priority,
        assignees: [assignee],
        tags: billable,
        custom_fields: [
          {
            id: '894c38e2-dea5-4356-9cb8-89978cab8ce9',
            value: client
          }
        ]
      })
    });
    const clickupData = await clickupResponse.json();
    return NextResponse.json(clickupData);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

