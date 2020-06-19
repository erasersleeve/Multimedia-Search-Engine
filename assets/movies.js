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
      // var searchType = movieGet.Search[i].Type; Might be useful to display or sort by type 
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

        // console.log(idGet);
        console.log("Title: "+idGet.Title);
        console.log("Director: "+idGet.Director);
        console.log("Genre: "+idGet.Genre);
        console.log("Language: "+idGet.Language);
        console.log("Poster: "+idGet.Poster);
        console.log("Synopsis: "+idGet.Plot);
        console.log("Rating: "+idGet.Rated);
        console.log("Metascore: "+idGet.Metascore);
        console.log("IMDB rating: "+idGet.Ratings[0]);
        console.log("Rotten Tomatoes: "+idGet.Ratings[1]);
        console.log("Metacritic: "+idGet.Ratings[2]);
        console.log("Type: "+idGet.Type);
        console.log("Year: "+idGet.Year);
        console.log("Runtime: "+idGet.Runtime);


      })
    }
})
});