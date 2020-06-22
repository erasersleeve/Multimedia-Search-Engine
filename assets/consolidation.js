// Variable for API Key.
var googleKey = "AIzaSyCgSuPSLRf6S38F_qQ6Yssx2NdKM2mdtS0";
var omdbKey = "da090e9b";
// Function for the search button. User inputs a search term into the input box that is then transferred to a variable. 
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchTerm = $("#mediaSearch").val();

    // URL Base for books.
    var googleUrl = "https://www.googleapis.com/books/v1/volumes?q="+searchTerm;
    var resultsDiv = $("#bookCol");
    var bookDiv = $("#bookResults");

    // URL Base for movies.
    var searchURL = "https://www.omdbapi.com/?s=" + searchTerm + "&apiKey=" + omdbKey;
    var movieResultsDiv = $("#movieCol");
    var movieDiv = $("#movieResults");

    // Empties the divs, so that when the user inputs a new search, they can immediately identify their most recent search results.
    bookDiv.empty();
    movieDiv.empty();
    // Send an AJAX call for the assembled URL to get the book information.
    $.ajax({
    url:googleUrl,
    method:"GET"
    }).then(function(bookGet){
    console.log(bookGet); 
    
        for (i=0; i<bookGet.items.length; i++){
        if (bookGet.items[i].searchInfo) {var synop = bookGet.items[i].searchInfo.textSnippet}else{var synop ="No synopsis available."}
        // Currently, the author detail only displays the first author. In the case of multiple authors, this is coded to ignore all listed, but the first.
        if (bookGet.items[i].volumeInfo.authors) {var authors = bookGet.items[i].volumeInfo.authors[0]}else{var authors ="No author information available."}
        if (bookGet.items[i].volumeInfo.title) {var title = bookGet.items[i].volumeInfo.title}else {var title=" "}
        if (bookGet.items[i].volumeInfo.subtitle) {var subtitle = bookGet.items[i].volumeInfo.subtitle}else {var subtitle=" "}
        if (bookGet.items[i].volumeInfo.imageLinks.thumbnail) {var coverLg = bookGet.items[i].volumeInfo.imageLinks.thumbnail}else {var coverLg=" "}
        // if (bookGet.items[i].selfLink) { var selfLink = bookGet.items[i].selfLink} else {var selfLink=" "}
        if (bookGet.items[i].volumeInfo.pageCount) {var pageCount = "Page Count: "+bookGet.items[i].volumeInfo.pageCount} else {var pageCount = ""}
        if (bookGet.items[i].volumeInfo.publishedDate) {var publishedDate ="Published: "+bookGet.items[i].volumeInfo.publishedDate} else {var publishedDate = ""}
        if (bookGet.items[i].volumeInfo.averageRating) {var averageRating = "Average Rating: "+bookGet.items[i].volumeInfo.averageRating+"/5"} else {var averageRating = ""}
        if (bookGet.items[i].saleInfo.buyLink) { 
        var buyLink = bookGet.items[i].saleInfo.buyLink; 
        var linkBtn = $("<button>");
        // linkBtn.text("Read on Google Books");linkBtn.attr("onclick", 'window.location.href= \'' + buyLink + '\';');linkBtn.attr("class", "btn blue lighten-1 waves-effect waves-light");linkBtn.css({"margin": "10px"});
        linkBtn.text("Read on Google Books");linkBtn.attr("onclick", `window.open('${buyLink}', '_blank');`);linkBtn.attr("class", "btn blue lighten-1 waves-effect waves-light");linkBtn.css({"margin": "10px"});
        } 
        

        else {var buyLink="No link available to purchase book."}

        // Variables to make new HTML elements for the card details (book title, author, subtitle, and synopsis) and button is created to purchase book title.
        var resultsCard = $("<div>");
        var coverImg = $("<img>");
        var cardTitle = $("<h4>");
        var cardSubtitle = $("<p>");
        var cardAuthor = $("<p>");
        var cardSynop = $("<p>");
        var cardPageCount = $("<p>");
        var cardPublishedDate = $("<p>");
        var cardAverageRating = $("<p>");
        // var linkBtn = $("<button>");
        var lineBreak = $("<br>");

        cardTitle.text(title);
        cardSubtitle.text(subtitle);
        cardAuthor.text(authors);
        cardSynop.html(synop);
        cardPageCount.html(pageCount);
        cardPublishedDate.html(publishedDate);
        cardAverageRating.html(averageRating);
        
        // Button is displayed. On "click" function so that clicking the button will lead the user to Google Books, where the book can be purchased.
        //linkBtn.text("Read on Google Books");linkBtn.attr("onclick", 'window.location.href= \'' + buyLink + '\';');linkBtn.attr("class", "btn blue lighten-1 waves-effect waves-light");
    
        // Image of the book cover is manipulated, so that the image size is consistent with that of the poster images for the movies.
        coverImg.attr("src", coverLg);
        coverImg.attr("width", 300);
        coverImg.attr("height", 400);
        resultsCard.attr("class", "card");
        
        // Populates HTML with a card with the book title, author, synopsis, button to purchase the book, and the cover image of the book.
        resultsCard.append(cardTitle);
        resultsCard.append(cardSubtitle);
        resultsCard.append(cardAuthor);
        resultsCard.append(cardSynop);
        resultsCard.append(cardPageCount);
        resultsCard.append(cardPublishedDate);
        resultsCard.append(cardAverageRating);
        resultsCard.append(linkBtn);
        resultsCard.append(lineBreak);
        resultsCard.append(coverImg);
        bookDiv.append(resultsCard);
        resultsDiv.append(bookDiv);
        resultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
        
        }

    })

    // Send an AJAX call for the assembled URL to get the movie title.
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function(movieGet) {
        // console.log(movieGet);

      for (i=0; i<movieGet.Search.length; i++) {
    
        var searchIMDBid = movieGet.Search[i].imdbID;
        
        // URL Base for API.
        var idURL = "https://www.omdbapi.com/?i=" + searchIMDBid + "&apiKey=" + omdbKey;
        
        // Send an AJAX call for the assembled URL to get information 
        $.ajax({ 
          url:idURL,
          method: "GET"
        }).then (function(idGet) {
          console.log(idGet);
          if (idGet.Title) {var movieTitle = idGet.Title}else{var movieTitle =" "}
          if (idGet.Director!=="N/A") {var director = idGet.Director}else{var director ="No director information available."}
          if (idGet.Plot) {var movieSynop = idGet.Plot}else{var movieSynop ="No synopsis available."}
          if (idGet.Poster && idGet.Poster !=="N/A") {var moviePoster = idGet.Poster}else{var moviePoster =""}
          if (idGet.Ratings[0]) {var imdbRating = "IMDB rating: "+idGet.Ratings[0].Value}else{var imdbRating =" "}
          //I don't know that the blank variable strings will have the desired results in this case and the case above. Poster should be fine
          //Rated will return N/A from api if there is nothing. Changing it so simply not exist
          if (idGet.Rated!=="N/A") {var rated = "Rating: "+idGet.Rated}else{var rated="MPA rating not available"}
          if (idGet.Runtime) {var runtime = "Runtime: "+idGet.Runtime}else{var runtime=""}
          if (idGet.Released){var released = "Released: "+idGet.Released}else{var released=""}
          
          // Variables to make new HTML elements for the card details (movie title, director, rating, and synopsis) and button is created to watch trailers.
          var movieResultsCard = $("<div>");
          var movieCoverImg = $("<img>");
          var movieCardTitle = $("<h4>");
          var movieCardDirector = $("<p>");
          var movieCardSynop = $("<p>");
          var movieCardRating = $("<p>");
          var movieCardRated = $("<p>");
          var movieCardRuntime = $("<p>");
          var movieCardReleased = $("<p>");
          var trailerBtn = $("<button>");
          var lineBreak = $("<br>");
          movieCoverImg.attr("src", moviePoster);
          movieCardTitle.html(movieTitle);
          movieCardDirector.html(director);
          movieCardSynop.html(movieSynop);
          movieCardRating.html(imdbRating);
          movieCardRated.html(rated);
          movieCardRuntime.html(runtime);
          movieCardReleased.html(released);

          
          // Button displayed. The title of the movie that is pulled is put into a variable where it is split and then separated by dashes.
          trailerBtn.text("Find Trailer Here");
          trailerBtn.attr("class", "btn blue lighten-1 waves-effect waves-light");
          var titleForLink = idGet.Title.split(" ").join("-");
          
          // On "click" function so that clicking the button will lead the user to IMDB where the title of their film is automatically inputted.
          trailerBtn.attr("onclick", `window.open('https://www.imdb.com/find?q=${titleForLink}', '_blank');`);
          
          // Populates HTML with a card with the movie title, director, synopsis, button to access the trailer, and the poster image of the movie.
          movieResultsCard.append(movieCardTitle);
          movieResultsCard.append(movieCardDirector);
          movieResultsCard.append(movieCardSynop);
          movieResultsCard.append(movieCardRating);
          movieResultsCard.append(movieCardRated);
          movieResultsCard.append(movieCardRuntime);
          movieResultsCard.append(movieCardReleased);
          movieResultsCard.append(trailerBtn);
          trailerBtn.css({"margin": "10px"});
          movieResultsCard.append(lineBreak);
          movieResultsCard.append(movieCoverImg);
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