const express = require('express');
const router = express.Router();
const Cutout = require('../models/Cutout');



//cutouts 저장
router.post('/saveCutouts', async (req, res) => {
    const cutouts = req.body;

    try {
        const saved = await Cutout.insertMany(cutouts);//배열 전체 저장
        res.status(200).json({ message: '✅ 저장 완료', count: saved.length });
    } catch (error) {
        console.error('❌ 저장 실패:', error);
        res.status(500).json({ message: '서버 오류', error });
    }
});


//cutouts 불러오기
router.get("/allCutouts", async (req, res) => {
    try {
        const all = await Cutout.find();// 전체 콜라주 조회
        res.status(200).json(all);
    } catch (error) {
        console.error("❌ cutouts 불러오기 실패:server", err);
        res.status(500).json({ error: "서버 오류" });
    }
});



module.exports = router;