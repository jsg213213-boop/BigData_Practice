use('testDB')                                  // DB 선택 (없으면 데이터 넣을 때 생성)
db.testCollection.insertOne({ name: '정성규', age: 33 })  // 첫 문서 삽입
db.testCollection.find()                       // 조회