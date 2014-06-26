if (Meteor.isClient) {

  /*
   TOP PANEL TEMPLATE
   */

  Template.top_bar.events({
    'click [data-toggle=offcanvas]': function () {
      /*
       TODO: look into LESS to alias classes.
       http://www.miuaiga.com/index.cfm/2013/11/2/Dynamic-Bootstrap-Layout-on-any-markup-with-makecolumn-and-makerow-via-LESS
       e.g. in big mode, sidebar class would map to "col-xs-6 col-sm-3"
            which means content class maps to "col-xs-6 col-sm-9"
            in small mode, inactive, "sidebar" isn't there
            which means content class maps to "col-xs-12"
            in small mode, active, "sidebar" maps to "col-xs-6 col-sm-3"
            which means content class maps to "col-xs-6 col-sm-9"

       unsure how to tell big mode / small mode without a media check
       which is independent of bootstrap.

       it's impossible to effectively adjust columns?
       presently, the col-xs-6 and col-sm-9 on content cause undesireable
       wrapping behavior due to the hack used to pull the tray off the side.

       maybe best bet is to $.addClass and $.removeClass against the 
       sidebar and content divs right here, since this button is only
       available in small mode anyway. very ugly solution :(
       */
      $('.row-offcanvas').toggleClass('active');
    }
  });

  Template.top_bar.project = function () {
    /* TODO Pull this from description.js or the data store */
    var description = {
      'title': 'Annotorious'
    };
    return description.title;
  };

}
