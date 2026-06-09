use('crudDB')

// 1건 삽입
db.users.insertOne({ name: "Alice", age: 22, place: "부산" })

// 여러 건 한 번에 삽입 (배열로 전달)
db.users.insertMany([
    { name: "이여름",   age: 26 },
    { name: "김보나", age: 33 },
    { name: "정성규", age: 33, email: "jsg213213@naver.com", hobbies: ["game", "swimming"] }
])


use('crudDB')
db.users.find()  

// 전체 조회
db.users.findOne({ name: "정성규" })     // 조건에 맞는 첫 문서 1건


// 필드 선택(projection): name, age만 보고 _id는 숨기기
use('crudDB')
db.users.find({}, { name: 1, age: 1, _id: 0 })


// 조건 검색: age가 30 이상
use('crudDB')
db.users.find({ age: { $gte: 30 } })

use('crudDB')
db.users.deleteOne({ name: "이여름" })       // 한 건 삭제
db.users.deleteMany({ age: { $lt: 26 } })   // 조건에 맞는 모든 문서 삭제


// 정렬 + 제한: age 내림차순로 3건
use('crudDB')
db.users.find().sort({ age: -1 }).limit(3)

// 개수 세기: age가 30 이상인 문서 수
use('crudDB')
db.users.countDocuments({ age: { $gte: 30 } })

// 크기 5000바이트로 고정된 컬렉션 생성
use('crudDB')
db.createCollection("logs", { capped: true, size: 5000 })

// 1000건을 넣으면 → 크기 한계를 넘는 오래된 문서부터 자동 삭제됨
for (let i = 0; i < 1000; i++) {
    db.logs.insertOne({ x: i })
}
use('crudDB')
db.logs.find() 
use('crudDB')             // 최근 문서만 남아있음
db.logs.stats()             // capped 여부·크기 확인

use('crudDB')
db.students.insertOne({ name: "John", age: 22 })

use('crudDB')
db.students.find().sort({ age: -1 }).limit(3)

use('crudDB')
db.employees.updateOne({ name: "정성규1" }, { $push: { skills: "Python" } })

use('crudDB')
db.employees.updateOne({ name: "정성규1" }, { $pull: { skills: "Python" } })

use('crudDB')
db.createCollection("cappedC", { capped: true, size: 10000 })

use('crudDB')
db.cappedC.insertOne({ x: 1 })

use('crudDB')
db.cappedC.find()