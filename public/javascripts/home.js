$(function() {
  $(window).keydown(function (e) {
    if (e.which === 13) {
      var query = $('.search').val();
      window.location.href = '/search/' + query;
    }
  });
});