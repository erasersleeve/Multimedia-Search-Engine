var googleKey = "AIzaSyCgSuPSLRf6S38F_qQ6Yssx2NdKM2mdtS0";

    
    $("#searchBtn").on("click", function(event){
        event.preventDefault();
        searchTerm = $("#mediaSearch").val();
        // console.log(searchTerm);
        var googleUrl = "https://www.googleapis.com/books/v1/volumes?q="+searchTerm;
        var resultsDiv = $("#bookCol");
        var cardContainer = $("<div>");
        cardContainer.attr("id", "contain")
        $("#contain").empty();
        $.ajax({
        url:googleUrl,
        method:"GET"
        }).then(function(bookGet){
        console.log(bookGet); 
        
        for (i=0; i<9; i++){
        
        var title = bookGet.items[i].volumeInfo.title;
        var subtitle = bookGet.items[i].volumeInfo.subtitle;
        var coverLg = bookGet.items[i].volumeInfo.imageLinks.thumbnail; //img link
        // var buyLink = bookGet.items[i].saleInfo.buyLink;
        var selfLink = bookGet.items[i].selfLink;
        
        // var authors = bookGet.items[i].volumeInfo.authors[0]; //in case of multiple authors this won't work
        // var synop = bookGet.items[i].searchInfo.textSnippet;
        
        //Some objects return without a searchInfo array and will break the page, this checks to see if there is an index before calling it
        if (bookGet.items[i].searchInfo) {var synop = bookGet.items[i].searchInfo.textSnippet;}else{var synop ="Error"}
        //Some pages do not provide author information, causing similar problem as above
        //Currently author only displays the first author, in the case of multiple authors this ignores all but the first
        if (bookGet.items[i].volumeInfo.authors) {var authors = bookGet.items[i].volumeInfo.authors[0];}else{var authors ="Error"}

        var resultsCard = $("<div>");
        var coverImg = $("<img>");
        var cardTitle = $("<h4>");
        var cardSubtitle = $("<p>");
        var cardAuthor = $("<p>");
        var cardSynop = $("<p>");
        var cardBuy = $("<p>");
        cardTitle.text(title);
        cardSubtitle.text(subtitle);
        cardAuthor.text(authors);
        cardSynop.html(synop);
        cardBuy.text("Link to gbooks: "+ selfLink);
        coverImg.attr("src", coverLg);
        coverImg.attr("width", 300);
        coverImg.attr("height", 400);
        resultsCard.attr("class", "card");
        resultsCard.append(cardTitle);
        resultsCard.append(cardSubtitle);
        resultsCard.append(cardAuthor);
        resultsCard.append(cardSynop);
        resultsCard.append(cardBuy);
        resultsCard.append(coverImg);
        cardContainer.append(resultsCard);
        resultsDiv.append(cardContainer);
        resultsCard.css({"border-bottom": "solid", "margin": "20px", "padding": "20px"});
        }

    })

    })

    $("form").keypress(function(e) {
        if (e.which == 13) {
          return false;
        }
      });