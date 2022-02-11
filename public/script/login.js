console.log('------------------im login in--------------------')

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
      alert(response.statusText);
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

document.getElementById('login').addEventListener('submit', login);

document.getElementById('createUser').addEventListener('click', goCreateUser);