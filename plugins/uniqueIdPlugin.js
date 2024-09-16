// plugins/uniqueIdPlugin.js
export default (context, inject) => {
  const generateNumOrCharId = () => {
    const prefixLength = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let dynamicPrefix = "";

    for (let i = 0; i < prefixLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      dynamicPrefix += characters[randomIndex];
    }

    const uniqueNumber = Date.now().toString().slice(-10);

    const uniqueId = `${dynamicPrefix}${uniqueNumber}`;
    return uniqueId;
  };

  inject("generateNumOrCharId", generateNumOrCharId);
};
