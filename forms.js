var rosterSize = 20;

var HomeRosterStyle = "float: left;";
var VisitorRosterStyle = "float: right;";

function player(starterP, numberP, nameP, foulsP, positionP, heightP, yearP, homeTownP, isStarP)
{
  this.starter = starterP;
  this.number = numberP;
  this.name = nameP;
  this.fouls = foulsP;
  this.position = positionP;
  this.height = heightP;
  this.year = yearP;
  this.homeTown = homeTownP;
  this.isStar = isStarP || "Reg";

  return this;
}



function getPlayer(sideP, i)
{

  return new player(
    document.getElementById(sideP +"_Starter_"+i).checked,
    document.getElementById(sideP+"_Number_"+i).value,
    document.getElementById(sideP+"_Name_"+i).value,
    document.getElementById(sideP+"_Fouls_"+i).selectedIndex,
    document.getElementById(sideP+"_Position_"+i).value,
    document.getElementById(sideP+"_Height_"+i).value,
    document.getElementById(sideP+"_Year_"+i).value,
    document.getElementById(sideP+"_Town_"+i).value,
    document.getElementById(sideP+"_Star_"+i).value
  );
}

function setRosterPos(person, sideP, i)
{
  document.getElementById(sideP+"_Starter_"+i).checked = person.starter;
  document.getElementById(sideP+"_Number_"+i).value = person.number;
  document.getElementById(sideP+"_Name_"+i).value = person.name;
  document.getElementById(sideP+"_Fouls_"+i).selectedIndex = person.fouls;
  document.getElementById(sideP+"_Position_"+i).value = person.position;
  document.getElementById(sideP+"_Height_"+i).value = person.height;
  document.getElementById(sideP+"_Year_"+i).value = person.year;
  document.getElementById(sideP+"_Town_"+i).value = person.homeTown;
  document.getElementById(sideP+"_Star_"+i).value = person.isStar;

}

var HomeTeamRoster = new Array();
var AwayTeamRoster = new Array();


function selectView()
{
  var valueP = document.getElementById("topList").selectedIndex;
//  alert(valueP);

  if(valueP == 0)
    returnToEdit();
  else if(valueP == 1)
    convertRosters(true);
  else
    convertRosters(false);

//  addRemoveList();
  document.getElementById("topList").selectedIndex = valueP;
}

function addRemoveList()
{
  document.body.removeChild(document.getElementById("topListDiv"));

    var change = document.createElement("div");
    change.setAttribute("id", "topListDiv");
    change.innerHTML = "<select id=\"topList\" type=\"button\" onChange=\"selectView()\"><option value=\"Rosters\">Rosters</option><option value=\"Lineup\">Starting Lineup</option><option value=\"Game\">Game Time</option></select>"
    change.setAttribute("style","position:absolute; top: 0px; right: 5px;z-index: 1000;");

  document.body.appendChild(change);
}

function load()
{
  window.onbeforeunload = function(){ return 'This will reset all roster information' }

  var change = document.createElement("div");
    change.innerHTML = "<select id=\"topList\" type=\"button\" onChange=\"selectView()\"><option value=\"Rosters\">Rosters</option><option value=\"Lineup\">Starting Lineup</option><option value=\"Game\">Game Time</option></select>"
    change.setAttribute("id", "topListDiv");
    change.setAttribute("style","position:absolute; top: 0px; right: 5px;z-index: 1000");

  var homeRoster = addRoster("Home");
  homeRoster.setAttribute("style", HomeRosterStyle);
  var buttonP = document.createElement("p");
    buttonP.innerHTML = "<button type=\"button\" onClick=\"addCycloneRoster(\'Home\')\">Add Cyclone Roster</button>"
    homeRoster.appendChild(buttonP);

  var note = document.createElement("p");
    note.innerHTML = "To shrink the text, press \'&#8984; -\'.<br /> To increase the text size, press \'&#8984; =\'.<br /> DO NOT refresh or close the page, unless you want to start all over.<br /> <a href=\"http://www.2createawebsite.com/build/hex-colors.html\" target=\"_blank\">Hex Color Generator</a><br /><a href=\"http://www.w3schools.com/html/html_colorvalues.asp\" target=\"_blank\">Color Names</a>";
  homeRoster.appendChild(note);

  var switchButton = document.createElement("button");
    switchButton.setAttribute("type","button");
    switchButton.setAttribute("onClick","switchRosters()");
    switchButton.innerHTML = "Switch Roster Sides";
    homeRoster.appendChild(switchButton);


  var awayRoster = addRoster("Visitor");
  awayRoster.setAttribute("style", VisitorRosterStyle);
  var buttonA = document.createElement("p");
    buttonA.innerHTML = "<button type=\"button\" onClick=\"addCycloneRoster(\'Visitor\')\">Add Cyclone Roster</button>"
    awayRoster.appendChild(buttonA);


  document.body.appendChild(change);
  document.body.appendChild(homeRoster);
  document.body.appendChild(awayRoster);



  document.getElementById("Home_NamePicker").value = "Left Roster";
  document.getElementById("Home_ColorPicker").value = "red";
  document.getElementById("Visitor_NamePicker").value = "Right Roster";
  document.getElementById("Visitor_ColorPicker").value = "blue";

  updateTeamLabels();

}

