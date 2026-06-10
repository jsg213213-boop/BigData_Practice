use('modelingDB')

// 주소를 users 문서 안에 중첩
use('modelingDB')
db.users.insertOne({
    name: "jsg", age: 33,
    address: { city: "Seoul", zip: "12345", street: "고가대로" }
})

// 주문 안에 상품 목록(items)을 배열로 임베디드
use('modelingDB')
db.orders.insertOne({
    orderId: "A001",
    items: [
        { product: "Laptop", price: 1200, quantity: 1 },
        { product: "Mouse",  price: 25,   quantity: 2 }
    ]
})

// 1) 사용자 먼저 생성 → _id 확보
use('modelingDB')
const userId = ObjectId()
db.users.insertOne({ _id: userId, name: "kjy", email: "kjy@enaver.com" })

// 2) 주문은 userId로 사용자를 "참조"
db.orders.insertOne({
    orderNumber: 1001,
    userId: userId,        
    total: 250,
    orderDate: new Date()
})

// 최상위 카테고리(parentId: null) → 하위 카테고리
use('modelingDB')
const electronics = ObjectId()
db.categories.insertOne({ _id: electronics, name: "전자제품", parentId: null })
db.categories.insertOne({ name: "컴퓨터", parentId: electronics })  // 전자제품의 자식

// 댓글·대댓글도 동일 패턴
use('modelingDB')
const c1 = ObjectId()
db.comments.insertOne({ _id: c1, text: "첫 댓글", parentId: null, author: "Grace" })
db.comments.insertOne({ text: "첫 댓글의 답글", parentId: c1, author: "Heidi" })

// users 컬렉션 생성 시 규칙 지정: name·email 필수, age는 18 이상 정수
use('modelingDB')
db.createCollection("members", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email"],
            properties: {
                name:  { bsonType: "string", description: "필수 문자열" },
                age:   { bsonType: "int", minimum: 18, description: "18세 이상" },
                email: { bsonType: "string", pattern: "^.*@.*\\..*$", description: "이메일 형식" }
            }
        }
    }
})

db.members.insertOne({ name: "jsg", email: "jsg@example.com", age: 33 })  // ✅ 성공
db.members.insertOne({ name: "kjy", email: "kjyexample.com", age: 30 })       // ❌ @ 없음 → 거부
db.members.insertOne({ email: "lyr@example.com", age: 26 })               // ❌ name 누락 → 거부

// 검증 규칙 확인 / 임시 해제
use('modelingDB')
db.getCollectionInfos({ name: "members" })
db.runCommand({ collMod: "members", validator: {} })   // 검증 제거

use('modelingDB')
db.users.insertOne({
    name: "jsg", age: 33,
    address: { city: "Seoul", zip: "12345" }
})

use('modelingDB')
const postId = ObjectId()
db.posts.insertOne({ _id: postId, title: "첫 게시글", author: "kjy" })
db.comments.insertOne({ postId: postId, comment: "좋은 글입니다!", author: "lyr" })

use('modelingDB')
const furniture = ObjectId()
db.categories.insertOne({ _id: furniture, name: "가구", parentId: null })
db.categories.insertOne({ name: "의자", parentId: furniture })

use('modelingDB')
db.createCollection("students", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email"],
            properties: {
                name:  { bsonType: "string" },
                email: { bsonType: "string", pattern: "^.*@.*\\..*$" }
            }
        }
    }
})