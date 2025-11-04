// Get file type icon based on file extension
export const getFileIcon = (fileName, isDirectory, isExpanded = false) => {
  if (isDirectory) {
    return isExpanded ? '📂' : '📁';
  }

  const extension = fileName.split('.').pop()?.toLowerCase();

  const iconMap = {
    // JavaScript/TypeScript
    js: '📜',
    jsx: '⚛️',
    ts: '📘',
    tsx: '⚛️',

    // Web
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    sass: '🎨',

    // Data
    json: '📋',
    xml: '📋',
    yaml: '📋',
    yml: '📋',

    // Documentation
    md: '📝',
    txt: '📄',
    pdf: '📕',
    doc: '📘',
    docx: '📘',

    // Images
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    gif: '🖼️',
    svg: '🎨',

    // Config
    env: '⚙️',
    config: '⚙️',
    conf: '⚙️',
    gitignore: '🚫',

    // Archives
    zip: '📦',
    tar: '📦',
    gz: '📦',

    // Code files
    py: '🐍',
    java: '☕',
    cpp: '⚡',
    c: '⚡',
    go: '🐹',
    rs: '🦀',
    php: '🐘',
    rb: '💎',

    // Other
    lock: '🔒',
    log: '📊',
  };

  return iconMap[extension] || '📄';
};

// Get file type label
export const getFileType = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? `.${extension}` : 'file';
};
