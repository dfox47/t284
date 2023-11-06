console.log('main.js loaded')

const dataTable = document.querySelector('.js-data')
const sortBy = document.querySelectorAll('.js-sort-by')

let dataJson = []
let sorted = []

sortBy.forEach((e) => {
	e.addEventListener('click', () => {
		const sortData = e.dataset.sort

		if (!sortData) return

		dataJson = dataJson.sort((a, b) => {
			return (a.sortData < b.sortData) ? -1 : 1
		})

		console.log('sortData | ', sortData)
		// console.log('dataJson | ', dataJson)

		console.log(JSON.parse(JSON.stringify(dataJson)))

		updateTable()
	})
})

const updateTable = () => {
	dataTable.innerHTML = ''

	// id | name | value
	dataJson.forEach((e) => {
		dataTable.innerHTML += '<tr><td>' + e.id + '</td><td>' + e.name + '</td><td>' + e.value + '</td></tr>'
	})
}

const getData = () => {
	fetch('js/data.json')
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			dataJson = data

			updateTable()
		})
}

getData()

console.log('end...')