// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $( '#currentDay' ).text(dayjs().format('dddd - MMMM D, YYYY')); // init current date
});
