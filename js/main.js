console.log('main.js loaded')

const getData = () => {
	fetch("js/data.json")
		.then((res) => {
			return res.json()
		})
		.then((data) => console.log(data))
}

getData()

console.log('xx')