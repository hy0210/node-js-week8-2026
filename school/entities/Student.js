const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Student',
  tableName: 'STUDENT',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid', // 主鍵，自動生成 UUID
    },
    name: {
      type: 'varchar',
      length: 50,
      nullable: false, // 必填
    },
  },
  relations: {
    class: {
      type: 'one-to-one', // 一個學生對到一個班級
      target: 'Class', // 對應到 Class entity
      joinColumn: { name: 'class_id' }, // 對應資料表裡的 class_id 外鍵
      nullable: false,
    },
  },
});
