var alteredFouls = 0;

function returnToEdit()
{
//  var buttonTop = document.getElementById("topbutton");
//  buttonTop.setAttribute("onClick", "convertRosters()");
//  buttonTop.innerHTML = "Continue Game";

  document.getElementById("Home_Roster").setAttribute("style", HomeRosterStyle);
  document.getElementById("Visitor_Roster").setAttribute("style", VisitorRosterStyle);

  var tmp = document.getElementById("Home_Print");
  if(tmp != null) document.body.removeChild(tmp);

  tmp = document.getElementById("Visitor_Print");
  if(tmp != null) document.body.removeChild(tmp);

  tmp = document.getElementById("halfTimeArea");
  if(tmp != null) document.body.removeChild(tmp);


  var i, j;

  if(alteredFouls == 1)
  {
      for(i = 0; i < HomeTeamRoster.length; i++)
        for(j = 0; j < rosterSize; j++)
          if(document.getElementById("Home_Number_"+j).value == HomeTeamRoster[i].number)
            document.getElementById("Home_Fouls_"+j).selectedIndex = HomeTeamRoster[i].fouls;


      for(i = 0; i < AwayTeamRoster.length; i++)
        for(j = 0; j < rosterSize; j++)
          if(document.getElementById("Visitor_Number_"+j).value == AwayTeamRoster[i].number)
            document.getElementById("Visitor_Fouls_"+j).selectedIndex = AwayTeamRoster[i].fouls;

  }


}



function convertRosters(is_starting_lineup)
{
  returnToEdit();

  HomeTeamRoster = new Array();
  var homeRoster = getRoster("Home", is_starting_lineup);
  homeRoster.setAttribute("style", HomeRosterStyle + "width: 48%;position:relative;");
  document.body.appendChild(homeRoster);

  AwayTeamRoster = new Array();
  var awayRoster = getRoster("Visitor", is_starting_lineup);
  awayRoster.setAttribute("style", VisitorRosterStyle  + "width: 48%;position:relative;");
  document.body.appendChild(awayRoster);


  if (! is_starting_lineup) {
    var halfTimeButton = document.createElement("button");
      halfTimeButton.setAttribute("onClick", "halfTime()");
      halfTimeButton.setAttribute("type", "button");
      halfTimeButton.innerHTML = "Reset Foul Count";

    // document.body.appendChild(halfTimeButton);

    var halfTimeDescription = document.createElement("span");
      halfTimeDescription.innerHTML = "(Reset every quarter and half. NOT overtime)"
      halfTimeDescription.setAttribute("style", "color: lightgrey;")

    var halfTimeArea = document.createElement("div");
      halfTimeArea.setAttribute("id", "halfTimeArea");
      halfTimeArea.setAttribute("style","position:absolute; bottom:5px; left:5px;");
      halfTimeArea.appendChild(halfTimeButton)
      halfTimeArea.appendChild(halfTimeDescription)

    document.body.appendChild(halfTimeArea);
  }



//  var buttonTop = document.getElementById("topbutton");
//  buttonTop.setAttribute("onClick", "returnToEdit()");
//  buttonTop.innerHTML = "Edit Rosters";

  document.getElementById("Home_Roster").setAttribute("style", "display:none; cursor: default");
  document.getElementById("Visitor_Roster").setAttribute("style", "display:none; cursor: default");

  if(!is_starting_lineup)
    calculateFoulTotals();


}

function shallowCopy(arr) {
  ret = []
  for (var i = 0; i < arr.length; i++) {
    ret.push(arr[i])
  }
  return ret
}




