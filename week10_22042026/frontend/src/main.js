/*
 * FRONTEND MAIN.JS
 * 
 * This file demonstrates:
 * 1. Fetch API usage (callbacks and promises)
 * 2. DOM manipulation with vanilla JavaScript
 * 3. Event handling
 * 4. Async/await for API calls
 * 
 * CALLBACK CONCEPT:
 * Callbacks are functions passed as arguments to other functions.
 * 
 * Example - Traditional callback with Fetch:
 * fetch(url).then(response => { // This callback executes when promise resolves
 *   return response.json();
 * }).then(data => { // Another callback
 *   console.log(data);
 * });
 * 
 * With async/await, these callbacks are implicit:
 * const response = await fetch(url); // Waits for promise to resolve
 * const data = await response.json(); // Another implicit callback
 * 
 * This makes the code look synchronous even though it's asynchronous!
 */

// API Base URL - Make sure your backend is running on this URL
const API_BASE_URL = 'http://localhost:5000';
const API_USERS = `${API_BASE_URL}/users`;

// DOM Elements
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const statusMessage = document.getElementById('statusMessage');
const usersContainer = document.getElementById('usersContainer');

/*
 * EVENT LOOP & EVENT HANDLING:
 * When you click a button, the browser puts the click event in the event loop.
 * The event loop then executes the callback function attached to that button.
 */

// Form submission event listener
// The callback function executes when the form is submitted
userForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await addUser();
});

/*
 * ADD USER FUNCTION
 * 
 * This function demonstrates async/await with fetch API.
 * 
 * ASYNC/AWAIT EXECUTION:
 * 1. async keyword makes the function return a Promise
 * 2. await pauses execution until fetch completes
 * 3. While awaiting, the event loop can handle other events
 * 4. This prevents blocking the UI
 */
async function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Input validation
  if (!name || !email) {
    showStatus('Please fill in all fields', 'error');
    return;
  }

  // Disable button to prevent multiple submissions
  const submitBtn = userForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Adding...';

  try {
    /*
     * FETCH API WITH ASYNC/AWAIT
     * 
     * fetch() returns a Promise.
     * await waits for the HTTP request to complete.
     * Behind the scenes, this uses callbacks in the browser's networking layer.
     * 
     * EVENT LOOP IN ACTION:
     * 1. fetch() sends HTTP request - queued in event loop's I/O phase
     * 2. await pauses this function
     * 3. Event loop continues processing user input, animations, etc.
     * 4. When server responds, a callback is triggered (hidden by await)
     * 5. Function execution resumes after the await
     */
    const response = await fetch(API_USERS + '/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    /*
     * PARSING RESPONSE
     * response.json() also returns a Promise
     * We await it to get the actual JSON data
     */
    const data = await response.json();

    if (data.success) {
      showStatus('User added successfully! ✓', 'success');
      userForm.reset();
      
      // Refresh the users list after adding
      await fetchAllUsers();
    } else {
      showStatus(`Error: ${data.message}`, 'error');
    }

  } catch (error) {
    console.error('Error adding user:', error);
    showStatus('Failed to add user. Is the backend running?', 'error');
  } finally {
    // Re-enable the button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Add User';
  }
}

/*
 * FETCH ALL USERS FUNCTION
 * 
 * This demonstrates how to fetch data from the backend
 * and dynamically update the DOM.
 */
async function fetchAllUsers() {
  try {
    /*
     * This GET request is also asynchronous.
     * await pauses execution until the response comes back.
     * Meanwhile, the event loop handles other tasks.
     */
    const response = await fetch(API_USERS);
    const data = await response.json();

    if (data.success) {
      displayUsers(data.users);
    } else {
      usersContainer.innerHTML = '<p class="error">Failed to load users</p>';
    }

  } catch (error) {
    console.error('Error fetching users:', error);
    usersContainer.innerHTML = '<p class="error">Backend server not running. Start it with: node server.js</p>';
  }
}

/*
 * DISPLAY USERS FUNCTION
 * 
 * This function dynamically creates HTML elements for each user.
 * This demonstrates DOM manipulation with vanilla JavaScript.
 */
function displayUsers(users) {
  // Clear existing content
  usersContainer.innerHTML = '';

  if (users.length === 0) {
    usersContainer.innerHTML = '<p class="no-users">No users yet. Add one above!</p>';
    return;
  }

  /*
   * ARRAY MAP & CALLBACK
   * map() calls the callback function for each element in the array.
   * This is another example of callbacks in action.
   */
  const usersList = users.map(user => {
    return `
      <div class="user-card">
        <div class="user-info">
          <h3 class="user-name">${escapeHtml(user.name)}</h3>
          <p class="user-email">📧 ${escapeHtml(user.email)}</p>
          <p class="user-date">Added: ${new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    `;
  }).join('');

  usersContainer.innerHTML = `
    <div class="users-list">
      <p class="user-count">Total Users: <strong>${users.length}</strong></p>
      ${usersList}
    </div>
  `;
}

/*
 * SHOW STATUS MESSAGE
 * Displays success or error messages to the user
 */
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;

  // Auto-hide after 4 seconds
  setTimeout(() => {
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
  }, 4000);
}

/*
 * ESCAPE HTML
 * Prevents XSS attacks by escaping special characters
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/*
 * INITIALIZATION
 * 
 * When the page loads, we fetch all existing users.
 * The 'await' keyword ensures we get the user list before the page is fully interactive.
 */
console.log('🚀 Frontend loaded. Backend URL:', API_BASE_URL);
console.log('⏳ Fetching users from backend...');
fetchAllUsers();
