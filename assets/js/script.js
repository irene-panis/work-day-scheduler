// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // adds eventlistener for clicks to every saveBtn
  // clicking save saves textarea content to local storage using timeblock id
  $( '.saveBtn' ).on( 'click', function() {
    var block = this.parentElement.id;
    var content = this.previousElementSibling.value;
    localStorage.setItem(block, content);
  });

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

  // for each textarea box, retrieve stored content using corresponding timeblock id
  function getLocalStorage() {
    $( '.description' ).each(function() {
      var savedContent = localStorage.getItem(this.parentElement.id);
      this.value = savedContent;
    });
  }
  
  // sets interval to run colorTimeBlocks and display current date in header every 60 seconds to account for time changes
  function checkTime() {
    setInterval(() => {
      colorTimeBlocks();
      $( '#currentDay' ).text(dayjs().format('dddd - MMMM D, YYYY')); // displays current date and refreshes every min
    }, 60000); // re-color time blocks every minute (checks for hour changes)
  }

  function init() {
    $( '#currentDay' ).text(dayjs().format('dddd - MMMM D, YYYY')); // displays current date
    colorTimeBlocks(); // style time blocks
    checkTime(); // runs interval time checker
    getLocalStorage(); // displays stored values in text boxes if there are any
  }

  init(); // initialize :)
});
