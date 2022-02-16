

////NOTE: this page will not edit the user yet, we need to deal with password sitch


const editEmailInpt = document.getElementById('emailEdit');
const editUserInpt = document.getElementById('usernameEdit');
const editPasswordInpt = document.getElementById('passwordEdit');
const confirmPassword = document.getElementById('passwordEditCheck');
const oldUsername = document.getElementById('username').innerHTML;
const oldEmail = document.getElementById('user-email').innerHTML;
const userID = document.getElementById('user-id').innerHTML;
const toggleButton = document.getElementById('togglePassword')

const togglePassword = (e) => {
  e.preventDefault();
  if(editPasswordInpt.type==='password'){
      editPasswordInpt.type = 'text';
      confirmPassword.type = 'text';
      toggleButton.textContent = 'Hide Password';
  } else {
    editPasswordInpt.type = 'password';
    confirmPassword.type = 'password';
    toggleButton.textContent = 'Show password';
  }
}

toggleButton.addEventListener('click', togglePassword);

confirmPassword.addEventListener('blur', e=>{
  if (confirmPassword.value!==editPasswordInpt.value){
    document.getElementById('password-match').setAttribute('style', 'display: block')
  } else {
    document.getElementById('password-match').setAttribute('style', 'display: none')
  }
})

const deleteProfile = (e) => {
    e.preventDefault();
    console.log(`/api/user/${userID}`)
    fetch(`/api/user/${userID}`,{
        method:"DELETE"
    }).then(res=>{
        if(res.ok){
            document.location.replace('/');
        } else {
            alert("trumpet sound")
        }
    })
}

const editUser = async (e) => {
    e.preventDefault();
    const newEmail = editEmailInpt.value.trim();
    const newUsername = editUserInpt.value.trim();
    const newPassword = editPasswordInpt.value.trim();
    console.log('into the fxn')
      if (newUsername && newEmail && newPassword) {
        const updatedUser = {
          username: newUsername, 
          email: newEmail, 
          password: newPassword
        }

        console.log(`About to make an edit to user w/ ID ${userID}`);
        const response = await fetch(`/api/user/${userID}`, {
          method: 'PUT',
          body: JSON.stringify(updatedUser),
          headers: { 'Content-Type': 'application/json' },
        });
        const newUser = await response.json();
        console.log('newUser', newUser)
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      }
};

const begin = () => {
    editEmailInpt.value = oldEmail;
    editUserInpt.value = oldUsername;
    editPasswordInpt.value = '';
}

begin();

document.getElementById('submitEdit').addEventListener('click', e =>{
  e.preventDefault();
  if (confirmPassword.value!==editPasswordInpt.value){
    alert('Hmm... something\'s wrong...\n Please make sure all fields are filled and your passwords match.');
    return
  } else {editUser(e)}
});
document.getElementById('submitDelete').addEventListener('click', deleteProfile);