const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const fetch = require('node-fetch') || globalThis.fetch;

const BOT_API = process.env.BOT_API_URL || 'http://localhost:8000';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || '';
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || '';
const CALLBACK_URL = process.env.DISCORD_CALLBACK_URL || 'http://localhost:3000/auth/callback';
const SESSION_SECRET = process.env.SESSION_SECRET || 'notix-nexus-secret';
const PUBLIC_URL = process.env.NEXTAUTH_URL || process.env.PUBLIC_URL || 'http://localhost:3000';
const PORT = parseInt(process.env.DASHBOARD_PORT || '3000', 10);

class FileSessionStore extends session.Store {
  constructor(directory) {
    super();
    this.directory = directory;
    fs.mkdirSync(directory, { recursive: true });
  }
  fileFor(sid) {
    return path.join(this.directory, crypto.createHash('sha256').update(sid).digest('hex') + '.json');
  }
  get(sid, cb) {
    fs.readFile(this.fileFor(sid), 'utf8', (err, raw) => {
      if (err) return cb(null, null);
      try { cb(null, JSON.parse(raw)); } catch { cb(null, null); }
    });
  }
  set(sid, data, cb = () => {}) {
    fs.writeFile(this.fileFor(sid), JSON.stringify(data), 'utf8', cb);
  }
  destroy(sid, cb = () => {}) {
    fs.unlink(this.fileFor(sid), e => cb(e?.code === 'ENOENT' ? null : e));
  }
  touch(sid, data, cb = () => {}) { this.set(sid, data, cb); }
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const usesSecureCookies = PUBLIC_URL.startsWith('https://');
app.use(session({
  secret: SESSION_SECRET,
  store: new FileSessionStore(path.join(__dirname, '..', 'data', 'sessions')),
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: usesSecureCookies, sameSite: usesSecureCookies ? 'none' : 'lax', httpOnly: true },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

if (CLIENT_ID && CLIENT_SECRET) {
  passport.use(new DiscordStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ['identify', 'guilds'],
  }, (accessToken, refreshToken, profile, done) => done(null, profile)));
}

async function botApi(path) {
  try { const r = await fetch(`${BOT_API}${path}`); return await r.json(); } catch { return null; }
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

function fakeBot(guilds) {
  return {
    guilds: { cache: new Map(guilds.map(g => [g.id, g])) },
    user: { tag: 'NOTIXNEXUS', displayAvatarURL: () => '' },
    commands: { size: 47 },
  };
}

const botRef = { tag: 'NOTIXNEXUS#4904', clientId: CLIENT_ID };

// AUTH
app.get('/auth/login', passport.authenticate('discord'));
app.get('/auth/callback', (req, res, next) => {
  passport.authenticate('discord', (err, user, info) => {
    if (err || !user) return res.redirect('/auth/error?msg=' + encodeURIComponent(err?.message || info?.message || 'Login failed'));
    req.logIn(user, (err) => {
      if (err) return res.redirect('/auth/error?msg=Session failed');
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});
app.get('/auth/error', (req, res) => res.render('auth-error', { message: req.query.msg || 'Auth failed', bot: botRef, publicUrl: PUBLIC_URL }));
app.get('/auth/logout', (req, res) => { req.logout(() => res.redirect('/')); });

// HOME
app.get('/', (req, res) => res.render('home', { user: req.user || null, bot: botRef, publicUrl: PUBLIC_URL }));

// DASHBOARD
app.get('/dashboard', isAuthenticated, (req, res) => {
  const guilds = (req.user.guilds || []).filter(g => {
    const p = parseInt(g.permissions);
    return (p & 0x20) === 0x20 || (p & 0x8) === 0x8;
  }).map(g => ({ ...g, botInServer: true }));
  res.render('dashboard', { user: req.user, guilds, bot: botRef });
});

// SERVER SETTINGS
app.get('/dashboard/:guildId', isAuthenticated, async (req, res) => {
  const settings = await botApi(`/api/guilds/${req.params.guildId}/settings`) || {};
  res.render('server', { user: req.user, guild: { id: req.params.guildId, name: 'Server', icon: null, memberCount: 0 }, settings, channels: [], roles: [], stats: {}, currentPage: 'settings', query: req.query });
});

app.post('/dashboard/:guildId/update', isAuthenticated, async (req, res) => {
  res.redirect(`/dashboard/${req.params.guildId}?saved=true`);
});

// WELCOME
app.get('/dashboard/:guildId/welcome', isAuthenticated, (req, res) => {
  res.render('welcome', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], roles: [], currentPage: 'welcome', query: req.query });
});
app.post('/dashboard/:guildId/welcome', isAuthenticated, (req, res) => {
  res.redirect(`/dashboard/${req.params.guildId}/welcome?saved=true`);
});

// MODERATION
app.get('/dashboard/:guildId/moderation', isAuthenticated, (req, res) => {
  res.render('moderation', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], roles: [], currentPage: 'moderation', query: req.query });
});
app.post('/dashboard/:guildId/moderation', isAuthenticated, (req, res) => {
  res.redirect(`/dashboard/${req.params.guildId}/moderation?saved=true`);
});

// LOGGING
app.get('/dashboard/:guildId/logging', isAuthenticated, (req, res) => {
  res.render('logging', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], logs: [], currentPage: 'logging', query: req.query });
});
app.post('/dashboard/:guildId/logging', isAuthenticated, (req, res) => {
  res.redirect(`/dashboard/${req.params.guildId}/logging?saved=true`);
});

