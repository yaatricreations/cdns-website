import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCareServices } from "../hook/useCareServices";
import { useAuth } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./navStyle.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { services } = useCareServices();
  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading;
  
  // ✅ FORCE ADMIN CHECK
  const isAdmin = auth?.isAdmin || (user && user.email === "admin@cdns.com");

  // ✅ BETTER DEBUG - Runs every render
  useEffect(() => {
    console.log("🔍 NAVBAR DEBUG:", {
      userEmail: user?.email,
      isAdminFromContext: !!auth?.isAdmin,
      isAdminFinal: isAdmin,
      hasUser: !!user,
      fullUser: user
    });
  }, [user, isAdmin]);

  const mainServices = services.filter((s) => !s.parent);
  const getChildren = (parentTitle) =>
    services.filter((s) => s.parent === parentTitle);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('supabase.auth.token');
      window.location.href = '/';
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = '/';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark cdns-nav">
      <div className="container">
        <NavLink className="navbar-brand" to="/">C D N S</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Services
              </span>
              <ul className="dropdown-menu">
                {mainServices.map((service) => {
                  const children = getChildren(service.title);
                  if (children.length > 0) {
                    return (
                      <li key={service.slug} className="dropdown-submenu">
                        <span className="dropdown-item dropdown-toggle">{service.title}</span>
                        <ul className="dropdown-submenu-items dropdown-menu">
                          {children.map((child) => (
                            <li key={child.slug}>
                              <span
                                className="dropdown-item"
                                onClick={() => navigate(`/services/${child.slug}`)}
                                style={{ cursor: 'pointer' }}
                              >
                                {child.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                  return (
                    <li key={service.slug}>
                      <span
                        className="dropdown-item"
                        onClick={() => navigate(`/services/${service.slug}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        {service.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About Us</NavLink>
            </li>

         
            {/* AUTH SECTION */}
            {loading ? (
              <li className="nav-item">
                <span className="nav-link">Loading...</span>
              </li>
            ) : user ? (
              <>
                {/* 🔥 TEMPORARY FORCE SHOW - FOR TESTING */}
                <li className="nav-item">
                  <NavLink 
                    to="/admin/services"
                    className="nav-link"
                    style={{ 
                      color: '#13ee8b !important',
                      fontWeight: '600',
                      border: '2px solid #13ee8b',
                      borderRadius: '25px',
                      padding: '8px 20px',
                      marginLeft: '10px',
                      background: 'rgba(19, 238, 139, 0.1)'
                    }}
                  >
                    🛠️ Admin Panel
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-logout-btn"
                    style={{ padding: "8px 24px", marginLeft: "8px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
