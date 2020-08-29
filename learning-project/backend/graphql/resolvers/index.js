const bcrypt = require('bcryptjs');

// Import model
const Event = require('../../models/event');
const User = require('../../models/user');

// Get user by id
const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user.toJSON(),
      createdEvents: events.bind(this, user.createdEvents)
    };
  } catch (err) {
    throw err;
  };
}

// Get events by list of event's id
const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event.toJSON(),
        creator: user.bind(this, event.creator),
        date: new Date(event.date).toISOString()
      }
    });
    return events;
  } catch (err) {
    throw err;
  };
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
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return {
          ...event.toJSON(),
          creator: user.bind(this, event.creator),
          date: new Date(event.date).toISOString()
        };
      })
    } catch (err) {
      throw err;
    };
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5f43d2a2c349473ff06cadd6'
    });
    let createdEvent;
    try {
      const result = await event.save()
      createdEvent = {
        ...result.toJSON(),
        creator: user.bind(this, result.creator),
        date: new Date(event.date).toISOString()
      };
      const creator = await User.findById('5f43d2a2c349473ff06cadd6');
      if (!creator) {
        throw new Error('User not found.')
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err)
      throw err;
    };
  },
  createUser: async (agrs) => {
    try {
      const existingUser = await User.findOne({ email: agrs.userInput.email })
      if (existingUser) {
        throw new Error('User exists already.')
      }
      const hashedPassword = await bcrypt.hash(agrs.userInput.password, 12);

      const user = new User({
        email: agrs.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      return { ...result.toJSON(), password: null };
    } catch (err) {
      throw err;
    };
  }
}