// ROLES
app.get('/dashboard/:guildId/roles', isAuthenticated, (req, res) => {
  res.render('roles', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, roles: [], currentPage: 'roles' });
});

// COMMANDS
app.get('/dashboard/:guildId/commands', isAuthenticated, (req, res) => {
  res.render('commands', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, customCommands: [], currentPage: 'commands' });
});

// EMBEDS
app.get('/dashboard/:guildId/embeds', isAuthenticated, (req, res) => {
  res.render('embeds', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, embeds: [], channels: [], currentPage: 'embeds', query: req.query });
});

// INVITES
app.get('/dashboard/:guildId/invites', isAuthenticated, (req, res) => {
  res.render('invites', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, invites: [], leaderboard: [], channels: [], currentPage: 'invites' });
});

// LEVELS
app.get('/dashboard/:guildId/levels', isAuthenticated, (req, res) => {
  res.render('levels', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, leaderboard: [], channels: [], currentPage: 'levels', query: req.query });
});

// STARBORD
app.get('/dashboard/:guildId/starboard', isAuthenticated, (req, res) => {
  res.render('starboard', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], currentPage: 'starboard' });
});

// REACTION ROLES
app.get('/dashboard/:guildId/reactionroles', isAuthenticated, (req, res) => {
  res.render('reactionroles', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, reactionRoles: [], channels: [], roles: [], currentPage: 'reactionroles' });
});

// TICKETS
app.get('/dashboard/:guildId/tickets', isAuthenticated, (req, res) => {
  res.render('tickets', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], categories: [], roles: [], activeTickets: [], currentPage: 'tickets' });
});

// GIVEAWAYS
app.get('/dashboard/:guildId/giveaways', isAuthenticated, (req, res) => {
  res.render('giveaways', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], activeGiveaways: [], currentPage: 'giveaways' });
});

// ANTI-SCAM
app.get('/dashboard/:guildId/antiscam', isAuthenticated, (req, res) => {
  res.render('antiscam', { user: req.user, guild: { id: req.params.guildId, name: 'Server' }, settings: {}, channels: [], roles: [], currentPage: 'antiscam' });
});

// SERVERS
app.get('/dashboard/servers', isAuthenticated, (req, res) => {
  res.render('servers', { user: req.user, guilds: [], totalMembers: 0, bot: botRef });
});

// COMMAND LIST
app.get('/commandlist', (req, res) => {
  res.render('commandlist', { user: req.user || null, bot: botRef });
});

// API
app.get('/api/stats', async (req, res) => {
  const data = await botApi('/api/stats');
  res.json(data || { guilds: 0, users: 0, commands: 47, latency: 0 });
});

app.listen(PORT, () => {
  console.log(`🌐 Dashboard running on ${PUBLIC_URL || 'http://localhost:' + PORT}`);
});
