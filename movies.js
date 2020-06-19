// Setup Variables
    var apiKey = "cc1189b";

    $("#searchBtn").on("click", function() {
        movie = $("#searchBox").val();
    
        var queryURL = "https://www.omdbapi.com/?s=" + movie + "&apiKey=" + apiKey;
        
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
        resultsCard.append(moviePosterImg);
        resultsCard.append(cardMovieTitle);
        resultsDiv.append(resultsCard);
        resultsCard.css({"border-style": "solid", "margin": "20px"});
        }
    })
    });