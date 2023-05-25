import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const menuItems = [
    {
        link: '/users',
        name: "Users"
    },
    {
        link: '/roles',
        name: "Roles"
    },
    {
        link: '/products',
        name: "Products"
    },
    {
        link: '/orders',
        name: "Orders"
    },
]

const Menu = () => {
    const user = useSelector((state: any) => state.user);

    const displayMenuItems = () => {
        return menuItems.map(item => {
            if (user.canView(item.name.toLowerCase())) {
                return (
                    <li className="nav-item" key={item.link}>
                        <NavLink to={item.link} className="nav-link">
                            {item.name}
                        </NavLink>
                    </li>
                )
            }
        })
    }


    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to={'/dashboard'} className="nav-link">
                            Dashboard
                        </NavLink>
                    </li>
                    {displayMenuItems()}
                </ul>
            </div>
        </nav>
    );
};

export default Menu;