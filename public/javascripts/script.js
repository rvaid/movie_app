var hostname = 'http://ec2-13-232-91-43.ap-south-1.compute.amazonaws.com:3000';
$(document).ready(function(){	
   
   var tab=location.hash;
   console.log(tab);
  
   
front_path="http://image.tmdb.org/t/p/w92/";
   $(window).on('hashchange', function() {
      var tab=location.hash;
      
       //alert(profobj);
 if (tab == "#Profile") {
   $.ajax({

        url: hostname + '/users/profile',
        
        error: function (err) {
          console.log(err)
        },
        contentType: 'application/json',
        success: function (data) {
    
          dataobj = JSON.parse(data);

        //   console.log(JSON.parse(dataarray))
    
    
        },
        complete: function (data) {

            profile_load(dataobj);
    
          // $(el).closest('.card-body').find('span').text(renamedata)
          // toBeRenamed = 1
        },
        type: 'GET'
      });//ajax to profile load
   //profile_load(profobj);
 }
 else if(tab=="#search"){

 }
 else{
   console.log("for home load");
   $.ajax({

        url: hostname + '/movies/popular/1',
        
        error: function (err) {
          console.log(err)
        },
        contentType: 'application/json',
        success: function (data) {
    
          dataobj = JSON.parse(data);

        //   console.log(JSON.parse(dataarray))
    
    
        },
        complete: function (data) {

            home_load(dataobj);
    
          // $(el).closest('.card-body').find('span').text(renamedata)
          // toBeRenamed = 1
        },
        type: 'GET'
      });//ajax for home_load

   //home_load(dataobj);
 }
 // We are triggering the event. This will execute 
 // this function on page load, so that we show the correct folder:

 }).trigger('hashchange');
function home_load(dataobj) {
    $("#profile").hide();
      $("#main").show();
       $(".head h1").text("Most Popular");
  console.log("in home_load",dataobj);
pagination(dataobj);
parse_movie(dataobj);
$(".pagination").on("click",".page-item",function(){
  // console.log(cp)
	$(".card").each(function() {
		$(this).hide();
	})
	var topage=$(this).attr("id");
   $.ajax({

        url: hostname + '/movies/popular/'+topage,
        
        error: function (err) {
          console.log(err)
        },
        contentType: 'application/json',
        success: function (data) {
         
          dataobj = JSON.parse(data);
          pagination(dataobj);
        //   console.log(JSON.parse(dataarray))
    
    
        },
        complete: function (data) {

            parse_movie(dataobj);
    
          // $(el).closest('.card-body').find('span').text(renamedata)
          // toBeRenamed = 1
        },
        type: 'GET'
      });//page_change
	//console.log("in on click");

	//pagination(topage);
	//parse_movie(dataobj);
})//func on click pagination

$(".card").on("click","i",function(){
   var movie_obj=JSON.parse($(this).closest(".card").attr("prop"));
   var movie_name=movie_obj.original_title;
   var movie_id=movie_obj.id;
   console.log(movie_name, movie_id);
   var hasLiked = 2
   var obj ={}
	var response= $.trim($(this).text());
	if(response=="sentiment_very_satisfied"){
     hasLiked = 1
   	if($(this).css("color","green")){
      
   		$(".material-icons").each(function(){
   			$(this).css("color","black");
   		});
       
   		$(this).css("color","green");
         
   	}
   	else{
      hasLiked = 2
   		$(this).css("color","black");
   	}
   }
   if(response=="sentiment_very_dissatisfied"){
    hasLiked = 0
   	if($(this).css("color","red")){
       
   		$(".material-icons").each(function(){
   			$(this).css("color","black");
   		})
   		$(this).css("color","red");
   	}
   	else{
       hasLiked = 2
   		$(this).css("color","black");
   	}
   }
   $.ajax({

    url: hostname + '/users/like',
    data : JSON.stringify({"MovieName":movie_name, "hasLiked":hasLiked}),
    
    error: function (err) {
      console.log(err)
    },
    contentType: 'application/json',
    success: function (data) {
     
      console.log(data)
    //   console.log(JSON.parse(dataarray))


    },
    complete: function (data) {

        alert("Success")

      // $(el).closest('.card-body').find('span').text(renamedata)
      // toBeRenamed = 1
    },
    type: 'POST'
  });
	
})// func on click icon
};//home_load
   function profile_load(profobj) {
      $("#main").hide();
      $("#profile").show();
      console.log(profobj);
      $(".head h1").text("Your Profile");
      $("#prof_content").append("<div class='col-md-4 card' style='overflow-y:inherit;' id='prof_image'></div>");
      $("#prof_image").append("<img src='"+profobj[0].profilePicUrl+"'>Display Pic</img>");
      // $("#prof_image").append("<img class='card-img' style='height:inherit;' src='css/images/movie2.jpg' alt='Card image'>");
      $("#prof_content #prof_image").after("<div id='prof_details'class='col-md-8' style='height:500px;display:inline-block;'></div>");
      $("#prof_details").append("<p>NAME: "+profobj[0].displayName+" </p>");
      $("#prof_details").append("<ul id='movie_like'><span>Movies you liked:</span> </ul>");
      $("#prof_details").append("<ul id='movie_unlike'><span>Movies you didn't like so much: </span></ul>");
      $.each(profobj,function(i,val) {
      if(val.hasLiked=="1"){
         $.each(val.MovieName,function(j,name){
      $("#prof_details #movie_like").append("<li>"+name+" </li>");
         })
      }
      else if(val.hasLiked=="0"){
         $.each(val.MovieName,function(j,name){
      $("#prof_details #movie_unlike").append("<li>"+name+" </li>");
         })
      }
      });

      /*$("#navigation ul li a").each(function() {
         if($(this).attr("href")=="#HOME"){
            $(this).removeClass("active");
         }
         else{
            $(this).addClass("active");
         }
      });*/
   };//profile loas
$("#search").on('click',function(){
   search_title= $("#search-field").val();
   if(search_title.length!=0){
     $.ajax({

        url: hostname + '/movies/search/1',
        data : JSON.stringify({"keyword" : search_title}),
        
        error: function (err) {
          console.log(err)
        },
        contentType: 'application/json',
        success: function (data) {
         
          dataobj = JSON.parse(data);
          console.log(dataobj)
          search_movie(dataobj);
    
        },
        complete: function (data) {

           
    
          // $(el).closest('.card-body').find('span').text(renamedata)
          // toBeRenamed = 1
        },
        type: 'POST'
      });
   }
   //page_change
//    search_movie(sample_obj);
})//form_submit
function search_movie(searchobj) {
    // pagination(searchobj)
   parse_movie(searchobj);
}//search_movie
function parse_movie(dataobj){
   console.log("in parse_movie");
   $(".card").each(function(){
      $(this).hide();
   })
   moviearray=dataobj.results;
   $.each(moviearray,function(i,val) {
      create_card(i,val);
      //console.log(i,val);
   })
}// func parse_movie
function create_card(i,movieobj){
   //movieobj.poster_path=$.trim(movieobj.poster_path);

   if($.find("#"+movieobj.id).length<=0){
   complete_path=front_path+movieobj.poster_path;
   card_path=(i==0)? ".box .first" : ".box .card:last";
   $(card_path).after("<div class='card' style='width:30%' id='"+movieobj.id+"' prop='"+JSON.stringify(movieobj)+"'></div>");
   $("#"+movieobj.id).append("<div class='card-header'><i class='material-icons' style='font-size:24px;color:black'>sentiment_very_satisfied</i><i class='material-icons' style='font-size:24px;color:black'>sentiment_very_dissatisfied</i> <span style='color:black;float:right'>"+movieobj.vote_average+"/10</span> </div>")
   $("#"+movieobj.id).append("<img class='card-img-top' src='"+front_path+movieobj.poster_path+"' alt='Card image'></img>");
   //$("#"+movieobj.id).append("<img class='card-img-top' src='css/images/movie1.jpg' alt='Card image'></img>");
   $(".box #"+movieobj.id).append("<div class='card-body'></div>");
   $(".box #"+movieobj.id+" .card-body").append("<h4 class='card-title'>"+movieobj.original_title+"</h4>");
   $(".box #"+movieobj.id+" .card-body").append(" <p class='card-text'>"+movieobj.overview+"</p>");
   $("#"+movieobj.id).append("<br/>")
   }
   else{
      $("#"+movieobj.id).show();
   }
   //console.log(complete_path);

}// func create_card
function pagination(dataobj) {
   var cp=dataobj.page;
   console.log("in pagination");
   $(".pagination li").each(function () {
      $(this).remove();
   })
   if(cp<=3){
      // $(".pagination").append("<li class='page-item' id='Prrevious'><a class='page-link' href='#''>Previous</a></li>");
      $(".pagination").append("<li class='page-item'id='1'><a class='page-link' href='#''>1</a></li>");
      $(".pagination").append("<li class='page-item'id='2'><a class='page-link' href='#''>2</a></li>");
      $(".pagination").append("<li class='page-item'id='3'><a class='page-link' href='#''>3</a></li>");
      $(".pagination").append("<li class='page-item'id='none'><a class='page-link' href='#''>...</a></li>");
      $(".pagination").append("<li class='page-item'id='"+dataobj.total_pages+"'><a class='page-link' href='#''>"+dataobj.total_pages+"</a></li>");
      $(".pagination").append("<li class='page-item'id='"+(cp+1)+"'><a class='page-link' href='#''>Next</a></li>");
   }
   else if(cp>=dataobj.total_pages-3){
      $(".pagination").append("<li class='page-item' id='"+(cp-1)+"'><a class='page-link' href='#''>Previous</a></li>");
      $(".pagination").append("<li class='page-item'id='1'><a class='page-link' href='#''>1</a></li>");
      $(".pagination").append("<li class='page-item'id='none'><a class='page-link' href='#''>...</a></li>");
      $(".pagination").append("<li class='page-item'id='"+(dataobj.total_pages-2)+"'><a class='page-link' href='#''>"+(dataobj.total_pages-2)+"</a></li>");
      $(".pagination").append("<li class='page-item'id='"+(dataobj.total_pages-1)+"'><a class='page-link' href='#''>"+(dataobj.total_pages-1)+"</a></li>");
      $(".pagination").append("<li class='page-item'id='"+dataobj.total_pages+"'><a class='page-link' href='#''>"+dataobj.total_pages+"</a></li>");
      // $(".pagination").append("<li class='page-item'id='Next'><a class='page-link' href='#''>Next</a></li>");
   }
   else{
      $(".pagination").append("<li class='page-item' id='"+(cp-1)+"'><a class='page-link' href='#''>Previous</a></li>");
      $(".pagination").append("<li class='page-item'id='1'><a class='page-link' href='#''>1</a></li>");
      $(".pagination").append("<li class='page-item'id='2'><a class='page-link' href='#''>2</a></li>");
      $(".pagination").append("<li class='page-item'id='3'><a class='page-link' href='#''>3</a></li>");
      $(".pagination").append("<li class='page-item' id='none'><a class='page-link' href='#''>...</a></li>");
      $(".pagination").append("<li class='page-item' id='"+(cp-1)+"'><a class='page-link' href='#''>"+(cp-1)+"</a></li>");
      $(".pagination").append("<li class='page-item' id='"+(cp)+"'><a class='page-link' href='#''>"+(cp)+"</a></li>");
      $(".pagination").append("<li class='page-item' id='"+(cp+1)+"'><a class='page-link' href='#''>"+(cp+1)+"</a></li>");
      $(".pagination").append("<li class='page-item'id='none'><a class='page-link' href='#''>...</a></li>");
      $(".pagination").append("<li class='page-item'id='"+(dataobj.total_pages-2)+"'><a class='page-link' href='#''>"+(dataobj.total_pages-2)+"</a></li>");
      $(".pagination").append("<li class='page-item'id='"+(dataobj.total_pages-1)+"'><a class='page-link' href='#''>"+(dataobj.total_pages-1)+"</a></li>");
      $(".pagination").append("<li class='page-item'id='"+dataobj.total_pages+"'><a class='page-link' href='#''>"+dataobj.total_pages+"</a></li>");
      $(".pagination").append("<li class='page-item'id='"+(cp+1)+"'><a class='page-link' href='#''>Next</a></li>");
   }
   $(".pagination").find("#"+cp).addClass("active");
   
}// func pagination
});//document.ready