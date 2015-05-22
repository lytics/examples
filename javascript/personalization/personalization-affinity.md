#Personalization - Content Affinity

##Overview
As a user, I want to see / read things that are relevant to me. As a marketer or engineer this can be a very complex process of data queries and switch statements. With Lytics you can return a simple object of `affinity counts` and toggle content with ease.
  
##Prerequisite
*  None

##Potential Use Cases
*  Landing Page Optimization
*  Cross Selling
*  Home Page Optimization

##How To

### 1. Install Lytics Javscript Tag
All of the personalization tools are built into the core Lytics tag. Step one is to [install the base tag via the workflow](https://activate.getlytics.com/#/integrations/8075d31de91d41b084c23f3d7bbc4f28/action/7d646295b81940cc823e0683245716b4/setup).

### 2. Whitelist Fields
For Lytics to properly return user data outside of `segments`, fields need to be whitelisted. For details on whitelisting fields and/or domains please review our [whitelisting docs](../../core/whitelisting_fields.md).

### 3. Prepare Element (img in this demo)

```html
<img id="target-image" src="img/rabbit.jpg">
```
To prevent `flicker` this element should be set to `display:none;` on load and then toggled once the content has been altered.

### 4. Create Handler Function
Handler function leverages jQuery to alter the input value once data has been returned from Lytics.

```html
<script>
	var doPersonalization = function(d){
		var petType = "catbunny", // default name
		   petCount = 0, // stores the highest count
		   image; // stores the path to an image (optional based on usecase)

		for (var p in d.pet_type_ct) {
		 var cnt = d.pet_type_ct[p];
		 if(cnt > petCount){
		   petType = p;
		   petCount = cnt;
		 }
		}

		$('#target-image').attr("src", "http://lytics.github.io/examples/img/"+petType+".jpg").show();
	}
</script>
```

### 5. Initialize Callback
```html
<script type="text/javascript">
     window.liosetup = window["liosetup"] || {};
     window.liosetup.callback = doPersonalization;
 </script>
```
[More details and examples](../../core/javascript_tag.md) regarding the proper setup and config of the Lytics tag.
    
##Demo
* [View Live Demo of Lytics powered content affinity](http://example.getlytics.com:2000/personalization-affinity.html)