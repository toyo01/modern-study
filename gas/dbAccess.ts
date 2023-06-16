const config = JSON.parse(HtmlService.createHtmlOutputFromFile("config.json").getContent())

//プロパティ値を取得
const INSTANCE = config.instance
const DB_NAME = config.dbName
const USER_ID = config.userId
const USER_PASSWORD = config.userPassword
const CONNECT_URL = 'jdbc:google:mysql://' + INSTANCE + '/' + DB_NAME

/**
 * counterテーブルに値を登録、または更新する
 * @param  countNo 登録・更新する値
 * @returns なし
 */
function updateCounter( countNo ) {

  // DB接続
  const conn = Jdbc.getCloudSqlConnection(CONNECT_URL, USER_ID, USER_PASSWORD)
  const statement = conn.createStatement()

  // counterテーブルにデータの登録があるか確認
  const count = getCounter()

  let sql
  if (count) {
    // データがある場合、更新用のSQLを作成
    sql = 'UPDATE counter SET count = ' + countNo + ', updated_at = cast( now() as datetime ) WHERE index_no = 1'
  } else {
    // データがない場合、登録用のSQLを作成
    sql = 'INSERT INTO counter (index_no, count , updated_at) VALUES (1, ' + countNo + ', cast( now() as datetime ))'
  }

  // counterテーブル更新
  statement.executeQuery(sql)

  // DB接続を終了する
  statement.close()
  conn.close()

}

/**
 * counterテーブルから値を取得する
 * @returns カウント値
 */
function getCounter(): number {

  // DB接続
  const conn = Jdbc.getCloudSqlConnection(CONNECT_URL, USER_ID, USER_PASSWORD)
  const statement = conn.createStatement()

  // カウント値を取得
  const result = statement.executeQuery('SELECT * FROM counter WHERE index_no = 1')

  // テーブルにデータがなければ０を返却
  const count = result.next() ? result.getInt('count') : 0

  //DB接続を終了する
  result.close()
  statement.close()
  conn.close()

  return count

}