function getRoster(side, isStarters)
{
  var printOut = document.createElement("div");
  printOut.setAttribute("id",side+"_Print");



  var titleP = document.createElement("h1");
      titleP.setAttribute("style",document.getElementById(side+"_Title").getAttribute("style"));
      titleP.innerHTML = document.getElementById(side+"_Title").innerHTML;

  var titleFouls = document.createElement("h2");
    //titleFouls.setAttribute("class","TeamFouls");
    titleFouls.innerHTML = "Team Fouls:&nbsp;&nbsp;<span class=\"TeamFouls\" id=\""+side+"_Foul_Total\">0</span>";

  var titleArea = document.createElement("div");
    titleArea.appendChild(titleP);

    if(!isStarters)
      titleArea.appendChild(titleFouls);

  printOut.appendChild(titleArea);

  var breakP = document.createElement("br")
    breakP.setAttribute("clear","all");
  //printOut.appendChild(breakP);


  var i , foulPos;
  foulPos = -1;

  // console.log(side)
  playerArr = []
  for(i = 0; i < rosterSize; i++) {
    if(document.getElementById(side+"_Number_"+i).value != "") {
      playerP = getPlayer(side, i)
      playerArr.push(playerP)
      if(side == "Home")
        HomeTeamRoster.push(playerP);
      else if(side == "Visitor")
        AwayTeamRoster.push(playerP);
    }
  }

  // console.error(playerArr)
  if (isStarters) {
    if (document.getElementById(side+"_Title").innerHTML == "Cyclones") {
      playerArr.sort(function(a,b){
        if ((a.isStar == "Star") || (b.isStar == "Star")) {
          if ((a.isStar == "Star") && (b.isStar == "Reg")) {
            // make b lower
            return 1
          }
          if ((a.isStar == "Reg") && (b.isStar == "Star")) {
            // make a lower
            return -1
          }
          // both stars... continue like normal
        }
        
        if (a.year == "Sr" || b.year == "Sr") {
          if (a.year === "Sr" && b.year !== "Sr") {
            // make a lower
            return 1;
          }
          if (b.year === "Sr" && a.year !== "Sr") {
            // make b lower
            return -1;
          }
        }
        
        // specialOrdering = ["Fr", "Red-Fr", "So", "Red-So", "Jr", "Red-Fr", "Sr"]
        // aPos = specialOrdering.indexOf(a.year)
        // bPos = specialOrdering.indexOf(b.year)

        // if (aPos != bPos) {
        //   return aPos - bPos
        // }
        return parseInt(a.number) - parseInt(b.number)
      })
    }
  }

  for(i = 0; i < playerArr.length; i++)
  {
    playerP = playerArr[i]
    foulPos++;

    var slot = document.createElement("div");
      slot.setAttribute("class", "slot");

    var numberP = document.createElement("h2");
      numberP.setAttribute("style", "color:"+document.getElementById(side +"_ColorPicker").value+";" );

      if(playerP.starter)
        numberP.innerHTML += "*";
      else
        numberP.innerHTML += "&nbsp;";
      numberP.innerHTML += playerP.number;


    var nameP = document.createElement("h3");
//        if(playerP.starter)
//          nameP.setAttribute("style", "text-decoration:underline;" );
      nameP.setAttribute("class", "PlayerName" );
      nameP.innerHTML = playerP.name;


    var foulsP = document.createElement("h2");
//        foulsP.setAttribute("style", "float:left;" );
      foulsP.setAttribute("class", "PlayerFouls" );
      foulsP.innerHTML = "F:&nbsp;&nbsp;<span id=\""+side+"_Foul_Count_"+foulPos+"\">" + playerP.fouls + "</span> <button id=\""+side+"_Foul_Minus_"+i+"\" type=\"button\" onClick=\"decreaseFoul(\'"+side+"\'," +foulPos+")\" >-</button> <button id=\""+side+"_Foul_Plus_"+foulPos+"\" type=\"button\" onClick=\"increaseFoul(\'"+side+"\'," +foulPos+")\" >+</button>";



    slot.appendChild(numberP);
    slot.appendChild(nameP);
    slot.appendChild(foulsP);
    var line = document.createElement("hr");
      line.setAttribute("align", "center");
      line.setAttribute("width", "95%");
    slot.appendChild(line);






    var starting = document.createElement("div");
      starting.setAttribute("class", "slot");

    var numberP2 = document.createElement("h2");
      numberP2.setAttribute("style", "color:"+document.getElementById(side +"_ColorPicker").value+";" );
      numberP2.innerHTML += playerP.number;


    var nameP2 = document.createElement("h3");
      nameP2.setAttribute("class", "PlayerName" );
      nameP2.innerHTML = playerP.name + "&nbsp;&nbsp;&nbsp;" + playerP.position  + "&nbsp;&nbsp;&nbsp;" + playerP.height + "&nbsp;&nbsp;&nbsp;" + playerP.year + "&nbsp;&nbsp;&nbsp;" + playerP.homeTown;

    starting.appendChild(numberP2);
    starting.appendChild(nameP2);

    var line2 = document.createElement("hr");
    line2.setAttribute("align", "center");
    line2.setAttribute("width", "95%");

    starting.appendChild(line2);


    if(isStarters)
    {
      if(playerP.starter)
      printOut.appendChild(starting);
    }
    else
      printOut.appendChild(slot);



  }

  if(!isStarters)
  {

    var container = document.createElement("div");
      container.innerHTML = "<br /><br /><br /><br />Alter Team Fouls<br />";


    var plus_team_fouls = document.createElement("button");
      plus_team_fouls.setAttribute("id", side+"_add_team_fouls");
      plus_team_fouls.setAttribute("type", "button");
      plus_team_fouls.innerHTML = "+";
    var minus_team_fouls = document.createElement("button");
      minus_team_fouls.setAttribute("id", side+"_add_team_fouls");
      minus_team_fouls.setAttribute("type", "button");
      minus_team_fouls.innerHTML = "-";

    container.appendChild(plus_team_fouls);
    container.appendChild(minus_team_fouls);


    if(side=="Home")
    {
      plus_team_fouls.setAttribute("onClick", "halfTimeHomeFouls--;calculateFoulTotals()");
      minus_team_fouls.setAttribute("onClick", "halfTimeHomeFouls++;calculateFoulTotals()");
    }
    else if(side == "Visitor")
    {
      plus_team_fouls.setAttribute("onClick", "halfTimeAwayFouls--;calculateFoulTotals()");
      minus_team_fouls.setAttribute("onClick", "halfTimeAwayFouls++;calculateFoulTotals()");
    }

    printOut.appendChild(container)

  }


  return printOut;
}


