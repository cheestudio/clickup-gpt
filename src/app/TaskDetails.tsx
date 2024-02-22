// TaskDetails.js or TaskDetails.tsx if using TypeScript
const TaskDetails = ({ taskResponse, listId }) => (
  <div className="space-y-2 columns-2">
    <p><strong>Task Description:</strong> {taskResponse?.task_description}</p>
    <p><strong>Due Date:</strong> {taskResponse?.due_date}</p>
    <p><strong>Priority:</strong> {taskResponse?.priority?.id}</p>
    <p><strong>Assignee:</strong> {taskResponse?.assignee?.id}</p>
    <p><strong>Client:</strong> {taskResponse?.client_name?.name}</p>
    <p><strong>List:</strong> {listId === "901401517250" ? "Lars" : "Matt"}</p>
  </div>
);

export default TaskDetails;
