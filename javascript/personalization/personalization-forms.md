#Personalization - Forms

##Overview
As a user, filling out forms is among the most tedious of tasks. Especially when I have already filled out a form once or twice on a particular site. Using Lytics, you can remove the need to leverage local storage, cookies, and other non-cross domain capable tools to populate a form with known data. 
  
##Prerequisite
*  None

##Potential Use Cases
*  Newsletter Sign Up
*  Account Sign In
*  Shopping Cart Completion
*  Surveys or Feedback Forms

##How To

### 1. Install Lytics Javscript Tag
All of the personalization tools are built into the core Lytics tag. Step one is to [install the base tag via the workflow](https://activate.getlytics.com/#/integrations/8075d31de91d41b084c23f3d7bbc4f28/action/7d646295b81940cc823e0683245716b4/setup).

### 2. Whitelist Fields
For Lytics to properly return user data outside of `segments`, fields need to be whitelisted. For details on whitelisting fields and/or domains please review our [whitelisting docs](../../core/whitelisting_fields.md).

### 3. Prepare Form Fields

```html
<input id="firstName" type="text">
<input id="lastName" type="text">
<input id="email" type="text">
```

### 4. Create Handler Function
Handler function leverages jQuery to alter the input value once data has been returned from Lytics.

```html
<script>
	var prefillForm = function(){
	  $('#firstName').val(window.lio.data.firstname);
	  $('#lastName').val(window.lio.data.lastname);
	  $('#email').val(window.lio.data.email);
	}
</script>
```

### 5. Initialize Callback
```html
<script type="text/javascript">
     window.liosetup = window["liosetup"] || {};
     window.liosetup.callback = prefillForm;
 </script>
```
[More details and examples](../../core/javascript_tag.md) regarding the proper setup and config of the Lytics tag.
    
##Demo
* [View Live Demo of Lytics powered personalization](http://example.getlytics.com:2000/personalization-forms.html)