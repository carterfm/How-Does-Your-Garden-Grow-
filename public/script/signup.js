console.log('-----------------im signup-------------------')
// const passwordVal = document.getElementById('passwordVal').value.trim();



const createUser = async (e) => {
    e.preventDefault();
    const username = document.getElementById('usernameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    console.log('into the fxn')
    // if (password!==passwordVal){
    //   alert('Your passwords don\'t match!\nTry again!')
    //   return
    // }
    // else {
      if (username && email && password) {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      }
    // }
};

document.getElementById('create').addEventListener('submit', createUser);