#Personalization - Redirect

##Overview
Directing a visitor to the page with the most relevance is critical when optimizing any marketing campaign. Using Lytics to power your redirects you can send all visitors from an email to one single langing page, then let that page determine where they should land. This is seemless for the end user and gets the dynamic nature of segmented campaigns out of your ad / email strategy.
  
##Prerequisite
*  None

##Potential Use Cases
*  Paid Search Landing Page Optimization
*  Banner Advertising Landing Page Optimization
*  Email Campaign Landing Page Optimization
*  Dormant User Offer Delivery

##How To

### 1. Install Lytics Javscript Tag
All of the personalization tools are built into the core Lytics tag. Step one is to [install the base tag via the workflow](https://activate.getlytics.com/#/integrations/8075d31de91d41b084c23f3d7bbc4f28/action/7d646295b81940cc823e0683245716b4/setup).

### 2. Create Handler Function
Handler function leverages jQuery to alter the input value once data has been returned from Lytics.

```html
<script>
	var lyticsRedirect = function(){
		if(window.lio.inSegment('is_member')){
		 window.location.replace('/personalization-redirect_is_member.html');
		}else if(window.lio.inSegment('smt_new')){
		 window.location.replace('/personalization-redirect_is_new.html');
		}else{
		 window.location.replace('/personalization-redirect_default.html');
		}
	}
</script>
```

### 3. Initialize Callback
```html
<script type="text/javascript">
     window.liosetup = window["liosetup"] || {};
     window.liosetup.callback = lyticsRedirect;
 </script>
```
[More details and examples](../../core/javascript_tag.md) regarding the proper setup and config of the Lytics tag.
    
##Demo
* [View Live Demo of Lytics powered redirects.](http://lytics.github.io/examples/personalization-redirect.html)