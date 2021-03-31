var text = ''
var buttonsearch = $("#buttonSearch")
// var bandName = '';





function deezer() {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "8d44b498cbmsh2179a60ff84b2a4p19a6fajsn4830609bdf3b",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        })
        .then(response => {
            // console.log(response);
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
    $(".searchResults").empty();
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=FHlXGGy5pkbqcfKrq9TAErHgeV0EHiMb&city=" + text + "&classificationName=music&size=5",
        async: true,
        dataType: "json",
        success: function(json) {
            console.log(json)
            var eventName = json._embedded.events
            if (text == "") { 
                $(".searchResults").append("please enter something")
            } else {
            for (var i = 0; i < eventName.length; i++) {
                 var bandName = eventName[i].name
                 var venueName = eventName[i]._embedded.venues[0].name
                // we need to add an if statement for areas with no min/max prices (see slack message)
                 var minPrice = eventName[i].priceRanges[0].min
                 var maxPrice = eventName[i].priceRanges[0].max
                 var searchUrl = eventName[i].url
                 $(".searchResults").append("<div class='eventInfo'>" +
                "<div><li>" + "the band name is: " + bandName + "</li>" +
                "<li>" + "the venue is: " + venueName + "</li>" +
                "<li>" + "prices range from:" + "$" + minPrice + " to " + "$" + maxPrice + "</li>" +
                "<a href=" + searchUrl + " target = _blank>" +"click here for tickets" + "</a>"+ "</div>")
                 
            }
        }
        },
        
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

buttonsearch.on('click', button);
