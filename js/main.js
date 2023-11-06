console.log('main.js loaded')

const dataTable = document.querySelector('.js-data')
const sortBy = document.querySelectorAll('.js-sort-by')

sortBy.forEach((e) => {
	e.addEventListener('click', () => {
		const sortData = e.dataset.sort

		console.log('sortData | ', sortData)
	})
})

const getData = () => {
	fetch("js/data.json")
		.then((res) => {
			return res.json()
		})
		// .then((data) => console.log(data))
		.then((data) => {
			console.log(data)

			// id | name | value
			data.forEach((e) => {
				dataTable.innerHTML += '<tr><td>' + e.id + '</td><td>' + e.name + '</td><td>' + e.value + '</td></tr>'
			})
		})
}

getData()

console.log('xx')