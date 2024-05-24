/*function searchMovie(e) {
    // Declare variables
    var input, filter, ul, li, a, i;
    //input = document.getElementById('searchInput');
    //filter = input.value.toUpperCase();
	filter = e.value.toUpperCase();
    ul = document.getElementById('searchable');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}*/

function searchMovie(e) {
    var input, filter, where, li, a, i;
	filter = e.value.toUpperCase();
	console.log(e.value);
    where = document.getElementById('searchable');
    item = where.getElementsByTagName('a');
	console.log(where);
	console.log(item);
	
    for (i = 0; i < item.length; i++) {
        a = item[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

/*function searchMovie(e){
	search = e.value.toLowerCase();
	console.log(e.value)
	document.querySelectorAll('.searchable').forEach(function(row){
		text = row.innerText.toLowerCase();
		if(text.match(search)){
			row.style.display = 'block'
		} else {
			row.style.disply = "none"
		}
	})
}*/