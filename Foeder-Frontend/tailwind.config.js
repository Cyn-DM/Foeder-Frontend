/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/**/*.{html,js,jsx}",
  ],
  theme: [],
  daisyui: {
	  themes: [
	  {
		  mytheme: {
				"primary": "#DBD6CA",
					  
				"secondary": "#833232",
					  
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

