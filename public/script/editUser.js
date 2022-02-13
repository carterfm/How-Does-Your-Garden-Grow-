

////NOTE: this page will not edit the user yet, we need to deal with password sitch


const editEmailInpt = document.getElementById('emailEdit');
const editUserInpt = document.getElementById('usernameEdit');
const editPasswordInpt = document.getElementById('passwordEdit');
const oldUsername = document.getElementById('username').innerHTML;
const oldEmail = document.getElementById('user-email').innerHTML;
const userID = document.getElementById('user-id').innerHTML;

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
    // if (password!==passwordVal){
    //   alert('Your passwords don\'t match!\nTry again!')
    //   return
    // }
    // else {
      if (newUsername && newEmail && newPassword) {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ newUsername, newEmail, newPassword }),
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

document.getElementById('submitEdit').addEventListener('submit', editUser);
document.getElementById('submitDelete').addEventListener('click', deleteProfile);