function addRoster(side)
{
  // <h1>Home Roster</h1>

  var i = 0;

  var sideP = document.createElement("div");
    sideP.setAttribute("id", side+"_Roster");


  var titleSide = document.createElement("h1");
    titleSide.setAttribute("id",side+"_Title");
    titleSide.setAttribute("style","float:left");

  sideP.appendChild(titleSide);

  var breakP = document.createElement("br");
  breakP.setAttribute("clear","all");
  sideP.appendChild(breakP);


  var colorSide = document.createElement("form");
    colorSide.setAttribute("onSubmit", "return false;");
    colorSide.innerHTML = "Name:      <input id=\""+side+"_NamePicker\" type=\"text\" onChange=\"changeName(\'"+side+"\')\" >    <br />Color: <input id=\""+side+"_ColorPicker\" type=\"text\" onChange=\"changeColor(\'"+side+"\')\" >";

  sideP.appendChild(colorSide);





  var section = document.createElement("form");
    section.setAttribute("id",side+"_form");
  for(i = 0; i< rosterSize; i++)
  {

    var starterP = document.createElement("input");
      starterP.setAttribute("type", "checkbox");
      starterP.setAttribute("id", side + "_Starter_" + i);

    var numberP = document.createElement("input");
      numberP.setAttribute("size", 2);
      numberP.setAttribute("id", side+"_Number_" +i);
      numberP.setAttribute("type", "text");



    var nameP = document.createElement("input");
      nameP.setAttribute("size", 30);
      nameP.setAttribute("id", side+"_Name_" +i);
      nameP.setAttribute("type", "text");

    var fouls = document.createElement("select");
      fouls.setAttribute("id", side+"_Fouls_" +i);

    var j = 0;
    for(j = 0; j < 6; j++)
    {
      var count = document.createElement("option");
      count.setAttribute("value",j);
      count.innerHTML = j;

      fouls.appendChild(count);
    }

    var positionP = document.createElement("input");
      positionP.setAttribute("size", 1);
      positionP.setAttribute("id", side+"_Position_"+i);
      positionP.setAttribute("type","text");

    var heightP = document.createElement("input");
      heightP.setAttribute("size", 2);
      heightP.setAttribute("id", side+"_Height_"+i);
      heightP.setAttribute("type","text");

    var yearP = document.createElement("select");
      yearP.innerHTML = ""+
        "<option></option>"+
        "<option>Fr</option>"+
        "<option>So</option>"+
        "<option>Jr</option>"+
        "<option>Sr</option>";

      yearP.setAttribute("id", side+"_Year_"+i);
      yearP.setAttribute("type","text");
    // var yearP = document.createElement("input");
    //   yearP.setAttribute("size", 2);
    //   yearP.setAttribute("id", side+"_Year_"+i);
    //   yearP.setAttribute("type","text");

    var town = document.createElement("input");
      town.setAttribute("size", 20);
      town.setAttribute("id", side+"_Town_"+i);
      town.setAttribute("type","text");

    var isStar = document.createElement("select");
      isStar.innerHTML = "<option>Reg</option><option>Star</option>"
      isStar.setAttribute("id", side+"_Star_"+i);
      isStar.style.display = "none";

    var add_button = document.createElement("button");
      add_button.setAttribute("onClick", "add_blank_player(\""+side+"\","+i+")");
      add_button.setAttribute("type", "button");
      add_button.innerHTML = "+";

    var delete_button = document.createElement("button");
      delete_button.setAttribute("onClick", "delete_player(\""+side+"\","+i+")");
      delete_button.setAttribute("type", "button");
      delete_button.innerHTML = "-";





    var playerD = document.createElement("div");
      playerD.setAttribute("id", side+"_Player_" +i);
      playerD.appendChild(starterP);
      playerD.appendChild(numberP);
      playerD.appendChild(nameP);
      playerD.appendChild(fouls);
      playerD.appendChild(positionP);
      playerD.appendChild(heightP);
      playerD.appendChild(yearP);
      playerD.appendChild(town);
      playerD.appendChild(isStar);
      playerD.appendChild(add_button);
      playerD.appendChild(delete_button);

      playerD.appendChild(document.createElement("br"));

    section.appendChild(playerD);

  }

  sideP.appendChild(section);

  return sideP;

}


