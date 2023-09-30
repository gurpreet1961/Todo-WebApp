const dateEle = document.getElementById("date");
const date = new Date();
const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const day = date.getDay();
const month = date.getMonth();
const dd = date.getDate();
const year = date.getFullYear();
dateEle.innerText = `${daysOfWeek[day - 1]}, ${months[month]} ${dd}, ${year}`;

const item = document.getElementById("todo-list");
let playload = {};
window.onload = function () {
	const data = localStorage.getItem("playload");
	if (data != null) {
		playload = JSON.parse(data);
		const playloadSize = Object.keys(playload).length;

		for (let i = 0; i < playloadSize; i++) {
			const newTodo = document.createElement("li");
			newTodo.className = "list-group-item p-3 px-4";
			if (playload[i].checked) {
				newTodo.innerHTML = `
        <input class="form-check-input me-1" id="todo-${
					i + 1
				}" type="checkbox" />
                <label class="form-check-label" for="todo-${i + 1}">
                <strike> ${playload[i].item} </strike>
                </label>
        `;
				item.append(newTodo);

				const checkbox = document.getElementById(`todo-${i + 1}`);
				checkbox.checked = true;
			} else {
				newTodo.innerHTML = `
        <input class="form-check-input me-1" id="todo-${
					i + 1
				}" type="checkbox" />
                <label class="form-check-label" for="todo-${i + 1}">
                  ${playload[i].item}
                </label>
        `;
				item.append(newTodo);

				const checkbox = document.getElementById(`todo-${i + 1}`);
				checkbox.checked = false;
			}
		}
	}
};
const submitButtom = document.getElementById("button-addon2");
submitButtom.addEventListener("click", (e) => {
	e.preventDefault();
	const todo = document.getElementsByTagName("input");
	const newItem = todo[0].value;
	if (newItem === "") {
	} else {
		const playloadSize = Object.keys(playload).length;
		const obj = { item: newItem, checked: false };

		playload[`${playloadSize}`] = obj;
		const allTodos = JSON.stringify(playload);
		localStorage.setItem("playload", allTodos);
		const newTodo = document.createElement("li");
		newTodo.className = "list-group-item p-3 px-4";
		newTodo.innerHTML = `
    <input class="form-check-input me-1" id="todo-${
			playloadSize + 1
		}" type="checkbox" />
            <label class="form-check-label" for="todo-${playloadSize + 1}">
              ${newItem}
            </label>
    `;
		item.append(newTodo);
	}
	todo[0].value = "";
	todo[0].focus();
});

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", (e) => {
	item.innerHTML = "";
	localStorage.removeItem("playload");
	for (const key in playload) {
		delete playload[key];
	}
});

item.addEventListener("click", (e) => {
	if (e.target.tagName === "INPUT") {
		if (e.target.checked) {
			const label = e.target.labels[0];
			const value = label.innerHTML;
			label.innerHTML = `
      <strike>${value}</strike>
      `;
			const id = e.target.id;
			const idx = id.substring(5) - 1;
			playload[idx].checked = true;
			const allTodos = JSON.stringify(playload);
			localStorage.setItem("playload", allTodos);
		} else {
			const label = e.target.labels[0];
			const value = label.innerText;
			label.innerHTML = `${value}`;
			const id = e.target.id;
			const idx = id.substring(5) - 1;
			playload[idx].checked = false;
			const allTodos = JSON.stringify(playload);
			localStorage.setItem("playload", allTodos);
		}
	}
});
