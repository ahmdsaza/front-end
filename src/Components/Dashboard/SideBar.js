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
          display: "flex",
          minHeight: "400px",
          // position: "sticky",
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

      {/* <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba( 0, 0, 0, 0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "786" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <i
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
                  }}
                  class="material-icons"
                >
                  <span>{link.icons}</span>
                </i>
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div> */}
    </>
  );
}
