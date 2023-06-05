import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";

const NavBar = () => {
  const [collapsedMenu, setCollapsedMenu] = useState(true);

  return (
    <Sidebar style={{ height: "100vh" }} collapsed={collapsedMenu}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setCollapsedMenu(!collapsedMenu);
          }}
        >
          <Typography variant="h4">Analysa</Typography>
        </MenuItem>

        <MenuItem icon={<HomeOutlinedIcon />}>
          <Typography>Home</Typography>
        </MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />}>
          <Typography>Team</Typography>
        </MenuItem>
        <MenuItem icon={<ContactsOutlinedIcon />}>
          <Typography>Contacts</Typography>
        </MenuItem>
        <MenuItem icon={<ReceiptOutlinedIcon />}>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem icon={<HelpOutlineOutlinedIcon />}>
          <Typography>FAQ</Typography>
        </MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon />}>
          <Typography>Calendar</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default NavBar;
