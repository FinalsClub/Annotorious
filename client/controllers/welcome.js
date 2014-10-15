function isValidPassword(p1, p2) {
  if (p1 !== p2)
    return "Passwords to not match!";

  if (p1.length < 6)
    return "Passwords must be at least 6 characters long.";

  return null;
}

function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

Accounts.onResetPasswordLink(function(token) {
  Session.set('resetPassword', token);
});

/*
 WELCOME TEMPLATE
 */

/*
 Responds to login screen events
 */
Template.login.events({
  'submit #login-form': function(event) {
    event.preventDefault();
    var target = event.currentTarget;

    // retrieve the input field values
    var user = target.elements['login-user'].value;
    var password = target.elements['login-password'].value;

    // if valudation passes, supply the appropraite fields to
    // Meteor.loginWithPassword
    Meteor.loginWithPassword(user, password, function(err) {
      if (err) {
        alert('Login failed: ' + err.reason + '. Please retry or reset your password.');
      } else {
        console.log('you are now logged in');
        Router.go('library');
        alert('Login successful!');
      }
    });
    return false
  }
});

Template.register.events({
  'submit #register-form': function(event) {
    event.preventDefault();
    var target = event.currentTarget;

    var email = target.elements['account-email'].value.trim();
    if (!isEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    var password = target.elements['account-password'].value;
    var password_again = target.elements['account-password-again'].value;
    var validation = isValidPassword(password, password_again);
    if (validation !== null) {
      alert(validation);
      return;
    }

    var username = target.elements['account-username'].value;

    Accounts.createUser({ username: username, email: email, password: password }, function(err) {
      if (err) {
        alert('Account creation failed: ' + err.reason + '. Please try again.')
      } else {
        Router.go('library');
        alert('Account created! You are now logged in.');
      }
    });
  }
});

Template.reset.helpers({
  resetPassword: function(target) {
    return Session.get('resetPassword');
  }
});

Template.reset.events({
  'submit #recovery-form': function(event) {
    event.preventDefault();
    var target = event.currentTarget;

    var email = target.elements['recovery-email'].value.trim();
    if (!isEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    Session.set("loading", true);
    Accounts.forgotPassword({ email: email }, function(err) {
      if (err) {
        alert('Failed to send password reset email to ' +
              email + ': ' + err.reason + '. Please try again.');
      } else {
        $('#recovery-form').append('<p>Password reset email sent to ' + email + '.</p>');
      }
    })
  }
})
