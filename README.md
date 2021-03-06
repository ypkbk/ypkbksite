The source code of [website of YPKBK](http://ypkbksite.herokuapp.com), including a very simple CMS


# Kanban
## Later
* Add sharing buttons on all modal windows
* Add copy URL button for sharing
* The Yayasan Pelayan Kesehatan Bala Keselamatan needs to be smaller for medium sized screens
* Create list of old articles in admin-ui
* Consider move all pictures to flickr

## Todo
* Allow user to override slugname for clinics and hospitals
* Get content for modal windows when they are shown http://stackoverflow.com/questions/12190119/bootstrap-modal-show-event. Don't need to return everything on first request. But what is reloaded?
* Consider moving CDN-stuff to heroku and cache it instead

## Refactoring ideas

## Doing (2)
* input data in production database

## Done
* Remove clinics
* Understand why pictures are funky on articles
* Allow non-URLs in photoUrl-field for articles
* Wider kontakt information well
* Set up caching for static content
* Clean up HTML from validation error https://validator.w3.org/check?uri=http%3A%2F%2Fypkbksite.herokuapp.com%2F&charset=%28detect+automatically%29&doctype=Inline&group=0
* Make fav-logo transparant
* Set the app name of the site when doing Add to homescreen
* Google Analytics setup
* Tests that **doesn't** verify the database content.
* Background pictures
	* header image
* split index.html to smaller views
* improve speed of first load
* List the pictures in folders on the page of the clinics/hosptials
* Make sure that clinics/hospitals can alternate between local and http images
* change css style name service-heading to be articles-heading
* function getSlugFromName is duplicated
* Contact form should send proper emails
* create a separate file for site routes
* tests for articles on site
* Use article data on the site
* Create Flickr Account (https://www.flickr.com/photos/131918734@N03/?, https://farm8.staticflickr.com/7584/16596141074_afeebb86ed_m_d.jpg)
* Administration Article
* Administration Clinics
* Use clinic data on the site

## Fix
* Set safe output ({{ apa | safe }}) for all textarea fields for hospitals
* Sorting of lain-lain texts in the admin UI
* Set the app name of the site when doing Add to homescreen
* Test that **doesn't** verify the database content.
* Refactor lib (render and db) to one place
* Change to hospital*s*Collection

## Doing (2)

## Done
=======
* created one test helpers
* Refactor lib (render and db) to one place
* Change to hospital*s*Collection
* Sorting of lain-lain texts in the admin UI
* Set safe output ({{ apa | safe }}) for all textarea fields for hospitals
* Add kantor information
* Administration Lain-lain
* Use lain-lain texts on the site
* Link directly to hospital/clinic/news doesnt work
* Use hospital data on the site
* Server images from Dropbox / Google Drive - DOESN'T WORK
* add city and id property for hospitals
* remove unsed files in admin
* make favicon for ypkbk
* Set up github
	* Deny
	* Org for YPKBK
* closing modal windows should set URL (ex. #institution-rsbungsu -> #hospitals)
* Admin hospitals
* Fixed... again the linking to the to modal windows
* Background image for contact us
* Hardcoded example news section
* Make the social media icons bigger using fa-2x
* The panels for hospital doesn't have to be in <div class="row"></div> they will just overflow to the next line
* Structure the application using mount
	* Admin
	* Api

* Hardcoded, example clinic data
	* Define information
	** Opsir
	** Visi Misi
	** Pelayanan
	** Rujukan
	* Good pictures (400 x 250)
	* Information
* For example hospital
** pictures for web, fb and emails
** find good picture (400 wide x 250 high)
** get information to put on hospital page
* define hospital information
* Use CDN for common files
* Deploy first version


# License
The [MIT LICENSE](LICENSE) for the site code

Using the [Agency - Start Bootstrap Theme](http://startbootstrap.com/template-overviews/agency/) from [Start Bootstrap](http://startbootstrap.com) under the [Apache License](/public/LICENSE)
