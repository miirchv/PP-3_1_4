// ИНФОРМАЦИЯ О ТЕКУЩЕМ ПОЛЬЗОВАТЕЛЕ
async function getActiveUser() {
    const res = await fetch("http://localhost:8080/admin/rest/activeuser")
    const activeUser = await res.json()
    document.getElementById("activeUser").innerText = `${activeUser.email} with roles: ${activeUser.role}`
}


// ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ НА СТРАНИЦУ
function addToPage(user) {
    const usersTableBody = document.getElementById("usersTableBody")
    usersTableBody.insertAdjacentHTML("beforeend",`
        <tr id="tr${user.id}">
            <td id="tdId${user.id}">${user.id}</td>
            <td id="tdFirstName${user.id}">${user.firstName}</td>
            <td id="tdLastName${user.id}">${user.lastName}</td>
            <td id="tdAge${user.id}">${user.age}</td>
            <td id="tdEmail${user.id}">${user.email}</td>
            <td id="tdRole${user.id}">${user.role}</td>
            <!--Кнопка редактировать-->
            <td>
                <button onclick="updateUser(${user.id})" class="btn btn-info" data-toggle="modal" data-target="#edituser">Edit</button>
            </td>
            <!--Кнопка удалить-->
            <td>
                <button onclick="deleteUser(${user.id})" class="btn btn-danger" data-toggle="modal" data-target="#deleteuser">Delete</button>
            </td>
        </tr>
    `)
}

// GET ALL USERS
async function getAllUsers() {
    const res = await fetch("http://localhost:8080/admin/rest")
    const allUsers = await res.json()
    allUsers.forEach(user => {addToPage(user)})
}
window.addEventListener("DOMContentLoaded", getAllUsers)
window.addEventListener("DOMContentLoaded", getActiveUser)

// ADD NEW USER
document.getElementById("newUserForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const selectedRoles = Array.from(document.getElementById("newRole").selectedOptions)
    let newRole = []
    for (i = 0; i < selectedRoles.length; i++) {
        newRole[i] = selectedRoles[i].value
    }


    const res = await fetch("http://localhost:8080/admin/rest", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
            "firstName": document.getElementById("newFirstName").value,
            "lastName": document.getElementById("newLastName").value,
            "age": document.getElementById("newAge").value,
            "email": document.getElementById("newEmail").value,
            "password": document.getElementById("newPassword").value,
            "role": newRole
        })
    })
    const newUser = await res.json()
    addToPage(newUser)
    $('.nav-tabs a[href="#userstable"]').tab('show')
    e.target.reset()
})

// DELETE USER
async function deleteUser(id) {
    const res = await fetch(`http://localhost:8080/admin/rest/${id}`)
    const user = await res.json()
    document.getElementById("deleteId").value = `${user.id}`
    document.getElementById("deleteFirstName").value = `${user.firstName}`
    document.getElementById("deleteLastName").value = `${user.lastName}`
    document.getElementById("deleteAge").value = `${user.age}`
    document.getElementById("deleteEmail").value = `${user.email}`

    const deleteRequest = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:8080/admin/rest/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
        e.target.reset()
        document.getElementById(`tr${id}`).remove()
        $("#deleteuser").modal("hide")
        document.getElementById("deleteUserForm").removeEventListener("submit", deleteRequest)
    }
    document.getElementById("deleteUserForm").addEventListener("submit", deleteRequest)
}

// UPDATE USER
async function updateUser(id) {
    const res = await fetch(`http://localhost:8080/admin/rest/${id}`)
    const user = await res.json()
    document.getElementById("editId").value = `${user.id}`
    document.getElementById("editFirstName").value = `${user.firstName}`
    document.getElementById("editLastName").value = `${user.lastName}`
    document.getElementById("editAge").value = `${user.age}`
    document.getElementById("editEmail").value = `${user.email}`

    const updateRequest = async (e) => {
        e.preventDefault()

        const selectedRoles = Array.from(document.getElementById("editRole").selectedOptions)
        let editRole = []
        for (i = 0; i < selectedRoles.length; i++) {
            editRole[i] = selectedRoles[i].value
        }

            const res = await fetch(`http://localhost:8080/admin/rest/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "id": id,
                    "firstName": document.getElementById("editFirstName").value,
                    "lastName": document.getElementById("editLastName").value,
                    "age": document.getElementById("editAge").value,
                    "email": document.getElementById("editEmail").value,
                    "password": document.getElementById("editPassword").value,
                    "role": editRole
                })
            })
            e.target.reset()
            const updatedUser = await res.json()
            const updatedTr = `
            <tr id="tr${updatedUser.id}">
                <td>${updatedUser.id}</td>
                <td>${updatedUser.firstName}</td>
                <td>${updatedUser.lastName}</td>
                <td>${updatedUser.age}</td>
                <td>${updatedUser.email}</td>
                <td>${updatedUser.role}</td>
                <!--Кнопка редактировать-->
                <td>
                    <button onclick="updateUser(${updatedUser.id})" class="btn btn-info" data-toggle="modal" data-target="#edituser">Edit</button>
                </td>
                <!--Кнопка удалить-->
                <td>
                    <button onclick="deleteUser(${updatedUser.id})" class="btn btn-danger" data-toggle="modal" data-target="#deleteuser">Delete</button>
                </td>
            </tr>`
            document.getElementById(`tr${id}`).innerHTML = updatedTr
            $("#edituser").modal("hide")
            document.getElementById("editUserForm").removeEventListener("submit", updateRequest)
        }
    document.getElementById("editUserForm").addEventListener("submit", updateRequest)
}