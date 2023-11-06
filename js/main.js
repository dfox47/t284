const specialTable = () => {
	const dataTable = document.querySelector('.js-data')
	const sortBy = document.querySelectorAll('.js-sort-by')
	const $pagination = document.querySelector('.js-pagination')

	if (!dataTable && !sortBy && !$pagination) return

	// sort by string and number pattern
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
		// reset table
		dataTable.innerHTML = ''

		// reset pagination
		$pagination.innerHTML = ''

		let itemCount = 0
		let itemPage = 0
		let isActive = 'active'
		let pages = []

		// id | name | value
		dataJson.forEach((e) => {
			if (itemCount % 5 === 0) {
				itemPage++

				pages.push(itemPage)
			}

			// show items only on 1st page
			isActive = (itemPage > 1) ? '' : 'active'

			dataTable.innerHTML += '<tr class="data_table__row js-table-row ' + isActive + '" data-page="' + itemPage + '"><td>' + e.id + '</td><td>' + e.name + '</td><td>' + e.value + '</td></tr>'

			itemCount++
		})

		// pagination
		pages.forEach((e) => {
			isActive = (e > 1) ? '' : 'active'

			$pagination.innerHTML += '<a href="javascript:void(0);" class="pagination__link js-page ' + isActive + '" data-id="' + e + '">' + e + '</a>'
		})
	}

	getData()
}

specialTable()