function Func() {
	fetch("data.json")
		.then((res) => {
			return res.json()
		})
		.then((data) => console.log(data))
}

Func()

console.log('xx')