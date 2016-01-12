#Lytics Javascript Tag

##Overview
Toggling the visibility of a single or group of elements is a built in feature for Lytics. This allows you to easily add a few data attributes to any standard HTML element and harness the power of real-time personalization. Something as simple as showing a `login` button vs a `signup` button for existing members can greatly improve the overall experience and that is just the start of what Lytics allows you to do.

##Prerequisite
*  None

##Installation
*  `<script src="https://api.lytics.io/api/tag/{your_account_id}/lio.js"></script>`

##Usage

###Setup (optional)
* **Initialization**
	* `window.liosetup = window.liosetup || {};`    
      At the top of your setup block you must first ensure the liosetup object exists.
* **Callbacks**
	* `window.liosetup.callback = myCoolFunction;`    
      Once the Lytics tag has identified the user and returned the requested info, segments by default, we can trigger a callback of your choice. Simply pass the function name here.
* **Google Analytics Dimensions**
	* Segment Membership
		* `window.liosetup.gaSegmentDimension = "dimension10";`    
         Using custom dimensions Lytics can pass segment names into Google Analytics so that you can view traffic patters specific to user types. Likewise this data can be shared with other tools in the Google ecosystem like AdWords.
	* User Id
		* `window.liosetup.gaUserDimension = "dimension7";`    
		  Similar to the users segments, this will pass the Lytics unique Id to Google Analyitcs by way of custom dimension.
	* Google User Id
		* `window.liosetup.gaUserId = "dimension5";`    
		  Lastly, Lytics supports the new Google User Id fields as well. Adding a dimension here will allow users to be further identified.
* **Debugging**
	* `window.liosetup.debug = true;`     
	  Turning debug mode on globally will result in console output to verify everything is working correctly. In the event of an error, output will be rendered helping you track down the source.
* **Identification**
	* `window.liosetup.field = "some field in lytics";`
	* `window.liosetup.value = "some unique identifier in lytics";`    
	  By default Lytics will begin to identify and track users by our own unique Id's. In the case where you have other information, such as a user id, to identify a user you can override our identification and use whatever you would like. Simply pass in the name of the field and the value and we will query users based on that.
* **User Fields**
	* `window.liosetup.fields = "email,firstname,lastname";`    
 	   One of the most powerful features of Lytics is the ability to return data, in real-time, for a user. Adding the desired fields in this comma separated string will allow for data in addition to segment membership to be returned for more advanced personalization. `Note, fields must be whitelisted before they will be returned`.

###Full Implementation Example
```html
<script type="text/javascript">
     window.liosetup = window["liosetup"] || {};
     window.liosetup.gaUserId = "dimension5";
     window.liosetup.gaUserDimension = "dimension7";
     window.liosetup.gaSegmentDimension = "dimension10";
     window.liosetup.fields = "email,firstname";
 </script>
<script src="https://api.lytics.io/api/tag/1234notarealid1234/lio.js"></script>
```

###Personalization
[Detailed Instructions & Demos](../javascript/personalization/)


##Testing & Debugging

In order to streamline development a handful of helper methods are build in to assist with debugging. From your browser console run:

* `lio.debugMsgs`: To output all of the errors that have occured. If an empty array is returned there are no errors and everything should be working correctly.
* `lio.segmentsHash`: Will output an object containing all the users segments, or `not_found` if there are none.
* `lio.integrations`: Will output an object containing the status of each individual built in integration. A 200 means everything worked correctly, a 201 means that Lytics has been set up properly but there was an issue passing the data into that particular vendor. More details should be available in the debugMsgs output.
* `lio.debug = true`: Will activate the debugging output. As the script runs you should see `ticks` output in your console. This is done each time we attempt to do a retry on processing the integrations. No output at all would represent an error. Once things have completed the `debugMsgs` output should be displayed.
