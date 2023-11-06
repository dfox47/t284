const specialTable = () => {
	const dataTable = document.querySelector('.js-data')
	const sortBy = document.querySelectorAll('.js-sort-by')
	const $pagination = document.querySelector('.js-pagination')
	const $searchInput = document.querySelector('.js-search-input')

	if (!dataTable && !sortBy && !$pagination) return

	// sort by string and number pattern
	const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'})

	let dataJson = []
	let lastSort
	let sortedJson

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
				sortedJson = dataJson.sort((a, b) => {
					return (a.id - b.id)
				})
			} else if (sortData === 'value') {
				sortedJson = dataJson.sort((a, b) => {
					return (a.value - b.value)
				})
			} else if (sortData === 'name') {
				sortedJson = dataJson.sort((a, b) => collator.compare(a.name, b.name))
			}

			console.log('sorting by | ', sortData)

			lastSort = sortData

			updateTable(sortedJson)
		})
	})

	const getData = () => {
		fetch('js/data.json')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				dataJson = data

				updateTable(dataJson)
			})
	}

	const updateTable = (jsonData) => {
		// reset table
		dataTable.innerHTML = ''

		// reset pagination
		$pagination.innerHTML = ''

		let itemCount = 0
		let itemPage = 0
		let isActive = 'active'
		let pages = []

		// id | name | value
		jsonData.forEach((e) => {
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

	const paginationChange = () => {
		$pagination.addEventListener('click', (e) => {
			if (e.target.classList.contains('js-page')) {
				const selectedPage = e.target.dataset.id

				dataTable.querySelectorAll('.js-table-row').forEach((tableRow) => {
					if (selectedPage === tableRow.dataset.page) {
						tableRow.classList.add('active')

						return
					}

					tableRow.classList.remove('active')
				})

				$pagination.querySelectorAll('.js-page').forEach((item) => {
					if (selectedPage === item.dataset.id) {
						item.classList.add('active')

						return
					}

					item.classList.remove('active')
				})
			}
		})
	}

	const searchChange = () => {
		let searchResult

		const searchVal = $searchInput.value.toLowerCase()

		searchResult = dataJson.filter((e) => {
				return e.name.toLowerCase().indexOf(searchVal) > -1
			}
		)

		updateTable(searchResult)
	}

	$searchInput.addEventListener('input', searchChange)

	getData()
	paginationChange()
}

specialTable()