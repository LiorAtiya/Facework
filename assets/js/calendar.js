var cal = {
  /* [PROPERTIES] */
  mName : ["1", "2", "3", "4", "5", "6", "7", "8" ,"9", "10", "11", "12"], // Month Names
  data : null, // Events for the selected period
  sDay : 0, // Current selected day
  sMth : 0, // Current selected month
  sYear : 0, // Current selected year
  sMon : false, // Week start on Monday?

  /* [FUNCTIONS] */
  list : function () {
  // cal.list() : draw the calendar for the given month

    // BASIC CALCULATIONS
    // Note - Jan is 0 & Dec is 11 in JS.
    // Note - Sun is 0 & Sat is 6
    cal.sMth = parseInt(document.getElementById("cal-mth").value); // selected month
    cal.sYear = parseInt(document.getElementById("cal-yr").value); // selected year
    var daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), // number of days in selected month
        startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // first day of the month
        endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(); // last day of the month

    // LOAD DATA FROM LOCALSTORAGE
    cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
    if (cal.data==null) {
      localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
      cal.data = {};
    } else {
      cal.data = JSON.parse(cal.data);
    }

    // DRAWING CALCULATIONS
    // Determine the number of blank squares before start of month
    var squares = [];
    if (cal.sMon && startDay != 1) {
      var blanks = startDay==0 ? 7 : startDay ;
      for (var i=1; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && startDay != 0) {
      for (var i=0; i<startDay; i++) { squares.push("b"); }
    }

    // Populate the days of the month
    for (var i=1; i<=daysInMth; i++) { squares.push(i); }

    // Determine the number of blank squares after end of month
    if (cal.sMon && endDay != 0) {
      var blanks = endDay==6 ? 1 : 7-endDay;
      for (var i=0; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && endDay != 6) {
      var blanks = endDay==0 ? 6 : 6-endDay;
      for (var i=0; i<blanks; i++) { squares.push("b"); }
    }

    // DRAW HTML
    // Container & Table
    var container = document.getElementById("cal-container"),
        cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Days
    var cRow = document.createElement("tr"),
        cCell = null,
        days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    if (cal.sMon) { days.push(days.shift()); }
    for (var d of days) {
      cCell = document.createElement("td");
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Days in Month
    var total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (var i=0; i<total; i++) {
      cCell = document.createElement("td");
      if (squares[i]=="b") { cCell.classList.add("blank"); }
      else {
        cCell.innerHTML = "<div class='dd'>"+squares[i]+"</div>";
        if (cal.data[squares[i]]) {
          // cCell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
          cCell.innerHTML += "<div class='evt'>" + "" + "</div>";
          if (cal.data[squares[i]] === 'Full'){
            cCell.style.background = '#FF4C4C';
          }
        }
        cCell.addEventListener("click", function(){
          cal.show(this);
        });
      }
      cRow.appendChild(cCell);
      if (i!=0 && (i+1)%7==0) {
        cTable.appendChild(cRow);
        cRow = document.createElement("tr");
        cRow.classList.add("day");
      }
    }

    // REMOVE ANY ADD/EDIT EVENT DOCKET
    cal.close();
  },

  show : function (el) {
  // cal.show() : show edit event docket for selected day
  // PARAM el : Reference back to cell clicked

    // FETCH EXISTING DATA
    cal.sDay = el.getElementsByClassName("dd")[0].innerHTML;

    // DRAW EVENT
    // var tForm = "<h1>" + (cal.data[cal.sDay] ? "ערוך" : "הוסף") + " פגישה</h1>";
    var tForm = "<h1>שעות פנויות</h1>";
    tForm += "<div id='evt-date'>" +cal.sYear+ " / " +cal.mName[cal.sMth]+ " / " + cal.sDay + "</div>";
    tForm += "<textarea id='evt-details' class='text-center' required>" + (cal.data[cal.sDay] ? cal.data[cal.sDay] : "") + "</textarea>";
    tForm += "<input type='button' class='btn' style='background-color:#9C27B0 ;font-size: 15px;' value='סגירה' onclick='cal.close()'/>";
    tForm += "<input type='button' class='btn' style='background-color:#9C27B0 ;font-size: 15px;' value='מחיקה' onclick='cal.del()'/>";
    tForm += "<input type='submit' class='btn' style='background-color:#9C27B0 ;font-size: 15px;' value='שמירה'/>";

    //DRAW FORM
    var tDetails = "<h1> קביעת תור </h1>";
    tDetails += '<form method="GET"><table class="text-center" width="300px" height="150px" cellspacing="10">';
    tDetails += '<tr><td width="90">שם מלא</td><td width="198"><input type="text" name="fullname" required/></td></tr>';
    tDetails += '<tr><td>מספר פלאפון</td><td><input type="tel" name="phone" required/></td></tr>';
    tDetails += '<tr><td>שעה</td><td><select name="color"><option value="red">11:00</option><option value="black">12:00</option><option value="green">13:00</option></select></td></tr>';
    tDetails += '<tr><td>סוג תספורת</td><td><select name="color"><option value="red">קצר</option><option value="black">ארוך</option><option value="green">מיוחד</option></select></td></tr></table>';
    tDetails += '<button class="btn" style="background-color:#9C27B0"; type="submit">שלח</button></form>';


    // ATTACH
    var eForm = document.createElement("form");
    eForm.addEventListener("submit", cal.save);
    eForm.innerHTML = tForm;
    var container = document.getElementById("cal-event");
    container.innerHTML = "";

    var eDetails = document.createElement("form");
    // eDetails.addEventListener("submit", cal.form);
    eDetails.innerHTML = tDetails;
    container.appendChild(eDetails);

    container.appendChild(eForm);

  },

  close : function () {
  // cal.close() : close event docket

    document.getElementById("cal-event").innerHTML = "";
  },

  save : function (evt) {
  // cal.save() : save event

    evt.stopPropagation();
    evt.preventDefault();
    cal.data[cal.sDay] = document.getElementById("evt-details").value;
    localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));
    cal.list();
  },

  del : function () {
  // cal.del() : Delete event for selected date

    if (confirm("Remove event?")) {
      delete cal.data[cal.sDay];
      localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));
      cal.list();
    }
  }
};

// INIT - DRAW MONTH & YEAR SELECTOR
window.addEventListener("load", function () {
  // DATE NOW
  var now = new Date(),
      nowMth = now.getMonth(),
      nowYear = parseInt(now.getFullYear());

  // APPEND MONTHS SELECTOR
  var month = document.getElementById("cal-mth");
  for (var i = 0; i < 12; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cal.mName[i];
    if (i==nowMth) { opt.selected = true; }
    month.appendChild(opt);
  }

  // APPEND YEARS SELECTOR
  // Set to 10 years range. Change this as you like.
  var year = document.getElementById("cal-yr");
  for (var i = nowYear; i<=nowYear+10; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    if (i==nowYear) { opt.selected = true; }
    year.appendChild(opt);
  }

  // START - DRAW CALENDAR
  document.getElementById("cal-set").addEventListener("click", cal.list);
  cal.list();
});