import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  plugins: [
    // Add other Tailwind CSS plugins as needed
    flowbite.plugin(),
  ],
};
