// ИНФОРМАЦИЯ О ТЕКУЩЕМ ПОЛЬЗОВАТЕЛЕ
async function getActiveUser() {
    const res = await fetch("http://localhost:8080/user/rest/activeuser")
    const activeUser = await res.json()
    document.getElementById("activeUser").innerText = `${activeUser.email} with roles: ${activeUser.role}`
    const activeUserTable = document.getElementById("activeUserTable")
    activeUserTable.insertAdjacentHTML("beforeend",`
        <tr>
            <td>${activeUser.id}</td>
            <td>${activeUser.firstName}</td>
            <td>${activeUser.lastName}</td>
            <td>${activeUser.age}</td>
            <td>${activeUser.email}</td>
            <td>${activeUser.role}</td>
        </tr>
    `)
}

window.addEventListener("DOMContentLoaded", getActiveUser)
