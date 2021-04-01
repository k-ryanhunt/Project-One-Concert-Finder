var text = ''
var buttonsearch = $("#buttonSearch")
var band = []
    // var bandName = '';
function button() {
    text = $('.buttonText').val();
    ticketmaster()
    console.log(text)
        // console.log(artistName)
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
            if (!json._embedded) {
                $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" + "There are no events in this city. <br> Please enter another city." + "</div>")
            } else {
                var eventName = json._embedded.events
                if (text == "") {
                    $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" + "Please enter a city" + "</div>")
                } else {
                    for (var i = 0; i < eventName.length; i++) {
                        var artistName = json._embedded.events[i]._embedded.attractions[0].name
                        console.log(artistName)
                        band = [artistName]
                        console.log(band)
                        var bandName = eventName[i].name
                        var venueName = eventName[i]._embedded.venues[0].name
                            // second api gives us the variable "aristInfo"
                        var LastFM = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + band + '&api_key=78661b1408a61c6f77a83efc09f78da4&format=json'

                        if (!eventName[i].priceRanges) {
                            $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" +
                                "<li class='headliner'>" + bandName + "</li>" +
                                "<li class='venue'>" + "will be playing at the " + "</li>" +
                                "<li class='venueName'>" + venueName + "</li>" +
                                "<li class='price'>" + "Ticket range is unavailable for this event." + "</li>" +
                                // "<li>" + artistInfo + "<li>" +
                                "<a class='btn-floating btn-large pulse red accent-2' href=" + searchUrl + " target = _blank>" + "Buy" + "</a>" + "</div>")
                        } else {
                            var minPrice = eventName[i].priceRanges[0].min
                            var maxPrice = eventName[i].priceRanges[0].max
                            var searchUrl = eventName[i].url
                            $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" +
                                "<li class='headliner'>" + bandName + "</li>" +
                                "<li class='venue'>" + "will be playing at the" + "</li>" +
                                "<li class='venueName'>" + venueName + "</li>" +
                                "<li class='price'>" + "Tickets range from: " + "$" + minPrice + " to " + "$" + maxPrice + "</li>" +
                                // "<li>" + artistInfo + "<li>" +
                                "<a class='btn-floating btn-large pulse red accent-2' href=" + searchUrl + " target = _blank>" + "Buy" + "</a>" + "</div>")
                        }
                    }
                    for (var i = 0; i < eventName.length; i++)
                        fetch(LastFM)
                        .then(
                            function(data) {
                                return data.json();
                            })
                        .then(response => {
                                console.log(response);
                            }

                        )
                };
            }
        },

        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

buttonsearch.on('click', button);