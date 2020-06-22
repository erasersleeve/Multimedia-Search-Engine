// Variable for API Key.
var apiKey = "da090e9b";

// Function for the search button. User inputs a search term into the input box that is then transferred to a variable. 
$("#searchBtn").on("click", function() {
    searchTerm = $("#mediaSearch").val();
    
    // URL Base for API.
    var searchURL = "https://www.omdbapi.com/?s=" + searchTerm + "&apiKey=" + apiKey;
    var movieResultsDiv = $("#movieCol");
    var movieDiv = $("#movieResults")
    // var movieCardContainer = $("<div>");
    
    // movieCardContainer.attr("id", "moviecontain")
    
    // Empties the div, so that when the user inputs a new search, they can immediately identify their most recent search results.
    $("#moviecontain").empty();
    movieDiv.empty();
    // Send an AJAX call for the assembled URL to get the movie title.
    $.ajax({
      url: searchURL,
      method: "GET"
    }).then(function(movieGet) {
      console.log(movieGet);
    
    for (i=0; i<movieGet.Search.length; i++) {
  
      var searchIMDBid = movieGet.Search[i].imdbID;
      
      // URL Base for API.
      var idURL = "https://www.omdbapi.com/?i=" + searchIMDBid + "&apiKey=" + apiKey;
      
      // Send an AJAX call for the assembled URL to get various details of the movie from the array.
      $.ajax({ 
        url:idURL,
        method: "GET"
      }).then (function(idGet) {
        console.log(idGet);
        if (idGet.Title) {var movieTitle = idGet.Title}else{var movieTitle =" "}
        if (idGet.Director) {var director = idGet.Director}else{var director ="No director information available."}
        if (idGet.Plot) {var movieSynop = idGet.Plot}else{var movieSynop ="No synopsis available."}
        if (idGet.Poster && idGet.Poster !=="N/A") {var moviePoster = idGet.Poster}else{var moviePoster =""}
        if (idGet.Ratings[0]) {var imdbRating = idGet.Ratings[0]}else{var imdbRating =" "}
        
        // Variables to make new HTML elements for the card details (movie title, director, rating, and synopsis) and button is created to watch trailers.
        var movieResultsCard = $("<div>");
        var movieCoverImg = $("<img>");
        var movieCardTitle = $("<h4>");
        var movieCardDirector = $("<p>");
        var movieCardSynop = $("<p>");
        var movieCardRating = $("<p>");
        var trailerBtn = $("<button>");
        var lineBreak = $("<br>");
        movieCoverImg.attr("src", moviePoster);
        movieCardTitle.html(movieTitle);
        movieCardDirector.html(director);
        movieCardSynop.html(movieSynop);
        movieCardRating.html(imdbRating);
        
        // Button displayed. The title of the movie that is pulled is put into a variable where it is split and then separated by dashes.
        trailerBtn.text("Watch Trailer Here");
        var titleForLink = idGet.Title.split(" ").join("-");
        
        // On "click" function so that clicking the button will lead the user to IMDB where the title of their film is automatically inputted.
        trailerBtn.attr("onclick", `window.location.href= 'https://www.imdb.com/find?q=${titleForLink}';`);
        
        // Populates HTML with a card with the movie title, director, synopsis, button to access the trailer, and the poster image of the movie.
        movieResultsCard.append(movieCardTitle);
        movieResultsCard.append(movieCardDirector);
        movieResultsCard.append(movieCardSynop);
        movieResultsCard.append(trailerBtn);
        trailerBtn.css({"margin": "10px"});
        movieResultsCard.append(lineBreak);
        movieResultsCard.append(movieCoverImg);
        movieResultsCard.append(movieCardRating);
        movieResultsCard.attr("class", "card");
        movieDiv.append(movieResultsCard);
        movieResultsDiv.append(movieDiv);
        movieResultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
        })
    }
})
});

  // A keypress event function that is attached to the form (where the search term is inputted by the user).
    $("form").keypress(function(e) {
      if (e.which == 13) {
        return false;
      }
    });