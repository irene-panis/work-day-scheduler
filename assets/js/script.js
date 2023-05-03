// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // loops through timeblocks and colors them based on current time
  function colorTimeBlocks() {
    $( '.time-block' ).each(function() {
      var hour = this.id.replace('hour-', '');
      if (dayjs().hour() > hour) {
        $( this ).removeClass( 'future present' ).addClass( 'past' );
      } else if (dayjs().hour() < hour) {
        $( this ).removeClass( 'past present' ).addClass( 'future' );
      } else {
        $( this ).removeClass( 'future past' ).addClass( 'present' );
      }
    });
  }
  
  // sets interval to run colorTimeBlocks and display current date in header every 60 seconds to account for time changes
  setInterval(() => {
    colorTimeBlocks();
    $( '#currentDay' ).text(dayjs().format('dddd - MMMM D, YYYY')); // displays current date and refreshes every min
  }, 60000); // re-color time blocks every minute (checks for hour changes)
  colorTimeBlocks(); // initialize time blocks
  $( '#currentDay' ).text(dayjs().format('dddd - MMMM D, YYYY')); // init current date
});
