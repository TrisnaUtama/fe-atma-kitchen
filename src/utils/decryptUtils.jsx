// decryptUtils.js

// This is just a placeholder decryption function, NOT SUITABLE FOR PRODUCTION
export function decryptPassword(encryptedPassword) {
  // Replace this with your actual decryption logic
  // This is just a basic example using a simple XOR cipher (NOT SECURE!)
  const key = 123; // Example decryption key (NOT SECURE!)
  let decryptedPassword = "";
  for (let i = 0; i < encryptedPassword.length; i++) {
    const charCode = encryptedPassword.charCodeAt(i);
    const decryptedCharCode = charCode ^ key;
    decryptedPassword += String.fromCharCode(decryptedCharCode);
  }
  return decryptedPassword;
}
