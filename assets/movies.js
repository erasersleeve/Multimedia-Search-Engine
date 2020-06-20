// Setup Variables
var apiKey = "da090e9b";

$("#searchBtn").on("click", function() {
    searchTerm = $("#mediaSearch").val();
    var searchURL = "https://www.omdbapi.com/?s=" + searchTerm + "&apiKey=" + apiKey;
    var movieResultsDiv = $("#movieCol");
    var movieCardContainer = $("<div>");
    movieCardContainer.attr("id", "moviecontain") //can probably make this a class and share one command, or just use one to clear both sides
    $("#moviecontain").empty();
    $.ajax({
      url: searchURL,
      method: "GET"
    }).then(function(movieGet) {
      console.log(movieGet);
    // console.log(movieGet);
    // console.log(movieGet.Search[0].Title);
    // console.log(movieGet.Search[0].imdbID);
    // console.log(movieGet.Search[0].Type);
    // console.log(movieGet.Search[0].Poster);
    for (i=0; i<movieGet.Search.length; i++) {
    
      // var searchTitle = movieGet.Search[i].Title;
      // var searchType = movieGet.Search[i].Type; Might be useful to display or sort by type 
      // var searchPoster = movieGet.Search[i].Poster;
      // var resultsCard = $("<div>");
      // var resultsDiv = $("#movieCol");
      // var moviePosterImg = $("<img>");
      // var cardMovieTitle = $("<h4>");
      // moviePosterImg.attr("src", searchPoster);
      // cardMovieTitle.text(searchTitle);
      // resultsCard.attr("class", "card");
      // resultsCard.append(cardMovieTitle);
      // resultsCard.append(moviePosterImg);
      // resultsDiv.append(resultsCard);
      // resultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
      var searchIMDBid = movieGet.Search[i].imdbID;
      var idURL = "https://www.omdbapi.com/?i=" + searchIMDBid + "&apiKey=" + apiKey;
      $.ajax({ 
        url:idURL,
        method: "GET"
      }).then (function(idGet) {


        // console.log(idGet);
        // console.log("Title: "+idGet.Title);
        // console.log("Director: "+idGet.Director);
        // console.log("Genre: "+idGet.Genre);
        // console.log("Language: "+idGet.Language);
        // console.log("Poster: "+idGet.Poster);
        // console.log("Synopsis: "+idGet.Plot);
        // console.log("Rating: "+idGet.Rated);
        // console.log("Metascore: "+idGet.Metascore);
        // console.log("IMDB rating: "+idGet.Ratings[0]);
        // console.log("Rotten Tomatoes: "+idGet.Ratings[1]);
        // console.log("Metacritic: "+idGet.Ratings[2]);
        // console.log("Type: "+idGet.Type);
        // console.log("Year: "+idGet.Year);
        // console.log("Runtime: "+idGet.Runtime);
       
        // var movieTitle = idGet.Title;
        // var director = idGet.Director;
        // var movieSynop = idGet.Plot;
        // var moviePoster = idGet.Poster;
        // var imdbRating = idGet.Ratings[0];
        // var imdbType = idGet.Type;
        // var imdbYear = idGet.Year;
        // var runtime = idGet.Runtime;
        if (idGet.Title) {var movieTitle = idGet.Title}else{var movieTitle ="Error"}
        if (idGet.Director) {var director = idGet.Director}else{var director ="Error"}
        if (idGet.Plot) {var movieSynop = idGet.Plot}else{var movieSynop ="Error"}
        if (idGet.Poster) {var moviePoster = idGet.Poster}else{var moviePoster ="Error"}
        if (idGet.Ratings[0]) {var imdbRating = idGet.Ratings[0]}else{var imdbRating ="Error"}

        
        var movieResultsCard = $("<div>");
        var movieCoverImg = $("<img>");
        var movieCardTitle = $("<h4>");
        var movieCardDirector = $("<p>");
        var movieCardSynop = $("<p>");
        var movieCardRating = $("<p>");
        
        movieCoverImg.attr("src", moviePoster);
        movieCardTitle.html(movieTitle);
        movieCardDirector.html(director);
        movieCardSynop.html(movieSynop);
        movieCardRating.html(imdbRating);
        movieResultsCard.append(movieCardTitle);
        movieResultsCard.append(movieCardDirector);
        movieResultsCard.append(movieCardSynop);
        movieResultsCard.append(movieCoverImg);
        movieResultsCard.append(movieCardRating);
        movieResultsCard.attr("class", "card");
        movieCardContainer.append(movieResultsCard);
        movieResultsDiv.append(movieCardContainer);
        movieResultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
        })
    }
})
});

$("form").keypress(function(e) {
  if (e.which == 13) {
    return false;
  }
});