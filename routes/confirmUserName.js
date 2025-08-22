const express = require("express");
const router = express.Router();

const Cutout = require('../models/Cutout')

router.post("/confirmUserName", async (req, res) => {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ error: "이름을 입력하세요" });
    }

    try {
        // '홍길동', '홍길동2', '홍길동3' 등 중복 이름 검사
        const regex = new RegExp(`^${name}(\\d+)?$`);
        const existingUsers = await Cutout.find({ userName: regex });

        // 숫자 붙은 이름들에서 가장 큰 숫자 찾기
        const nums = existingUsers
            .map(user => {
                const match = user.userName.match(new RegExp(`^${name}(\\d+)?$`));
                return match && match[1] ? parseInt(match[1]) : 0;
            });

        const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : 0;
        const finalName = nextNum === 0 ? name : `${name}${nextNum}`;



        res.status(200).json({ name: finalName });

    } catch (err) {
        console.error("❌ 사용자 등록 오류:", err);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});


module.exports = router;