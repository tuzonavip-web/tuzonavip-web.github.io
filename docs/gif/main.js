/* Dark Comfort for EMDB by R3gi, Czech Republic, 2018.12.16 */

/* Jets Search configuration */
var jets = new Jets({
	searchTag: '#searchInput',
	contentTag: '.searchable',
	diacriticsMap: {
	  a: 'ÀÁÂÃÄÅàáâãäåĀāąĄ',
	  c: 'ÇçćĆčČ',
	  d: 'đĐďĎ',
	  e: 'ÈÉÊËèéêëěĚĒēęĘ',
	  i: 'ÌÍÎÏìíîïĪī',
	  l: 'łŁ',
	  n: 'ÑñňŇńŃ',
	  o: 'ÒÓÔÕÕÖØòóôõöøŌō',
	  r: 'řŘ',
	  s: 'ŠšśŚ',
	  t: 'ťŤ',
	  u: 'ÙÚÛÜùúûüůŮŪū',
	  y: 'ŸÿýÝ',
	  z: 'ŽžżŻźŹ'
	},
	callSearchManually: true,
	didSearch: function(search_phrase) {
		localStorage.setItem('search_input', search_phrase);
		console.log('Search input has been stored: ' + search_phrase)
		var headers	= document.getElementsByClassName('category_header'),
			sr_hb	= document.getElementsByClassName('search_hide_b'),
			sr_hib	= document.getElementsByClassName('search_hide_ib'),
			sr_hfr	= document.getElementsByClassName('search_hide_fr'),
			sr_sb	= document.getElementsByClassName('search_show_b'),
			sr_sib	= document.getElementsByClassName('search_show_ib'),
			sr_sfr	= document.getElementsByClassName('search_show_fr');
		if (search_phrase) { // When results displayed
			for (let i=0; i<headers.length; i+=1) {
				headers[i].style.display = 'none';
			}
			for (let i=0; i<sr_hb.length; i+=1) {
				sr_hb[i].style.display = 'none';
			}
			for (let i=0; i<sr_hib.length; i+=1) {
				sr_hib[i].style.display = 'none';
			}
			for (let i=0; i<sr_hfr.length; i+=1) {
				sr_hfr[i].style.display = 'none';
			}
			for (let i=0; i<sr_sb.length; i+=1) {
				sr_sb[i].style.display = 'block';
			}
			for (let i=0; i<sr_sib.length; i+=1) {
				sr_sib[i].style.display = 'inline-block';
			}
		} else { // When no search
			for (let i=0; i<headers.length; i+=1) {
				headers[i].style.display = 'block';
			}
			for (let i=0; i<sr_hb.length; i+=1) {
				sr_hb[i].style.display = 'block';
			}
			for (let i=0; i<sr_hib.length; i+=1) {
				sr_hib[i].style.display = 'inline-block';
			}
			for (let i=0; i<sr_sb.length; i+=1) {
				sr_sb[i].style.display = 'none';
			}
			for (let i=0; i<sr_sib.length; i+=1) {
				sr_sib[i].style.display = 'none';
			}
			for (let i=0; i<sr_hfr.length; i+=1) {
				sr_hfr[i].style.display = 'flow-root';
			}
		}
		// When search results displayed, but no results found
		let nr = document.getElementById('no_results'),
			hasResults = $('.searchable a:visible').length;
		if ( ! hasResults) {
			console.log('No results')
			nr.style.display = 'block';
		} else {
			console.log('Results shown')
			nr.style.display = 'none';
		}
	}
});

function checkStorage() {
	let storage,
		fail,
		uid;
	try {
		uid = new Date;
		(storage = window.localStorage).setItem(uid, uid);
		fail = storage.getItem(uid) != uid;
		storage.removeItem(uid);
		fail && (storage = false);
	} catch (exception) {}
};

function reset() { // Clear search results
	console.log('Reset triggered');
	document.getElementById('searchInput').value = '';
	jets.search('');
};

function updateNavPage(e) { // Store visited page
	localStorage.setItem('last_page', e);
};

function settings(r,s) {
	if (r) { // Settings – Restore search results
		let sr = localStorage.getItem('s_restore_results');
		if ((sr == 'true') || (! sr)) {
			localStorage.setItem('s_restore_results', 'false');
		} else {
			localStorage.setItem('s_restore_results', 'true');
		}
	}
	if (s) { // Settings – Sticky menu
		let st = localStorage.getItem('s_sticky_menu');
		if ((st == 'true') || (! st)) {
			localStorage.setItem('s_sticky_menu', 'false');
		} else {
			localStorage.setItem('s_sticky_menu', 'true');
		}
	}
};

function manageResults(e) {
	checkStorage();
	localStorage.setItem('current_page', e);
	let p = localStorage.getItem('last_page'),
		c = localStorage.getItem('current_page'),
		s = localStorage.getItem('search_input'),
		sr = localStorage.getItem('s_restore_results'),
		ss = localStorage.getItem('s_sticky_menu');

	if (! p) {
		localStorage.setItem('last_page', e);
	}

	console.log('Last page: ' + p);
	console.log('Current page: ' + c);

	if (! sr) {
		localStorage.setItem('s_restore_results', 'true');
	}
	
	if (! ss) {
		localStorage.setItem('s_sticky_menu', 'true');
	}

	if ((sr == 'false') && (c != 'movie')) {
		console.log('Remember results unchecked')
		document.getElementById('s_remeber_results').checked = false;
	}
	
	if (ss == 'false') {
		console.log('Sticky menu unchecked')
		document.getElementById('s_sticky_menu').checked = false;
	}

	if (s != '') {
		if (c != 'movie') {
			if ((p != c) && (sr !== 'false')) {
				// Restore results if not the same page or disabled restoring
				console.log('Restoring results for: ' + s);
				document.getElementById('searchInput').value = s;
				jets.search(s);
			} else {
				console.log('No last search at all or page reload.');
				reset();
			}
		} else {
			console.log('This is a movie page. Nothing to do.');
		}
	} else {
		console.log('No last search.');
	}
};