$(document).ready(function(){

var artists = ["Modest Mouse", "Animal Collective", "Flying Lotus", "Grizzly Bear", 
"Nujabes", "Aphex Twin", "Squarepusher", "Clipse", "The Strokes", "Lil B", "Gorillaz",  
"Local Natives", "Mac Demarco", "A Tribe Called Quest", "Black Star",
"Common", "Death Grips", "Kanye West", "Panda Bear", "Danny Brown", "suh du", "Radiohead"];


//  function for displaying the buttons
function renderButtons() {

	// deletes buttons prior to adding new ones to avoid repeats 
	$("#buttons").empty();

	//loops through the array of artists
	for (var i = 0; i < artists.length; i++){

		// dynamically generate buttons for each artist in the array
		var a = $("<button type='button' class='btn btn-primary'>    ");
		// add a class
		a.addClass("artist");
		// add attribute
		a.attr("data-name", artists[i]);
		// add button text
		a.text(artists[i]);
		// put it in the dom
		$("#buttons").append(a);
	}
}

// displaying the gifs and ratings
function displayGif() {
	var artist = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=9afb8f5d4c4b492c9afe06afb0904326&limit=10";

	// ajax calling
	$.ajax({
		url: queryURL,
		method: "GET"

	// displaying the new gifs after clicking button
	}).done(function(response){
		$("#artists").html("");
		console.log(response);
		holder = response;
		
		// looping through 10 responses
		for (i = 0; i < response.data.length; i++){


			$("#artists").prepend("<div id='"+i+"' class='frozen' > <img src='" + response.data[i].images.fixed_height_still.url + "'><br>" 
				+ "<span> Rating: " + response.data[i].rating + "</span></div><br>");

		}


		$(".frozen" || ".running").on("click", function(){
			
			// checking what class the image has
			var classCheck = $(this).attr('class');
			console.log(classCheck);


			// if div is in the frozen class
			if(classCheck === 'frozen'){
			var idCheck = $(this).attr('id');
			console.log(idCheck);
			$("img", this).attr("src", holder.data[idCheck].images.fixed_height.url);
			$(this).attr("class", "running")
			console.log(this);
			}

			// if div is in the running class
			else if(classCheck === 'running'){
			var idCheck = $(this).attr('id');
			console.log(idCheck);
			$("img", this).attr("src", holder.data[idCheck].images.fixed_height_still.url);
			$(this).attr("class", "frozen")
			console.log(this);
			}

			
		});
	});
}

// Adding click event listeners to all elements with a class of "artist" aka our buttons
// when button is clicked displayGif runs 
$(document).on("click", ".artist", displayGif);




// when add artist button is clicked
$("#add-artist").on("click", function(event){
	event.preventDefault();

	// grabbing input from textbox
	var singer = $("#input").val().trim();

	// add input to the button array
	artists.push(singer);

	// call renderButtons to reset the new array
	renderButtons();

});

// calling function to display initial buttons
renderButtons();






console.log(artists);


































})