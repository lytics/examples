#Using Entity Callback

##Overview
How to support custom JavaScript functionality through Lytics JS callbacks. As a result the full user entity will be passed to a custom JS function. Entity data by default includes segments slugs the user is currently a member of. Using [white listed fields](https://github.com/lytics/examples/blob/master/core/whitelisting_fields.md) a variety of user data can be made accessible.
  
##Prerequisite
*  None

##Potential Use Cases
*  Custom integrations.

##How To

### 1. Install Lytics JavaScript Tag
All of the personalization tools are built into the core Lytics tag. Step one is to [install the base tag via the workflow](https://activate.getlytics.com/integrations/lytics_external/connect/7d646295b81940cc823e0683245716b4/configuration).

### 2. Create Handler Function
Example handler function receives the user entity as an attribute once it has loaded and does a simple console log of the object. 

```html
<script>
	var doSomethingCustom = function(payload){
		console.log(payload); // outputs the entire object
		console.log(payload.segments); // outputs just the array of segments user is a member of
	}
</script>
```

Example handler function waits until entity has been loaded and then checks the membership of a particular segment.

```html
<script>
	var doSomethingCustom = function(){
		if(window.lio.inSegment('my_sample_segment')){
			console.log("is a member of my sample segment");
		}else{
			console.log("is not a member of my sample segment");
		}
	}
</script>
```

### 3. Initialize Callback
```html
<script type="text/javascript">
     window.liosetup = window["liosetup"] || {};
     window.liosetup.callback = doSomethingCustom;
 </script>
```
[More details and examples](../../core/javascript_tag.md) regarding the proper setup and config of the Lytics tag.
    
##Demo
* [View Live Demo of Lytics powered redirects.](http://lytics.github.io/examples/personalization-redirect.html)