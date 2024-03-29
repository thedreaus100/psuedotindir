# Psuedo-Tindir 
#####(Rough Draft)

## Requirements

Create the Tinder card stack in `html/js/css`. At a minimum, this must:

Recognize swipe left and swipe right gestures
Render properly on an iPhone 6
Populate "cards" using data from a backend API endpoint (this can be static json)
Bonus points for:

Using react or `angularjs` for your JS framework
Using `node.js`, go, or python for your backend
Making the site responsive so it works well on desktop and arbitrary screen sizes
**Including a gamepad??**
Bringing up the It's a match! screen on right swipe
Adding cool features

### Configuration

 add puesdotindir.com to hosts file

 Unix:
 	/etc/hosts

 Windows:
 	C:\WINDOWS\system32\drivers\etc\hosts.

 Then add
 	127.0.0.1    puesdotindir.com
 	127.0.0.1    www.puesdotindir.com

## Tools 

#### Bower
	+ Angular-Material vs Bootstrap?
	+ Angular
	+ Angular-Touch
	+ Restangular
	+ UIRouter

#### NPM
	+ Express
	+ Redis
	+ Redis-Store

#### Gulp
	+ Gulp-Angular Set Up

#### Jasmine ?? (Possibly!)

## Components

- Angular Front-End Served via NodeJS
	* Client Interface
	* Registration
	* Messaging UI (Basic)
	* Image / Video Upload?

- NodeJS (Service Layer)
	* Serve Client Files
	* Authentication
	* Authorization
	* Data Storage??

- Couchdb
	* Store User Details
	* Used for relational data
	* Join User Data w/ Image (Video?) Data
	* ?Store User Messages?

- Redis Session Data
	* GeoSearch??
	* Track Session Data

- ElasticSearch
	* GeoSearch
	* Possibly include similar interests in criteria

##Installation
###NodeJS
[Download NodeJS](https://nodejs.org/en/)

`npm install`
`bower install`

###Redis
[Download Redis](http://redis.io/download)

###Couchdb
[Download Couchdb](http://couchdb.apache.org/)

###ElasticSearch
[Download ElasticSearch](https://www.elastic.co/downloads/elasticsearch)

####ElasticSearch CouchDB River Plugin
Rivers allow data to be sync from couchdb to ElasticSearch

`[ElasticSearch Installation]/bin/plugin install elasticsearch/elasticsearch-river-couchdb/2.6.0`

--more--

[What is a River?](https://github.com/elastic/elasticsearch-river-couchdb/blob/master/README.md)

###Gulp (Optional)
`npm install -g gulp`

###Configuration
`server-config/default.json`

Set the appropriate configurations for couchdb, elasticSearch & Redis

###Create Girlfriends
Creates JSON documents which represent various users on the platform
It will prompt for address information, please provide the search area you will
be using the website from as will generate your girlfriends in the area ie "Chicago IL, 60637"

You can create as many girlfriends as you want.... It creates one girlfriend for every image in `src/assets/user-images`

`node createGirlFriends;`

###Create Databases
Creates and intializes the databases, uploads the information & and then creates a [River](https://www.elastic.co/guide/en/elasticsearch/rivers/current/index.html)

`node createDatabases`

##Run

###via Gulp
####Front-End only
w/ BrowserSync (Won't work unless back-end requests are disabled)

`gulp serve`

####w/ Server
`gulp node-serve`

###w/out Gulp
`node index.js`






