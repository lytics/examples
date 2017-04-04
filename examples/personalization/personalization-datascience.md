#Personalization - Data Science

##Overview
Most organizations do not have the luxury of a team of Data Scientists onboard, but with Lytics we bring the data science to you. Leveraging our pre-built scorign algorithms you can alter content, redirect, etc based on predictive logic. In the example below we demonstrate how to use `propensity` to push an enticing offer to those that have a low propensity (likelyhood) to return, capturing their conversion is critical.
  
##Prerequisite
*  None

##Potential Use Cases
*  Landing Page Optimization
*  Home Page Optimization

##How To

### 1. Install Lytics Javscript Tag
All of the personalization tools are built into the core Lytics tag. Step one is to [install the base tag via the workflow](https://activate.getlytics.com/#/integrations/8075d31de91d41b084c23f3d7bbc4f28/action/7d646295b81940cc823e0683245716b4/setup).

### 2. Whitelist Fields
For Lytics to properly return user data outside of `segments`, fields need to be whitelisted. For details on whitelisting fields and/or domains please review our [whitelisting docs](../../core/whitelisting_fields.md).

### 3. Prepare Element (img in this demo)

```html
<a href="#" id="propensity-offer">Sign Up</a>
```
To prevent `flicker` this element should be set to `display:none;` on load and then toggled once the content has been altered.

### 4. Create Handler Function
Handler function leverages jQuery to alter the input value once data has been returned from Lytics.

```html
<script>
	var useDataScience = function(){
		if(window.lio.data.propensity < 0.20){
			$('#propensity-offer').html("Sign Up Now &amp; Get 20% Off Your Fees");
		}
	}
</script>
```

### 5. Initialize Callback
```html
<script type="text/javascript">
     window.liosetup = window["liosetup"] || {};
     window.liosetup.callback = useDataScience;
 </script>
```
[More details and examples](../../core/javascript_tag.md) regarding the proper setup and config of the Lytics tag.
    
##Demo
* [View Live Demo of Lytics real-time data science](http://lytics.github.io/examples/personalization-datascience.html)