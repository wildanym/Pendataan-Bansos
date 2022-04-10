module.exports = {
	content: ["./src/**/*.{html,js,vue}"],
	theme: {
		extend: {
			colors: {
				primaryGreen: "#16A75C",
				primaryBlue: "#1E88E5",
				primaryYellow: "#FFD026",
				lowEmphasis: "#1F2121",
				Error: "#DD5E5E",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
