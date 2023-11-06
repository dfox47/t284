const specialTable = () => {
	const dataTable = document.querySelector('.js-data')
	const sortBy = document.querySelectorAll('.js-sort-by')

	if (dataTable && sortBy) return

	const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'})

	let dataJson = []
	let lastSort = ''

	// sorting
	sortBy.forEach((e) => {
		e.addEventListener('click', () => {
			const sortData = e.dataset.sort

			if (!sortData) return

			// reverse already sorted array
			if (sortData === lastSort) {
				console.log('sorting by REVERSE')

				dataJson = dataJson.reverse()

				updateTable()

				return false
			}

			if (sortData === 'id') {
				dataJson = dataJson.sort((a, b) => {
					return (a.id - b.id)
				})
			} else if (sortData === 'value') {
				dataJson = dataJson.sort((a, b) => {
					return (a.value - b.value)
				})
			} else if (sortData === 'name') {
				dataJson = dataJson.sort((a, b) => collator.compare(a.name, b.name))
			}

			console.log('sorting by | ', sortData)

			lastSort = sortData

			updateTable()
		})
	})

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

	const updateTable = () => {
		dataTable.innerHTML = ''

		// id | name | value
		dataJson.forEach((e) => {
			dataTable.innerHTML += '<tr><td>' + e.id + '</td><td>' + e.name + '</td><td>' + e.value + '</td></tr>'
		})
	}

	getData()
}

specialTable()