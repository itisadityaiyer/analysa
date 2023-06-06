import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { DynamicFeedRounded, FlagCircleOutlined } from "@mui/icons-material";

const NavBar = () => {
  const [collapsedMenu, setCollapsedMenu] = useState(true);

  return (
    <Sidebar
      style={{ height: "100%" }}
      collapsed={collapsedMenu}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
        },
      }}
    >
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setCollapsedMenu(!collapsedMenu);
          }}
        >
          <Typography variant="h4">Analysa</Typography>
        </MenuItem>

        <MenuItem icon={<HomeOutlinedIcon color="primary" />}>
          <Typography>Home</Typography>
        </MenuItem>
        <MenuItem icon={<FlagCircleOutlined color="primary" />}>
          <Typography>Feature Flagging</Typography>
        </MenuItem>
        <MenuItem icon={<DynamicFeedRounded color="primary" />}>
          <Typography>Experiment Review</Typography>
        </MenuItem>
        <MenuItem icon={<AssessmentIcon color="primary" />}>
          <Typography>Analyses</Typography>
        </MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon color="primary" />}>
          <Typography>Cohorts</Typography>
        </MenuItem>
        <MenuItem icon={<HelpOutlineOutlinedIcon color="primary" />}>
          <Typography>Queries</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default NavBar;
