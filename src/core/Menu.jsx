import React, { Fragment, useState, useEffect } from "react";
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
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolling = window.pageYOffset > 0;
      setIsNavbarFixed(isScrolling);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  const navClass = `top-0 left-0 right-0 w-full z-50 bg-gray-800 ${
    isNavbarFixed ? "sticky" : ""
  }`;

  return (
    <nav className={navClass}>
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
              <div className="flex space-x-4 flex-wrap">
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
            <Link
              to="/"
              className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <HomeIcon className="h-6 w-6 text-blue-500" />
              <Typography noWrap>Home</Typography>
            </Link>
            <Link
              to="/shop"
              className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <BuildingStorefrontIcon className="h-6 w-6 text-blue-500" />
              <Typography noWrap>Shop</Typography>
            </Link>
            <Link
              to="/cart"
              className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <Badge badgeContent={itemTotal()}>
                <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
              </Badge>
              <Typography noWrap>Cart</Typography>
            </Link>
            <Link
              to="/user/dashboard"
              className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-500" />
              <Typography noWrap>Dashboard</Typography>
            </Link>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                to="/admin/dashboard"
              >
                <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-500" />
                <Typography>Admin</Typography>
              </Link>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <Link
                  className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  to="/signin"
                >
                  <UserIcon className="h-6 w-6 text-blue-500" />
                  <Typography noWrap>Signin</Typography>
                </Link>

                <Link
                  className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  to="/signup"
                >
                  <UserPlusIcon className="h-6 w-6 text-blue-500" />
                  <Typography noWrap>Signup</Typography>
                </Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <span
                className="flex item-center justify-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
      )}
    </nav>
  );
};

export default withRouter(MaterialAppBar);
