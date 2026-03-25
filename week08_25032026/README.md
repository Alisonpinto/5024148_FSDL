# React Concepts Demo

This React project demonstrates various fundamental concepts including components, props, state, forms, events, React Router, refs, keys, and hooks.

## Features Demonstrated

### Components
- Functional components only
- Reusable components: Navbar, Home, About, Contact, Form, List

### Props
- Passing data between parent and child components
- Dynamic content display

### State
- useState hook for managing state
- Counter, form inputs, toggles

### Forms
- Controlled components
- Form validation (name, email, password)
- Display submitted data

### Events
- onClick, onChange, onSubmit handlers
- Button clicks and input changes

### React Router
- Navigation between pages
- Routes: Home, About, Contact, Form, List

### Refs
- useRef hook
- Focus input field example

### Keys
- Rendering lists with map()
- Unique keys for list items

### Hooks
- useState
- useEffect (simulated API fetch)
- useRef

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css
│   ├── Home.jsx & Home.css
│   ├── About.jsx & About.css
│   ├── Contact.jsx & Contact.css
│   ├── Form.jsx & Form.css
│   └── List.jsx & List.css
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

4. Navigate through the different pages using the navbar to see each concept in action.

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 18
- Vite
- React Router DOM
- Modern JavaScript (ES6+)
- CSS3
