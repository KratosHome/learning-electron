import React, { useState, useEffect } from 'react';
import './ThemeToggle.scss';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string>('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const getSystemTheme = () => {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        const storedTheme = localStorage.getItem('theme') || getSystemTheme();
        setTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, []);

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;
