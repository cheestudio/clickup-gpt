import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import moment from "moment-timezone";

function formatDateWithMoment(dateString) {
  return moment(dateString).format('M/D/YYYY');
}

const TaskDetails = ({ taskResponse, listId }) => (
  <Table aria-label="Task Details">
    <TableHeader>
      <TableColumn>Title</TableColumn>
      <TableColumn>Priority</TableColumn>
      <TableColumn>Due Date</TableColumn>
      <TableColumn>Client</TableColumn>
      <TableColumn>Assignee</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>{taskResponse?.task_title}</TableCell>
        <TableCell>{taskResponse?.priority?.level}</TableCell>
        <TableCell>{moment(taskResponse?.due_date).format('M/D/YYYY')}</TableCell>
        <TableCell>{taskResponse?.client_name?.name}</TableCell>
        <TableCell>{listId === "901401517250" ? "Lars" : "Matt"}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default TaskDetails;
