var text = ''
var lat = '';
var long = '';
var buttonsearch = $("#buttonSearch")
var bandName = '';






function deezer() {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=creed", {
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

}


function button() {
    text = $('.buttonText').val();
    ticketmaster()
    deezer()
    console.log(text)
}


function ticketmaster() {
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=FHlXGGy5pkbqcfKrq9TAErHgeV0EHiMb&city=" + text + "&classificationName=music&size=5",
        async: true,
        dataType: "json",
        success: function(json) {
            console.log(json);
            // Parse the response.
            // Do other things.
        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

buttonsearch.on('click', button);
