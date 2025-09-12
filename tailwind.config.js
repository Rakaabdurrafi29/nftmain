import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#00040f",
                secondary: "#00f6ff",
                dimWhite: "rgba(255, 255, 255, 0.7)",
                dimBlue: "rgba(9, 151, 124, 0.1)",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                FlashBang: ["FlashBang", "sans-serif"],
                DigitalItalic: ["DigitalItalic", "sans-serif"],
                Digital: ["Digital", "sans-serif"],
            },
        },
        screens: {
            xs: "480px",
            ss: "620px",
            sm: "768px",
            md: "1060px",
            lg: "1200px",
            xl: "1700px",
            widescreen: { raw: "(min-aspect-ratio: 3/2" },
            tallscreen: { raw: "(min-aspect-ratio: 13/20" },
        },
        keyframes: {
            "open-menu": {
                "0%": { transform: "scaleY(0)" },
                "80%": { transform: "scaleY(1.2)" },
                "100%": { transform: "scaleY(1)" },
            },
        },
        animation: {
            "open-menu": "open-menu 0.5s ease-in-out forwards",
        },
    },

    plugins: [forms],
};
