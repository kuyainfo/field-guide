# Windows MCP 操作指南

## 可用工具

### Windows-MCP:PowerShell
執行任何 PowerShell 指令，用於：
- 檔案與資料夾操作
- Git 操作
- 系統設定
- 網路請求（Invoke-WebRequest）

### Windows-MCP:Shortcut
執行鍵盤快捷鍵，例如：
- win+r（開啟執行視窗）
- ctrl+c / ctrl+v
- alt+tab

### Windows-MCP:Registry
讀寫 Windows 登錄檔（Registry）

---

## 常用操作範例

### 建立資料夾
```powershell
New-Item -ItemType Directory -Path "C:\路徑\資料夾名稱" -Force
```

### 建立檔案
```powershell
Set-Content -Path "C:\路徑\檔案名稱.txt" -Value "內容" -Encoding UTF8
```

### 複製檔案
```powershell
Copy-Item -Path "來源路徑" -Destination "目標路徑"
```

### 列出資料夾內容
```powershell
Get-ChildItem "C:\路徑"
```

---

## Git 操作

### 初始化 repo
```powershell
cd "C:\專案路徑"
git init
git config user.email "user@local.com"
git config user.name "Claude User"
git add .
git commit -m "initial commit"
```

### 新增 commit
```powershell
cd "C:\專案路徑"
git add .
git commit -m "說明文字"
```

### 建立 branch
```powershell
git checkout -b branch名稱
```

### 切換 branch
```powershell
git checkout branch名稱
```

### 查看版本紀錄
```powershell
git log --oneline
```

---

## 注意事項
- 路徑含中文或空格時，請用雙引號包起來
- 敏感操作（刪除、帳號登入）需先向使用者確認
- 不處理密碼、信用卡等敏感資料
