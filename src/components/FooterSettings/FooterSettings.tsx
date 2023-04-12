import React from 'react';
import "./FooterSettings.scss"
import LanguageToggle from "./LanguageToggle/LanguageToggle";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Seating from "./Seating/Seating";

const FooterSettings = () => {
    return (
        <div className="container-footer-settings">
            <div>+ New list</div>
           <div>
               <Seating/>
               <LanguageToggle/>
               <ThemeToggle/>
           </div>
        </div>
    );
};

export default FooterSettings;
