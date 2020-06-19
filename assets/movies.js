// Setup Variables
var apiKey = "da090e9b";

$("#searchBtn").on("click", function() {
    searchTerm = $("#mediaSearch").val();
    var searchURL = "https://www.omdbapi.com/?s=" + searchTerm + "&apiKey=" + apiKey;
    $.ajax({
      url: searchURL,
      method: "GET"
    }).then(function(movieGet) {
    // console.log(movieGet);
    // console.log(movieGet.Search[0].Title);
    // console.log(movieGet.Search[0].imdbID);
    // console.log(movieGet.Search[0].Type);
    // console.log(movieGet.Search[0].Poster);
    for (i=0; i<9; i++) {
    
      var searchTitle = movieGet.Search[i].Title;
      var searchIMDBid = movieGet.Search[i].imdbID;
      var searchType = movieGet.Search[i].Type;
      var searchPoster = movieGet.Search[i].Poster;
      var resultsCard = $("<div>");
      var resultsDiv = $("#movieCol");
      var moviePosterImg = $("<img>");
      var cardMovieTitle = $("<h4>");
      moviePosterImg.attr("src", searchPoster);
      cardMovieTitle.text(searchTitle);
      resultsCard.attr("class", "card");
      resultsCard.append(cardMovieTitle);
      resultsCard.append(moviePosterImg);
      resultsDiv.append(resultsCard);
      resultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
      var idURL = "https://www.omdbapi.com/?i=" + searchIMDBid + "&apiKey=" + apiKey;
      $.ajax({ 
        url:idURL,
        method: "GET"
      }).then (function(idGet) {

        console.log(idGet);

      })
    }
})
});