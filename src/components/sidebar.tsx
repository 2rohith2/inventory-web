import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import QuizIcon from "@mui/icons-material/Quiz";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import logo from "../assets/logo.png";

const section = [
  {
    title: "Menu",
    links: [
      {
        text: "Dashboard",
        link: "/dashboard",
        icon: HomeIcon,
      },
      {
        text: "Order Management",
        link: "/orders",
        icon: WidgetsIcon,
      },
      {
        text: "Reports & Analytics",
        link: "/dashboard",
        icon: AnalyticsIcon,
      },
      {
        text: "Settings",
        link: "/dashboard",
        icon: SettingsIcon,
      },
    ],
  },
  {
    title: "Help & Support",
    links: [
      {
        text: "User Guid",
        link: "/dashboard",
        icon: InfoIcon,
      },
      {
        text: "FAQ",
        link: "/dashboard",
        icon: QuizIcon,
      },
      {
        text: "Contact Support",
        link: "/dashboard",
        icon: SupportAgentIcon,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <img src={logo} alt="Logo" width="100%" />
      {section.map((aSection) => (
        <Fragment key={aSection.title}>
          <Typography
            variant="body2"
            sx={{ pl: 2, opacity: "50%", fontWeight: 600 }}
          >
            {aSection.title}
          </Typography>
          {aSection.links.map((alink) => (
            <Fragment key={alink.text}>
              <List dense>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <alink.icon />
                    </ListItemIcon>
                    <ListItemText primary={alink.text} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Fragment>
          ))}
          <br />
        </Fragment>
      ))}
    </Box>
  );
}
