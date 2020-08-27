const bcrypt = require('bcryptjs');

// Import model
const Event = require('../../models/event');
const User = require('../../models/user');

// Get user by id
const user = userId => {
  return User.findById(userId)
    .then(user => {
      return { ...user.toJSON(), createdEvents: events.bind(this, user.createdEvents) }
    })
    .catch(err => {
      throw err;
    });
}

// Get events by list of event's id
const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      return events.map(event => {
        return {
          ...event.toJSON(),
          creator: user.bind(this, event.creator),
          date: new Date(event.date).toISOString()
        }
      });
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {
  // Get relate data by populate method in mongoose
  // events: () => {
  //   return Event.find()
  //     .populate('creator')   // Get additional data that populate any relation at node by the ref key
  //     .then(
  //       events => {
  //         return events.map(event => {
  //           return {
  //             ...event.toJSON(),
  //             creator: {
  //               ...event.creator.toJSON(),
  //               password: null
  //             }
  //           };
  //         })
  //       }
  //     ).catch(err => {
  //       throw err;
  //     });
  // },

  // Get by data creator by userId
  events: () => {
    return Event.find()
      .then(
        events => {
          return events.map(event => {
            return {
              ...event.toJSON(),
              creator: user.bind(this, event.creator),
              date: new Date(event.date).toISOString()
            };
          })
        }
      ).catch(err => {
        throw err;
      });
  },

  createEvent: (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5f43d2a2c349473ff06cadd6'
    });
    let createdEvent;
    return event.save()
      .then(result => {
        createdEvent = {
          ...result.toJSON(),
          creator: user.bind(this, result.creator),
          date: new Date(event.date).toISOString()
        };
        return User.findById('5f43d2a2c349473ff06cadd6');
      })
      .then(user => {
        if (!user) {
          throw new Error('User not found.')
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err)
        throw err;
      });
  },
  createUser: (agrs) => {
    return User.findOne({ email: agrs.userInput.email }).then(user => {
      if (user) {
        throw new Error('User exists already.')
      }
      return bcrypt.hash(agrs.userInput.password, 12)
    })
      .then(
        hashedPassword => {
          const user = new User({
            email: agrs.userInput.email,
            password: hashedPassword
          });
          return user.save();
        }
      ).then(
        result => {
          return { ...result.toJSON(), password: null }
        }
      ).catch(err => {
        throw err;
      });
  }
}