const API_URL = "/api/employees";


// Load all employees
async function loadEmployees() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        const employees = await response.json();

        displayEmployees(employees);

    } catch (error) {

        console.error(error);

        alert("Unable to load employees");

    }
}


// Display employees in table
function displayEmployees(employees) {

    const tableBody =
        document.getElementById("employeeTableBody");

    tableBody.innerHTML = "";

    employees.forEach(employee => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });
}


// Add employee
document
    .getElementById("employeeForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const employee = {

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            department:
                document.getElementById("department").value,

            salary:
                parseFloat(
                    document.getElementById("salary").value
                )
        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(employee)

            });


            if (!response.ok) {

                throw new Error("Failed to add employee");

            }


            alert("Employee added successfully!");

            document
                .getElementById("employeeForm")
                .reset();

            loadEmployees();


        } catch (error) {

            console.error(error);

            alert("Unable to add employee");

        }

    });


// Delete employee
async function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {

            throw new Error("Failed to delete employee");

        }


        alert("Employee deleted successfully!");

        loadEmployees();


    } catch (error) {

        console.error(error);

        alert("Unable to delete employee");

    }

}


// Load employees when page opens
loadEmployees();
