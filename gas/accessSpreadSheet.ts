function doGet() {
  const htmlOutput = HtmlService.createTemplateFromFile("index").evaluate()
  return htmlOutput
}

/**
 * 引数で受け取った値をスプレッドシートに書き込む
 * @param  countNo カウントした値
 * @returns 
 */
function saveValue( countNo ) {
  // スプレッドシートを取得
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const data_range = spreadsheet.getActiveSheet().getRange("A2")

  // 値を書き込み
  data_range.setValue(countNo)
}

/**
 * スプレッドシートに保存されていた値を取得する
 * @returns スプレッドシートに保存されていた値
 */
function displayValue() {
  // スプレッドシートのデータを取得
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const data_values = spreadsheet.getActiveSheet().getRange("A2").getValues()

  // 取得したデータが数値の場合はその値を返却。以外は0を返す。
  if (typeof(data_values[0][0]) === 'number') {
    return data_values[0][0]
  }
  return 0
}
