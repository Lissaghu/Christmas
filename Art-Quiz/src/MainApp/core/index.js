import { MainInterface, mainInterface } from "../main-page/main-page.js";
import { buttonComponent } from "../../components/Button/button.js";
import { SettingsInterface } from "../settings-page/settings.js";
import { artistInterface } from "../Artist-page/artist.js";

// const mainInterface = new MainInterface(obj, buttonComponent); // Создаём главный экземпляр класса
// mainInterface.createMainHTML(); // Закидываем разметку HTML главной страницы
// mainInterface.createButtonArtist();

// const mainPageButton = document.querySelector(".main"); // получаем элемент содержащий в себе кнопки

// const buttonArtist = buttonComponent({
//   onClick: () => console.log("hello"),
//   title: "Artist quiz",
//   className: "button-artist"
// });
// mainPageButton.append(buttonArtist); // добавляем кнопки в HTML

// const buttonPictures = buttonComponent({
//   onClick: () => console.log("Pictures quiz"),
//   title: "Pictures quiz",
//   className: "button-pictures"
// });
// mainPageButton.append(buttonPictures); // добавляем кнопки в HTML

export { MainInterface, mainInterface };
