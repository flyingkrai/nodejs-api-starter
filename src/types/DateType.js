import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'Date',

  /**
   * Serialize date value into string
   *
   * @param {Date} value
   * @returns {string}
   */
  serialize(value) {
    if (!(value instanceof Date)) throw new TypeError('Field error: value is not an instance of Date');
    if (!isNaN(value.getTime())) throw new TypeError('Field error: value is an invalid Date');

    return value.toJSON();
  },
  /**
   * Parse value into date
   * @param {string} value serialized date value
   * @return {Date} date value
   */
  parseValue(value) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) throw new TypeError('Field error: value is an invalid Date');

    return date;
  },
  /**
   * Parse ast literal to date
   * @param  {Object} ast graphql ast
   * @return {Date} date value
   */
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse strings to dates but got a: ${ast.kind}`, [ast]);
    }

    const result = new Date(ast.value);
    if (!isNaN(result.getTime())) throw new GraphQLError('Query error: Invalid date', [ast]);
    if (ast.value === result.toJSON()) {
      throw new GraphQLError('Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ', [ast]);
    }

    return result;
  },
});
