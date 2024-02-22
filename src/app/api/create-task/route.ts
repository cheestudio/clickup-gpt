import { NextResponse, NextRequest } from "next/server";


function convertToUnixTimestamp(dateString: string) {
  return new Date(dateString).getTime();
}

export async function POST(request: NextRequest) {

  const data = await request.json();

  try {
    console.log(data);
    let assignee;
    const listId = data.taskResponse.listId;
    const due_date = data.taskResponse.due_date;
    if(listId === '901401517250'){
      assignee = 75419250;      
    }
    else {
      assignee = 82265936;
    }
    const billable = data.taskResponse.tags;
    const client = data.taskResponse.client_name ? data.taskResponse.client_name.id : 3;
    const priority = data.taskResponse.priority ? data.taskResponse.priority.id : 2;
    const description = data.taskResponse.task_description;

    const clickupResponse = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.CLICKUP_KEY}`
      },
      body: JSON.stringify({
        name: description,
        due_date: convertToUnixTimestamp(due_date),
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

