import initComment from "./CommentSchema";
import initFileUploaded from "./FileUploadedSchema";
import initReceipt from "./ReceiptSchema";
import initRefreshToken from "./RefreshTokenSchema";
import initTag from "./TagSchema";
import initUserRight from "./UserRightSchema";
import initUser from "./UserSchema";
import initVertificationCode from "./VertificationCodeSchema";

export default function init() {
  initUser();
  initFileUploaded();
  initComment();
  initReceipt();
  initRefreshToken();
  initTag();
  initUserRight();
  initVertificationCode();
}
