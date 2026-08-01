const { EntitySchema } = require('typeorm');

// SKILL（技能） 欄位：name varchar(50) 必填且唯一 關聯：無

module.exports = new EntitySchema({
  name: 'Skill',
  tableName: 'SKILL',
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
      unique: true, // 唯一
    },
  },
});
