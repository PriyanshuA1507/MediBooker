// File to Base64 Converter Utility
// Developed by Priyanshu for MediBooker

export default function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);

      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      reader.readAsDataURL(file);
    } catch (err) {
      reject(new Error("File conversion failed"));
    }
  });
}
