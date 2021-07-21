import React, { memo } from "react";
import {
  AppBar,
  Icon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import navigation from "routes/navigationConfig";
import { Link } from "react-router-dom";

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className="mr-4"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {navigation.map((item) => (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={item.route}
              key={item.route}
            >
              <ListItemIcon>
                <Icon fontSize="small">{item.icon}</Icon>
              </ListItemIcon>
              {item.name}
            </MenuItem>
          ))}
        </Menu>

        <Typography variant="h6" color="inherit">
          Musics
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default memo(NavBar);
