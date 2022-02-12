const useBtn = document.querySelectorAll('.use');
const editBtn = document.querySelectorAll('.edit');
const deleteBtn = document.querySelectorAll('.delete');
const gardenCard = document.querySelectorAll('.gardenLI');
const gardenBtn = document.querySelectorAll('.gardenBtn')

useBtn.forEach(btn=>{
    btn.addEventListener('click', async e => {
        console.log(btn.value)
        e.preventDefault();
        const response = await fetch(`/dashboard/gardens/${btn.value}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            if (response.ok) {
            document.location.replace(`/dashboard/gardens/${btn.value}`);
            } else {
            alert(response.statusText);
            }
    })
})

editBtn.forEach(btn=>{
    btn.addEventListener('click', e => {
        console.log(btn.value)
    })
})

deleteBtn.forEach(btn=>{
    btn.addEventListener('click', e => {
        console.log(btn.value)
    })
})