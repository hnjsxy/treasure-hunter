import anime from "animejs";
import logger from "../components/logger";
import resolutionSetting from "./settings/resolutionSetting";

const settings = {
  rootElement: document.querySelector("#settings-module")!,
  openElement: document.querySelector("#settings-open-btn")!,
  closeElement: document.querySelector("#settings-close-btn")!,
  settingOptions: {
    // 分辨率设置
    resolution: <HTMLInputElement>document.querySelector("#resolution-option"),
  },
  init() {
    const openHandler = () => {
      cleanEvents();
      this.show();
    };
    const closeHandler = () => {
      cleanEvents();
      // 在模块隐藏前保存更改
      this.hide(() => resolutionSetting.save());
    };
    const cleanEvents = () => {
      this.openElement.removeEventListener("click", openHandler);
      this.closeElement.addEventListener("click", closeHandler);
    };

    logger("Settings", "初始化");
    // 初始化分辨率设置选项
    resolutionSetting.init();
    // 绑定设置按钮的点击事件
    this.openElement.addEventListener("click", openHandler);
  },
  show() {
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Settings", "正在加载");
        this.rootElement.classList.remove("hidden");
      },
      complete() {
        logger("Settings", "载入模块");
      },
    });
  },
  hide(beginExtraCallback?: () => void) {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      begin: beginExtraCallback,
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Settings", "已隐藏");
      },
    });
  },
};

export default settings;
