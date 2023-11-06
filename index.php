<!doctype html>

<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta content="ie=edge" http-equiv="X-UA-Compatible">

	<link href="styles.min.css?v<?= (date("YmdHis")); ?>" rel="stylesheet">

	<title>Test 284</title>
</head>

<body>
<div class="wrapper">
	<h1>Test 284</h1>

	<form class="form_search js-form-search" action="/" method="post">
		<input class="form_search__input" type="text" name="search" placeholder="Фильтр">

		<label class="form_search__submit">
			<input type="submit">
			<span class="form_search__submit_text">OK</span>
		</label>
	</form>

	<table class="data_table">
		<thead>
		<tr>
			<td class="js-sort-by" data-sort="id">Id</td>
			<td class="js-sort-by" data-sort="name">Name</td>
			<td class="js-sort-by" data-sort="value">Value</td>
		</tr>
		</thead>

		<tbody class="js-data"></tbody>
	</table>
</div>

<script src="js/main.js?v<?= (date("YmdHis")); ?>"></script>
</body>
</html>