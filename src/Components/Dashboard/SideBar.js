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
          display: "flex",
          position: "sticky",
          // position: "fixed",
          minHeight: "100%",
          backgroundColor: "white",
        }}
      >
        <Sidebar collapsed={window.innerWidth > 768 ? !isOpen : isOpen}>
          <Menu>
            <MenuItem
              component={<Link to={`./activity`} />}
              icon={<i class="material-icons">dashboard</i>}
              label="Dashboard"
            >
              Dashboard
            </MenuItem>
            <SubMenu icon={<i class="material-icons">group</i>} label="Users">
              <MenuItem
                icon={<i class="material-icons">group</i>}
                component={<Link to={`./users`} />}
              >
                Users
              </MenuItem>
              <MenuItem
                icon={<i class="material-icons">add</i>}
                component={<Link to={`./user/add`} />}
              >
                Add User
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<i class="material-icons">inventory_2</i>}
              label="Category"
            >
              <MenuItem
                icon={<i class="material-icons">inventory_2</i>}
                component={<Link to={`./categories`} />}
              >
                Categories
              </MenuItem>
              <MenuItem
                component={<Link to={`./category/add`} />}
                icon={<i class="material-icons">add</i>}
              >
                Add Category
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<i class="material-icons">local_shipping</i>}
              label="Products"
            >
              <MenuItem
                component={<Link to={`./products`} />}
                icon={<i class="material-icons">local_shipping</i>}
              >
                Products
              </MenuItem>
              <MenuItem
                component={<Link to={`./product/add`} />}
                icon={<i class="material-icons">add</i>}
              >
                Add Product
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to={`./orders`} />}
              icon={<i class="material-icons">list_alt</i>}
            >
              Orders
            </MenuItem>
            <MenuItem
              component={<Link to={`./rate`} />}
              icon={<i class="material-icons">list_alt</i>}
            >
              Reviews
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
