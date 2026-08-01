const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Grade',
  tableName: 'GRADE',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid', // 主鍵，自動生成 UUID
    },
    score: {
      type: 'int',
      nullable: false, // 必填
    },
    retake_score: {
      type: 'int',
      nullable: true, // 非必填，因為是新增欄位
    },
  },
  relations: {
    student: {
      type: 'many-to-one', // 多個成績對到一個學生
      target: 'Student', // 對應到 Student entity
      joinColumn: { name: 'student_id' }, // 對應資料表裡的 student_id 外鍵
      nullable: false,
    },
    subject: {
      type: 'many-to-one', // 多個成績對到一個科目
      target: 'Subject', // 對應到 Subject entity
      joinColumn: { name: 'subject_id' }, // 對應資料表裡的 subject_id 外鍵
      nullable: false,
    },
  },
});
