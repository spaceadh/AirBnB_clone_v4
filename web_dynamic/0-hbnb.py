#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
import uuid
from flask import Flask, render_template, url_for
from models import storage


# flask setup
app = Flask(__name__)


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/0-hbnb', strict_slashes=False)
def hbnb_filters(the_id=None):
    """
    handles request to custom template with states, cities & amentities
    """
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = uuid.uuid4()
    return render_template('0-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    MAIN Flask App"""
    app.run(debug=True, host='0.0.0.0', port='5000')
