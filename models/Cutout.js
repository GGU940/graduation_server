const mongoose = require('mongoose');


const CutoutItemSchema = new mongoose.Schema({
    imgSrc: String,
    sx: Number,
    sy: Number,
    dx: Number,
    dy: Number,
    size: Number,

}, { _id: false });  // ❗ 중첩 스키마에 _id 안 붙이도록 설정


const CutoutSchema = new mongoose.Schema({
    userName: String,
    timestamp: String,
    cutouts: { // 4개의 면을 가진 객체
        front: [CutoutItemSchema],
        back: [CutoutItemSchema],
        left: [CutoutItemSchema],
        right: [CutoutItemSchema]
    }
});

module.exports = mongoose.model('Cutout', CutoutSchema);