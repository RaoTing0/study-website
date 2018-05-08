const express = require("express");
const router = express.Router();
const users = require("../models/user");
const resumes = require("../models/resume");
const positions = require("../models/position");

// 获取所有用户信息
router.get("/userlist", function(req, res) {
    users.find({}, function(err, docs) {
        res.json({
            data: docs,
            status: 200,
            message: "成功"
        });
    });
});

// 注册（将账号和密码作为参数传递）
router.post("/register", function(req, res) {
    const account = req.body.account;

    // 注册时，用户已经存在
    users.findOne({ account: account }, function(err, doc) {
        if (err) {
            throw err;
            return;
        }

        if (doc) {
            return res.json({
                data: "",
                status: 403,
                message: "手机号已注册"
            });
        }

        // 将数据存入数据库中
        const user = new users(req.body);

        user.save(function() {
            console.log("新的用户插入成功");
            res.json({
                data: req.body,
                status: 200,
                message: "成功"
            });
        });
    });
});

// 登陆，将账号和密码作为参数传递
router.post("/login", function(req, res) {
    const account = req.body.account;
    const password = req.body.password;
    users.findOne({ account: account }, function(err, doc) {
        if (!doc) {
            return res.json({
                data: " ",
                status: 403,
                message: "账号不存在"
            });
        }
        if (doc.password != password) {
            return res.json({
                data: " ",
                status: 403,
                message: "密码错误"
            });
        }

        return res.json({
            data: account,
            status: 200,
            message: "登陆成功"
        });
    });
});

// 个人简历接口（个人信息的展示从个人简历的表中获取，或者直接返回完整信息）
// 请求参数中传递用户账号
router.get("/resume", function(req, res) {
    const account = req.query.account;
    users.findOne({ account: account }, function(err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            const id = doc._id;
            resumes.findOne({ user_id: id }, function(err, doc) {
                console.log(doc);
                if (err) {
                    throw err;
                }
                if (doc) {
                    return res.json({
                        data: doc,
                        status: 200,
                        message: "简历存在"
                    });
                }
                return res.json({
                    data: "",
                    status: 403,
                    message: "该用户没有简历"
                });
            });
        }
    });
});

// 投递简历接口，将简历的id存入对应的position集合resume_ids字段的数组中
// 请求的参数position的id和简历的id（或者是用户名，根据用户名查找简历的id）
router.get("/putResume", function(req, res) {
    // 客户端先获取自己的简历，如果简历存在，发送投递简历请求，将简历的id与简历id传过来，存入position集合的对应数组中
    // 如果简历不存在，提示用户完善简历
    const resumeId = req.query.resumeId;
    const positionId = req.query.positionId;

    positions.findOne({ _id: positionId }, function(err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            doc.resume_ids.push(resumeId);
            doc.save();
            return res.json({
                data: doc,
                status: 200,
                message: "成功"
            });
        }
        return res.json({
            data: "职位不存在",
            status: 403,
            message: "存储失败"
        });
    });
});

// 获取所有职位信息
router.get("/getPosition", function(req, res) {
    positions.find({}, function(err, doc) {
        if (err) {
            throw err;
        }
        if (!doc) {
            return res.json({
                data: "",
                status: 403,
                message: "没有职位"
            });
        }
        return res.json({
            data: doc,
            status: 200,
            message: "成功"
        });
    });
});

// 获取某个职位信息
router.get("/getOnePosition", function(req, res) {
  positions.find({_id: req.query.id}, function(err, doc) {
    if (err) {
      throw err;
    }
    if (!doc) {
      return res.json({
        data: "",
        status: 403,
        message: "该职位不存在"
      });
    }
    return res.json({
      data: doc,
      status: 200,
      message: "成功"
    });
        
  })
})

// 完善简历信息（将用户对应的id放在数据中）
router.post("/writeResume", function(req, res) {
    const resume = new resumes(req.body);

    resume.save(function(err) {
        if (err) {
            throw err;
        }
        res.json({
            data: resume,
            status: 200,
            message: "简历已完善"
        });
        console.log("插入成功");
    });
});

// 更新简历信息(传递简历的id与要修改的内容)
router.post("/updateResume", function(req, res) {
    resumes.update({ _id: req.body._id }, { name: req.body.name }, function(err) {
        if (err) {
            res.json({
                data: "简历不存在",
                status: 400,
                message: "失败"
            });
        }
        res.json({
            data: "已修改",
            status: 200,
            message: "成功"
        });
    });
});

// 添加职位
router.post("/addPosition", function(req, res) {
    console.log(req.body);
    const position = new positions(req.body);

    position.save(function(err) {
        if (err) {
            throw err;
        }
        res.json({
            data: position,
            status: 200,
            message: "职位添加成功"
        });
        console.log("插入成功");
    });
});

//更新职位信息
router.post("/updatePosition", function(req, res) {
    positions.update({ _id: req.body._id }, { companyName: req.body.companyName }, function(err) {
        if (err) {
            res.json({
                data: "职位不存在",
                status: 400,
                message: "失败"
            });
        }
        res.json({
            data: "已修改",
            status: 200,
            message: "成功"
        });
    });
});

module.exports = router;