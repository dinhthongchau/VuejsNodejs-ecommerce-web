const adminsService = require("../services/admin.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createAdmin(req, res, next) {
  if (
    !req.body?.admin_username ||
    typeof req.body.admin_username !== "string"
  ) {
    return next(
      new ApiError(400, "Admin username should be a non-empty string")
    );
  }

  try {
    const admin = await adminsService.createAdmin({
      ...req.body,
    });

    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${admin.admin_id}`,
      })
      .json(
        JSend.success({
          admin,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the admin")
    );
  }
}

async function loginAdmin(req, res, next) {
  const { admin_username, admin_password } = req.body;

  try {
    const admin = await adminsService.verifyAdmin(
      admin_username,
      admin_password
    );
    if (admin) {
      // Lưu thông tin người dùng vào session
      req.session.admin = {
        admin_id: admin.admin_id,
        admin_username: admin.admin_username,
      };
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return next(
            new ApiError(500, "L��i khi lưu session, vui lòng thử lại.")
          );
        }
        return res.status(200).json(
          JSend.success({
            message: "Login successfully",
            data: req.session.admin,
          })
        );
      });
    } else {
      return res.status(401).json(JSend.error("Invalid username or password"));
    }
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "An error occurred during login"));
  }
}

async function logoutAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.json(JSend.success("Admin chưa đăng nhập!"));
  }
  req.session.destroy((err) => {
    if (err) {
      return next(new ApiError(500, "Lỗi khi đăng xuất, vui lòng thử lại."));
    }
    res.clearCookie("connect.sid");

    return res
      .status(200)
      .json(JSend.success({ message: "Đăng xuất thành công!" }));
  });
}

module.exports ={
    createAdmin,
    loginAdmin,
    logoutAdmin,
}