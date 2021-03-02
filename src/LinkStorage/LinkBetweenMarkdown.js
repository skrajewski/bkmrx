const format = require('date-fns/format');
const parse = require('date-fns/parse');
const { prepareLink } = require('./Link');

/**
 * compose :: (a -> a) -> (a -> a) -> (a -> a)
 * todo: is it a valid signature?
 */
const compose = (f, g) => arg => f(g(arg));

/**
 * Parse array of tags to inline representation
 * 
 * @param {string[]} tags
 * @returns {string}
 */
const inlineTags = tags => tags.map(t => `@${t}`).join(' ');

/**
 * Format date object to its Markdown representation
 * 
 * @param {Date} date 
 * @returns {string}
 */
const formatDate = date => format(date, 'yyyy-MM-dd HH:mm');

/**
 * Clean up the date string retrieved from the Markdown line
 *  
 * @param {string} datePart Part of date from Markdown line
 * @returns {string}
 */
const cleanupDate = datePart => datePart.replace('- ', '').trim();

/**
 * Parse date string from Markdown to Date object
 * 
 * @param {string} dateString Date from Markdown line
 * @returns {Date}
 */
const parseDate = dateString => parse(dateString, 'yyyy-MM-dd HH:mm', new Date());

/**
 * Clean and parse date from Markdown file
 * 
 * @param {string} datePart 
 * @returns {string}
 */
const cleanAndParseDate = compose(parseDate, cleanupDate);

/**
 * Parse link from Markdown file to Link object
 * 
 * @param {string} line single entry from Markdown file
 * @returns {Line}
 */
const fromMarkdown = line => {
    const parts = line.split('#');
    const data = cleanAndParseDate(parts[0]);
    const tags = parts[2].match(/\@([A-Za-z0-9\-]+)/g) || [];

    return prepareLink(parts[1].trim(), tags, data)
};

/**
 * Parse Link object to its Markdown representation
 * 
 * @param {Link} link 
 * @returns {string}
 */
const toMarkdown = link => `- ${formatDate(link.createdAt)} # ${link.url} # ` + inlineTags(link.tags);

module.exports = {
    fromMarkdown,
    toMarkdown
};