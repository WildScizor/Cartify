# Dependency Fix Guide for Cartify

This guide will help you fix missing dependencies and common installation issues.

## ✅ Quick Fix Commands

### 1. Install All Dependencies

**Server:**
```bash
cd cartify-main/server
npm install
```

**Client:**
```bash
cd cartify-main/client
npm install
```

### 2. Fix Security Vulnerabilities

**Server:**
```bash
cd cartify-main/server
npm audit fix
```

**Client:**
```bash
cd cartify-main/client
npm audit fix
```

---

## 🔍 Common Issues and Solutions

### Issue 1: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall
cd cartify-main/server
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

cd ../client
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue 2: Version Mismatches

**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install
```

### Issue 3: Permission Errors (Windows)

**Solution:**
- Run terminal as Administrator
- Or use: `npm install --legacy-peer-deps`

### Issue 4: MongoDB Connection Issues

**Required:** The server needs MongoDB to run. You need a `.env` file in the `server` directory.

**Solution:**
1. Create `.env` file in `cartify-main/server/`
2. Add the following:
```env
MONGODB_URI=mongodb://localhost:27017/cartify
JWT_SECRET=your_secret_key_here_make_it_long_and_random
CLIENT_URL=http://localhost:5173
PORT=4000
```

---

## 📋 Complete Installation Checklist

### Server Setup:
- [ ] Navigate to `cartify-main/server`
- [ ] Run `npm install`
- [ ] Run `npm audit fix` (if vulnerabilities exist)
- [ ] Create `.env` file with MongoDB connection string
- [ ] Ensure MongoDB is running (or use MongoDB Atlas)

### Client Setup:
- [ ] Navigate to `cartify-main/client`
- [ ] Run `npm install`
- [ ] Run `npm audit fix` (if vulnerabilities exist)

### Verify Installation:
- [ ] Check `node_modules` folder exists in both directories
- [ ] Check `package-lock.json` exists in both directories
- [ ] No errors in terminal after `npm install`

---

## 🚀 Verify Dependencies Are Installed

**Check Server:**
```bash
cd cartify-main/server
npm list --depth=0
```

**Check Client:**
```bash
cd cartify-main/client
npm list --depth=0
```

Expected output should show all packages from `package.json` without errors.

---

## 🔧 Advanced Troubleshooting

### If npm install fails completely:

1. **Check Node.js version:**
   ```bash
   node --version  # Should be 16.x or higher
   npm --version   # Should be 8.x or higher
   ```

2. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

3. **Use legacy peer deps (if needed):**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Clean install:**
   ```bash
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   npm cache clean --force
   npm install
   ```

---

## 📦 Required Dependencies Summary

### Server Must Have:
- ✅ express
- ✅ mongoose
- ✅ bcryptjs
- ✅ jsonwebtoken
- ✅ cors
- ✅ dotenv
- ✅ nodemon (dev)

### Client Must Have:
- ✅ react
- ✅ react-dom
- ✅ react-router-dom
- ✅ axios
- ✅ zustand
- ✅ vite (dev)
- ✅ typescript (dev)
- ✅ tailwindcss (dev)

---

## 💡 Next Steps After Fixing Dependencies

1. **Start the server:**
   ```bash
   cd cartify-main/server
   npm run dev
   ```

2. **Start the client (in a new terminal):**
   ```bash
   cd cartify-main/client
   npm run dev
   ```

3. **Server should run on:** http://localhost:4000
4. **Client should run on:** http://localhost:5173

---

## ❓ Still Having Issues?

Check these common problems:

1. **Wrong directory:** Make sure you're in the correct `server` or `client` directory
2. **Node version:** Requires Node.js 16+ (check with `node --version`)
3. **MongoDB:** Server won't start without MongoDB connection (see `.env` setup)
4. **Port conflicts:** Make sure ports 4000 and 5173 are not in use
5. **Missing .env:** Server needs `.env` file for MongoDB connection
