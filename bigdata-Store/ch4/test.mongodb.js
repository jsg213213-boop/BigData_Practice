use('indexDB')
db.users.insertMany([
    { name: "이여름", age: 26, city: "Seoul",   email: "lyr@naver.com" },
    { name: "김보나",   age: 30, city: "Daegu",   email: "kjy@naver.com" },
    { name: "정성규", age: 33, city: "Seoul", email: "jsg@naver.com" }
])

use('indexDB')
db.users.createIndex({ age: 1 })          // 오름차순(1) 단일 인덱스

use('indexDB')
db.users.createIndex({ age: -1 })         // 내림차순(-1)

use('indexDB')
db.users.getIndexes()                     // 현재 인덱스 목록

use('indexDB')
db.users.dropIndex("age_1")               // 특정 인덱스 삭제

use('indexDB')
db.users.dropIndexes()                    // 모든 인덱스 삭제(_id 제외)

// 복합 인덱스: age, city 두 조건 동시 검색 최적화
use('indexDB')
db.users.createIndex({ age: 1, city: 1 })

// 유니크 인덱스: email 중복 삽입 시 오류(E11000) 발생
use('indexDB')
db.users.createIndex({ email: 1 }, { unique: true })

// 스파스 인덱스: location 필드가 있는 문서만 인덱싱
use('indexDB')
db.users.createIndex({ location: 1 }, { sparse: true })

// 부분 인덱스: age>=30인 문서만 인덱싱 (공간 절약)
use('indexDB')
db.users.createIndex({ age: 1 }, { partialFilterExpression: { age: { $gte: 30 } } })

use('indexDB')
db.locations.insertMany([
    { name: "Seoul Tower",   coordinates: [126.9784, 37.5665] },  // [경도, 위도] 순서 주의
    { name: "Busan Tower",   coordinates: [129.0327, 35.1019] },
    { name: "Namsan Park",   coordinates: [126.9921, 37.5512] }
])

use('indexDB')
db.locations.createIndex({ coordinates: "2dsphere" })

// 원형 검색: 서울 좌표 중심 반경 안
use('indexDB')
db.locations.find({ coordinates: { $geoWithin: { $center: [[126.9784, 37.5665], 10] } } })

// 사각형 검색
use('indexDB')
db.locations.find({ coordinates: { $geoWithin: { $box: [[126.9, 37.5], [127.1, 37.7]] } } })

// 구형 거리 검색: 반경 10km(미터) 이내
use('indexDB')
db.locations.find({
    coordinates: {
        $nearSphere: {
            $geometry: { type: "Point", coordinates: [126.9784, 37.5665] },
            $maxDistance: 10000
        }
    }
})

use('indexDB')
db.logs.insertMany([
    { message: "User logged in",  createdAt: new Date() },
    { message: "Password changed", createdAt: new Date() }
])

// createdAt 기준 180초 후 자동 삭제
use('indexDB')
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 180 })

// 자주 쓰는 기간
use('indexDB')
db.tempData.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })    // 24시간

use('indexDB')
db.activityLogs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 }) // 7일
// ⚠ createdAt은 반드시 Date 타입(new Date())이어야 함. 문자열은 TTL 작동 안 함

use('indexDB')
db.users.createIndex({ age: 1 })

use('indexDB')
db.users.createIndex({ email: 1 }, { unique: true })

use('indexDB')
db.users.createIndex({ age: 1 }, { partialFilterExpression: { age: { $gte: 30 } } })

use('indexDB')
db.locations.createIndex({ coordinates: "2dsphere" })

use('indexDB')
db.locations.find({
    coordinates: {
        $nearSphere: {
            $geometry: { type: "Point", coordinates: [126.9784, 37.5665] },
            $maxDistance: 5000
        }
    }
})

use('indexDB')
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })