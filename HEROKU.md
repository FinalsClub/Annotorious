== Heroku Application ==

=== Initialize ===

[Create a new application](https://devcenter.heroku.com/articles/quickstart) and add the MongoHQ add-on.

=== Setup ===

==== Database ====

Import data into the Mongo database using the handy tool which is TBA.

==== Config Variables ====

Using either the web interface or the CLI, add the following variables.

* Use the Meteorite buildpack. `BUILDPACK_URL = https://github.com/oortcloud/heroku-buildpack-meteorite`
* `MONGOHQ_URL` should be automatically added.
* Meteorite buildpack requires the domain name. `ROOT_URL = http://whatever.herokuapp.com/` (see [heroku-buildpack-meteorite readme](https://github.com/oortcloud/heroku-buildpack-meteorite#notes))

=== Push to Heroku ===

        git remote add heroku git@heroku.com:/whatever
        git push heroku master
