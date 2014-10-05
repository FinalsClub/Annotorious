function isValidPassword(val) {
  return val.length >=6 ? true: false;
}

function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

/*
 WELCOME TEMPLATE
 */

/*
 Responds to login screen events
 */
Template.login.events({
  'submit #login-form': function(event, target) {
    event.preventDefault();

    // retrieve the input field values
    var email = target.find('#login-email').value;
    var password = target.find('#login-password').value;

    // if valudation passes, supply the appropraite fields to
    // Meteor.loginWithPassword
    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        alert('account login information not valid.  Please retry or reset your password.');
      } else {
        console.log('you are now logged in');
        Router.go('/library');
      }
    });
    return false
  }
});

Template.register.events({
  'submit #register-form': function(event, target) {
    event.preventDefault();

    var email = target.find('#account-email').value.trim();
    var password = target.find('#account-password').value;
    var username = target.find('#account-username').value;

    //TODO: validate input
    if (isValidPassword(password)) { // && other validatidation
      Accounts.createUser({ username: username, email: email, password: password }, function(err) {
        if (err) {
          alert('Account creation failed, please try again: ' + err.reason)
        } else {
          Router.go('/library');
        }
      });
    } else {
      alert('password must be greater than six characters long')
    };
  }
});

Template.reset.helpers({
  resetPassword: function(target) {
    return Session.get('resetPassword');
  }
});

Template.reset.events({
  'submit #recovery-form': function(event, target) {
    event.preventDefault();

    var email = target.find('#recovery-email').value.trim();

    if (email && email.length > 0 && isEmail(email)) {
      Session.set("loading", true);
      Accounts.forgotPassword({ email: email }, function(err) {
        if (err) {
          alert(err.reason + ' for ' + email + '.  Please try again.');
        } else {
          $('#recovery-form').append('<p>Password reset email sent to ' + email + '.</p>');
        }
      })
    }

  }
})
