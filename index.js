require('dotenv').config(); // dotenv 패키지로 .env 파일 불러오기

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

// 미들웨어 설정
app.use(cors());                   // 다른 포트에서 오는 요청 허용 (CORS)
app.use(express.json());           // JSON 요청 파싱 (FormData 아님)



//라우트 폴더 파일들 import
const cutoutRoutes = require('./routes/cutoutRoutes');
const confirmUserNameRouter = require("./routes/confirmUserName");

// 라우트 등록
app.use('/api', cutoutRoutes);
app.use("/api", confirmUserNameRouter);




// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB 연결 성공'))
    .catch((err) => console.error('❌ MongoDB 연결 실패', err));


// 서버 시작
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});