use('crudDB')

// 1건 삽입
db.users.insertOne({ name: "Alice", age: 22, place: "부산" })

// 여러 건 한 번에 삽입 (배열로 전달)
db.users.insertMany([
    { name: "이여름",   age: 26 },
    { name: "김보나", age: 33 },
    { name: "정성규", age: 33, email: "jsg213213@naver.com", hobbies: ["game", "swimming"] }
])