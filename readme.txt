This script fetches the job's posts from upwork, stores them in a spreadsheet and send them to your telegram channel or chat

To run the script you need:
  1. make a copy of a spreadsheet: https://docs.google.com/spreadsheets/d/1qglP1HMdWevxQXPvxF9hjH_5-9cq_co7HDdeTxym3H0/edit#gid=0;
  2. create an empty Apps Script in your copy of the spreadsheet;
  3. copy and past the upworkfeed-bot;
  4. set the atomURL variable with the upwork Atom link of your filter;
  5. set the chatID variavle with the id of your chat or channel in telegram;
  6. set the botToken variable with the token of your telegrambot;
  7. deploy the project as webapp;
  8. set a trigger to the fetchPosts function;
