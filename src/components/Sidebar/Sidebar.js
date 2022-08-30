
import { NavLink } from 'react-router-dom';
import React from "react";
import "../../App.css"
import { SidebarData } from './SidebarData';




function Sidebar() {
  return (
    <div className="Sidebar">

      <ul className="SidebarList">

        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}

            // id={window.location.pathname = val.link ? "active" : ""}
            /*onClick={event => handleClick(event, val.link)}*/
            >{" "}

              <NavLink className="row" to={val.link} style={{ textDecoration: 'none' }}>
                <div id="icon">{val.icon} </div>{" "}
                <div id="title">{val.title}</div>
              </NavLink>
            </li>
          );
        })}

      </ul>

    </div >
  )
}

export default Sidebar;