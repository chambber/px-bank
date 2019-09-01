import React from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <nav className="nav is-active">
      <div className="nav-wrapper">
        <div className="menu">
          <ul className="menu-list">
            <li className="menu-list-item">
              <Link to="/dashboard" className="menu-list-item-link">
                <i className="fas fa-tachometer-alt" />
                <span className="menu-list-item-text">Início</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Menu };
