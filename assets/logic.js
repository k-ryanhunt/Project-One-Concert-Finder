var text = ''
var buttonsearch = $("#buttonSearch")
var band = []
var count = 0
var history = $(".History")
    // var bandName = '';
function button() {
    text = $('.buttonText').val();
    ticketmaster()
    band = []
    localStorage.setItem(count, text)
    count = count + 1
}

function ticketmaster() {
    $(".searchResults").empty();
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=FHlXGGy5pkbqcfKrq9TAErHgeV0EHiMb&city=" + text + "&classificationName=music&size=5",
        async: true,
        dataType: "json",
        success: function(json) {
            // console.log(json)
            if (!json._embedded) {
                $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" + "There are no events in this city. <br> Please enter another city." + "</div>")
            } else {
                var eventName = json._embedded.events
                if (text == "") {
                    $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" + "Please enter a city" + "</div>")
                } else {
                    for (var i = 0; i < eventName.length; i++) {
                        var artistName = json._embedded.events[i]._embedded.attractions[0].name
                            // console.log(artistName)
                        band.push(artistName)
                        var bandName = eventName[i].name
                        var venueName = eventName[i]._embedded.venues[0].name
                            // second api gives us the variable "aristInfo"
                        if (!eventName[i].priceRanges) {
                            $(".searchResults").append("<div class='eventInfo card-panel small center-align'>" +
                                "<li class='headliner'>" + bandName + "</li>" +
                                "<li class='venue'>" + "Will be playing at the" + "</li>" +
                                "<li class='venueName'>" + venueName + "</li>" +
                                "<li class='price'>" + "There are no avaliable ticket prices</li>" +
                                "<li class = 'artistInfoResults" + [i] + "'> <li>" +
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
                                "<li class = 'artistInfoResults" + [i] + "'> <li>" +
                                "<a class='btn-floating btn-large pulse red accent-2' href=" + searchUrl + " target = _blank>" + "Buy" + "</a>" + "</div>")
                        }
                    }
                    let LastFM0 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + band[0] + '&api_key=78661b1408a61c6f77a83efc09f78da4&format=json'
                    fetch(LastFM0)
                        .then(
                            function(response) {
                                return response.json();
                            })
                        .then(data => {
                            $(".artistInfoResults0").empty();
                            var artistInfo = data.artist.bio.summary
                            $(".artistInfoResults0").text(artistInfo)
                        })
                    let LastFM1 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + band[1] + '&api_key=78661b1408a61c6f77a83efc09f78da4&format=json'
                    fetch(LastFM1)
                        .then(
                            function(response) {
                                return response.json();
                            })
                        .then(data => {
                            var artistInfo = data.artist.bio.summary
                            $(".artistInfoResults1").text(artistInfo)
                        })
                    let LastFM2 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + band[2] + '&api_key=78661b1408a61c6f77a83efc09f78da4&format=json'
                    fetch(LastFM2)
                        .then(
                            function(response) {
                                return response.json();
                            })
                        .then(data => {
                            var artistInfo = data.artist.bio.summary
                            $(".artistInfoResults2").append(artistInfo)
                        })
                    let LastFM3 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + band[3] + '&api_key=78661b1408a61c6f77a83efc09f78da4&format=json'
                    fetch(LastFM3)
                        .then(
                            function(response) {
                                return response.json();
                            })
                        .then(data => {
                            var artistInfo = data.artist.bio.summary
                            $(".artistInfoResults3").append(artistInfo)
                        })
                    let LastFM4 = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + band[4] + '&api_key=78661b1408a61c6f77a83efc09f78da4&format=json'
                    fetch(LastFM4)
                        .then(
                            function(response) {
                                return response.json();
                            })
                        .then(data => {
                            var artistInfo = data.artist.bio.summary
                            $(".artistInfoResults4").append(artistInfo)
                        })
                };
            }
        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}
buttonsearch.on('click', button);



for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".History").addClass("listGroupItem");
    cityName.append('<li>' + city + '</li>');
}