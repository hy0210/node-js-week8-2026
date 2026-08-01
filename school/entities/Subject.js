const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Subject',
  tableName: 'SUBJECT',
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
});
