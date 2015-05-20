#Personalization - Element Toggle

##Overview
Toggling the visibility of a single or group of elements is a built in feature for Lytics. This allows you to easily add a few data attributes to any standard HTML element and harness the power of real-time personalization. Something as simple as showing a `login` button vs a `signup` button for existing members can greatly improve the overall experience and that is just the start of what Lytics allows you to do.

##Pre-requisites
*  None

##How To

### 1. Install Lytics Javscript Tag
All of the personalization tools are built into the core Lytics tag. Step one is to [install the base tag via the workflow](https://activate.getlytics.com/#/integrations/8075d31de91d41b084c23f3d7bbc4f28/action/7d646295b81940cc823e0683245716b4/setup).

### 2. Create Segments
Your account comes with very useful data science powered segments out of the box. These can be used for the onsite personalization without issue but feel free to create any segments that make sense. As long as they are marked as `public` you can use them, in real-time as they are creatd / updated. Get an [overview of our segment builder](NEED LINK HERE).

###3. Prepare HTML Elements
There are two built in data attributes that allow elements to be hid / shown based on segment data:    
**data-liogroup**: is optional and shoud contain a string that is unique to a set of elements.    
**data-liotrigger**: is required and contains either `default` or the public segment slug as defined in your dashboard.
####Single Element Toggle On/Off
The following will show an element if the segment membership is fulfilled. If not, it is hidden.

```html
<div data-liotrigger="is_member">Show me if I am a member.</div>
```
  
####Choose One From Group of Elements
The following will display exactly one element from the group based on membership. If there are no matches the default will show. Keep in mind with the grouping the first element that matches will be displayed so they should be ordered from top to bottom.

```html
<div data-liogroup="demogrp" data-liotrigger="is_member">Show me if I am already a member.</div>
<div data-liogroup="demogrp" data-liotrigger="smt_new">Show me only if I am brand new.</div>
<div data-liogroup="demogrp" data-liotrigger="default">Show me if all else fails.</div>
```

##Customization
1. [**Whitelisting Fields**](NEED WHITELIST DOC) 
Any fields that can be segmented on within Lytics can also be returned for more advanced customization. In the demo, this is how we get first name but you could also return scores, last page view, email, etc. Any data that would enhance the users experience.

2. [**Callbacks**](NEED WHITELIST DOC)   
When the Lytics tag has pulled in all user information and completed the built in customization all data can be passed to a callback of your choice. This aids in the more advanced customization.

##Testing & Debugging
There are a variety of built in helper methods / degugging tools built in to our tag. More information about testing that an installation is working correctly can be found [here](NEED TESTING DOC)..
    
##Demo
* [View Live Demo of Lytics powered personalization](http://example.getlytics.com:2000/personalization-swap.html)