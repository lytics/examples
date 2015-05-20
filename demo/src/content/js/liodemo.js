/********************************************************/
/* CONFIGURATION                                        */
/********************************************************/
var getDemoDetails = function(name){
  var demo = {};

  switch( name ){
    case 'personalization-toggle':
      demo = {
        title: 'Personalization - Element Toggle',
        description: 'A simple approach to content personalization via hiding/showing standard HTML elements based on a users segment membership. In the following the headline, image and main call to action button are modified based on a specific users details.',
        customization: [
          {slug: 'smt_new', detail: 'If the user is new we give them a special image.'},
          {slug: 'has_firstname', detail: 'If the first name is known we personalize the headline.'},
          {slug: 'is_member', detail: 'If the user has registered we welcome them back and give them a login button rather than sign up.'},
          {slug: 'default', detail: 'Headline, image and call to action all have default states.'}
        ],
        landing: '/demo/personalization-toggle.html'
      }
      break;

    case 'personalization-nav':
      demo = {
        title: 'Personalizaiton - Navigation',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit mi arcu, sed tincidunt arcu porta at. Nullam sagittis posuere porttitor. Integer dictum hendrerit lorem sit amet interdum. Nullam congue venenatis metus et scelerisque. In quis dui dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit mi arcu, sed tincidunt arcu porta at. Nullam sagittis posuere porttitor. Integer dictum hendrerit lorem sit amet interdum. Nullam congue venenatis metus et scelerisque. In quis dui dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit mi arcu, sed tincidunt arcu porta at. Nullam sagittis posuere porttitor. Integer dictum hendrerit lorem sit amet interdum. Nullam congue venenatis metus et scelerisque. In quis dui dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        landing: '/demo/personalization-nav.html'
      }
      break;
  }

  return demo;
}

var getDemoUser = function(name){
  var user = {};

  switch( name ){
    case 'markhayden':
      user = {
        email: 'mark@lytics.io',
        firstname: 'Mark',
        lastname: 'Hayden',
        uid: 'e672c1b777b093c43fd1e838fb2a861f'
      }
      break;

    case 'kylemorrow':
      user = {
        email: 'kyle@lytics.io',
        firstname: 'Kyle',
        lastname: 'Morrow',
        uid: '77390.50036621094'
      }
      break;

    case 'robthomas':
      user = {
        email:'rob@lytics.io',
        firstname: 'Rob',
        lastname: 'Thomas',
        uid: '77390.50036621090'
      }
      break;

    case 'aaronthomas':
      user = {
        email:'aaron@lytics.io',
        firstname: 'Aaron',
        lastname: 'Thomas',
        uid: '77390.50036621030'
      }
      break;

    case 'jamesthomas':
      user = {
        email:'james@lytics.io',
        firstname: 'James',
        lastname: 'Thomas',
        uid: '77390.50036621050'
      }
      break;

    case 'michaethomas':
      user = {
        email:'michael@lytics.io',
        firstname: 'Michael',
        lastname: 'Thomas',
        uid: '77390.50033621090'
      }
      break;

    case 'drewthomas':
      user = {
        email:'drew@lytics.io',
        firstname: 'Drew',
        lastname: 'Thomas',
        uid: '77390.50036121090'
      }
      break;

    case 'beccathomas':
      user = {
        email:'becca@lytics.io',
        firstname: 'Becca',
        lastname: 'Thomas',
        uid: '77390.50066621090'
      }
      break;

    case 'christhomas':
      user = {
        email:'chris@lytics.io',
        firstname: 'Chris',
        lastname: 'Thomas',
        uid: '77390.60036621090'
      }
      break;

    case 'steventhomas':
      user = {
        email:'steven@lytics.io',
        firstname: 'Steven',
        lastname: 'Thomas',
        uid: '77390.50236621090'
      }
      break;

    case 'michaethomasl':
      user = {
        email: 'schmichael@lytics.io',
        firstname: 'Michael',
        lastname: 'Thomas',
        uid: '77390.10036621090'
      }
      break;

    case 'andrewthomas':
      user = {
        email:'andrew@lytics.io',
        firstname: 'Andrew',
        lastname: 'Thomas',
        uid: '77390.50436621090'
      }
      break;

    case 'sarahthomas':
      user = {
        email:'sarah@lytics.io',
        firstname: 'Sarah',
        lastname: 'Thomas',
        uid: '77390.50033321090'
      }
      break;

    default:
      user = {
        firstname: 'Simulate User',
      }
      break;
  }

  return user;
}

var exampleKickoff = function(d){
  console.log(d);

  // set firstname
  $.each($('[data-firstname]'), function(){
    $(this).html(lio.data.firstname);
  });

  for (var i = 0; i < d.segments.length; i++) {
    $( "#current-user-segments" ).append( '<span>' + d.segments[i] + '</span>' );
  };
  // for (var key in d.segments) {
  //   console.log(segment);
  // }
}

/********************************************************/
/* LOCAL STORAGE METHODS                                */
/********************************************************/
// store user info in local storage
var saveDataToStorage = function(key, value){
  localStorage.setItem(key, value);
}

// retrieve user info from local storage
var getDataFromStorage = function(key){
  var data = localStorage.getItem(key);

  if(!data){
    data = '';
  }

  if( data.includes("{") ){
    return JSON.parse(data);
  }else{
    return data;
  }
}

/********************************************************/
/* DEMO SELECTION                                       */
/********************************************************/
var demoName = getDataFromStorage('demoName');
if( !demoName ){
  demoname = 'personalization-swap';
}
window.demo = getDemoDetails(demoName);

/********************************************************/
/* IDENTIFICATION                                       */
/********************************************************/
var userName = getDataFromStorage('userName');
window.user = getDemoUser(window.userName);

if(userName){
  window.liosetup = window["liosetup"] || {};
  window.liosetup.fields = "email,firstname,lastname";
  window.liosetup.field = "_uid";
  window.liosetup.value = window.user.uid;
  window.liosetup.callback = exampleKickoff;
}else{
  console.log("default");
  window.liosetup = window["liosetup"] || {};
  window.liosetup.callback = exampleKickoff;
  window.liosetup.fields = "email,firstname,lastname";
}
