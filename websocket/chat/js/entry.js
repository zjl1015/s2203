((doc, storage, location) => {
  const oUsername = doc.querySelector("#username");
  const oEnterBtn = doc.querySelector("#enter");

  const init = () => {
    bindEvnet();
  };
  const handleEnterBtnClick = () => {
    const username = oUsername.value.trim();
    if (username.length < 6) {
      alert("用户名长度不能小于6");
      return;
    }
    // 保存用户名
    storage.setItem("username", username);
    // 跳转到 index.html
    location.href = "index.html";
  };
  const bindEvnet = () => {
    oEnterBtn.addEventListener("click", handleEnterBtnClick, false);
  };

  init();
})(document, localStorage, location);
