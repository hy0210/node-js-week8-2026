const { EntitySchema } = require('typeorm');

// name varchar(50) 必填、email varchar(320) 必填且唯一、role varchar(20) 必填、created_at、updated_at（建立／更新時間，由系統自動帶入）

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'USER',
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
    email: {
      type: 'varchar',
      length: 320,
      nullable: false, // 必填
      unique: true, // 唯一
    },
    role: {
      type: 'varchar',
      length: 20,
      nullable: false, // 必填
    },
    created_at: {
      type: 'timestamp',
      createDate: true, // 新增資料時自動填入當下時間
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true, // 每次更新資料時自動更新成當下時間
    },
  },
});
