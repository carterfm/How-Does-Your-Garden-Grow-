

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
  if (confirmPassword.value!==editPasswordInpt){
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
        const response = await fetch(`/dashboard/profile/${userID}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            username: newUsername, 
            email: newEmail, 
            password: newPassword }),
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

const begin = () => {
    editEmailInpt.value = oldEmail;
    editUserInpt.value = oldUsername;
    editPasswordInpt.value = '';
}

begin();

document.getElementById('submitEdit').addEventListener('submit', e =>{
  if (confirmPassword.value!==editPasswordInpt){
    alert('Your passwords don\'t match! Check them and try again!');
    return
  }
  editUser(e)
});
document.getElementById('submitDelete').addEventListener('click', deleteProfile);