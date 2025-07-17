import React from "react";
import { Container, Logo } from "../index";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
// import { useState } from "react";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        // Navigate("/login");
        authService.logOut().then(() => {
            dispatch(logout());
        });
    };
    return (
        <button onClick={logoutHandler} className="px-6 py-2 font-semibold text-black bg-white/15 backdrop-blur-lg rounded-xl transition-all duration-200 hover:bg-white hover:text-indigo-800 shadow-md">Log Out</button>
    );
}

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="p-5">
            <Container>
                <nav className="flex items-center">
                    <Link to="/" className="mr-6">
                        <Logo width="80px" />
                    </Link>
                    <ul className="flex ml-auto space-x-4">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-6 py-2 font-semibold text-black bg-white/15 backdrop-blur-lg rounded-xl transition-all duration-200 hover:bg-white hover:text-indigo-800 shadow-md"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