function increaseFoul(side, pos)
{
  var nameP = -1;

  if(side == "Home")
  {
    HomeTeamRoster[pos].fouls++;

    if(HomeTeamRoster[pos].fouls >=5)
    {
//      alert(HomeTeamRoster[pos].name + " fouled out!");
      nameP = document.getElementById("Home_NamePicker").value +": " + HomeTeamRoster[pos].name;
      HomeTeamRoster[pos].fouls = 5;
    }

    document.getElementById(side + "_Foul_Count_" + pos).innerHTML = HomeTeamRoster[pos].fouls;
  }
  else if(side == "Visitor")
  {
    AwayTeamRoster[pos].fouls++;

    if(AwayTeamRoster[pos].fouls >=5)
    {
//      alert(AwayTeamRoster[pos].name + " fouled out!");
      nameP = document.getElementById("Visitor_NamePicker").value +": " + AwayTeamRoster[pos].name;
      AwayTeamRoster[pos].fouls = 5;
    }

    document.getElementById(side + "_Foul_Count_" + pos).innerHTML = AwayTeamRoster[pos].fouls;
  }

  calculateFoulTotals();

  if(nameP != -1)
    alert(nameP + " fouled out!");
}

function decreaseFoul(side, pos)
{
  if(side == "Home")
  {
    HomeTeamRoster[pos].fouls--;

    if(HomeTeamRoster[pos].fouls < 0)
      HomeTeamRoster[pos].fouls = 0

    document.getElementById(side + "_Foul_Count_" + pos).innerHTML = HomeTeamRoster[pos].fouls;
  }
  else if(side == "Visitor")
  {
    AwayTeamRoster[pos].fouls--;
    if(AwayTeamRoster[pos].fouls < 0)
      AwayTeamRoster[pos].fouls = 0

    document.getElementById(side + "_Foul_Count_" + pos).innerHTML = AwayTeamRoster[pos].fouls;
  }

  calculateFoulTotals();
}



function calculateFoulTotals()
{
  var maxFoulCount = 5;
  var i = 0;
  var homeFouls = 0;
  for(i = 0; i < HomeTeamRoster.length;  i++)
    homeFouls += HomeTeamRoster[i].fouls;

  HTeamFouls = homeFouls - halfTimeHomeFouls;
  if(HTeamFouls > maxFoulCount) {
    HTeamFouls = maxFoulCount + "+";
  }

  document.getElementById("Home_Foul_Total").innerHTML = HTeamFouls;


  var awayFouls = 0;
  for(i = 0; i < AwayTeamRoster.length;  i++)
    awayFouls += AwayTeamRoster[i].fouls;

  VTeamFouls = awayFouls - halfTimeAwayFouls;
  if(VTeamFouls > maxFoulCount) {
    VTeamFouls = maxFoulCount + "+";
  }
  document.getElementById("Visitor_Foul_Total").innerHTML = VTeamFouls;



  alteredFouls = 1;

}


var halfTimeHomeFouls = 0;
var halfTimeAwayFouls = 0;

function halfTime()
{

  var i = 0;
  var homeFouls = 0;
  for(i = 0; i < HomeTeamRoster.length;  i++)
    homeFouls += HomeTeamRoster[i].fouls;
  halfTimeHomeFouls = homeFouls;

  var awayFouls = 0;
  for(i = 0; i < AwayTeamRoster.length;  i++)
    awayFouls += AwayTeamRoster[i].fouls;
  halfTimeAwayFouls = awayFouls;

  calculateFoulTotals();
}
