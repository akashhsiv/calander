import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotes } from "./../features/notes/notesActions";
import { AppDispatch, RootState } from "../app/store";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import BottomAppBar from "../RespNavBar";

export const AllNotes = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);

  useEffect(() => {
    if (!notes) {
      dispatch(fetchNotes()); 
    }
  }, [dispatch, notes]);


   return (
     <div>
       <Typography mb={3} variant="h4" component="h2" gutterBottom>
         All Notes
       </Typography>
       <Grid container spacing={3}>
         {notes.map((note) => (
           <Grid item xs={12} sm={6} md={4} key={note.id}>
             <Card
               sx={{
                 bgcolor: "background.paper",
                 boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.3)`,
                 borderRadius: "8px",
                 m: 2,
               }}
             >
               <CardContent>
                 <Typography variant="h6" gutterBottom>
                   {note.content}
                 </Typography>
                 <Typography variant="body2" color="textSecondary">
                   {note.date}
                 </Typography>
               </CardContent>
             </Card>
           </Grid>
         ))}
       </Grid>
       <BottomAppBar />
     </div>
   );
};

export default AllNotes;
