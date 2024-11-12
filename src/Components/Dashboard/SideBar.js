import "./bars.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MenuContextExport } from "../../Context/MenuContext";
import { useContext } from "react";
import { USER } from "../../API/Api";
import { Axios } from "../../API/axios";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function SideBar() {
  // Menu Context
  const menu = useContext(MenuContextExport);
  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen;

  // User
  const [user, setUser] = useState("");

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  function closeSideBar() {
    setIsOpen((prev) => !prev);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div
        style={{
          display: window.innerWidth < 768 && isOpen ? "none" : "flex",
          position: window.innerWidth < 768 && !isOpen ? "fixed" : "sticky",
          minHeight: "100%",
          backgroundColor: "white",
          zIndex: "2",
        }}
      >
        <Sidebar>
          <Menu>
            <MenuItem
              component={<Link to={`./activity`} />}
              icon={<i className="material-icons">dashboard</i>}
              label="Dashboard"
              onClick={closeSideBar}
            >
              Dashboard
            </MenuItem>
            <SubMenu
              icon={<i className="material-icons">group</i>}
              label="Users"
            >
              <MenuItem
                icon={<i className="material-icons">group</i>}
                component={<Link to={`./users`} />}
                onClick={closeSideBar}
              >
                Users
              </MenuItem>
              <MenuItem
                icon={<i className="material-icons">add</i>}
                component={<Link to={`./user/add`} />}
                onClick={closeSideBar}
              >
                Add User
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<i className="material-icons">inventory_2</i>}
              label="Category"
            >
              <MenuItem
                icon={<i className="material-icons">inventory_2</i>}
                component={<Link to={`./categories`} />}
                onClick={closeSideBar}
              >
                Categories
              </MenuItem>
              <MenuItem
                component={<Link to={`./category/add`} />}
                icon={<i className="material-icons">add</i>}
                onClick={closeSideBar}
              >
                Add Category
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<i className="material-icons">local_shipping</i>}
              label="Products"
            >
              <MenuItem
                component={<Link to={`./products`} />}
                icon={<i className="material-icons">local_shipping</i>}
                onClick={closeSideBar}
              >
                Products
              </MenuItem>
              <MenuItem
                component={<Link to={`./product/add`} />}
                icon={<i className="material-icons">add</i>}
                onClick={closeSideBar}
              >
                Add Product
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<i className="material-icons">percent</i>}
              label="Coupons"
            >
              <MenuItem
                icon={<i className="material-icons">percent</i>}
                component={<Link to={`./coupon`} />}
                onClick={closeSideBar}
              >
                Coupons
              </MenuItem>
              <MenuItem
                component={<Link to={`./coupon/add`} />}
                icon={<i className="material-icons">add</i>}
                onClick={closeSideBar}
              >
                Add Coupons
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<i className="material-icons">image</i>}
              label="Banners"
            >
              <MenuItem
                icon={<i className="material-icons">image</i>}
                component={<Link to={`./banner`} />}
                onClick={closeSideBar}
              >
                Banners
              </MenuItem>
              <MenuItem
                component={<Link to={`./banner/add`} />}
                icon={<i className="material-icons">add_photo_alternate</i>}
                onClick={closeSideBar}
              >
                Add Banners
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to={`./orders`} />}
              icon={<i className="material-icons">list_alt</i>}
              onClick={closeSideBar}
            >
              Orders
            </MenuItem>
            <MenuItem
              component={<Link to={`./rate`} />}
              icon={<span class="material-icons">star_rate</span>}
              onClick={closeSideBar}
            >
              Reviews
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
