import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import { setisAuthenticated, setprofile } from "../Redux/profileSlice";
import { useNavigate } from "react-router-dom";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Addpost", "Logout"];
import axios from "axios";
import Bar from "./Search/Bar";
import zIndex from "@mui/material/styles/zIndex";

function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { photo, username } = useSelector((state) => state.profile);

  const handle = async(x) => {
    if (x === "Profile") {
      navigate(`/profile/${username}`);
    } else if (x === "Logout") {
      const x=await axios.post("/api/user/logout");
      console.log(x);
      dispatch(setprofile({isAuthenticated:"false",_id: "", username: "", photo: "", email: "",last:"",first:"",phno:"",bio:""}));
      navigate("/app");
    }
    else if (x === "Addpost") {
      navigate("/addpost");
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: "#312e81",height:"4rem"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:"flex",flexDirection:"row",gap:"30%",height:"4rem",alignItems:"baseline",padding:"1rem"}}>
          <div style={{display:"flex",flexDirection:"row"}}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BUILDS
          </Typography>
          </div>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
                <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                >
                {page}
              </Button>
            ))}
          </Box> */}

          <Box sx={{ flexGrow: 0 ,position:"absolute",right:"0"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={photo} /><p style={{color:"white"}}>{"  "+username}</p>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ backgroundColor:"",mt: "45px"}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
              {settings.map((setting) => (
                  <MenuItem key={setting} sx={{'&:hover': {
                    backgroundColor: '#cbd5e1',
                    color: '#3c52b2',
                },}}onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handle(setting)}
                    >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

{/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
  <IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleOpenNavMenu}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
  <Menu
    id="menu-appbar"
    anchorEl={anchorElNav}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(anchorElNav)}
    onClose={handleCloseNavMenu}
    sx={{
      display: { xs: "block", md: "none" },
    }}
  >
    {pages.map((page) => (
      <MenuItem key={page} onClick={handleCloseNavMenu}>
        <Typography textAlign="center">{page}</Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>
<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
<Typography
  variant="h5"
  noWrap
  component="a"
  href="#app-bar-with-responsive-menu"
  sx={{
    mr: 2,
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  }}
>
  LOGO
</Typography> */}