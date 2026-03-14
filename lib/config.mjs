const isProd = process.env.NODE_ENV === 'production';
const prefix = isProd ? '/valeart' : '';

export {
  isProd,
  prefix
};