function changeName(side)
{
  document.getElementById(side+"_Title").innerHTML = document.getElementById(side +"_NamePicker").value;
}


function changeColor(side)
{
  //alert("hi");
  document.getElementById(""+side+"_Title").setAttribute("style", "color:"+document.getElementById(side +"_ColorPicker").value);
}




function addCycloneRoster(sideP)
{
  var roster = new Array();


roster.push( new player(0, "2" , "Sofija ghee-vah-leu-veech", 0, "G", "5-9" , "Fr"    , "Podgorica, Montenegro"   , "Reg"));
roster.push( new player(1, "3" , "Emily Durr"       , 0, "G", "6-0" , "Jr"    , "Utica, N.Y."             , "Reg"));
roster.push( new player(1, "4" , "Heather BOE-vee"     , 0, "F", "6-0" , "Sr", "Eau Claire, Wis."        , "Star"));
roster.push( new player(0, "10", "NEE-uh Washington"   , 0, "G", "5-7" , "Fr"    , "Stafford, Va."           , "Reg"));
roster.push( new player(1, "11", "Jadda Buckley"    , 0, "G", "5-8" , "Jr", "Mason City, Iowa"        , "Reg"));
roster.push( new player(0, "12", "Seanna Johnson"   , 0, "G", "5-10", "Sr"    , "Brooklyn Park, Minn."    , "Star"));
roster.push( new player(0, "13", "ay-dree-AH-nuh CAME-ber"   , 0, "F", "5-10", "Fr"    , "Lund, Sweden"            , "Reg"));
roster.push( new player(0, "14", "uh-LEE-uh koe-NAH-tay"    , 0, "F", "6-4" , "Fr"    , "Berlin, Germany"         , "Reg"));
roster.push( new player(0, "21", "Bridget Carleton" , 0, "G", "6-1" , "So"    , "Chatham, Ontario, Canada", "Reg"));
roster.push( new player(0, "22", "TeeTee Starks"    , 0, "G", "5-9" , "Fr", "Brooklyn Park, Minn."    , "Reg"));
roster.push( new player(1, "25", "Lexi Albrecht"    , 0, "G", "5-10", "Sr"    , "Carroll, Iowa"           , "Star"));
roster.push( new player(0, "30", "Claire Ricketts"  , 0, "F", "6-3" , "So", "Parker, Texas"           , "Reg"));
roster.push( new player(0, "32", "Mere Burkhall", 0, "F", "6-3" , "So"    , "Urbandale, Iowa"         , "Reg"));
roster.push( new player(1, "35", "Jordan Jensen"    , 0, "F", "6-2" , "Sr"    , "Gilbert, Ariz."          , "Star"));

// roster.push( new player(0, "3" , "Emily Durr"         , 0, "G", "6-0" , "So", "Utica, New York", "Reg"));
// roster.push( new player(1, "11", "Jadda Buckley (Jay-duh)"      , 0, "G", "5-8" , "So", "Mason City, Iowa", "Reg"));
// roster.push( new player(1, "12", "Seanna Johnson"     , 0, "G", "5-10", "Jr", "Brooklyn Park, Minnesota", "Reg"));
// roster.push( new player(1, "15", "Kidd Blaskowsky"    , 0, "G", "5-7" , "Sr", "Sugar Land, Texas", "Star"));
// roster.push( new player(1, "21", "Bridget Carleton"   , 0, "G", "6-1" , "Fr", "Chatham, Ontario, Canada", "Reg"));
// // roster.push( new player(0, "22", "TeeTee Starks"      , 0, "G", "5-9" , "Fr", "Brooklyn Park, Minnesota", "Reg"));
// roster.push( new player(0, "25", "Lexi Albrecht"      , 0, "G", "5-10", "Jr", "Carroll, Iowa", "Reg"));
// roster.push( new player(0, "30", "Claire Ricketts"    , 0, "F", "6-3" , "Fr", "Parker, Texas", "Reg"));
// roster.push( new player(0, "32", "Mere Burkhall"  , 0, "F", "6-3" , "Fr", "Urbandale, Iowa", "Reg"));
// roster.push( new player(1, "34", "Maddie Baier"      , 0, "C", "6-4" , "Sr", "Tama, Iowa", "Star"));
// roster.push( new player(0, "35", "Jordan Jensen"      , 0, "F", "6-2" , "Jr", "Gilbert, Arizona", "Reg"));
// // roster.push( new player(1, "44", "Bree Fernstrom"     , 0, "C", "6-5" , "So", "Center City, Minnesota", "Reg"));


  var i = 0;
  for(i = 0; i < roster.length; i++)
    setRosterPos(roster[i], sideP,i);

  document.getElementById(sideP+"_ColorPicker").value = "rgb(167,26,43)";
  document.getElementById(sideP+"_NamePicker").value = "Cyclones";
  changeName(sideP);
  changeColor(sideP);
}












