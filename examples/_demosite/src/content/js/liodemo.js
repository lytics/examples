/********************************************************/
/* CONFIGURATION                                        */
/********************************************************/
var getDemoDetails = function(name){
  var demo = {};

  switch( name ){
    case 'personalization-toggle':
      demo = {
        title: 'Personalization - Element Toggle',
        description: 'A simple approach to content personalization via hiding/showing standard HTML elements based on a user\'s segment membership. In the following the headline, image and main call to action button are modified based on a specific users details.',
        customization: [
          {slug: 'smt_new', detail: 'Recieves special image (could be offer).'},
          {slug: 'has_firstname', detail: 'Has name added to messaging.'},
          {slug: 'is_member', detail: 'Welcome back message with log in button.'},
          {slug: 'default', detail: 'Headline, image and call to action all have default states.'}
        ],
        landing: '/demo/personalization-toggle.html'
      }
      break;

    case 'personalization-redirect':
      demo = {
        title: 'Personalization - Redirect',
        description: 'Having a user start off on the most contextually relevant portion of a site is critical. Using Lytics, we can take what is known about the user and put them in the most relevant start page. Think about the power of this when it comes to paid search or banner advertising. Have them hit one page and then get directed to ultra relevant content for higher conversions.',
        customization: [
          {slug: 'is_member', detail: 'Registered member focused landing page.'},
          {slug: 'smt_new', detail: 'New user focused landing page. Guide them to conversion.'},
          {slug: 'default', detail: 'Anonymous, catchall, landing page.'}
        ],
        landing: '/demo/personalization-redirect.html'
      }
      break;

    case 'personalization-nav':
      demo = {
        title: 'Personalization - Navigation',
        description: 'Much like the element toggle changes the body of the page, you can use toggle to manipulate the main navigation to reflect items most relevant to a user. For instance, hiding or showing the signup / login buttons. Moving the developer ',
        customization: [
          {slug: 'is_member', detail: 'If the user has registered we welcome them back and give them a login button rather than sign up.'},
          {slug: 'smt_new', detail: 'If the user is new we ask them to sign up for our newsletter.'},
          {slug: 'default', detail: 'If the user is not a member or new we ask them to start a live chat.'}
        ],
        landing: '/demo/personalization-nav.html'
      }
      break;

    case 'personalization-affinity':
      demo = {
        title: 'Personalization - Content Affinity',
        description: 'Mapping particular pieces of content to a user or type of user can be difficult. In most cases the outcome is individual campaigns that require their own strategy, design, etc. With Lytics tailoring content is far simpler.',
        customization: [
          {slug: 'cat', detail: 'If their interest sways towards cats we show them cat images.'},
          {slug: 'dog', detail: 'If their interest sways towards dogs we show them dog images.'},
          {slug: 'bunny', detail: 'If their interest sways towards bunnies we show them bunny images.'},
          {slug: 'default', detail: 'If there have been no visits we show all animals.'}
        ],
        landing: '/demo/personalization-affinity.html'
      }
      break;

    case 'personalization-datascience':
      demo = {
        title: 'Personalization - Data Science',
        description: 'Leveraging Data Science and predictive marketing is generally something few branda have access to in real time. With Lytics we delivery 5, actionable, user scores that can be used to tailor content on the fly. When users have a low propensity to return, show an offer. When they are power users, get them to spread the word.',
        customization: [
          {slug: 'propensity', detail: 'We simply show them an enticing over if their Propensity falls below 20.'}
        ],
        landing: '/demo/personalization-datascience.html'
      }
      break;

    case 'personalization-forms':
      demo = {
        title: 'Personalization - Form Efficiency',
        description: 'Forms can be scary. Leverage Lytics to pre-populate web forms with non-secure user content and streamline the signup process for any user without the need for complex account management.',
        customization: [
          {slug: 'default', detail: 'If we do not have the necessary info we simply do not populate fields. If we do, then we fill them in automatically.'}
        ],
        landing: '/demo/personalization-forms.html'
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
        uid: 'e672c1b777b093c43fd1e838fb2a861f',
        propensity: 0.13
      }
      break;

    case 'kylemorrow':
      user = {
        email: 'kyle@lytics.io',
        firstname: 'Kyle',
        lastname: 'Morrow',
        uid: '77390.50036621094',
        propensity: 0.43
      }
      break;

    case 'robthomas':
      user = {
        email:'rob@lytics.io',
        firstname: 'Rob',
        lastname: 'Shields',
        uid: '77390.50036621090',
        propensity: 0.45
      }
      break;

    case 'aaronthomas':
      user = {
        email:'aaron@lytics.io',
        firstname: 'Aaron',
        lastname: 'Raddon',
        uid: '77390.50036621030',
        propensity: 0.65
      }
      break;

    case 'jamesthomas':
      user = {
        email:'james@lytics.io',
        firstname: 'James',
        lastname: 'McDermott',
        uid: '77390.50036621050',
        propensity: 0.16
      }
      break;

    case 'michaethomas':
      user = {
        email:'michael@lytics.io',
        firstname: 'Michael',
        lastname: 'Lange',
        uid: '77390.50033621090',
        propensity: 0.65
      }
      break;

    case 'drewthomas':
      user = {
        email:'drew@lytics.io',
        firstname: 'Drew',
        lastname: 'Lanega',
        uid: '77390.50036121090',
        propensity: 0.14
      }
      break;

    case 'beccathomas':
      user = {
        email:'becca@lytics.io',
        firstname: 'Becca',
        lastname: 'Petrin',
        uid: '77390.50066621090',
        propensity: 0.31
      }
      break;

    case 'christhomas':
      user = {
        email:'chris@lytics.io',
        firstname: 'Chris',
        lastname: 'Thomas',
        uid: '77390.60036621090',
        propensity: 0.5
      }
      break;

    case 'steventhomas':
      user = {
        email:'steven@lytics.io',
        firstname: 'Steven',
        lastname: 'Thomas',
        uid: '77390.50236621090',
        propensity: 0.1
      }
      break;

    case 'michaethomasl':
      user = {
        email: 'schmichael@lytics.io',
        firstname: 'Michael',
        lastname: 'Thomas',
        uid: '77390.10036621090',
        propensity: 0.3
      }
      break;

    case 'andrewthomas':
      user = {
        email:'andrew@lytics.io',
        firstname: 'Andrew',
        lastname: 'Thomas',
        uid: '77390.50436621090',
        propensity: 0.6
      }
      break;

    case 'sarahthomas':
      user = {
        email:'sarah@lytics.io',
        firstname: 'Sarah',
        lastname: 'Thomas',
        uid: '77390.50033321090',
        propensity: 0.4
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
  // set firstname
  $.each($('[data-firstname]'), function(){
    $(this).html(lio.data.firstname);
  });

  for (var i = 0; i < d.segments.length; i++) {
    $( "#current-user-segments" ).append( '<span>' + d.segments[i] + '</span>' );
  };

  if(window.trigger_redirect){
    window.trigger_redirect_func();
  }
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
  window.liosetup.fields = "email,firstname,lastname,pet_type_ct";
  window.liosetup.field = "_uid";
  window.liosetup.value = window.user.uid;
  window.liosetup.callback = exampleKickoff;
}else{
  console.log("default");
  window.liosetup = window["liosetup"] || {};
  window.liosetup.callback = exampleKickoff;
  window.liosetup.fields = "email,firstname,lastname,pet_type_ct";
}
