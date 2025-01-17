# Expo Starter Pack for Devs

Welcome to the Expo Starter Pack! This starter pack is built to simplify app development by providing a well-structured stack that integrates React Native, Supabase, and NativeWind. Whether you're transitioning from web development or looking for a streamlined setup, this pack is designed to save you time and effort.

---

## 🚀 Built With

1. **Expo React Native** – For cross-platform app development.
2. **Supabase** – Simplified backend and authentication.
3. **NativeWind** – Utility-first styling with Tailwind CSS for React Native.

---

## 🛠 Why Was This Built?

As a web developer working with tools like ReactJS, Next.js, Supabase, and Hono.js for full-stack web applications, transitioning to app development posed several challenges. 

When tasked with creating a mobile app, I was determined to stick with React Native due to my familiarity with ReactJS workflows. This eliminated the need to explore options like Flutter or Android Studio, ensuring I could focus on solving real app development problems.

---

## 🧐 Problems with Existing Templates

1. Lack of a comprehensive bundle for app development.
2. Poorly written documentation for runtime scenarios.
3. Switching stacks often requires substantial effort and a steep learning curve.

---

## 💡 How Does This Starter Pack Solve These Problems?

1. A well-defined stack that eliminates confusion and ensures compatibility.
2. Clear documentation for every step, making the development process seamless.
3. Fine-tuned configurations to avoid conflicts and enhance developer experience.

---

## 📂 Project File Structure

```plaintext
├── README.md
├── app
│   ├── (auth)  # Screens for authenticated users
│   │   ├── _layout.tsx
│   │   ├── account.tsx
│   │   ├── home.tsx
│   │   ├── profile
│   │   │   └── [id].tsx
│   │   └── welcome.tsx
│   ├── (public) # Screens for unauthenticated users
│   │   └── sign-in.tsx
│   └── _layout.tsx
├── app.json
├── bun.lockb
├── components
│   └── Auth.tsx
├── lib
│   ├── auth.tsx
│   └── supabase.ts
├── package.json
└── tsconfig.json
```

# 📖 Getting Started

Follow these steps to set up and run the project:

## Prerequisites
- Node.js installed on your system.
- Expo CLI installed globally:  
  ```
  npm install -g expo-cli
  ```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd expo-starter-pack
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the App
1. Start the Expo development server:
   ```
   npm start
   ```
2. Scan the QR code with your Expo Go app to preview the app on your device.
