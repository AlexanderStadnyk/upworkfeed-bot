const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("feed");

function fetchPosts()
{
  //store url feed in variable
  var atomURL = "your atom feed url from upwork";

  //get http response from url
  var response = UrlFetchApp.fetch(atomURL);

  //get content of the response in string format
  var xml = response.getContentText();

  //make string in xml format
  var document = XmlService.parse(xml);

  //get root element of the xml
  var root = document.getRootElement();

  //set the namespace
  var atom = XmlService.getNamespace("http://www.w3.org/2005/Atom");

  //get the root's childs = posts
  var posts = root.getChildren('entry', atom);

  for (var i = 0; i < posts.length; i++)
  {
    var id = posts[i].getChild('id',atom).getText();

    if(isNewPost(id) == true)
    {
      var title = posts[i].getChild('title',atom).getText();
      var content = '';//posts[i].getChild('content',atom).getText();
      var link = posts[i].getChild('link', atom).getAttribute('href').getValue();

      sheet.appendRow([id, title, content, link]);

      sendNewPostToTelegram(title, link);
    }
  }
}

function isNewPost(id)
{
  //get all data (Object)
  var range = sheet.getDataRange();

  //get all values (Array)
  var values = range.getValues();

  //check by the id column if the new post id has already been added to the range
  for (var i = 1; i < values.length; i++)
  {
    if(values[i][0] == id)
    {
      return false;
    }
  }
  return true;
}

function sendNewPostToTelegram(title, link)
{
  const chatId = "your chat id";
  const botToken = "5096655692:AAHd-IER-Hvl184c4XzlHTgQrz5GjBAFCPs";
  const telegramApi = 'https://api.telegram.org/bot'+botToken+'/sendMessage';
  
  var message = title + '\n' + link;

  const text = encodeURIComponent(message);
    
  const url = telegramApi+'?chat_id='+chatId+'&text='+text+'&parse_mode=HTML';
    
  const response = UrlFetchApp.fetch(url, {muteHttpExceptions:true});
    
  const {ok, description} = JSON.parse(response);

  if(!ok)
  {
    Logger.log(description);
  }
}
