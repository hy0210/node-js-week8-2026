// 欄位：name varchar(100) 必填、description text 必填、start_at timestamp 必填、end_at timestamp 必填、max_participants integer 必填、created_at、updated_at（建立／更新時間，由系統自動帶入）

const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Course',
  tableName: 'COURSE',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid', // 主鍵，自動生成 UUID
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false, // 必填
    },
    description: {
      type: 'text',
      nullable: false, // 必填
    },
    start_at: {
      type: 'timestamp',
      nullable: false, // 必填
    },
    end_at: {
      type: 'timestamp',
      nullable: false, // 必填
    },
    max_participants: {
      type: 'int',
      nullable: false, // 必填
    },
    meeting_url: {
      type: 'varchar',
      length: 2048,
      nullable: true, // 新欄位，非必填
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
  relations: {
    user: {
      type: 'many-to-one', // 多堂課對到一個教練
      target: 'User', // 對應到 User entity
      joinColumn: { name: 'user_id' }, // 對應資料表裡的 user_id 外鍵
    },
    skill: {
      type: 'many-to-one', // 多堂課對到一個技能
      target: 'Skill', // 對應到 Skill entity
      joinColumn: { name: 'skill_id' }, // 對應資料表裡的 skill_id 外鍵
    },
  },
});