function switchRosters()
{
//  var i = rosterSize;
//
//  for(i = 0; i < rosterSize; i++)
//  {
//    var tmpPlayer = getPlayer("Home", i);
//    setRosterPos(getPlayer("Visitor", i), "Home",i);
//    setRosterPos(tmpPlayer, "Visitor",i);
//  }
//
//  var tmp = document.getElementById("Home_NamePicker").value;
//  document.getElementById("Home_NamePicker").value = document.getElementById("Visitor_NamePicker").value;
//  document.getElementById("Visitor_NamePicker").value = tmp;
//
//  var tmp = document.getElementById("Home_ColorPicker").value;
//  document.getElementById("Home_ColorPicker").value = document.getElementById("Visitor_ColorPicker").value;
//  document.getElementById("Visitor_ColorPicker").value = tmp;
//
//  updateTeamLabels();

  HomeRosterStyle = document.getElementById("Visitor_Roster").getAttribute("style");
  VisitorRosterStyle = document.getElementById("Home_Roster").getAttribute("style");

  document.getElementById("Home_Roster").setAttribute("style", HomeRosterStyle);
  document.getElementById("Visitor_Roster").setAttribute("style", VisitorRosterStyle);

}

function updateTeamLabels()
{
  changeName("Home");
  changeName("Visitor");
  changeColor("Home");
  changeColor("Visitor");
}




function add_blank_player(side, pos)
{
  var i;

  for(i = rosterSize-2; i >= pos; i--)
  {
    setRosterPos(getPlayer(side,i), side, i+1);
  }

  var blank_player = new player(false,"","",0,"","","","", "Reg");

  setRosterPos(blank_player, side, pos);

}

function delete_player(side, pos)
{
  var i;

  for(i = pos; i < rosterSize-1; i++)
  {
    setRosterPos(getPlayer(side,i+1), side, i);
  }

  var blank_player = new player(false,"","",0,"","","","", "Reg");

  setRosterPos(blank_player, side, rosterSize - 1);

}
