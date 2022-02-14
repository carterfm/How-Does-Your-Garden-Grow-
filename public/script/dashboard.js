const createBtn = document.getElementById('create');
const savedGardBtn = document.getElementById('old-gard');
const profBtn = document.getElementById('view-prof');

const getCreateForm = async e => {
    e.preventDefault();
    const response = await fetch('/dashboard/gardens/create', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (response.ok) {
        document.location.replace('/dashboard/gardens/create');
        } else {
        alert(response.statusText);
        }
}

const getGardens = async e => {
    e.preventDefault();
    const response = await fetch('/dashboard/gardens', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (response.ok) {
        document.location.replace('/dashboard/gardens');
        } else {
        alert(response.statusText);
        }
}

const getProfile = async e => {
    e.preventDefault();
    const response = await fetch('/dashboard/profile', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (response.ok) {
        document.location.replace('/dashboard/profile');
        } else {
        alert(response.statusText);
        }
}

// const logout = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/api/user/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
//   };

profBtn.addEventListener('click', getProfile);
savedGardBtn.addEventListener('click', getGardens);
createBtn.addEventListener('click', getCreateForm);
document.getElementById('logout').addEventListener('click', logout);
