console.log("Hrrer")

$.ajax({
    url: 'http://localhost:3000/users/profile',
    
    error: function (err) {
      console.log(err)
    },
    contentType: 'application/json',
    success: function (data) {

      dataarray = data
      console.log(dataarray)


    },
    complete: function (data) {

      $(el).closest('.card-body').find('span').text(renamedata)
      toBeRenamed = 1
    },
    type: 'GET'
  });


  $.ajax({
    url: 'http://localhost:3000/movies/popular/10',
    
    error: function (err) {
      console.log(err)
    },
    contentType: 'application/json',
    success: function (data) {

      dataarray = data
      console.log(JSON.parse(dataarray))


    },
    complete: function (data) {

      // $(el).closest('.card-body').find('span').text(renamedata)
      // toBeRenamed = 1
    },
    type: 'GET'
  });