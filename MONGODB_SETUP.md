# MongoDB Atlas Setup Guide

## ✅ Files đã được tạo/cập nhật

1. `.env` - File chứa environment variables (KHÔNG commit lên git)
2. `.env.example` - Template file (có thể commit)
3. `.gitignore` - Đã thêm `.env` để không commit
4. `app.js` - Đã cập nhật để dùng environment variables

## 📝 Cách sử dụng

### Bước 1: Cài đặt dotenv package

```bash
npm install dotenv
```

### Bước 2: Lấy MongoDB Atlas Connection String

1. Đăng nhập MongoDB Atlas: https://cloud.mongodb.com
2. Chọn cluster của bạn
3. Click "Connect" → "Connect your application"
4. Copy connection string (sẽ có dạng):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Bước 3: Cập nhật file .env

Mở file `.env` và thay thế với connection string thực tế:

```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/web?retryWrites=true&w=majority
PORT=4000
NODE_ENV=production
```

**Lưu ý:**

- Thay `myuser` bằng username MongoDB Atlas của bạn
- Thay `mypassword123` bằng password thực tế
- Thay `cluster0.abc123` bằng cluster name của bạn
- Giữ `/web` ở cuối (database name)

### Bước 4: Test local

```bash
npm start
```

Bạn sẽ thấy log:

```
Connection database successfully
Connected to: MongoDB Atlas
```

### Bước 5: Deploy lên Render

1. Vào Render Dashboard
2. Chọn backend service của bạn
3. Vào tab "Environment"
4. Add environment variable:

   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/web?retryWrites=true&w=majority`

5. Click "Save Changes"
6. Render sẽ tự động redeploy

## 🔒 Bảo mật

✅ File `.env` đã được thêm vào `.gitignore` - sẽ không bị commit lên git
✅ Chỉ file `.env.example` (template) được commit
✅ Connection string thực tế chỉ lưu trong:

- `.env` file trên máy local (không commit)
- Environment variables trên Render (bảo mật)

## ⚠️ Lưu ý quan trọng

1. **KHÔNG BAO GIỜ** commit file `.env` lên git
2. **KHÔNG BAO GIỜ** share connection string công khai
3. Nếu password có ký tự đặc biệt, cần encode URL:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - Hoặc dùng tool: https://www.urlencoder.org/

## 🧪 Kiểm tra

### Test connection string format:

```javascript
// Đúng ✅
mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/web?retryWrites=true&w=majority

// Sai ❌ (thiếu database name)
mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Test API endpoint:

**Local:**

```
http://localhost:4000/api/product
```

**Production:**

```
https://ecom-server-l301.onrender.com/api/product
```

## 🐛 Troubleshooting

### Issue: "MongoServerError: bad auth"

**Fix:** Check username/password trong connection string

### Issue: "Connection timeout"

**Fix:**

1. Vào MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allow all)

### Issue: "Database not found"

**Fix:** Đảm bảo có `/web` trong connection string:

```
...mongodb.net/web?retryWrites=true...
```

### Issue: "dotenv is not defined"

**Fix:** Chạy:

```bash
npm install dotenv
```

## 📦 Package.json

Đảm bảo có dependency:

```json
{
  "dependencies": {
    "dotenv": "^16.0.0"
    // ... other packages
  }
}
```

## ✨ Done!

Sau khi setup xong:

1. Backend sẽ connect đến MongoDB Atlas
2. Frontend sẽ load được products
3. Deploy hoạt động bình thường

---

**Cần help?** Check MongoDB Atlas logs hoặc Render logs để debug.
