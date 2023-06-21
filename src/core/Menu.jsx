import React, { Fragment, useState } from "react";
import { Link, withRouter, forceUpdate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LogoImg from "../assets/ecom-logo.png";

import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Badge } from "@material-ui/core";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900", textDecoration: "none" };
  } else {
    return { color: "#ffffff", textDecoration: "none" };
  }
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuId = "primary-search-account-menu";

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a
                className="md:p-2"
                href="/"
                style={{ color: "#ffffff", textDecoration: "none" }}
              >
                <img src={LogoImg} height={60} width={60} alt="" />
              </a>
            </div>
            <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-end">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <HomeIcon className="h-6 w-6 text-blue-500" />
                    <Typography noWrap>Home</Typography>
                  </Link>
                  <Link
                    to="/shop"
                    className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <BuildingStorefrontIcon className="h-6 w-6 text-blue-500" />
                    <Typography noWrap>Shop</Typography>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Badge badgeContent={itemTotal()}>
                      <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
                    </Badge>
                    <Typography noWrap>Cart</Typography>
                  </Link>
                  <Link
                    to="/user/dashboard"
                    className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-500" />
                    <Typography noWrap>Dashboard</Typography>
                  </Link>
                  {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <Link
                      className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                      to="/admin/dashboard"
                    >
                      <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-500" />
                      <Typography>Admin</Typography>
                    </Link>
                  )}
                  {!isAuthenticated() && (
                    <Fragment>
                      <Link
                        className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                        to="/signin"
                      >
                        <UserIcon className="h-6 w-6 text-blue-500" />
                        <Typography noWrap>Signin</Typography>
                      </Link>

                      <Link
                        className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                        to="/signup"
                      >
                        <UserPlusIcon className="h-6 w-6 text-blue-500" />
                        <Typography noWrap>Signup</Typography>
                      </Link>
                    </Fragment>
                  )}
                  {isAuthenticated() && (
                    <span
                      className="flex justify-center items-center gap-3 text-gray-300 hover:bg-gray-700 cursor-pointer px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                    >
                      <ArrowUturnRightIcon className="h-6 w-6 text-blue-500" />
                      <Typography noWrap>Logout</Typography>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex sm:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-xl"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="#news"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                News
              </a>
              <a
                href="#option1"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Option 1
              </a>
              <a
                href="#option2"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Option 2
              </a>
              <a
                href="#option2"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Option 2
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* <div position="fixed">
        <div class="flex space-x-4 bg-purple-400 items-center justify-between">
          <a
            className="md:p-2"
            href="/"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            <img src={LogoImg} height={60} width={60} alt="" />
          </a>
          <div className="md:flex hidden">
            <Link style={isActive(history, "/")} to="/">
              <IconButton color="inherit">
                <HomeIcon />
                <Typography noWrap>Home</Typography>
              </IconButton>
            </Link>
            <Link style={isActive(history, "/shop")} to="/shop">
              <IconButton aria-label="Shop" color="inherit">
                <StorefrontIcon />
                <Typography noWrap>Shop</Typography>
              </IconButton>
            </Link>
            <Link style={isActive(history, "/cart")} to="/cart">
              <IconButton aria-label="Cart" color="inherit">
                <Badge badgeContent={itemTotal()} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
                <Typography noWrap>Cart</Typography>
              </IconButton>
            </Link>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                <IconButton aria-label="Dashboard" color="inherit">
                  <DashboardIcon />
                  <Typography noWrap>Dashboard</Typography>
                </IconButton>
              </Link>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                <IconButton aria-label="Dashboard" color="inherit">
                  <DashboardIcon />
                  <Typography noWrap>Dashboard</Typography>
                </IconButton>
              </Link>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, "/signin")} to="/signin">
                  <IconButton aria-label="Signin" color="inherit">
                    <AccountCircleIcon />
                    <Typography noWrap>Signin</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, "/signup")} to="/signup">
                  <IconButton aria-label="Signup" color="inherit">
                    <PersonAddIcon />
                    <Typography noWrap>Signup</Typography>
                  </IconButton>
                </Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <span
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <IconButton aria-label="Signout" color="inherit">
                  <ExitToAppIcon />
                  <Typography noWrap>Signout</Typography>
                </IconButton>
              </span>
            )}
            <div className="md:bg-purple-400 hidden md:flex md:flex-col">
              <button
                type="button"
                class="inline-flex text-white w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 "
                id="menu-button"
              >
                Options
                <svg
                  class="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div className="flex flex-col">
                <Link style={isActive(history, "/")} to="/">
                  <IconButton aria-label="Home" color="inherit">
                    <HomeIcon />
                    <Typography noWrap>Home</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, "/shop")} to="/shop">
                  <IconButton aria-label="Shop" color="inherit">
                    <StorefrontIcon />
                    <Typography noWrap>Shop</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, "/cart")} to="/cart">
                  <IconButton aria-label="Cart" color="inherit">
                    <Badge badgeContent={itemTotal()} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                    <Typography noWrap>Cart</Typography>
                  </IconButton>
                </Link>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <Link
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                  >
                    <IconButton aria-label="Dashboard" color="inherit">
                      <DashboardIcon />
                      <Typography noWrap>Dashboard</Typography>
                    </IconButton>
                  </Link>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <Link
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                  >
                    <IconButton aria-label="Dashboard" color="inherit">
                      <DashboardIcon />
                      <Typography noWrap>Dashboard</Typography>
                    </IconButton>
                  </Link>
                )}

                {!isAuthenticated() && (
                  <Fragment>
                    <Link style={isActive(history, "/signin")} to="/signin">
                      <IconButton aria-label="Signin" color="inherit">
                        <AccountCircleIcon />
                        <Typography noWrap>Signin</Typography>
                      </IconButton>
                    </Link>

                    <Link style={isActive(history, "/signup")} to="/signup">
                      <IconButton aria-label="Signup" color="inherit">
                        <PersonAddIcon />
                        <Typography noWrap>Signup</Typography>
                      </IconButton>
                    </Link>
                  </Fragment>
                )}

                {isAuthenticated() && (
                  <span
                    style={{ cursor: "pointer", color: "#ffffff" }}
                    onClick={() =>
                      signout(() => {
                        history.push("/");
                      })
                    }
                  >
                    <IconButton aria-label="Signout" color="inherit">
                      <ExitToAppIcon />
                      <Typography noWrap>Signout</Typography>
                    </IconButton>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </div> */}
    </div>
  );
};

export default withRouter(MaterialAppBar);
