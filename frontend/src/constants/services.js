export const replaceNewlinesWithBreaks = (text) => {
  return text.replace(/\n/g, "<br>");
};

export const renderClickableLinksInMessage = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return message.replace(urlRegex, (url) => `<a href="${url}" target="_blank" style="color: #0076ff; padding: 0.2rem; border-radius: 4px;"">${url}</a>`);
};
