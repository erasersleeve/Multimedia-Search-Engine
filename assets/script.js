// Variable for API Key.
var googleKey = "AIzaSyCgSuPSLRf6S38F_qQ6Yssx2NdKM2mdtS0";

// Function for the search button. User inputs a search term into the input box that is then transferred to a variable. 
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchTerm = $("#mediaSearch").val();
    
    // URL Base for API.
    var googleUrl = "https://www.googleapis.com/books/v1/volumes?q="+searchTerm;
    var resultsDiv = $("#bookCol");
    var cardContainer = $("<div>");
    cardContainer.attr("id", "contain")
    
    // Empties the div, so that when the user inputs a new search, they can immediately identify their most recent search results.
    $("#contain").empty();
    
    // Send an AJAX call for the assembled URL to get the book title.
    $.ajax({
    url:googleUrl,
    method:"GET"
    }).then(function(bookGet){
    console.log(bookGet); 
    
    for (i=0; i<bookGet.items.length; i++){
    if (bookGet.items[i].searchInfo) {var synop = bookGet.items[i].searchInfo.textSnippet}else{var synop ="No synopsis available."}
    // Currently, the author detail only displays the first author. In the case of multiple authors, this is coded to ignore all listed, but the first.
    if (bookGet.items[i].volumeInfo.authors) {var authors = bookGet.items[i].volumeInfo.authors[0]}else{var authors ="No author information available."}
    if (bookGet.items[i].volumeInfo.title) {var title = bookGet.items[i].volumeInfo.title}else {var title=" " }
    if (bookGet.items[i].volumeInfo.subtitle) {var subtitle = bookGet.items[i].volumeInfo.subtitle}else {var subtitle=" "}
    if (bookGet.items[i].volumeInfo.imageLinks.thumbnail) {var coverLg = bookGet.items[i].volumeInfo.imageLinks.thumbnail}else {var coverLg=" "}
    if (bookGet.items[i].selfLink) { var selfLink = bookGet.items[i].selfLink} else {var selfLink=" "}
    if (bookGet.items[i].saleInfo.buyLink) { var buyLink = bookGet.items[i].saleInfo.buyLink} else {var buyLink="No link available to purchase book."}

    // Variables to make new HTML elements for the card details (book title, author, subtitle, and synopsis) and button is created to purchase book title.
    var resultsCard = $("<div>");
    var coverImg = $("<img>");
    var cardTitle = $("<h4>");
    var cardSubtitle = $("<p>");
    var cardAuthor = $("<p>");
    var cardSynop = $("<p>");
    var linkBtn = $("<button>");
    var lineBreak = $("<br>");

    cardTitle.text(title);
    cardSubtitle.text(subtitle);
    cardAuthor.text(authors);
    cardSynop.html(synop);
    
    // Button is displayed. On "click" function so that clicking the button will lead the user to Google Books, where the book can be purchased.
    linkBtn.text("Read on Google Books");
    linkBtn.attr("onclick", 'window.location.href= \'' + buyLink + '\';');
    
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
    resultsCard.append(linkBtn);
    linkBtn.css({"margin": "10px"})
    resultsCard.append(lineBreak)
    resultsCard.append(coverImg);
    cardContainer.append(resultsCard);
    resultsDiv.append(cardContainer);
    resultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
    
  }

})

})

  // A keypress event function that is attached to the form (where the search term is inputted by the user).
    $("form").keypress(function(e) {
      if (e.which == 13) {
        return false;
      }
    });