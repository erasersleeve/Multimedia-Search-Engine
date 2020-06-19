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
        var title = movieGet.Search[i].Title;
        // var movieYear = movieGet.Search[i].Year;
        var resultsDiv = $("#searchResults");
        var resultsCard = $("<div>");
        var moviePosterImg = $("<img>");
        var cardTitle = $("<h4>");
        moviePosterImg.attr("src", moviePoster);
        cardTitle.text(title);
        resultsCard.attr("class", "card");
        resultsCard.append(moviePosterImg);
        resultsCard.append(cardTitle);
        resultsDiv.append(resultsCard);
        resultsCard.css({"border-style": "solid", "margin": "20px"});
        }
    })
    });