/**
 * 百濟探索圖鑑｜照片上傳腳本
 *
 * 用途：讓參加者的手機不用登入 Google，也能把照片寫進你的雲端硬碟。
 *
 * 部署方式見「設定步驟.md」。
 */

/* ── 改這一行：你的 Drive 資料夾 ID ──
   資料夾網址長這樣 https://drive.google.com/drive/folders/1AbC...XyZ
   最後那一段就是 ID。 */
var FOLDER_ID = "在這裡貼上資料夾 ID";


function doPost(e) {
  var out = { ok: false };

  try {
    var body = JSON.parse(e.postData.contents);

    if (!body.image || !body.fid || !body.taskId) {
      out.error = "missing fields";
      return json(out);
    }

    // 去掉 data:image/jpeg;base64, 前綴
    var base64 = String(body.image).replace(/^data:image\/\w+;base64,/, "");
    var bytes = Utilities.base64Decode(base64);

    var safeName = String(body.name || "未命名").replace(/[\\\/:*?"<>|]/g, "_").slice(0, 20);
    var stamp = Utilities.formatDate(new Date(), "Asia/Taipei", "MMdd_HHmmss");
    var filename = safeName + "_" + body.fid + "_" + body.taskId + "_" + stamp + ".jpg";

    var blob = Utilities.newBlob(bytes, "image/jpeg", filename);
    var file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);

    // 後台要能直接顯示縮圖，所以單檔也設成「知道連結的人可檢視」
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    out.ok = true;
    out.fileId = file.getId();

  } catch (err) {
    out.error = String(err);
  }

  return json(out);
}


// 部署後可以直接開網址測試，看到 ok 就代表活著
function doGet() {
  return json({ ok: true, alive: true, time: new Date().toISOString() });
}


function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
