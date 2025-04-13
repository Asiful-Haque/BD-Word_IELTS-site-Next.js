/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',       //////////Now use app router
      './components/**/*.{js,ts,jsx,tsx}',  //////////Now use app router
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };

// module.exports = {
//   content: [
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',  // Only scan App Router content
//     './src/components/**/*.{js,ts,jsx,tsx}',  // Components folder
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

  
