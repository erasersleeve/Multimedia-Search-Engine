// Setup Variables
var apiKey = "da090e9b";

$("#searchBtn").on("click", function() {
    searchTerm = $("#mediaSearch").val();

    var queryURL = "https://www.omdbapi.com/?s=" + searchTerm + "&apiKey=" + apiKey;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(movieGet) {
      console.log(movieGet);
    
    for (i=0; i<9; i++) {

    var moviePoster = movieGet.Search[i].Poster;
    var movieTitle = movieGet.Search[i].Title;
    var resultsDiv = $("#movieCol");
    var resultsCard = $("<div>");
    var moviePosterImg = $("<img>");
    var cardMovieTitle = $("<h4>");
    moviePosterImg.attr("src", moviePoster);
    cardMovieTitle.text(movieTitle);
    resultsCard.attr("class", "card");
    resultsCard.append(cardMovieTitle);
    resultsCard.append(moviePosterImg);
    resultsDiv.append(resultsCard);
    resultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
    }
})
});