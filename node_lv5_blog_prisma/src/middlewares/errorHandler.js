// src/middlewares/error-handling.middleware.js

export default function (err, req, res, next) {
  // 에러를 출력합니다.
  console.error(err);

  if (err instanceof Error && err.message === '중복된 닉네임입니다.') {
    return res.status(400).json({ errorMessage: '중복된 유저입니다.' });
  }
  if (err instanceof Error && err.message === '존재하지 않는 게시글입니다.') {
    return res.status(404).json({ errorMessage: '존재하지 않는 게시글입니다.' });
  }
  // 클라이언트에게 에러 메시지를 전달합니다.
  return res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
}
