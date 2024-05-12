import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#346751",
      },
      fontFamily: {
        poppins: ["Poppins"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
});
