const submitBtn = document.querySelector("#submitBtn");
const tableBody = document.querySelector("#tbody");
const removeBtn = document.querySelector("#removeBtn");
const sumBtn = document.querySelector("#sumBtn");

let array = [];

const addRows = () => {
    displayNumberOfWorkersAndSum();
    tableBody.innerHTML = "";

    array.forEach((item) => {
        tableBody.innerHTML += `
    <tr>
        <td><input type="checkbox"/></td>
        <td class="worker_name">${item.name}</td>
        <td class="worker_year">${item.year}</td>
        <td class="worker_date">${item.date}</td>
        <td class="worker_salary">${item.salary}</td>
    </tr>`;
    });
};

const displayNumberOfWorkersAndSum = () => {
    const numberOfWorkers = document.querySelector("#number-of-workers");
    numberOfWorkers.textContent = array.length;
    const salarySum = document.querySelector("#salary-sum");
    let sum = 0;
    array.forEach((item) => (sum += +item.salary));
    salarySum.textContent = sum;
};

const isUnique = (name, year, date, salary) => {
    let flag = true;
    array.forEach((item) => {
        if (
            item.name === name &&
            item.year === year &&
            item.date === date &&
            item.salary === salary
        ) {
            flag = false;
        }
    });
    return flag;
};

const deleteFromArray = (name, year, date, salary) => {
    array.splice(
        array.findIndex(
            (item) =>
            item.name === name &&
            item.year === year &&
            item.date === date &&
            item.salary === salary
        ),
        1
    );
};
removeBtn.addEventListener("click", () => {
    const checkBoxes = [
        ...document.querySelectorAll("input[type=checkbox]:checked"),
    ];

    checkBoxes.forEach((item) => {
        const parentTd = item.parentElement.parentElement;
        const workerName = parentTd.querySelector(".worker_name").textContent;
        const workerYear = parentTd.querySelector(".worker_year").textContent;
        const workerDate = parentTd.querySelector(".worker_date").textContent;
        const workerSalary = parentTd.querySelector(".worker_salary").textContent;

        deleteFromArray(workerName, workerYear, workerDate, workerSalary);
        addRows();
    });
});

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const year = document.querySelector("#year").value;
    const date = document.querySelector("#date").value;
    const salary = document.querySelector("#salary").value;

    if (isUnique(name, year, date, salary)) {
        array.push({ name: name, year: year, date: date, salary: salary });

        addRows();
    } else alert("Enter unique value!");
});

sumBtn.addEventListener("click", () => {
    const checkBoxes = [
        ...document.querySelectorAll("input[type=checkbox]:checked"),
    ];
    let sum = 0;
    const sumOfChecked = document.querySelector("#sumOfChecked");

    checkBoxes.forEach((item) => {
        const parentTd = item.parentElement.parentElement;
        const workerSalary = parentTd.querySelector(".worker_salary").textContent;
        sum += +workerSalary;
        sumOfChecked.innerHTML = `Sum = ${sum}`;
    });
});