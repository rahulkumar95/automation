/* Flasy values */
exports.FALSE_VALUES = [null, undefined, ''];

/* Permissions Constant */
exports.PERMISSIONS_LOOKUP = {
  super_admin: {
    audit: ['create', 'read', 'update', 'delete'],
    user: ['create', 'read', 'update', 'delete'],
  },
  admin: { audit: ['create', 'read', 'update', 'delete'] },
  hr: { audit: ['read'] },
};
