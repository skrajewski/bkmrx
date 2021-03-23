const format = require('date-fns/format');
const parse = require('date-fns/parse');
const { prepareLink } = require('./Link');

/**
 * compose :: (a -> a) -> (a -> a) -> (a -> a)
 * todo: is it a valid signature?
 */
const compose = (f, g) => (arg) => f(g(arg));

/**
 * Try use function f against arg, and fallback to g if check(f) is false
 *
 * @param {function} f
 * @param {function} g
 */
const useFallbackIf = (f, g, check) => (arg) => {
  const res = f(arg);
  return check(res) ? res : g(arg);
};

/**
 * Parse array of tags to inline representation
 *
 * @param {string[]} tags
 * @returns {string}
 */
const inlineTags = (tags) => tags.map((t) => `@${t}`).join(' ');

/**
 * Format date object to its Markdown representation
 *
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => format(date, 'yyyy-MM-dd HH:mm');

/**
 * Clean up the date string retrieved from the Markdown line
 *
 * @param {string} datePart Part of date from Markdown line
 * @returns {string}
 */
const cleanupDate = (datePart) => datePart.replace('- ', '').trim();

/**
 * Parse date string from Markdown to Date object
 *
 * @param {string} dateString Date from Markdown line
 * @returns {Date}
 */
const parseDate = (dateString) => parse(dateString, 'yyyy-MM-dd HH:mm', new Date());

/**
 * Parse date string without time part.
 *
 * @param {string} dateString Date from Markdown line
 * @param {Date} dateString
 */
const parseDateFallback = (dateString) => parse(dateString, 'yyyy-MM-dd', new Date());

/**
 * Check if argument is a valid Date object
 *
 * @param {Date} date
 * @returns {boolean}
 */
const isValidDate = (d) => d instanceof Date && Number.isFinite(d.valueOf());

/**
 * Clean and parse date from Markdown file
 *
 * @param {string} datePart
 * @returns {string}
 */
const cleanAndParseDate = compose(
  useFallbackIf(parseDate, parseDateFallback, isValidDate),
  cleanupDate,
);

/**
 * Parse link from Markdown file to Link object
 *
 * @param {string} line single entry from Markdown file
 * @returns {Line}
 */
const fromMarkdown = (line) => {
  const parts = line.split(' #');
  const data = cleanAndParseDate(parts[0]);
  const tags = parts[2].match(/@([A-Za-z0-9-]+)/g) || [];
  const title = parts[2].split('@')[0].trim();

  return prepareLink(parts[1].trim(), title, tags, data);
};

/**
 * Parse Link object to its Markdown representation
 *
 * @param {Link} link
 * @returns {string}
 */
const toMarkdown = (link) => ['-', formatDate(link.createdAt), '#', link.url, '#', link.title, inlineTags(link.tags)].filter((t) => t).join(' ');

module.exports = {
  fromMarkdown,
  toMarkdown,
};
