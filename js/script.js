const type = document.getElementById('type')
const constructor = document.getElementById("constructor")
const target = document.getElementById("target")
const create = document.getElementById("create")
const hidden = document.getElementById("hidden")

const triggers = new Set(["h1", "span", "p"])

constructor.addEventListener("dragstart", e => {
	if(e.target === e.currentTarget) return

	e.target.classList.add("dragging")
	e.dataTransfer.setData("text/plain", e.target.dataset.id)
})

target.addEventListener("dragover", e => e.preventDefault())

target.addEventListener("drop", e => {

	if(e.target.nodeName !== "DIV") return
	const id = e.dataTransfer.getData("text/plain")
	const droppable = document.querySelector(`[data-id="${id}"]`)

	e.target.appendChild(droppable)
	droppable.classList.remove("dragging")
	droppable.draggable = false
})

function createElem(tag, content){
	const newElement = document.createElement(tag)
	newElement.classList.add("created")
	newElement.draggable = true
	newElement.dataset.id = crypto.randomUUID()
	if(tag === "input") newElement.placeholder = 'input teg'
	if(content) newElement.innerHTML = `<pre>&#60;${tag}&#62;</pre> ${content}`
	else newElement.innerHTML = `<pre>&#60;${tag}&#62;</pre>`

	return newElement
}

function pushElement(node, target){
	target.appendChild(node)
}

type.addEventListener('change', function(){
	if(triggers.has(this.value)){
		hidden.type = "text"
	} else{
		hidden.type = "hidden"
		hidden.value = ""
	}
})

create.addEventListener('click', () => {
	const newElem = createElem(type.value, hidden.value)
	pushElement(newElem, constructor)
})