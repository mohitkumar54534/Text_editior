// script.js
let editor = document.getElementById('editor');
let textInput = document.getElementById('text-input');
let fontSelect = document.getElementById('fontSelect');
let sizeSelect = document.getElementById('sizeSelect');
let colorInput = document.getElementById('colorInput');
let undoStack = [];
let redoStack = [];

function saveState() {
  undoStack.push({
    content: editor.innerHTML,
    font: editor.style.fontFamily,
    size: editor.style.fontSize,
    color: editor.style.color,
  });
}

function undo() {
  if (undoStack.length > 0) {
    redoStack.push({
      content: editor.innerHTML,
      font: editor.style.fontFamily,
      size: editor.style.fontSize,
      color: editor.style.color,
    });
    let state = undoStack.pop();
    applyState(state);
  }
}

function redo() {
  if (redoStack.length > 0) {
    undoStack.push({
      content: editor.innerHTML,
      font: editor.style.fontFamily,
      size: editor.style.fontSize,
      color: editor.style.color,
    });
    let state = redoStack.pop();
    applyState(state);
  }
}

function applyState(state) {
  editor.innerHTML = state.content;
  editor.style.fontFamily = state.font;
  editor.style.fontSize = state.size;
  editor.style.color = state.color;
}

function changeFont() {
  saveState();
  editor.style.fontFamily = fontSelect.value;
}

function changeSize() {
  saveState();
  editor.style.fontSize = sizeSelect.value + 'px';
}

function changeColor() {
  saveState();
  editor.style.color = colorInput.value;
}

function updateEditor() {
  editor.innerHTML = textInput.value;
}
editor.addEventListener('input', saveState);
