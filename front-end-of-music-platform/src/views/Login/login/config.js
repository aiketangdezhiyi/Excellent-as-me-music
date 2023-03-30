import { handleCheckPwd } from "@/utils";

export const loginValidator = {
  //   表单校验
  user: [
    { required: true, message: "请填写账号名", trigger: "submit" },
    {
      min: 6,
      max: 15,
      message: "密码长度在 6 到 15 个字符",
      trigger: "submit",
    },
  ],
  pwd: [
    {
      validator: handleCheckPwd,
      trigger: "submit",
      required: true,
    },
  ],
};
