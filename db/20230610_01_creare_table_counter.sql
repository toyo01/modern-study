CREATE TABLE counter (
  index_no INT NOT NULL COMMENT 'インデックス番号'
  , count INT comment 'カウント値'
  , updated_at DATETIME comment '更新日時'
  , PRIMARY KEY (index_no)
) comment 'カウンタ結果を保有するテーブル';
