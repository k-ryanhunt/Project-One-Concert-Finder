var text = ''
var buttonsearch = $("#buttonSearch")
// var bandName = '';

// function deezer() {
//     fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=", {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-key": "8d44b498cbmsh2179a60ff84b2a4p19a6fajsn4830609bdf3b",
//                 "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
//             }
//         })
//         .then(response => {
//             // console.log(response);
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }

function button() {
    text = $('.buttonText').val();
    ticketmaster()
    // deezer()
    console.log(text)
    console.log(artistName)

}

function ticketmaster() {
    $(".searchResults").empty();
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=FHlXGGy5pkbqcfKrq9TAErHgeV0EHiMb&city=" + text + "&classificationName=music&size=5",
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json)
            
            if (!json._embedded) {
                $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" + "You suck live in a better city" + "</div>")
            } else {
                var eventName = json._embedded.events
                if(text == "") {
                    $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" + "Please enter a city" + "</div>")
                } else {
                    for (var i = 0; i < eventName.length; i++) {
                        var artistName = json._embedded.events[i]._embedded.attractions[0].name
                        // console.log(artistName)
                        var bandName = eventName[i].name
                        var venueName = eventName[i]._embedded.venues[0].name
                        // second api gives us the variable "aristInfo"
                        if (!eventName[i].priceRanges) {

                            $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" +
                                "<li class='headliner'>" + bandName + "</li>" +
                                "<li class='venue'>" + "will be playing at the " + "</li>" +
                                "<li class='venueName'>" + venueName + "</li>" +
                                "<li class='price'>" + "there is no price ranges availible" + "</li>" + 
                                "<li>" + artistInfo + "<li>" +
                                "<a class='btn-floating btn-large pulse red accent-2' href=" + searchUrl + " target = _blank>" + "Buy" + "</a>" + "</div>")
                        }
                        else {

                            var minPrice = eventName[i].priceRanges[0].min
                            var maxPrice = eventName[i].priceRanges[0].max

                            var searchUrl = eventName[i].url
                            $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" +
                                "<li class='headliner'>" + bandName + "</li>" +
                                "<li class='venue'>" + "will be playing at the" + "</li>" +
                                "<li class='venueName'>" + venueName + "</li>" +
                                "<li class='price'>" + "Tickets range from: " + "$" + minPrice + " to " + "$" + maxPrice + "</li>" +
                                "<li>" + artistInfo + "<li>" +
                                "<a class='btn-floating btn-large pulse red accent-2' href=" + searchUrl + " target = _blank>" + "Buy" + "</a>" + "</div>")
                        }
                    }
                }
            }
        },

        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

buttonsearch.on('click', button);