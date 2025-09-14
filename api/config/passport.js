const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const providerId = profile.id;
        const providerName = "google";

        // 1. Try to find user by providerId
        let user = await User.findOne({
          providers: { $elemMatch: { provider: providerName, providerId } },
        });

        if (user) {
          return done(null, user);
        }

        // 2. Try to find user by email
        if (email) {
          user = await User.findOne({ email });

          if (user) {
            // Add Google provider if not already linked
            const alreadyLinked = user.providers.some(
              (p) => p.provider === providerName && p.providerId === providerId
            );

            if (!alreadyLinked) {
              user.providers.push({ provider: providerName, providerId });
              await user.save();
            }

            return done(null, user);
          }
        }

        // 3. Create new user
        user = await User.create({
          email,
          name: profile.displayName || "No Name",
          picture: profile.photos?.[0]?.value || "",
          providers: [{ provider: providerName, providerId }],
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
