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

  // 'index_no'が1のデータついて、データがある場合は更新、ない場合は登録をおこなう
  const sql = 'INSERT INTO counter (index_no, count , updated_at) VALUES (1, ' + countNo + ', cast( now() as datetime ))' +
    ' ON DUPLICATE KEY UPDATE count = ' + countNo + ', updated_at = cast( now() as datetime )'

  // counterテーブル更新
  statement.executeUpdate(sql)

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
