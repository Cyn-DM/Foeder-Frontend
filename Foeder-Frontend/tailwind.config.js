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
					  
				"accent": "#6D9B49",
					  
				"neutral": "#30321C",

					  
				"base-100": "#F2F4EB",
			  	"base-200": "#dee0d7",
					  
				"info": "#F1F1CB",
		  },
	  }
  ],
  },
  plugins: [
	require('daisyui'),
  ],
}

