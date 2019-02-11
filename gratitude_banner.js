var userReg = mw.config.get('wgNoticeUserData');
var siteName = mw.config.get('wgSiteName');
var userName = mw.config.get( 'wgUserName' );
var userEditCount = mw.config.get( 'wgUserEditCount' );
var userGroups = mw.config.get( 'wgUserGroups' );
var siteLang = mw.config.get( 'wgContentLanguage' );


var daysRegistered = function(userReg){
    var r = userReg.registration // a wikimedia datestring
    var regDate = new Date(Number(r.slice(0,4)), (Number(r.slice(4,6))-1), Number(r.slice(6,8)), Number(r.slice(8,10)), Number(r.slice(10,12)), Number(r.slice(12,14)));
    var now = new Date();
    var msSinceReg = now - regDate;
    var msInDay = 86400000;
    return msSinceReg/msInDay;
}

var decideShow = function(lang, userReg, userEditCount, userGroups){
  // FA: 500 edits, 1 year
  // AR: Autoreviewer
  // PL: "editor" group Editors with permission to flag revisions: about 3400.
  // DE: "Active Sichter" Editors with permission to flag revisions. having an account for 60 days, and having 300 edits in main space pages

  // If any of these values are null, the user is probably not logged in, so we don't want to display.
  if (lang === null ||
      userReg === null ||
      userEditCount === null ||
      userGroups === null||
      userName === null){
     return false
     }


  if (lang==='de'){
    var isAutoReview = userGroups.indexOf('autoreview')>=0;
    var daysEnough = daysRegistered(userReg) >= 60;
    var editEnough = userEditCount >= 300;
    if ( isAutoReview && daysEnough && editEnough ){return true}
    else {return false}
    }
  else if (lang==='pl'){
    if (userGroups.indexOf('editor')>=0){return true}
    else {return false}
    }
  else if (lang==='ar'){
    if (userGroups.indexOf('autoreview')>=0){return true}
    else {return false}
    }
  else if (lang==='fa'){
    var daysEnough = daysRegistered(userReg) >= 365;
    var editEnough = userEditCount >= 500;
    if ( daysEnough && editEnough ){return true}
    else {return false}
    }
  // If language not here.
  else {
    console.log('No target language found');
    return false;
  }
}

var shouldShow = decideShow(siteLang, userReg, userEditCount, userGroups, userName);

if (!shouldShow){mw.centralNotice.hideBanner()}

//TODO hide after n-many shows.
