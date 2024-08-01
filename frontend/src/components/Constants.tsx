export const CalanderStyles = {
    boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)`,
    "& .MuiPickersDay-dayWithMargin": {
      // Grows width/height of day buttons
      width: "calc(100% - 4px)",
      height: "calc(100% - 4px)",
      aspectRatio: "1",
      // height: 'auto',

      fontSize: "1.0em",
    },

    "& .MuiBadge-root": {
      // Parent of button management
      aspectRatio: 1,
      width: "10%",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
    },

    "& .MuiDayCalendar-weekDayLabel": {
      // Manages size of weekday labels
      aspectRatio: 1,
      width: "calc(10% - 4px)", // deals with margin
      fontSize: "1.0em",
    },

    "& .MuiPickersCalendarHeader-label": {
      // Manages month/year size
      fontSize: "1.3em",
    },
    "& .MuiDayCalendar-monthContainer": {
      // Not sure if needed, currently works tho
      width: "100%",
    },

    "& .MuiDayCalendar-slideTransition": {
      // Handles size of week row parent, 1.6 aspect is good for now
      aspectRatio: 1.6,
      width: "200",
      height: "200%",
      overflow: "hidden",
    },
    "& .MuiDayCalendar-loadingContainer": {
      width: "100%",
      aspectRatio: 1.6,
    },

    width: "60%",
    height: "550px",
    maxHeight: "550px",
    margin: 0,
    mx: 4,

  "& .MuiPickersDay-root": {
    width: "25px",
    height: "25px",
  },
}