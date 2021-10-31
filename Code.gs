function myFunction() {
  console.log("Hello world");
}


function myFunction1() {
  console.log("Hello world");
  var currentSpreadsheet=SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = currentSpreadsheet.getActiveSheet();
  var values = activeSheet.getDataRange().getValues();
  console.log("name: " + currentSpreadsheet.getName()+ "  ID: " + currentSpreadsheet.getId());
}

function myFunction2(){
  console.log("Hello world");
  var currentSpreadsheet=SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = currentSpreadsheet.getActiveSheet();
  var values = activeSheet.getDataRange().getValues();
  console.log("name: " + currentSpreadsheet.getName()+ "  ID: " + currentSpreadsheet.getId());
  console.log("entries: " + values.length)
  for (var i = 1; i < values.length; i++) // we start from 1 rather than 0, to skip the header...
  {
    var rednibroj = values[i][0];
    var ime = values[i][1];
    console.log("br: "+rednibroj + " ime: "+ime);
  }
}

function myFunction3() {
  var kontakti=ContactsApp.getAllContacts();
  for (var j=0; j<kontakti.length; j++)
  {
    var osoba=kontakti[j];
    console.log("kontakt: " + osoba.getFullName());
  }
}


function myFunction4() {
  console.log("Analiza kontakata");
  var currentSpreadsheet=SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = currentSpreadsheet.getActiveSheet();
  var tabela = activeSheet.getDataRange().getValues();
  for (var i = 1; i < tabela.length; i++) // we start from 1 rather than 0, to skip the header...
  {

    var ime = tabela[i][1];
    if(i%20===0)
      console.log("obrađeno: "+i);
    var pronadjenKontakt=ContactsApp.getContactsByName(ime);
    if(pronadjenKontakt.length>0)
    {
      for(var j=0;j<pronadjenKontakt.length;j++)
      {
        console.log("pronađen:" +ime + " u kontaktima: " + pronadjenKontakt[j].getFullName());
      }
    }
  }
}

function myFunction5() {
  console.log("Analiza kontakata");
  var currentSpreadsheet=SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = currentSpreadsheet.getActiveSheet();
  var tabela = activeSheet.getDataRange().getValues();
  var kontakti=ContactsApp.getAllContacts();
  for (var i = 1; i < tabela.length; i++) // we start from 1 rather than 0, to skip the header...
  {
    var ime = tabela[i][1];
    if(i%1000===0)
      console.log("obrađeno: "+i);
    //console.log("br: "+rednibroj + " ime: "+ime);
    for (var j=0; j<kontakti.length; j++)
    {
      var osoba=kontakti[j];
      var imeOsobe=osoba.getFullName();
      if(imeOsobe.localeCompare(ime, 'en', { sensitivity: 'base' })===0)
      {
        console.log("Pronađena osoba:" + imeOsobe);
        var range = activeSheet.getRange(i+1, 1,1,15); // +1 because sheets start counting from row=1
        range.setBackground("red");
      }
    }
  }
}

function myFunction6() {
  console.log("Analiza kontakata");
  var currentSpreadsheet=SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = currentSpreadsheet.getActiveSheet();
  var tabela = activeSheet.getDataRange().getValues();
  var kontakti=ContactsApp.getAllContacts();
  var doc = DocumentApp.create('PoreznaReport');
  //move the file to the FOI WS folder
  var folder = DriveApp.getFolderById("12SCkSTDzFRBzU5soD88hzI74vExMt_fJ");
  var docFile = DriveApp.getFileById( doc.getId() );
  folder.addFile( docFile );
  DriveApp.getRootFolder().removeFile(docFile);

  var body= doc.getBody();

  for (var i = 1; i < tabela.length; i++) // we start from 1 rather than 0, to skip the header...
  {
    var ime = tabela[i][1];
    if(i%20===0)
      console.log("obrađeno: "+i);
    //console.log("br: "+rednibroj + " ime: "+ime);
    for (var j=0; j<kontakti.length; j++)
    {
      var osoba=kontakti[j];
      var imeOsobe=osoba.getFullName();
      if(imeOsobe.localeCompare(ime, 'en', { sensitivity: 'base' })===0)
      {
        console.log("Pronađena osoba:" + imeOsobe);
        var range = activeSheet.getRange(i+1, 1,1,15); // +1 because sheets start counting from row=1
        range.setBackground("red");
        body.appendParagraph("------------------------------------------------");

        body.appendParagraph(range.getValues().toLocaleString());
        body.appendParagraph("found as:" + imeOsobe);
        body.appendParagraph("------------------------------------------------");
      }
    }
  }
  doc.saveAndClose();
}




