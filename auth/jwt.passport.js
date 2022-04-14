const fs = require('fs');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');
const dbConnection = require('../dbConection');

const utils = require('../utils');

const JWTStrategy = passportJWT.Strategy;
const pubKey = fs.readFileSync(global.gConfig.jwt.jwt_public_key);

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: pubKey,
      passReqToCallback: false,
      algorithms: ['RS256'],
    },
    async (jwtPayload, cb) => new Promise((resolve, reject) => {
      dbConnection.query(`select * from user where id='${jwtPayload.id} and active=1'`, (error, result) => {
        if (error) {
          reject(error);
        }
        let results = [];
        if (!utils.isEmpty(result)) {
          results = utils.constructJSONFromQueryResult(result)[[0]];
        }
        resolve(results);
      });
    })
      .then((userDetails) => {
        if (utils.isEmpty(userDetails)) {
          return cb(null, false);
        }
        return cb(null, userDetails);
      })
      .catch((err) => cb(err)),
  ),
);

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => new Promise((resolve, reject) => {
      dbConnection.query(`select * from user where email='${email}' and active=1`, (error, result) => {
        if (error) {
          reject(error);
        }
        let results = [];
        if (!utils.isEmpty(result)) {
          results = utils.constructJSONFromQueryResult(result)[[0]];
        }
        resolve(results);
      });
    }).then(async (userDetails) => {
      if (utils.isEmpty(userDetails)) return cb(null, false);

      const { salt } = userDetails;
      const { hash } = userDetails;
      const isPasswordVerified = await utils.isPasswordValid(
        password,
        salt,
        hash,
      );

      if (!isPasswordVerified) {
        return cb(null, false);
      }
      return cb(null, userDetails);
    })
      .catch((err) => cb(err)),
  ),
);
