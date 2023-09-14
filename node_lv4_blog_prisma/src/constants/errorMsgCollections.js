// // signup
// # 412 닉네임 형식이 비정상적인 경우 {"errorMessage": "닉네임의 형식이 일치하지 않습니다."}
// # 412 password가 일치하지 않는 경우 {"errorMessage": "패스워드가 일치하지 않습니다."}
// # 412 password 형식이 비정상적인 경우 {"errorMessage": "패스워드 형식이 일치하지 않습니다.}
// # 412 password에 닉네임이 포함되어있는 경우 {"errorMessage": "패스워드에 닉네임이 포함되어 있습니다."}
// # 412 닉네임이 중복된 경우  {"errorMessage": "중복된 닉네임입니다."}
// # 400 예외 케이스에서 처리하지 못한 에러 {"errorMessage": "요청한 데이터 형식이 올바르지 않습니다."}

// // login
// # 412 해당하는 유저가 존재하지 않는 경우 {"errorMessage": "닉네임 또는 패스워드를 확인해주세요."}
// # 400 예외 케이스에서 처리하지 못한 에러 {"errorMessage": "로그인에 실패하였습니다."}

// // posts - create
// # 412 body 데이터가 정상적으로 전달되지 않는 경우 {"errorMessage": "데이터 형식이 올바르지 않습니다."}
// # 412 Title의 형식이 비정상적인 경우 {"errorMessage": "게시글 제목의 형식이 일치하지 않습니다."}
// # 412 Content의 형식이 비정상적인 경우 {"errorMessage": "게시글 내용의 형식이 일치하지 않습니다."}
// # 403 Cookie가 존재하지 않을 경우 {"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우 {"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 400 예외 케이스에서 처리하지 못한 에러 {"errorMessage": "게시글 작성에 실패하였습니다."}

// // posts - read
// # 400 예외 케이스에서 처리하지 못한 에러 {"errorMessage": "게시글 조회에 실패하였습니다."}
// # 400 예외 케이스에서 처리하지 못한 에러 {"errorMessage": "게시글 조회에 실패하였습니다."}

// // posts - update
// # 412 body 데이터가 정상적으로 전달되지 않는 경우 {"errorMessage": "데이터 형식이 올바르지 않습니다."}
// # 412 Title의 형식이 비정상적인 경우{"errorMessage": "게시글 제목의 형식이 일치하지 않습니다."}
// # 412 Content의 형식이 비정상적인 경우{"errorMessage": "게시글 내용의 형식이 일치하지 않습니다."}
// # 403 게시글을 수정할 권한이 존재하지 않는 경우{"errorMessage": "게시글 수정의 권한이 존재하지 않습니다."}
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 401 게시글 수정이 실패한 경우{"errorMessage": "게시글이 정상적으로 수정되지 않았습니다.”}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "게시글 수정에 실패하였습니다."}

// // post - delete
// # 404 게시글이 존재하지 않는경우{"errorMessage": "게시글이 존재하지 않습니다."}
// # 403 게시글을 삭제할 권한이 존재하지 않는 경우{"errorMessage": "게시글의 삭제 권한이 존재하지 않습니다."}
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 401 게시글 삭제에 실패한 경우{"errorMessage": "게시글이 정상적으로 삭제되지 않았습니다.”}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "게시글 작성에 실패하였습니다."}

// // comments - create
// # 404 댓글을 작성할 게시글이 존재하지 않는경우{"errorMessage": "게시글이 존재하지 않습니다."}
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 412 body 데이터가 정상적으로 전달되지 않는 경우{"errorMessage": "데이터 형식이 올바르지 않습니다."}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "댓글 작성에 실패하였습니다."}

// // comments - read
// # 404 댓글을 작성할 게시글이 존재하지 않는경우{"errorMessage": "게시글이 존재하지 않습니다."}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "댓글 조회에 실패하였습니다."}

// // comments - update
// # 404 댓글을 수정할 게시글이 존재하지 않는경우{"errorMessage": "게시글이 존재하지 않습니다."}
// # 403 댓글의 수정 권한이 존재하지 않는 경우{"errorMessage": "댓글의 수정 권한이 존재하지 않습니다."}
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 412 body 데이터가 정상적으로 전달되지 않는 경우{"errorMessage": "데이터 형식이 올바르지 않습니다."}
// # 404 댓글이 존재하지 않는경우{"errorMessage": "댓글이 존재하지 않습니다."}
// # 400 댓글 수정에 실패한 경우{"errorMessage": "댓글 수정이 정상적으로 처리되지 않았습니다.”}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "댓글 수정에 실패하였습니다."}

// // coment - delete
// # 404 댓글을 삭제할 게시글이 존재하지 않는경우{"errorMessage": "게시글이 존재하지 않습니다."}
// # 403 댓글의 삭제 권한이 존재하지 않는 경우{"errorMessage": "댓글의 삭제 권한이 존재하지 않습니다."}
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 404 댓글이 존재하지 않는경우{"errorMessage": "댓글이 존재하지 않습니다."}
// # 400 댓글 삭제에 실패한 경우{"errorMessage": "댓글 삭제가 정상적으로 처리되지 않았습니다.”}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "댓글 삭제에 실패하였습니다."}

// // likes - create/delete
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 404 게시글이 존재하지 않는경우{"errorMessage": "게시글이 존재하지 않습니다."}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "게시글 좋아요에 실패하였습니다."}

// // likes - read
// # 403 Cookie가 존재하지 않을 경우{"errorMessage": "로그인이 필요한 기능입니다."}
// # 403 Cookie가 비정상적이거나 만료된 경우{"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
// # 400 예외 케이스에서 처리하지 못한 에러{"errorMessage": "좋아요 게시글 조회에 실패하였습니다."}