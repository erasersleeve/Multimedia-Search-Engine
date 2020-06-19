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
        // console.log(bookGet); 
        
        for (i=0; i<9; i++){
        
        var title = bookGet.items[i].volumeInfo.title;
        var subtitle = bookGet.items[i].volumeInfo.subtitle;
        var authors = bookGet.items[i].volumeInfo.authors[0]; //in case of multiple authors this won't work
        var coverSm = bookGet.items[i].volumeInfo.imageLinks.smallThumbnail; //img link
        var synop = bookGet.items[i].searchInfo.textSnippet;
        var buyLink = bookGet.items[0].saleInfo.buyLink;
         
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
        cardBuy.text("Link to purchase: "+buyLink);
        coverImg.attr("src", coverSm);
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