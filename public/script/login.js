
const passwordInput = document.getElementById('password')
const toggleButton = document.getElementById('togglePassword')

const togglePassword = (e) => {
    e.preventDefault();
    if(passwordInput.type==='password'){
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show password';
    }
}

toggleButton.addEventListener('click', togglePassword);

const login = async (e) => {
  e.preventDefault();
  const username = document.getElementById('userName').value.trim();
  const password = document.getElementById('password').value.trim();


  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log(username, password);
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
        alert('Your username or passwor was incorrect. Try again!');
    }
  }
};

const goCreateUser = async (e) => {
    e.preventDefault();
    const response = await fetch('/signup', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
      if (response.ok) {
        document.location.replace('/signup');
      } else {
        alert(response.statusText);
      }
   
};

document.getElementById('login-form').addEventListener('submit', login);

document.getElementById('createUser').addEventListener('click', goCreateUser);
