import { useRef } from "react";

function Contact() {
  const inputRef = useRef();

  return (
    <div>
      <h2>Contact Page</h2>

      <input ref={inputRef} placeholder="Type something..." />

      <br /><br />

      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </div>
  );
}

export default Contact;