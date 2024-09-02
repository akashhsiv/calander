
import BillIcon from "@mui/icons-material/AttachMoney";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";


export const stStyle = {
    fontWeight: 500,
    fontFamily: 'outfit',
    fontSize: '0.8rem',
    color: `rgb(99, 115, 129)`,
    // letterSpacing: '-0.5px',
    lineHeight: 1.5
};

export const categoryIcons: Record<string, React.ReactNode> = {
  Birthday: <CakeOutlinedIcon />,
  Interview: <WorkOutlineOutlinedIcon />,
  Meeting: <CalendarMonthOutlinedIcon />,
  Bill: <BillIcon />,
  Event: <CelebrationOutlinedIcon />,
};


export const ptStyle = {
  bgcolor: "transparent",
  fontWeight: "500",
  lineHeight: 1.5,
  textTransform: "uppercase",
  p: 0,
  fontSize: "15px",
  listStyle: "none",
  boxSizing: "border-box",
  writingMode: "vertical-lr",
  textOrientation: "upright",

};

export const calendarStyle = {
  boxShadow: `0px 4px 25px rgba(0, 0, 0, 0.3)`,
  borderRadius: "12px",
  height: "90%",
  maxHeight: "85%",
  width: "950px",
  bgcolor: "background.paper",
  // boxShadow: "2",
  "& .MuiDayCalendar-slideTransition": {
    minHeight: "500px",
    fontSize: "1rem",
  },
  "&.MuiDayCalendar-monthContainer": {
    fontSize: "3rem",
    fontWeight: "bold",
    mb: 5,
  },

  "& .MuiDayCalendar-weekDayLabel": {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "rgba(59, 130, 246, .5)",
  },
  "& .MuiDayCalendar-header": {
    gap: "100px",
  },
  "& .MuiDayCalendar-weekContainer": {
    gap: "100px",
    pt: "30px",
    fontSize: "1rem",
    fontWeight: "bold",
    mb: 2,
  },
  "& .MuiPickersCalendarHeader-label": {
    fontSize: "1.5rem",
    lineHeight: "1.5",
    fontWeight: "700",
    color: "rgb(99, 115, 129)",
  },
  "& .MuiPickersCalendarHeader-root": {
    mt: 2,
    mb: 2,
  },

  "& .MuiPickersDay-dayWithMargin": {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.57143",
    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  "& .MuiPickersDay-root.Mui-selected": {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.57143",
    color: "#FFFFFF",
    height: "50px",
    width: "50px",
    boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.5)`,
    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
};

  export const profilePictures = [
    "https://i.pinimg.com/236x/2a/03/8f/2a038f309f7a75bc453a45838bd893ae.jpg",
    "https://i.pinimg.com/474x/6a/e8/27/6ae827fcca32bf53c2a286efeb0b145d.jpg",
    "https://i.pinimg.com/236x/8b/11/37/8b11375da29fe4f97571151f99864426.jpg",
    "https://i.pinimg.com/736x/32/b3/45/32b3451cdffcb95c5ec9213018865cfb.jpg",
    "https://i.pinimg.com/236x/50/16/ba/5016ba505356ea992f3b3b702586d68f.jpg",
    "https://i.pinimg.com/736x/e1/94/51/e1945156ce0d31056a0cc23ffa81c79b.jpg",
    "https://i.pinimg.com/736x/96/71/a1/9671a1fd8bcba57d65262ad6bf8f05d1.jpg",
    "https://i.pinimg.com/236x/9f/a2/7b/9fa27b1047fe9bcd2205e892f8f97a00.jpg",
    "https://i.pinimg.com/564x/66/fb/c8/66fbc8c8076cf6fcd78b93e6a3d4cfcd.jpg",
    "https://i.pinimg.com/236x/bb/8a/91/bb8a91a047deaa78f7a89228f80d92da.jpg",
    "https://i.pinimg.com/736x/7b/e2/bf/7be2bf7deca3c74b09cdefd9c721202a.jpg",
    "https://i.pinimg.com/564x/f1/31/a9/f131a9d8f6d1851b3376ccca24230824.jpg",
    "https://i.pinimg.com/564x/a6/e0/df/a6e0df1a87817b6065a9ee8b0945ffa4.jpg",
    "https://i.pinimg.com/736x/c2/81/fd/c281fdbeeff1de5076707463c48304d3.jpg",
    "https://i.pinimg.com/236x/89/74/9e/89749e2a332548e0262179767e739a27.jpg",
    "https://i.pinimg.com/564x/42/35/62/423562370acdf35c9ea832ee8238ce72.jpg",
    "https://i.pinimg.com/564x/37/67/5c/37675ce17ba67237ad4b2e020aced09a.jpg",
    "https://i.pinimg.com/564x/32/39/be/3239be2ae1d31d198cee93a8658f0c53.jpg",
    "https://i.pinimg.com/564x/75/b0/ed/75b0ed701e1efde5bbc6e77d872cad54.jpg",
    "https://i.pinimg.com/736x/ac/3d/ca/ac3dca1e3c8ba73d803f17d98109b120.jpg",
    "https://i.pinimg.com/564x/aa/a0/22/aaa022b0341f64cf19c51c7de6930a48.jpg",
  ];


