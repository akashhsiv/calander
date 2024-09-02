import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchReminders } from "./../features/reminders/remindersActions";
import { AppDispatch, RootState } from "../app/store";
import { Card, CardContent, Typography, Grid, Stack } from "@mui/material";
import { categoryIcons } from "../Constants";

export const AllReminders = () => {
  const dispatch: AppDispatch = useDispatch();
  const reminders = useSelector(
    (state: RootState) => state.reminders.reminders
  );

  useEffect(() => {
    if (!reminders.length) {
      dispatch(fetchReminders());
    }
  }, [dispatch, reminders]);

  return (
    <div>
      <Typography mb={3} variant="h4" component="h2" gutterBottom>
        All Reminders
      </Typography>
      <Grid container spacing={3}>
        {reminders.map((reminder) => (
          <Grid item xs={12} sm={6} md={4} key={reminder.id}>
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
                  {reminder.content}
                </Typography>
                <Stack direction={"row"} gap={2} >
                  {categoryIcons[reminder.category]}

                  <Typography variant="body1" gutterBottom>
                    {reminder.category}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="textSecondary">
                  {reminder.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllReminders;
