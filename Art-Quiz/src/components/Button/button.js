import "./buttonStyle.scss";

// создаём шаблон для всех кнопок

export const buttonComponent = ({ onClick, title, className }) => {
  let buttonElement = document.createElement("button");
  buttonElement.classList.add("button");
  buttonElement.classList.add(`${className}`);
  buttonElement.textContent = title;
  buttonElement.addEventListener("click", onClick);
  return buttonElement;
};
