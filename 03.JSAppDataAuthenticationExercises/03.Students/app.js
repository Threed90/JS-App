const tableBodyElement = document.querySelector('#results tbody');

function renderData() {
    showStudents();
    createStudent();
}


function showStudents() {

    fetch('http://localhost:3030/jsonstore/collections/students')
        .then(res => res.json())
        .then(data => {
            let students = Object.values(data);

            tableBodyElement.textContent = null;

            students.forEach(e => {
                let tr = createRowTableElement(e);

                if(tr){
                    tableBodyElement.appendChild(tr);
                }
            })
        })

}

function createStudent() {
    let formElement = document.getElementById('form');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let keys = formData.keys();
        for (const iterator of keys) {
            console.log(iterator);
        }
        let {firstName, lastName, facultyNumber, grade} = Object.fromEntries(formData);

        let student = {
            firstName,
            lastName,
            facultyNumber,
            grade
        };

        let tr = createRowTableElement(student);

        if(tr){
            fetch('http://localhost:3030/jsonstore/collections/students', {
                method : 'POST',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify(student)
            })
            .then(res => {
                if(res.ok){
                    tableBodyElement.appendChild(tr);
                    //window.location.href = "./index.html";
                    formElement.reset();
                }
            })
        }
    });
}

function createRowTableElement(student){
    let facultyNumRegex = /^\d+$/;

    let isFirstNameCorrect = typeof student.firstName == 'string' && student.firstName.length > 0;
    let isLastNameCorrect = typeof student.lastName == 'string' && student.lastName.length > 0;
    let isFacultyNumCorrect = facultyNumRegex.test(student.facultyNumber);
    let grade = Number(student.grade);
    let isGradeCorrect = grade >= 2 && grade <= 6;

    if(isFirstNameCorrect && isLastNameCorrect && isFacultyNumCorrect && grade && isGradeCorrect){
        let tr = document.createElement('tr');

        let firstNameTd = document.createElement('td');
        firstNameTd.textContent = student.firstName;
        tr.appendChild(firstNameTd);

        let lastNameTd = document.createElement('td');
        lastNameTd.textContent = student.lastName;
        tr.appendChild(lastNameTd);

        let fNumTd = document.createElement('td');
        fNumTd.textContent = student.facultyNumber;
        tr.appendChild(fNumTd);

        let gradeTd = document.createElement('td');
        gradeTd.textContent = grade.toFixed(2);
        tr.appendChild(gradeTd);

        return tr;
    } else {
        return undefined;
    }
}

renderData();