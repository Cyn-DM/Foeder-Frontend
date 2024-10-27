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
					  
				"accent": "#57862E",
					  
				"neutral": "#30321C",

					  
				"base-100": "#FFFCF2",
					  
				"info": "#F1F1CB",
		  },
	  }
  ],
  },
  plugins: [
	require('daisyui'),
  ],
}

