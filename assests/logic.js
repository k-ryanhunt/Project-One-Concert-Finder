fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8d44b498cbmsh2179a60ff84b2a4p19a6fajsn4830609bdf3b",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});


fetch("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=FHlXGGy5pkbqcfKrq9TAErHgeV0EHiMb", {
	"method": "GET"
	}
)
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});



// $.ajax({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=FHlXGGy5pkbqcfKrq9TAErHgeV0EHiMb",
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.
//                 // Do other things.
//              },
//     error: function(xhr, status, err) {
//                 // This time, we do not end up here!
//              }
//   });