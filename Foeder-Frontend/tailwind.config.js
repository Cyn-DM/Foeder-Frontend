/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/Authentication/*.{html,js,jsx}",
	 "./src/Components/*.{html,js,jsx}",
	 "./src/Routing/*.{html,js,jsx}"
  ],
  theme: [],
  daisyui: {
	  themes: [
	  {
		  mytheme: {
				"primary": "#DBD6CA",
					  
				"secondary": "#BABD8D",
					  
				"accent": "#568A2D",
					  
				"neutral": "#30321C",

					  
				"base-100": "#F2F4EB",
					  
				"info": "#F1F1CB",
		  },
	  }
  ],
  },
  plugins: [
	require('daisyui'),
  ],
}

