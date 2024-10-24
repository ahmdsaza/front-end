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
              onClick={() => setIsOpen((prev) => !prev)}
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
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Users
              </MenuItem>
              <MenuItem
                icon={<i className="material-icons">add</i>}
                component={<Link to={`./user/add`} />}
                onClick={() => setIsOpen((prev) => !prev)}
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
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Categories
              </MenuItem>
              <MenuItem
                component={<Link to={`./category/add`} />}
                icon={<i className="material-icons">add</i>}
                onClick={() => setIsOpen((prev) => !prev)}
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
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Products
              </MenuItem>
              <MenuItem
                component={<Link to={`./product/add`} />}
                icon={<i className="material-icons">add</i>}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Add Product
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to={`./orders`} />}
              icon={<i className="material-icons">list_alt</i>}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Orders
            </MenuItem>
            <MenuItem
              component={<Link to={`./rate`} />}
              icon={<i className="material-icons">list_alt</i>}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Reviews
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
