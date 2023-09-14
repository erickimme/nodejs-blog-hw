// import { BAD_REQUEST } from '../utils/errors/BadRequest.js';
// import { VALIDITY_ERROR } from '../utils/errors/ValidityError.js';
/**
 * 유효성 검사를 확인해주는 핸들러
 *
 * @function
 * @param {Joi.ObjectSchema} schema
 * @returns {function} - 미들웨어 함수 반환
 * @namespace validateBody
 */
export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      // req.body를 스키마로 유효성 검사하고 유효하면 req.body 업데이트
      const validatedBody = await schema.validateAsync(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      const { type, message } = err.details[0];
      if (type === 'any.required') return next(message); // Bad Request error
      return next(message); // 유효성 검사 에러
    }
  };
};

export const abc = 123;
