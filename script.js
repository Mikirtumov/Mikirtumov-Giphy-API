

var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

      
      function displaygifInfo() {

        var gifs = $(this).attr("data-name");
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifs +"&api_key=uCuE13gVSqSNvnCZWnJZt1QOGAmyrhfR&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
         
            var apiResult = response.data;
            for (var i=0; i<apiResult.length; i++){
                var myDiv = $("<div class='gifitems'>");
                var gifRating = apiResult[i].rating;
                var paragraph = $("<p>").text("rating " + gifRating);
                var animated = apiResult[i].images.fixed_height.url;
                var still = apiResult[i].images.fixed_height_still.url;
                var newGif = $("<img>");
                newGif.attr("src",still);
                newGif.attr("data-still",still);
                newGif.attr("data-animated",animated);
                newGif.addClass("my-gifs");
                myDiv.append(paragraph, newGif);
                $("#images").append(myDiv);
                
                
                console.log(apiResult[i]);
            }
        

        });
      }


      function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < gifs.length; i++) {

          var a = $("<button>").addClass("btn btn-dark");
          a.addClass("gif");
          a.attr("data-name", gifs[i]);
          a.text(gifs[i]);
          $("#buttons-view").append(a);
        }
      }

     
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
      });

      $(document).on("click", ".gif", displaygifInfo);
      renderButtons();

      $(document).on("click", ".my-gifs", function(){
        var moventnt = $(this).attr("data-state");
        if (moventnt === "still"){
          $(this).attr("src",$(this).attr("data-animated"));
          $(this).attr("data-state", "animated");
          console.log(moventnt);
        }else{
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state", "still");
          console.log(moventnt);
        }
      });