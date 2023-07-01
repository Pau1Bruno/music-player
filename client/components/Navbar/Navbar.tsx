import React, { useContext } from "react";
import Link from "next/link";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Navbar.module.scss";
import { DarkModeContext } from "../../context/ThemesContext";
import { useRouter } from "next/router";

const Navbar = () => {
        const { darkMode, setDarkMode } = useContext(DarkModeContext);
        const router = useRouter();
        
        const changingTheme = () => {
                const newTheme = !darkMode;
                setDarkMode(newTheme);
                localStorage.setItem("DarkMode", JSON.stringify(newTheme));
        };
        
        const logout = async () => {
                if ( typeof localStorage !== "undefined" ) localStorage.removeItem("jwt");
                await router.push("/login");
        };
        
        return (
            <div className={styles.navbar}>
                    <div className={darkMode ? styles.dark : styles.light}>
                            <div className={styles.left}>
                                    <Link href="/">
                                            <span>Home</span>
                                    </Link>
                                    <Link href="/tracks">
                                            <span>Tracks</span>
                                    </Link>
                                    <Link href="/albums">
                                            <span>Albums</span>
                                    </Link>
                            </div>
                            <div className={styles.right}>
                                    <div className={styles.theme} onClick={changingTheme}>
                                            <Brightness6Icon />
                                    </div>
                                    <div className={styles.user}>
                                            <span>Pavel Ushakov</span>
                                    </div>
                                    <div className={styles.logout} onClick={logout}>
                                            <LogoutIcon />
                                    </div>
                            </div>
                    </div>
            </div>
        );
};

export default Navbar;