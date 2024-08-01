// import * as React from "react";
// import { Dayjs } from "dayjs";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import AddIcon from "@mui/icons-material/Add";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// // Define the Task interface
// interface Task {
//   title: string;
//   description: string;
//   startDate: Dayjs | null;
//   finishDate: Dayjs | null;
//   isFinished: boolean;
// }

// // Define the TaskForm component props
// interface TaskFormProps {
//   selectedDate: Dayjs | null;
//   tasks: Task[];
//   addTask: (task: Task) => void;
// }

// // TaskForm component
// const Tasks: React.FC<TaskFormProps> = ({ selectedDate, tasks, addTask }) => {
//   const [title, setTitle] = React.useState("");
//   const [description, setDescription] = React.useState("");
//   const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
//   const [finishDate, setFinishDate] = React.useState<Dayjs | null>(null);
//   const [isFinished, setIsFinished] = React.useState(false);
//   const [isFormVisible, setIsFormVisible] = React.useState(false);

//   // Handle form submission
//   const handleSubmit = () => {
//     if (title && startDate && finishDate) {
//       addTask({ title, description, startDate, finishDate, isFinished });
//       setTitle("");
//       setDescription("");
//       setStartDate(null);
//       setFinishDate(null);
//       setIsFinished(false);
//       setIsFormVisible(false); // Hide form after submission
//     }
//   };

//   // Filter tasks for the selected date
//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.startDate &&
//       selectedDate &&
//       task.startDate.isSame(selectedDate, "day")
//   );

//   return (
//     <Box sx={{ p: 2 }}>
//       {isFormVisible ? (
//         <Box>
//           <Typography variant="h6">Add Task</Typography>
//           <TextField
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Start Date"
//               value={startDate}
//               onChange={(date: Dayjs | null) => setStartDate(date)}
//               // renderInput={(params) => (
//                 // <TextField {...params} margin="normal" fullWidth />
//               // )}
//             />
//             <DatePicker
//               label="Finish Date"
//               value={finishDate}
//               onChange={(date: Dayjs | null) => setFinishDate(date)}
//               // renderInput={(params) => (
//               //   <TextField {...params} margin="normal" fullWidth />
//               // )}
//             />
//           </LocalizationProvider>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={isFinished}
//                 onChange={(e) => setIsFinished(e.target.checked)}
//               />
//             }
//             label="Finished"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             sx={{ mt: 2 }}
//           >
//             Add Task
//           </Button>
//         </Box>
//       ) : (
//         <IconButton color="primary" onClick={() => setIsFormVisible(true)}>
//           <AddIcon />
//         </IconButton>
//       )}

//       {/* Display tasks for the selected date */}
//       {filteredTasks.length > 0 && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">
//             Tasks for {selectedDate?.format("DD/MM/YYYY")}
//           </Typography>
//           {filteredTasks.map((task, index) => (
//             <Box key={index} sx={{ mb: 1 }}>
//               <Typography variant="body1">{task.title}</Typography>
//               <Typography variant="body2">{task.description}</Typography>
//               <Typography variant="body2">
//                 {task.startDate?.format("DD/MM/YYYY")} -{" "}
//                 {task.finishDate?.format("DD/MM/YYYY")}
//               </Typography>
//               <Typography variant="body2">
//                 Status: {task.isFinished ? "Completed" : "Incomplete"}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Tasks;
